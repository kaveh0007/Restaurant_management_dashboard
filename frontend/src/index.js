import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import App from "./App"
import "./index.css"
import AddInventory from "./page/AddInventory"
import Dashboard from "./page/Dashboard"
import ErragePage from "./page/ErragePage"
import Inventory from "./page/Inventory"
import { store } from "./redux/index"
import reportWebVitals from "./reportWebVitals"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="add-inventory" element={<AddInventory />} />
      <Route path="*" element={<ErragePage />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

reportWebVitals()
