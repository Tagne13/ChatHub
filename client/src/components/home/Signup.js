import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Signup = (props) => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [helper, setHelper] = useState("");

  const [createUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      setHelper("User not found or incorrect credentials");
      console.log(helper);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={userFormData.username}
          onChange={handleInputChange}
          type="text"
          placeholder=" Your username"
          id="username"
          name="username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          value={userFormData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Your email address"
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
        <button type="submit">Sign Up!</button>
      </form>

      <button onClick={() => props.onFormSwitch("login")}>
        If you already have an account. Login here!
      </button>
    </>
  );
};

export default Signup;
