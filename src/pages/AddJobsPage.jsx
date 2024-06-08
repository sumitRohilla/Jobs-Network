import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobEntry from "../components/JobEntry";

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
      skills: "",
    },
    salary: "Under ₹5L",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

    if (formData.fullDesc.res) {
      const desc = formData.fullDesc.res;

      let descArr = desc
        .split("\n")
        .map((str) => str.replace(/[\s]+/g, " ").trim());

      updatedFormData = {
        ...updatedFormData,
        fullDesc: { ...updatedFormData.fullDesc, res: descArr },
      };
    }
    setFormData(updatedFormData);

    addJobSubmit(updatedFormData, setLoading, setShowPopUp);

    navigate("/jobs");
  };

  return (
    <>
      <JobEntry
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddJobsPage;
