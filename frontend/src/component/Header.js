import { useState } from "react"
import { toast } from "react-hot-toast"
import { HiOutlineUserCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../assest/logo.png"
import { logoutRedux } from "../redux/userSlice"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const userData = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve)
  }
  const handleLogout = () => {
    dispatch(logoutRedux())
    toast("Logout successfully")
  }

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="flex max-w-4xl mx-auto ">
            <img src={logo} className="rounded-full h-20 " alt="Logo" />
            <h2 className=" font-bold text-2xl dark:text-red-700  p-4  md: hidden md:flex  ">
              KFC India
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/inventory"}>Inventory</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            {/* Cart removed for dashboard assignment */}
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="h-full w-full"
                  alt="User"
                />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/646b5548acd0a88a674b9429"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  )
}

export default Header
