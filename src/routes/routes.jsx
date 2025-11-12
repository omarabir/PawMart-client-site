import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PetSupplies from "../Pages/PetSupplies";
import AddListing from "../Pages/AddListing";
import PrivateRoute from "./PrivateRoute";
import MyListings from "../Pages/MyListing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/pets-and-supplies",
        loader: () => fetch("http://localhost:3000/listings"),
        element: <PetSupplies></PetSupplies>,
      },
      {
        path: "/add-listing",
        loader: () => fetch("http://localhost:3000/listings"),
        element: (
          <PrivateRoute>
            <AddListing></AddListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
