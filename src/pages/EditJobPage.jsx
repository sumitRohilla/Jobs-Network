import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import JobEntry from "../components/JobEntry";
import { formatFullDesc } from "../utils/formatFullDesc";
import { useFormDataContext } from "../contexts/FormDataContext";
import { useContext, useEffect } from "react";
import { CsrfContext } from "../contexts/CsrfTokenContext";

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { formData, setFormData } = useFormDataContext();
  const { getCsrfToken } = useContext(CsrfContext);

  useEffect(() => {
    setFormData({
      slug: slug,
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
  }, [setFormData]);

  // on submitting form with detailss
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFullDesc = formatFullDesc(formData.fullDesc);
    const updatedFormData = { ...formData, fullDesc: updatedFullDesc };

    setFormData(updatedFormData);
    updateJobSubmit(updatedFormData, getCsrfToken, navigate);
  };

  return (
    <>
      <JobEntry handleSubmit={handleSubmit} isEditPage={true} />
    </>
  );
};

export default EditJobPage;
