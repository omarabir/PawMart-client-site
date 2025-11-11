import React, { useContext } from "react";
import { BiMoon } from "react-icons/bi";
import { PiSun } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pets-and-supplies"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pets & Supplies
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-listing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-listings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const authLinks = (
    <>
      <li>
        <Link to="/login" className="btn btn-outline btn-primary ">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="btn btn-primary  mt-2">
          Register
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50 mb-10">
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
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {authLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-bold text-primary"
        >
          PawMart
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" />
          <PiSun className="swap-on fill-current w-5 h-5" />
          <BiMoon className="swap-off fill-current w-5 h-5" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`
                  }
                  alt="User avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="p-2 font-semibold">
                {user.displayName || "Profile"}
              </li>
              <li>
                <button className="btn btn-ghost justify-start">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-outline btn-primary hidden sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary hidden sm:inline-flex"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
