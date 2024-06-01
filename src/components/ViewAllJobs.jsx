import React from "react";
import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <section className="bg-mainDarkColor ">
      <div className="m-auto max-w-lg py-10 px-6">
        <Link
          to="/jobs"
          className="block bg-buttonColor text-mainDarkColor text-center py-4 px-6 rounded-xl hover:bg-gray-700 hover:text-textColor"
        >
          View All Jobs
        </Link>
      </div>
    </section>
  );
};

export default ViewAllJobs;
