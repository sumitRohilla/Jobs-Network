import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollTop from "../components/ScrollTop";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollTop />
    </>
  );
};

export default MainLayout;
