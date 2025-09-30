import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import "./App.css"
import Footer from "./component/Footer"
import Header from "./component/Header"

function App() {
  // Dashboard assignment: no product fetching needed here
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
