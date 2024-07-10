import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AddJobsPage from "./pages/AddJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import { jobLoader } from "./loaders/JobLoader";
import { addJob, updateJob, deleteJob } from "./actions/JobActions";
import FormDataProvider from "./contexts/FormDataContext";
import CsrfTokenProvider from "./contexts/CsrfTokenContext";
import AuthProvider from "./contexts/AuthContext";
import UserProvider from "./contexts/UserContext";
import Login from "./components/Login";
import Register from "./components/Register";
import BrowseJobs from "./components/BrowseJobs";
import AppliedJobs from "./components/AppliedJobs";
import AppliedProvider from "./contexts/AppliedContext";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<BrowseJobs isHome={false} />} />
      <Route
        path="/jobs/:slug"
        element={
          <AppliedProvider>
            <JobPage deleteJob={deleteJob} />
          </AppliedProvider>
        }
        loader={jobLoader}
      />
      <Route
        path="/edit-job/:slug"
        element={
          <FormDataProvider>
            <EditJobPage updateJobSubmit={updateJob} />
          </FormDataProvider>
        }
        loader={jobLoader}
      />
      <Route
        path="/add-job"
        element={
          <FormDataProvider>
            <AddJobsPage addJobSubmit={addJob} />
          </FormDataProvider>
        }
      />
      <Route
        path="/applied-jobs"
        element={
          <AppliedProvider>
            <AppliedJobs />
          </AppliedProvider>
        }
      />
      <Route path="/applicants" element={<DashboardPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <CsrfTokenProvider>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </CsrfTokenProvider>
  );
};

export default App;
