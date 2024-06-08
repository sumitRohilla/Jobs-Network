import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobsPage from "./pages/AddJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import jobLoader from "./loaders/JobLoader";
import { toast } from "react-toastify";

const App = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Add Job
  const addJob = async (formData) => {
    try {
      const response = await toast.promise(
        fetch("/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          signal: signal,
        }),
        {
          pending: "Publishing Job...",
          success: "Job Published Successfully ! 👌",
          error: "Error occured ! 🤯",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Network Error while fetching data!! Status : " + response.status
        );
      }
      return;
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        console.error(e);
      }
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const response = await toast.promise(
        fetch(`/api/jobs/${id}`, {
          method: "DELETE",
          signal: signal,
        }),
        {
          pending: "Deleting Job...",
          success: "Job Deleted Successfully ! 👌",
          error: "Error occured ! 🤯",
        }
      );
      if (!response.ok) {
        throw new Error(
          "Network Error while fetching data!! Status : " + response.status
        );
      }
      return;
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        console.error(e);
      }
    }
  };

  // Update Job
  const updateJob = async (formData) => {
    try {
      const response = await toast.promise(
        fetch(`/api/jobs/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          signal: signal,
        }),
        {
          pending: "Updating Job...",
          success: "Job Updated Successfully ! 👌",
          error: "Error occured ! 🤯",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Network Error while fetching data!! Status : " + response.status
        );
      }
      return;
    } catch (e) {
      if (e.name == "AbortError") {
        console.log("Aborting Request!!");
      } else {
        console.error(e);
      }
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/add-job"
          element={<AddJobsPage addJobSubmit={addJob} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
