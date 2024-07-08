import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const jobLoader = async ({ params, request }) => {
  const url = `${apiUrl}/jobs/${params.slug}/`;
  const controller = new AbortController();

  request.signal.addEventListener("abort", () => controller.abort());

  try {
    const response = await toast.promise(
      fetch(url, { signal: controller.signal }),
      {
        pending: "Loading...",
      }
    );

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
