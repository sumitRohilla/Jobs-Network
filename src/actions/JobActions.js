import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const controller = new AbortController();
const signal = controller.signal;

const apiUrl = import.meta.env.VITE_API_URL;

// Add Job
export const addJob = async (formData, getCsrfToken, navigate) => {
  try {
    const response = await toast.promise(
      fetch(`${apiUrl}/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(formData),
        credentials: "include",
        signal: signal,
      }),
      {
        pending: "Publishing Job...",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 400 && error) {
        Object.entries(error).forEach(([field, errors]) => {
          errors.forEach((e) => {
            toast.error(`${e}`);
          });
        });
        return;
      } else throw new Error(error.message || "Unknown error occured");
    }
    toast.success("Job Published Successfully ! 👌");
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

// Delete Job
export const deleteJob = async (slug, getCsrfToken, navigate) => {
  try {
    const response = await toast.promise(
      fetch(`${apiUrl}/jobs/${slug}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
        signal: signal,
      }),
      {
        pending: "Deleting Job...",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unknown error occured");
    }
    toast.success("Job Deleted Successfully ! 👌");
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

// Update Job
export const updateJob = async (formData, getCsrfToken, navigate) => {
  try {
    const response = await toast.promise(
      fetch(`${apiUrl}/jobs/${formData.slug}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(formData),
        credentials: "include",
        signal: signal,
      }),
      {
        pending: "Updating Job...",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unknown error occured");
    }
    toast.success("Job Updated Successfully ! 👌");
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
