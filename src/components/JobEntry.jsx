import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/ReactToastify.css";

const JobEntry = ({
  formData,
  setFormData,
  handleSubmit,
  isEditPage = false,
}) => {
  //Function to Update formData state
  const handleFormUpdate = (e, prop, subProp = null) => {
    const value = subProp
      ? { ...formData[prop], [subProp]: e.target.value }
      : e.target.value;

    setFormData({ ...formData, [prop]: value });
  };

  const [jobType, setJobType] = useState("Full-Time");

  useEffect(() => {
    const selected = document.querySelectorAll(".job-type");

    for (let i = 0; i < selected.length; i++) {
      if (selected[i].value === jobType) {
        selected[i].classList.remove("bg-gray-700", "text-textColor");
        selected[i].classList.add("bg-buttonColor", "text-mainDarkColor");
      } else {
        selected[i].classList.remove("bg-buttonColor", "text-mainDarkColor");
        selected[i].classList.add("bg-gray-700", "text-textColor");
      }
    }

    // Formatting
    let updatedFormData = { ...formData };

    updatedFormData = {
      ...updatedFormData,
      fullDesc: {
        ...updatedFormData.fullDesc,
        res: updatedFormData.fullDesc.res.join("\n"),
      },
    };

    updatedFormData = {
      ...updatedFormData,
      fullDesc: {
        ...updatedFormData.fullDesc,
        require: updatedFormData.fullDesc.require.join("\n"),
      },
    };

    setFormData(updatedFormData);
    console.log(formData.fullDesc.res, formData.fullDesc.require);
  }, [jobType]);

  return (
    <>
      <section className="bg-mainLightColor">
        <div className="flex justify-between container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-textColor hover:opacity-60 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jobs
          </Link>
          <button
            onClick={() => document.getElementById("jobForm").requestSubmit()}
            className="buttonStyle px-3 py-2 rounded-lg"
          >
            {isEditPage ? "Update Job" : "Publish Job"}
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
              <h2 className="text-3xl mb-8 text-textColor font-bold md:text-4xl">
                Job Details
              </h2>

              <div className="mb-4">
                <label className="block text-buttonColor text-sm font-bold mb-4">
                  What Kind of Job is This?
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleFormUpdate(e, "title")}
                  className="border-b-2 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  placeholder="React Developer"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Job Type
                </label>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="button"
                    value="Full-Time"
                    className="job-type p-4 cursor-pointer rounded-lg"
                    onClick={(e) => (
                      setJobType(e.target.value), handleFormUpdate(e, "type")
                    )}
                  />
                  <input
                    type="button"
                    value="Part-Time"
                    className="job-type p-4 cursor-pointer rounded-lg"
                    onClick={(e) => (
                      setJobType(e.target.value), handleFormUpdate(e, "type")
                    )}
                  />
                  <input
                    type="button"
                    value="Remote"
                    className="job-type p-4 cursor-pointer rounded-lg"
                    onClick={(e) => (
                      setJobType(e.target.value), handleFormUpdate(e, "type")
                    )}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleFormUpdate(e, "description")}
                  className="border-2 text-sm rounded-lg w-full py-2 px-3 bg-mainDarkColor text-textColor focus:border-buttonColor focus:outline-none"
                  rows="5"
                  placeholder="Add Description"
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="responsibilities"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Job Responsibilities
                </label>
                <textarea
                  value={formData.fullDesc.res}
                  onChange={(e) => handleFormUpdate(e, "fullDesc", "res")}
                  className="border-2 text-sm rounded-lg w-full py-2 px-3 bg-mainDarkColor text-textColor focus:border-buttonColor focus:outline-none"
                  rows="4"
                  placeholder="Designing user interactions on web pages.&#10;Designing and implementing RESTful APIs"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="requirements"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Job Requirements
                </label>
                <textarea
                  value={formData.fullDesc.require}
                  onChange={(e) => handleFormUpdate(e, "fullDesc", "require")}
                  className="border-2 text-sm rounded-lg w-full py-2 px-3 bg-mainDarkColor text-textColor focus:border-buttonColor focus:outline-none"
                  rows="5"
                  placeholder="3+ years of experience in backend development.&#10;Bachelor's degree in Computer Science or related field."
                ></textarea>
              </div>
            </div>
            <div className="basis-2/5 border-red py-4">
              <h2 className="text-3xl mb-8 text-textColor font-bold md:text-4xl">
                Company Info
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company.name}
                  onChange={(e) => handleFormUpdate(e, "company", "name")}
                  className="border-b-2 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  placeholder="Company Name"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="company_description"
                  className="block text-buttonColor text-sm font-bold mb-4"
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
                  className="border-2 rounded-lg text-sm w-full py-2 px-3 bg-mainDarkColor text-textColor focus:border-buttonColor focus:outline-none"
                  rows="5"
                  placeholder="About Company"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact_email"
                  className="block text-buttonColor text-sm font-bold mb-4"
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
                  className="border-b-2 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  placeholder="email@email.com"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact_phone"
                  className="block text-buttonColor text-sm font-bold mb-4"
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
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  onInput={(e) => e.target.setCustomValidity("")}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Enter 10 digit phone number!! (555-555-5555)"
                    )
                  }
                  autoComplete="off"
                  className="border-b-2 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  placeholder="Optional Phone Number"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="skills"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Skills Required
                </label>
                <input
                  value={formData.fullDesc.skills}
                  onChange={(e) => handleFormUpdate(e, "fullDesc", "skills")}
                  className="border-b-2 text-sm w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  rows="4"
                  placeholder="React.js, Tailwind"
                  autoComplete="off"
                  required
                ></input>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-buttonColor text-sm font-bold mb-4"
                >
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={(e) => handleFormUpdate(e, "salary")}
                  className="border rounded w-full py-2 px-3 bg-mainDarkColor text-textColor focus:border-buttonColor"
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
                <label className="block text-buttonColor text-sm font-bold mb-4">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleFormUpdate(e, "location")}
                  className="border-b-2 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
                  placeholder="Company Location"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default JobEntry;
