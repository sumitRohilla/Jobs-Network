import { NavLink, useLoaderData } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const JobPage = () => {
  const job = useLoaderData();

  return (
    <>
      <section className="bg-mainLightColor">
        <div className="container m-auto py-6 px-6">
          <NavLink
            to="/jobs"
            className="text-textColor hover:opacity-60 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Job Listings
          </NavLink>
        </div>
      </section>

      <section className="bg-mainLightColor">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main className="md:col-span-full xl:col-span-1">
              <div className=" bg-mainDarkColor text-textColor p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-center justify-center md:justify-start">
                  <FaLocationDot className="text-lg text-gray-500 mr-2" />
                  <p className="p-0 text-gray-500">{job.location}</p>
                </div>
              </div>

              <div className="bg-mainDarkColor text-textColor p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-buttonColor text-lg font-bold mb-4">
                  Job Description
                </h3>

                <p className="mb-6">{job.description}</p>

                <h3 className="text-buttonColor text-lg font-bold mb-4">
                  Job Responsibilities
                </h3>

                <ul className="pl-4 mb-6 list-disc space-y-2">
                  {job.fullDesc.res.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>

                <h3 className="text-buttonColor text-lg font-bold mb-4">
                  Job Requirement
                </h3>

                <ul className="pl-4 mb-6 list-disc space-y-2">
                  {job.fullDesc.require.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>

                <h3 className="text-buttonColor text-lg font-bold mb-4">
                  Skills Required
                </h3>

                <p className="mb-6">{job.fullDesc.skills.join(", ")}</p>

                <h3 className="text-buttonColor text-lg font-bold mb-4">
                  Salary
                </h3>

                <p className="mb-4">{job.salary}</p>
              </div>
            </main>

            <aside className="md:col-start-1 md:col-span-2 xl:col-start-2">
              <div className="flex flex-col md:flex-row xl:flex-col bg-mainDarkColor text-textColor p-6 rounded-lg shadow-md">
                <div className="md:pr-8 xl:pr-0 min-w-72">
                  <h3 className="text-xl font-bold mb-6">Company Info</h3>

                  <h2 className="text-buttonColor text-2xl">
                    {job.company.name}
                  </h2>

                  <p className="my-2">{job.company.description}</p>
                </div>

                <div className="min-w-72 mt-8">
                  <h3 className="text-xl">Contact Email:</h3>

                  <p className="my-2 bg-gray-700 text-textColor p-2 font-bold rounded-lg break-all">
                    {job.company.contactEmail}
                  </p>

                  <h3 className="text-xl">Contact Phone:</h3>

                  <p className="my-2 bg-gray-700 text-textColor p-2 rounded-lg font-bold">
                    {job.company.contactPhone}
                  </p>
                </div>
              </div>

              <div className="bg-mainDarkColor text-textColor p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <a
                  href="/add-job.html"
                  className="buttonStyle text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </a>
                <button className="buttonStyle font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params, request }) => {
  const apiUrl = `/api/jobs/${params.id}`;
  const controller = new AbortController();

  request.signal.addEventListener("abort", () => controller.abort());

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(
        "Network Error while fetching data!! Status : " + response.status
      );
    }
    const data = await response.json();

    return data;
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborting Request!!");
    } else {
      console.error(e);
    }
  }
};

export { JobPage as default, jobLoader };
