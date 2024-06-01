import React from "react";
import Card from "./Card";

const HomeCards = () => {
  return (
    <section className="py-4 bg-mainDarkColor">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-textColor">
          <Card
            title="For Developers"
            subTitle="Browse our React jobs and start your career today"
            buttonText="Browse Jobs"
          />
          <Card
            title="For Employers"
            subTitle="List your job to find the perfect developer for the role"
            buttonText="Add Jobs"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
