import { createContext, useContext, useEffect, useState } from "react";
import { CsrfContext } from "./CsrfTokenContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppliedContext = createContext();

const AppliedProvider = ({ children }) => {
  const { getCsrfToken } = useContext(CsrfContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedSlugs, setAppliedSlugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const controller = new AbortController();
  const signal = controller.signal;
  const apiUrl = import.meta.env.VITE_API_URL;

  // applied get call

  const getApplied = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/applied-job/`, {
        credentials: "include",
        signal: signal,
      });

      if (!response.ok) {
        throw new Error(
          "Network Error while fetching Jobs!! Status : " + response.status
        );
      }
      const data = await response.json();

      setAppliedJobs(data);
      setAppliedSlugs(data.map((job) => job.slug));
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  // applied post call
  const postApplied = async (slug) => {
    try {
      const response = await fetch(`${apiUrl}/applied-job/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({ slug: slug }),
        credentials: "include",
        signal: signal,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unknown error occured");
      }
      toast.success("Job Applied Successfully ! 👌");
      navigate("/jobs");
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
        console.error(e);
      }
    }
  };

  // applied delete call
  const withdrawApplied = async (slug) => {
    try {
      const response = await fetch(`${apiUrl}/applied-job/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({ slug: slug }),
        credentials: "include",
        signal: signal,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unknown error occured");
      }
      toast.success("Job Withdrawn Successfully ! 👌");
      navigate("/jobs");
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
        console.error(e);
      }
    }
  };

  return (
    <AppliedContext.Provider
      value={{
        loading,
        appliedJobs,
        appliedSlugs,
        getApplied,
        postApplied,
        withdrawApplied,
      }}
    >
      {children}
    </AppliedContext.Provider>
  );
};

export { AppliedContext, AppliedProvider as default };
