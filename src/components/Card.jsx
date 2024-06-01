import React from "react";

const Card = ({ title, subTitle, buttonText }) => {
  return (
    <div className="bg-mainLightColor bg-opacity-40 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{subTitle}</p>
      <a
        href="/jobs.html"
        className="inline-block bg-buttonColor text-mainDarkColor rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-textColor"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default Card;
