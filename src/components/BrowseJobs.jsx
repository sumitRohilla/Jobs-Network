import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Spinners from "../pages/Spinners";

const BrowseJobs = ({ isHome = true }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const controller = new AbortController();

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

      try {
        const response = await fetch(apiUrl, controller.signal);
        const jsonData = await response.json();
        setJobs(jsonData);
      } catch (e) {
        console.log("Error while Fetching Data!!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();

    return () => controller.abort();
  }, []);

  const al = document.querySelector(".menu-links");
  console.log(al);

  return (
    <section className="bg-mainLightColor px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-textColor mb-8 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinners loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseJobs;
