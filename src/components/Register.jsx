import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { username, password, setUsername, setPassword, email, setEmail } =
    useContext(UserContext);
  const { register, sendOTP } = useContext(AuthContext);
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Password Does not Match!");
      return;
    }

    try {
      if (otpSent) {
        register({ email, otp }, navigate);
      } else {
        if (/\s/.test(username)) {
          toast.error("Username should not contain spaces!");
          return;
        }

        if (/\s/.test(email)) {
          toast.error("Email should not contain spaces!");
          return;
        }

        sendOTP({ username, password, email }, setOtpSent);
      }
    } catch (err) {
      if (err.name == "AbortError") {
        console.log(err.message);
      } else {
        console.error("An Error occured", err);
      }
    }
  };

  return (
    <section className="mt-32 p-4">
      <form
        className="flex flex-col items-center bg-mainDarkColor text-textColor md:max-w-[500px] mx-auto py-8 px-6 rounded-xl"
        onSubmit={handleRegister}
      >
        {!otpSent && (
          <>
            <input
              type="text"
              name="username"
              className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="off"
              required
            />
            <input
              type="email"
              name="email"
              className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
              required
            />
            <input
              type="password"
              name="password"
              className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
              required
            />
            <input
              type="password"
              name="confirmpass"
              className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="off"
              required
            />
          </>
        )}
        {otpSent && (
          <input
            type="text"
            name="otp"
            className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            autoComplete="off"
            required
          />
        )}
        <button
          className="w-full px-4 py-3 mb-8 rounded-lg bg-buttonColor text-mainDarkColor hover:bg-gray-700 hover:text-textColor"
          type="submit"
        >
          {otpSent ? "Register" : "Send OTP"}
        </button>
        <Link to="/login">
          Already have account?{" "}
          <u className="text-buttonColor hover:text-textColor">Login</u>
        </Link>
      </form>
    </section>
  );
};

export default Register;
