import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Spinner from "../components/Spinners";

const BrowseJobs = ({ isHome = true }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { signal });

        if (!response.ok) {
          throw new Error(
            "Network Error while fetching data!! Status : " + response.status
          );
        }
        const data = await response.json();
        setJobs(data);
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
    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-mainLightColor px-4 py-10 grow">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-textColor mb-8 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
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
