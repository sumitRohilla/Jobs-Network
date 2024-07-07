import { useEffect, createContext } from "react";
import { getCookie } from "../utils/getCookie";

const CsrfContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

const CsrfTokenProvider = ({ children }) => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCsrfToken = async () => {
      try {
        const token = getCookie("csrftoken");
        if (!token && token !== "") {
          const response = await fetch(`${apiUrl}/csrf-token/`, {
            signal: signal,
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Error fetching CSRF token");
          }
        }
      } catch (e) {
        if (e.name == "AbortError") {
          console.log("Abort Error!");
        } else {
          console.error(e);
        }
      }
    };
    fetchCsrfToken();

    return () => controller.abort();
  }, []);

  return (
    <CsrfContext.Provider
      value={{ getCsrfToken: () => getCookie("csrftoken") }}
    >
      {children}
    </CsrfContext.Provider>
  );
};

export { CsrfContext, CsrfTokenProvider as default };
