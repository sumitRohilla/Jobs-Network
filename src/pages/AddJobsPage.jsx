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

    // string to Array storing for Responsibilities
    if (formData.fullDesc.res) {
      const descRes = formData.fullDesc.res;

      let resArr = descRes
        .split("\n")
        .map((str) => str.replace(/[\s]+/g, " ").trim());

      updatedFormData = {
        ...updatedFormData,
        fullDesc: { ...updatedFormData.fullDesc, res: resArr },
      };
    }

    // string to Array storing for Requirements
    if (formData.fullDesc.require) {
      const descRequire = formData.fullDesc.require;

      let requireArr = descRequire
        .split("\n")
        .map((str) => str.replace(/[\s]+/g, " ").trim());

      updatedFormData = {
        ...updatedFormData,
        fullDesc: { ...updatedFormData.fullDesc, require: requireArr },
      };
    }

    // skills to filtered skills data
    if (formData.fullDesc.skills) {
      const descSkills = formData.fullDesc.skills;

      let skillsString = descSkills.replace(/\s*,\s*/g, ", ").trim();

      console.log(skillsString);

      updatedFormData = {
        ...updatedFormData,
        fullDesc: { ...updatedFormData.fullDesc, skills: skillsString },
      };
    }

    setFormData(updatedFormData);
    addJobSubmit(updatedFormData);

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
