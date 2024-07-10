import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider
      value={{ username, password, setUsername, setPassword, email, setEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider as default };