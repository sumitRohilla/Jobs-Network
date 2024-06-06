import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PopUp from "../components/PopUp";

const AddJobsPage = ({ addJobSubmit }) => {
  // state with add job data
  const [formData, setFormData] = useState({
    type: "Full-Time",
    title: "",
    location: "",
    description: "",
    fullDesc: {
      res: [],
      require: [],
      skills: [],
    },
    salary: "Under ₹5L",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  //Function to Update formData state
  const handleFormUpdate = (e, prop, subProp = null) => {
    const value = subProp
      ? { ...formData[prop], [subProp]: e.target.value }
      : e.target.value;
    setFormData({ ...formData, [prop]: value });
  };

  // on submitting form with details
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    addJobSubmit(formData, setLoading, setShowPopUp);
  };

  return (
    <>
      <PopUp
        loading={loading}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      />
      <section className="bg-mainLightColor">
        <div className="flex justify-between container m-auto py-6 px-6">
          <NavLink
            to="/jobs"
            className="text-textColor hover:opacity-60 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jobs
          </NavLink>
          <button
            onClick={() => document.getElementById("jobForm").requestSubmit()}
            className="buttonStyle px-3 py-2 rounded-lg"
          >
            Publish Job
          </button>
        </div>
      </section>
      <section className="bg-mainLightColor">
        <div className="container mx-auto py-10 px-6">
          <form
            id="jobForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:flex-row"
          >
            <div className="basis-3/5 flex flex-col py-4">
              <h2 className="text-3xl mb-6 text-textColor font-bold md:text-4xl">
                Job Details
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  What Kind of Job is This?
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleFormUpdate(e, "title")}
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={(e) => handleFormUpdate(e, "type")}
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleFormUpdate(e, "description")}
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={(e) => handleFormUpdate(e, "salary")}
                  className="border rounded w-full py-2 px-3"
                  required
                >
                  <option value="Under ₹5L">Under ₹5L</option>
                  <option value="₹5L - ₹8L">₹5L - ₹8L</option>
                  <option value="₹8L - ₹10L">₹8L - ₹10L</option>
                  <option value="₹10L - ₹12L">₹10L - ₹12L</option>
                  <option value="₹12L - ₹15L">₹12L - ₹15L</option>
                  <option value="₹15L - ₹18L">₹15L - ₹18L</option>
                  <option value="₹18L - ₹20L">₹18L - ₹20L</option>
                  <option value="₹20L - ₹25L">₹20L - ₹25L</option>
                  <option value="₹25L - ₹30L">₹25L - ₹30L</option>
                  <option value="₹30L - ₹35L">₹30L - ₹35L</option>
                  <option value="Over ₹35L">Over ₹50L</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                />
              </div>
            </div>
            <div className="basis-2/5 border-red py-4">
              <h2 className="text-3xl mb-6 text-textColor font-bold md:text-4xl">
                Company Info
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company.name}
                  onChange={(e) => handleFormUpdate(e, "company", "name")}
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company_description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  value={formData.company.description}
                  onChange={(e) =>
                    handleFormUpdate(e, "company", "description")
                  }
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="What does your company do?"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.company.contactEmail}
                  onChange={(e) =>
                    handleFormUpdate(e, "company", "contactEmail")
                  }
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.company.contactPhone}
                  onChange={(e) =>
                    handleFormUpdate(e, "company", "contactPhone")
                  }
                  pattern="[0-9]{10}"
                  onInput={(e) => e.target.setCustomValidity("")}
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Enter 10 digit phone number!!")
                  }
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddJobsPage;
