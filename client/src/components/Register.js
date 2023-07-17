import React from "react";
import { Login } from "./Registration/Login";
import { Signup } from "./Registration/Signup";

export default function Register(){
    const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div>
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Signup onFormSwitch={toggleForm} />
      )}
    </div>
  );

}