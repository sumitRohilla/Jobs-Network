import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-mainDarkColor h-screen">
      <div className="pt-12 text-textColor flex flex-col items-center">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-4 sm:text-6xl">404 Not Found</h1>
        <p className="text-sm mb-5 sm:text-xl">This page does not exist</p>
        <Link
          to="/"
          className="bg-buttonColor text-mainDarkColor rounded-md px-3 py-2 mt-4 hover:bg-gray-700 hover:text-textColor"
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
