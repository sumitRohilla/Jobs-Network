import React, { useState, useEffect, useContext } from "react";
import Spinners from "../components/Spinners";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;

  const { isLoggedIn } = useContext(AuthContext);

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchAppliers = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}/applier/`, {
            credentials: "include",
            signal: signal,
          });

          if (!response.ok) {
            throw new Error(
              "Network Error while fetching data!! Status : " + response.status
            );
          }
          const data = await response.json();

          setJobData(data);
        } catch (e) {
          if (e.name === "AbortError") {
            console.log("Aborting Request!!");
          } else {
            console.error(e);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchAppliers();
    }

    return () => controller.abort();
  }, []);

  return (
    <section className="bg-mainLightColor px-4 py-10 grow">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinners loading={loading} />
        ) : (
          <>
            <h2 className="text-xl md:text-3xl mb-16 font-bold text-textColor mb-8 text-center">
              {!isLoggedIn
                ? "Login to View Created Jobs"
                : Object.keys(jobData).length === 0
                ? "No Jobs Created by You"
                : "Jobs Created by You"}
            </h2>
            {Object.entries(jobData).map(([slug, { users, title }]) => (
              <div
                key={slug}
                className="mt-12 rounded-xl mx-auto bg-mainDarkColor w-full p-10, md:max-w-[1024px]"
              >
                <div className="p-4">
                  <div className="flex justify-between container m-auto p-6 md:py-6 md:pl-6">
                    <h2 className="text-textColor text-lg mr-2 flex items-center">
                      {title}
                    </h2>
                    <Link
                      className="buttonStyle px-6 py-3 rounded-lg text-center text-sm"
                      to={`/jobs/${slug}`}
                    >
                      View Job
                    </Link>
                  </div>
                  <div className="flex flex-wrap mb-6">
                    {users.length !== 0 ? (
                      users.map(({ username, email }) => (
                        <div
                          key={username}
                          className="w-fit m-3 bg-mainLightColor text-textColor p-4 rounded-xl"
                        >
                          <h2 className="mb-2">
                            <strong className="text-buttonColor">
                              Username
                            </strong>
                            : {username}
                          </h2>
                          <h2>
                            <strong className="text-buttonColor">Email</strong>:{" "}
                            {email}
                          </h2>
                        </div>
                      ))
                    ) : (
                      <h2 className="mx-auto text-textColor text-xl">
                        No User applied for this Job
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
