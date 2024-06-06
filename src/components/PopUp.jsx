import { useState, useEffect } from "react";
import Spinners from "./Spinners";
import { NavLink, useNavigate } from "react-router-dom";

const PopUp = ({ loading, showPopUp, setShowPopUp }) => {
  const navigate = useNavigate();
  const [allowNavigate, setAllowNavigate] = useState(false);

  useEffect(() => {
    const pop = document.querySelector(".post-popup");
    const mainContainer = document.getElementById("main-container");

    if (mainContainer && pop) {
      mainContainer.classList.toggle("overflow-hidden", showPopUp);
      mainContainer.classList.toggle("h-screen", showPopUp);
      pop.classList.toggle("hidden", !showPopUp);
    }
    if (allowNavigate) return navigate("/jobs");
  }, [showPopUp]);

  console.log(showPopUp);

  return (
    <section className="absolute top-0 h-screen w-full overflow-y-auto post-popup hidden">
      <div className="h-full absolute top-0 w-full backdrop-blur-sm">
        {loading ? (
          <Spinners loading={loading} />
        ) : (
          <div className="flex flex-col space-y-4 bg-mainDarkColor absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-8 rounded-lg">
            <h2 className="text-textColor py-4">Job Published!!</h2>
            <NavLink
              onClick={() => (setShowPopUp(false), setAllowNavigate(true))}
              className="mx-auto"
            >
              <button className=" buttonStyle px-5 py-2 rounded-lg">OK</button>
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopUp;
