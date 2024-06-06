import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, subTitle, buttonText, link }) => {
  return (
    <div className="bg-mainLightColor bg-opacity-40 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{subTitle}</p>
      <Link
        to={link}
        className="inline-block buttonStyle rounded-lg px-4 py-2 "
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default Card;
