import React from "react";

const Hero = () => {
  return (
    <section className="bg-mainLightColor py-32">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4">
        <div className="text-center text-textColor">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Become a Web Developer
          </h1>
          <p className="my-4 text-xl">
            Find the Developer job that fits your skills and needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
