import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
