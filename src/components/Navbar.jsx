import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const activeClass = ({ isActive }) =>
    isActive
      ? "bg-mainDarkColor px-2 py-3 rounded-lg hover:bg-gray-700"
      : "px-2 py-3 rounded-lg hover:bg-gray-700";

  const menuToggle = () => {
    const menuLinks = document.querySelector(".menu-links");
    menuLinks.classList.toggle("hidden");
  };

  return (
    <nav className="bg-mainLightColor">
      <div className="flex max-w-7xl h-20 items-center justify-between mx-auto text-textColor">
        <div className="flex space-x-5 ml-5 sm:ml-10">
          <img className="h-10 w-auto" src={logo} alt="logo" />
          <h1 className="my-auto">React Job Network</h1>
        </div>
        <div className="mr-8 md:hidden">
          <FaBars onClick={menuToggle} className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="menu-links flex flex-col space-x-5 mr-5 sm:mr-10 md:flex md:flex-row">
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={activeClass}>
            Jobs
          </NavLink>
          <NavLink to="/add-jobs" className={activeClass}>
            Add Jobs
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
