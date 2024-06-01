import React from "react";
import jobs from "../assets/json/jobs.json";
import JobCard from "./JobCard";

const BrowseJobs = () => {
  const recentJobs = jobs.slice(0, 3);

  return (
    <section className="bg-mainLightColor px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-textColor mb-6 text-center">
          Browse Jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseJobs;
