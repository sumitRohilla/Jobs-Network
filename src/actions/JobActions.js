import { toast } from "react-toastify";

const controller = new AbortController();
const signal = controller.signal;

const apiUrl = import.meta.env.VITE_API_URL;

// Add Job
export const addJob = async (formData, getCsrfToken) => {
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
      throw new Error(error.message || "Unknown error occured");
    }
    toast.success("Job Published Successfully ! 👌");
    return true;
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
export const deleteJob = async (slug, getCsrfToken) => {
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
    return true;
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
export const updateJob = async (formData, getCsrfToken) => {
  try {
    console.log(formData);
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
    return true;
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborting Request!!");
    } else {
      toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
      console.error(e);
    }
  }
};
