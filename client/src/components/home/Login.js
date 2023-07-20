import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Login = (props) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [helper, setHelper] = useState("");

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (userFormData.password.length >= 8) {
      console.log("Here Valid password");
    } else {
      setHelper("invalid email or password");
      return;
    }

    if (userFormData.email) {
      //regex
      console.log("Here Valid password");
    } else {
      setHelper("invalid email or password");
      return;
    }

    try {
      const response = await login({
        variables: { ...userFormData },
      });
      console.log(response);

      Auth.login(response.data.login.token);
    } catch (err) {
      console.error(err);
      setHelper("User not found or incorrect credentials");
      console.log(helper);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={userFormData.email}
          onChange={handleInputChange}
          type="text"
          placeholder="Email address"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={userFormData.password}
          onChange={handleInputChange}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
        />
        <button type="submit">Login</button>
        <div>{helper}</div>
      </form>

      <button onClick={() => props.onFormSwitch("signup")}>
        Don't have an account? Signup here!
      </button>
    </>
  );
};

export default Login;
