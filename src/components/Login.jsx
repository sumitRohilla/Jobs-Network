import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { username, password, setUsername, setPassword } =
    useContext(UserContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (/\s/.test(username)) {
      toast.error("Username/Email should not contain spaces!");
      return;
    }

    const res = await login({ username, password });

    if (res) {
      navigate("/");
    }
  };

  return (
    <section className="mt-32 p-4">
      <form
        className="flex flex-col items-center bg-mainDarkColor text-textColor md:max-w-[500px] mx-auto py-8 px-6 rounded-xl"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          name="username"
          className="border-b-2 mb-8 w-full text-textColor py-2 pr-3 mb-2 bg-transparent focus:outline-none focus:border-buttonColor"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
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
        <button
          className="w-full px-4 py-3 mb-8 rounded-lg bg-buttonColor text-mainDarkColor hover:bg-gray-700 hover:text-textColor"
          type="submit"
        >
          Login
        </button>
        <Link to="/register">
          Don't have account?{" "}
          <u className="text-buttonColor hover:text-textColor">Register</u>
        </Link>
      </form>
    </section>
  );
};

export default Login;
