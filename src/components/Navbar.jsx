import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const navActive = ({ isActive }) =>
    isActive
      ? "bg-buttonColor text-mainDarkColor px-2 py-3 rounded-lg hover:bg-gray-700 hover:text-textColor"
      : "px-2 py-3 rounded-lg hover:bg-gray-700";

  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const menuLinks = document.querySelector(".menu-links");
    const menuOpen = document.querySelector(".menu-open");
    const menuClose = document.querySelector(".menu-close");

    if (menuLinks && menuOpen && menuClose) {
      menuLinks.classList.toggle("hidden", !isOpen);
      menuOpen.classList.toggle("hidden", !isOpen);
      menuClose.classList.toggle("hidden", isOpen);
    }
  }, [isOpen]);

  return (
    <nav className="bg-mainLightColor sticky top-0 z-10">
      <div className="flex max-w-7xl h-20 items-center justify-between mx-auto text-textColor">
        <Link to={"/"} className="flex space-x-5 ml-5 sm:ml-10">
          <img className="h-10 w-auto" src={logo} alt="logo" />
          <h1 className="my-auto">Jobs Network</h1>
        </Link>
        <div className="mr-8 menu-close lg:hidden">
          <FaBars
            onClick={() => setIsOpen(true)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <div className="mr-8 menu-open hidden lg:hidden">
          <FaTimes
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="menu-links flex flex-col hidden bg-opacity-95 mr-5 sm:mr-10 bg-zinc-900 space-y-5 lg:space-x-5 lg:space-y-0 lg:static lg:bg-transparent lg:flex lg:flex-row">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={navActive}
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setIsOpen(false)}
            className={navActive}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/add-job"
            onClick={() => setIsOpen(false)}
            className={navActive}
          >
            Add Jobs
          </NavLink>
          <NavLink
            to="/applied-jobs"
            onClick={() => setIsOpen(false)}
            className={navActive}
          >
            Applied Jobs
          </NavLink>
          <NavLink
            to="/applicants"
            onClick={() => setIsOpen(false)}
            className={navActive}
          >
            Job Applicants
          </NavLink>
          {isLoggedIn ? (
            <NavLink
              onClick={() => logout(navigate, setIsOpen)}
              className={navActive}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={navActive}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
