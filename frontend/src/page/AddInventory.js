import axios from "axios"
import { useState } from "react"

const AddInventory = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    isPopular: false,
    image: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked })
    } else if (type === "file") {
      setForm({ ...form, image: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const data = new FormData()
    data.append("name", form.name)
    data.append("category", form.category)
    data.append("price", form.price)
    data.append("isPopular", form.isPopular)
    if (form.image) data.append("image", form.image)
    try {
      await axios.post("/api/inventory", data)
      setLoading(false)
      onAdded()
      onClose()
    } catch (err) {
      setLoading(false)
      setError("Failed to add item")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow w-full max-w-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">Add New Inventory Item</h2>
        <div className="mb-2">
          <label className="block mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="isPopular"
            checked={form.isPopular}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Is Popular</label>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddInventory
