const express = require("express")
const fs = require("fs")
const path = require("path")
const multer = require("multer")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Stripe = require("stripe")

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

const PORT = process.env.PORT || 8080
// MongoDB/Mongoose code commented out for JSON-based assignment
// mongoose.set("strictQuery", false)
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("Connect to Databse"))
//   .catch((err) => console.log(err))

// const userSchema = mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
//   confirmPassword: String,
//   image: String,
// })

// const userModel = mongoose.model("user", userSchema)

// API
app.get("/", (req, res) => {
  // Dashboard data endpoint
  app.get("/api/dashboard", (req, res) => {
    fs.readFile(path.join(__dirname, "dashboard.json"), "utf8", (err, data) => {
      if (err)
        return res.status(500).json({ error: "Failed to read dashboard data" })
      res.json(JSON.parse(data))
    })
  })

  // Inventory data endpoint
  app.get("/api/inventory", (req, res) => {
    fs.readFile(path.join(__dirname, "inventory.json"), "utf8", (err, data) => {
      if (err)
        return res.status(500).json({ error: "Failed to read inventory data" })
      res.json(JSON.parse(data))
    })
  })

  // Add new inventory item endpoint
  app.post("/api/inventory", upload.single("image"), (req, res) => {
    const { name, category, price, isPopular } = req.body
    const image = req.file ? req.file.filename : null
    fs.readFile(path.join(__dirname, "inventory.json"), "utf8", (err, data) => {
      if (err)
        return res.status(500).json({ error: "Failed to read inventory data" })
      let items = JSON.parse(data)
      const newItem = {
        id: Date.now(),
        name,
        category,
        price: Number(price),
        isPopular: isPopular === "true" || isPopular === true,
        image,
      }
      items.push(newItem)
      fs.writeFile(
        path.join(__dirname, "inventory.json"),
        JSON.stringify(items, null, 2),
        (err) => {
          if (err)
            return res.status(500).json({ error: "Failed to save new item" })
          res.json({ message: "Item added", item: newItem })
        }
      )
    })
  })
  res.send("Server is running")
})
//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err)
    if (result) {
      res.send({ message: "Email id is already register", alert: false })
    } else {
      const data = userModel(req.body)
      const save = data.save()
      res.send({ message: "Successfully sign up", alert: true })
    }
  })
})
//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      }
      //   console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      })
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      })
    }
  })
})

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
})
const productModel = mongoose.model("product", schemaProduct)

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({ message: "Upload successfully" })
})

// get product
app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

/*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NBY3pSIdZYVEHlOjpjx9hLn" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        }
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    }

    const session = await stripe.checkout.sessions.create(params)
    // console.log(session)
    res.status(200).json(session.id)
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
})

app.listen(PORT, () => console.log("Server is running at port: " + PORT))
// om12345
