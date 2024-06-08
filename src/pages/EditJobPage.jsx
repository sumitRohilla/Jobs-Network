import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import JobEntry from "../components/JobEntry";

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id,
    type: job.type,
    title: job.title,
    location: job.location,
    description: job.description,
    fullDesc: {
      res: job.fullDesc.res,
      require: job.fullDesc.require,
      skills: job.fullDesc.skills,
    },
    salary: job.salary,
    company: {
      name: job.company.name,
      description: job.company.description,
      contactEmail: job.company.contactEmail,
      contactPhone: job.company.contactPhone,
    },
  });

  // on submitting form with detailss
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
    updateJobSubmit(updatedFormData);

    navigate("/jobs");
  };

  return (
    <>
      <JobEntry
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isEditPage={true}
      />
    </>
  );
};

export default EditJobPage;
