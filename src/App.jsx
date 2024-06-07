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
import AddJobs from "./pages/AddJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import jobLoader from "./loaders/JobLoader";

const App = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Add Job
  const addJob = async (formData, setLoading, setShowPopUp) => {
    try {
      setShowPopUp(true);
      const response = await fetch(`/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: signal,
      });

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
    } finally {
      setLoading(false);
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        signal: signal,
      });
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

  // Add Job
  const updateJob = async (formData, setLoading, setShowPopUp) => {
    try {
      setShowPopUp(true);
      const response = await fetch(`/api/jobs/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: signal,
      });

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
    } finally {
      setLoading(false);
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
        <Route path="/add-job" element={<AddJobs addJobSubmit={addJob} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
