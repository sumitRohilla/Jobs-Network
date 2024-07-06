import { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import Spinner from "./Spinners";
import { AuthContext } from "../contexts/AuthContext";
import { AppliedContext } from "../contexts/AppliedContext";

const AppliedJobs = () => {
  const { getApplied, appliedJobs, loading } = useContext(AppliedContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getApplied();
  }, []);

  return (
    <section className="bg-mainLightColor px-4 py-10 grow">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <h2 className="text-3xl font-bold text-textColor mb-8 text-center">
              {!isLoggedIn
                ? "Login to View Applied Jobs"
                : appliedJobs.length == 0
                ? "No Jobs Applied"
                : "Jobs Applied by You"}
            </h2>
            <div className="grid grid-cols-1 mb-8 md:grid-cols-3 gap-6">
              {appliedJobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AppliedJobs;
