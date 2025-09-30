import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get("/api/dashboard").then((res) => setData(res.data))
  }, [])

  if (!data) return <div>Loading...</div>

  const totalCategories = data.categories.length
  const totalFoodItems = data.foodItems.length
  const totalPopularItems = data.foodItems.filter(
    (item) => item.isPopular
  ).length
  const totalReviews = data.reviews.length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-lg font-semibold">Total Categories</div>
          <div className="text-3xl">3</div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-lg font-semibold">Total Food Items</div>
          <div className="text-3xl">{totalFoodItems}</div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-lg font-semibold">Total Popular Items</div>
          <div className="text-3xl">{totalPopularItems}</div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-lg font-semibold">Total Reviews</div>
          <div className="text-3xl">{totalReviews}</div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
      <div className="space-y-4">
        {data.reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 p-4 rounded shadow">
            <div className="font-semibold">{review.customer}</div>
            <div className="text-sm">{review.comment}</div>
            <div className="text-yellow-500">Rating: {review.rating}/5</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
