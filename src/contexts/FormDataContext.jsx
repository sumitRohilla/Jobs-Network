import React, { useState, useContext } from "react";

const formDataContext = React.createContext();

const useFormDataContext = () => {
  return useContext(formDataContext);
};

const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    type: "Full-Time",
    title: "",
    location: "",
    description: "",
    fullDesc: {
      res: "",
      require: "",
      skills: "",
    },
    salary: "Under ₹5L",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  return (
    <formDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </formDataContext.Provider>
  );
};

export { FormDataProvider as default, useFormDataContext };
