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
import CategoryFilteredProduct from "../Pages/CategoryFilteredProduct";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Pages/Dashboard";
import DashboardHome from "../Pages/DashboardHome";
import Profile from "../Pages/Profile";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/pets-and-supplies",
        loader: () =>
          fetch("https://pawmart-server-weld-nu.vercel.app/listings"),
        element: <PetSupplies></PetSupplies>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "add-listing",
            loader: () =>
              fetch("https://pawmart-server-weld-nu.vercel.app/listings"),
            element: <AddListing />,
          },
          {
            path: "my-listings",
            element: <MyListings />,
            loader: () =>
              fetch("https://pawmart-server-weld-nu.vercel.app/listings"),
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/listing-details/:id",
        element: <ListingDetails></ListingDetails>,
        loader: ({ params }) =>
          fetch(
            `https://pawmart-server-weld-nu.vercel.app/listings/${params.id}`
          ),
      },
      {
        path: "/category/:categoryName",
        element: <CategoryFilteredProduct></CategoryFilteredProduct>,
        loader: ({ params }) =>
          fetch(
            `https://pawmart-server-weld-nu.vercel.app/listings?category=${params.categoryName}`
          ),
      },
      { path: "/about", element: <About /> },
      {
        path: "/contact",
        element: <Contact />,
      },
      { path: "/about", element: <About /> },
      {
        path: "/contact",
        element: <Contact />,
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
