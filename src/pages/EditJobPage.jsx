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

  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  // on submitting form with detailss
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateJobSubmit(formData, setLoading, setShowPopUp);

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
