import axios from "axios"
import { useEffect, useState } from "react"
import AddInventory from "./AddInventory"

const Inventory = ({ onAddNew }) => {
  const [items, setItems] = useState([])
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = () => {
    axios.get("/api/inventory").then((res) => setItems(res.data))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowAdd(true)}
        >
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-center font-bold text-lg w-32">
                Image
              </th>
              <th className="px-6 py-3 text-center font-bold text-lg">Name</th>
              <th className="px-6 py-3 text-center font-bold text-lg">
                Category
              </th>
              <th className="px-6 py-3 text-center font-bold text-lg">Price</th>
              <th className="px-6 py-3 text-center font-bold text-lg">
                Popular
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center align-middle">
                  {item.image && (
                    <div className="flex justify-center items-center">
                      <img
                        src={`/uploads/${item.image}`}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded shadow"
                      />
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-center align-middle text-base">
                  {item.name}
                </td>
                <td className="px-6 py-3 text-center align-middle text-base">
                  {item.category}
                </td>
                <td className="px-6 py-3 text-center align-middle text-base font-semibold">
                  ${item.price}
                </td>
                <td className="px-6 py-3 text-center align-middle text-base">
                  <span
                    className={
                      item.isPopular
                        ? "text-green-600 font-bold"
                        : "text-gray-500 font-semibold"
                    }
                  >
                    {item.isPopular ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAdd && (
        <AddInventory onClose={() => setShowAdd(false)} onAdded={fetchItems} />
      )}
    </div>
  )
}

export default Inventory
