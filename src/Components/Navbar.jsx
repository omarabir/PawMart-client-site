import React, { useContext, useEffect, useState } from "react";
import { BiMoon } from "react-icons/bi";
import { PiSun } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "daisyui/components/toast";
import { BeatLoader } from "react-spinners";
import logo from "../assets/logo.png";
const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("User logged out successfully!"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#FE7F73] font-semibold"
              : "hover:text-[#FE7F73] transition-colors duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pets-and-supplies"
          className={({ isActive }) =>
            isActive
              ? "text-[#FE7F73] font-semibold"
              : "hover:text-[#FE7F73] transition-colors duration-200"
          }
        >
          Pets & Supplies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-[#FE7F73] font-semibold"
              : "hover:text-[#FE7F73] transition-colors duration-200"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#FE7F73] font-semibold"
              : "hover:text-[#FE7F73] transition-colors duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li>
        <Link to="/login" className="btn btn-outline btn-error w-full">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/95 backdrop-blur-md shadow-lg px-4 lg:px-4 sticky top-0 z-50 mb-10 border-b border-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {!user && authLinks}{" "}
            {/* Show login/register in mobile dropdown if not logged in */}
          </ul>
        </div>

        <Link
          to="/"
          className=" normal-case text-xl lg:text-2xl font-bold text-primary hover:bg-transparent"
        >
          <span className="text-[#FE7F73] flex items-center gap-2">
            <img className="w-14" src={logo} alt="PawMart Logo" />
            PawMart
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200 transition-colors">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={theme === "dark"}
            type="checkbox"
          />
          <PiSun className="swap-on fill-current w-6 h-6 text-yellow-500" />
          <BiMoon className="swap-off fill-current w-6 h-6 text-[#FE7F73] " />
        </label>

        {loading ? (
          <BeatLoader color="#FE7F73" size={10} />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-[#FE7F73] hover:ring-offset-2 transition-all"
            >
              <div className="w-10 rounded-full ring-2 ring-offset-2 ring-base-200">
                <img
                  src={
                    user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`
                  }
                  alt="User avatar"
                />
              </div>
            </label>
            <div
              tabIndex={0}
              className="dropdown-content mt-3 w-72 bg-base-100 rounded-2xl shadow-2xl border border-base-200 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="bg-gradient-to-r from-[#FE7F73] to-orange-500 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-white">
                      <img
                        src={
                          user.photoURL ||
                          `https://i.pravatar.cc/150?u=${user.uid}`
                        }
                        alt="User avatar"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm opacity-90 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              <ul className="menu p-3 gap-1">
                <li>
                  <NavLink
                    to="/dashboard"
                    className="rounded-lg hover:bg-[#FE7F73] hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    <span className="font-semibold">Dashboard</span>
                  </NavLink>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg hover:bg-red-500 hover:text-white transition-colors text-red-600 dark:text-red-400 font-semibold"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Desktop Login/Register Buttons
          <>
            <Link
              to="/login"
              className="btn btn-outline btn-error hover:bg-red-500 hover:border-red-500 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
