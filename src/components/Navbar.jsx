import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-mainLightColor">
      <div className="flex max-w-7xl h-20 items-center justify-between mx-auto text-textColor">
        <div className="flex space-x-5 ml-5 sm:ml-10">
          <img className="h-10 w-auto" src={logo} alt="logo" />
          <h1 className="my-auto">React Jobs</h1>
        </div>
        <div className="link flex space-x-5 mr-5 sm:mr-10">
          <Link
            to="/"
            className="px-2 py-3 rounded-lg bg-mainDarkColor hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="px-2 py-3 rounded-lg bg-mainLightColor hover:bg-gray-700"
          >
            Jobs
          </Link>
          <Link
            to="/add-jobs"
            className="px-2 py-3 rounded-lg bg-mainLightColor hover:bg-gray-700"
          >
            Add Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
