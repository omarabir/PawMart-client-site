import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PetSupplies from "../Pages/PetSupplies";
import AddListing from "../Pages/AddListing";
import PrivateRoute from "./PrivateRoute";
import MyListings from "../Pages/MyListing";
import ListingDetails from "../Pages/ListingDetails";
import MyOrders from "../Pages/MyOrders";

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
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails></ListingDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/listings/${params.id}`),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/listings"),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
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
