import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import BrowseJobs from "../components/BrowseJobs";
import ViewAllJobs from "../components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <BrowseJobs />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
