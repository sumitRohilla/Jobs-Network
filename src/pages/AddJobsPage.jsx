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

  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    addJobSubmit(formData, setLoading, setShowPopUp);

    navigate("/jobs");
  };

  return (
    <>
      <JobEntry
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddJobsPage;
