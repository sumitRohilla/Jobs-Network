import { React, useState } from "react";
import { FaMapMarker } from "react-icons/fa";

const JobCard = ({ job }) => {
  const [fullDescState, setFullDescState] = useState(false);
  let desc = job.description;

  if (!fullDescState) {
    desc = desc.substring(0, 100).trim() + "...";
  }

  return (
    <div className="bg-mainDarkColor text-textColor rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-textColor text-opacity-40 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">{desc}</div>

        <button
          onClick={() => setFullDescState((prevState) => !prevState)}
          className="text-buttonColor mb-5"
        >
          {fullDescState ? "Less" : "More"}
        </button>

        <h3 className="text-textColor text-opacity-80 mb-2">{job.salary}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col text-textColor text-opacity-80 lg:flex-row justify-between mb-4">
          <div className="flex mb-3">
            <FaMapMarker className="self-center text-lg self-center mr-1" />
            {job.location}
          </div>
          <a
            href={`/job/${job.id}`}
            className="h-[36px] bg-buttonColor text-mainDarkColor px-4 py-2 rounded-lg text-center text-sm hover:bg-gray-700 hover:text-textColor"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
