import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobEntry from "../components/JobEntry";
import { formatFullDesc } from "../utils/formatFullDesc";
import { useFormDataContext } from "../contexts/FormDataContext";
import { CsrfContext } from "../contexts/CsrfTokenContext";

const AddJobsPage = ({ addJobSubmit }) => {
  // state with add job data
  const { formData, setFormData } = useFormDataContext();
  const { getCsrfToken } = useContext(CsrfContext);
  const navigate = useNavigate();

  // handle for Add page form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFullDesc = formatFullDesc(formData.fullDesc);
    const updatedFormData = { ...formData, fullDesc: updatedFullDesc };

    setFormData(updatedFormData);
    addJobSubmit(updatedFormData, getCsrfToken, navigate);
  };

  return (
    <>
      <JobEntry handleSubmit={handleSubmit} />
    </>
  );
};

export default AddJobsPage;
