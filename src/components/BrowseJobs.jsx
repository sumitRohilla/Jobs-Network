import { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import Spinner from "../components/Spinners";
import { AuthContext } from "../contexts/AuthContext";

const BrowseJobs = ({ isHome = true }) => {
  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useContext(AuthContext);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const endPoint = isHome
      ? "/jobs/?_limit=3"
      : isLoggedIn
      ? "/user-jobs/"
      : "/jobs/";

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${endPoint}`, {
          signal: signal,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            "Network Error while fetching data!! Status : " + response.status
          );
        }
        const data = await response.json();

        if (!isHome && isLoggedIn) {
          setUserJobs(data.user_jobs);
          setJobs(data.jobs);
        } else {
          setJobs(data);
        }
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
  }, [isLoggedIn]);

  return (
    <section className="bg-mainLightColor px-4 py-10 grow">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {!isHome && userJobs.length !== 0 ? (
              <>
                <h2 className="text-3xl font-bold text-textColor mb-8 text-center">
                  Jobs Created by You
                </h2>
                <div className="grid grid-cols-1 mb-8 md:grid-cols-3 gap-6">
                  {userJobs.map((job) => (
                    <JobCard key={job.slug} job={job} />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
            <h2 className="text-3xl font-bold text-textColor mb-8 text-center">
              {isHome ? "Recent Jobs" : "Browser Jobs"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BrowseJobs;
