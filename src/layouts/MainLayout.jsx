import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollTop from "../components/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const MainLayout = () => {
  return (
    <div id="main-container">
      <Navbar />
      <Outlet />
      <ScrollTop />
      <ToastContainer
        theme="dark"
        draggable
        closeOnClick
        draggablePercent={60}
      />
    </div>
  );
};

export default MainLayout;
