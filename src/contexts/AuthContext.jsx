import { createContext, useContext, useEffect, useState } from "react";
import { CsrfContext } from "./CsrfTokenContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(-1);
  const { getCsrfToken } = useContext(CsrfContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${apiUrl}/check-auth/`, {
        signal: signal,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to check authentication status");
      }
      const data = await response.json();
      setIsLoggedIn(data.isAuthenticated);
      setUserId(data.user_id);
      return data.isAuthenticated;
    } catch (e) {
      console.error("Error checking auth status", e);
    }
  };

  const login = async (credentials, navigate) => {
    try {
      const response = await toast.promise(
        fetch(`${apiUrl}/login/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          signal: signal,
          credentials: "include",
          body: JSON.stringify(credentials),
        }),
        {
          pending: "Logging in...",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unknown error occured");
      }
      await checkAuth();
      toast.success("Logged in Successfully ! 👌");
      navigate("/");
    } catch (e) {
      toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
      console.error("Error user login", e);
    }
  };

  const sendOTP = async (credentials, setOtpSent) => {
    try {
      const response = await toast.promise(
        fetch(`${apiUrl}/send-otp/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          credentials: "include",
          signal: signal,
          body: JSON.stringify(credentials),
        }),
        {
          pending: "Sending OTP...",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unknown error occured");
      }
      const data = await response.json();
      toast.success("OTP sent Successfully ! 👌");
      setOtpSent(data.otpSent);
    } catch (e) {
      toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
      console.error("Error sending otp", e);
      if (e.message === "OTP already sent") setOtpSent(true);
    }
  };

  const register = async (credentials, navigate) => {
    try {
      const response = await toast.promise(
        fetch(`${apiUrl}/register/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          credentials: "include",
          signal: signal,
          body: JSON.stringify(credentials),
        }),
        {
          pending: "Registering user...",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unknown error occured");
      }
      toast.success("User Registered Successfully ! 👌");
      navigate("/");
    } catch (e) {
      toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
      console.error("Error registering user", e);
    }
  };

  const logout = async (navigate, setIsOpen) => {
    try {
      const response = await toast.promise(
        fetch(`${apiUrl}/logout/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-CSRFToken": getCsrfToken(),
          },
          signal: signal,
          credentials: "include",
        }),
        {
          pending: "logging out...",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to log in");
      }
      await checkAuth();
      toast.success("Logged out successfully ! 👌");
      setIsOpen(false);
      navigate("/");
    } catch (e) {
      toast.error(`${e.message} 🤯` || "Error occured ! 🤯");
      console.error("Error logging in", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, login, logout, register, sendOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider as default };
