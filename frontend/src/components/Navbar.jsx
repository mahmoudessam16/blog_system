import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          Blog Hub
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {/* Theme Toggle */}
        <label className="swap swap-rotate mx-2">
          <input type="checkbox" className="theme-controller" value="dark" />
          <BsSun className="swap-on text-xl" />
          <BsMoon className="swap-off text-xl" />
        </label>

        {!user ? (
          <>
            <Link className="btn btn-outline btn-sm mx-1 px-5" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary btn-sm mx-1 px-5" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Welcome Text */}
            <span className="hidden sm:inline font-medium">
              Welcome,{" "}
              <span className="font-bold text-blue-800">{user.username}</span>
            </span>

            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
                  <FaUserCircle size={20} className="inline-block mt-[6px]" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-40 z-50"
              >
                <li className="text-2xl">
                  <Link to="/profile" className="text-lg font-bold">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-error text-lg font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
