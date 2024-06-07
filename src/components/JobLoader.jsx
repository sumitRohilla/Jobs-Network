import React from "react";

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
    console.log(data);

    return data;
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborting Request!!");
    } else {
      console.error(e);
    }
  }
};

export default jobLoader;
