import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Login(props) {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
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
      window.location.assign("/conversation");
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
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: 'url(https://img.freepik.com/free-vector/speech-bubble-vector-halftone-style_53876-126726.jpg?w=826&t=st=1689814164~exp=1689814764~hmac=fa98d63ebf059e3d8b8f048045122f50a8ffd7be3285960d3e0f3ea3aa52c752)' }}>
      <form onSubmit={handleFormSubmit} className="max-w-xs">
      <div className="mb-2">
          <label htmlFor="email" className="mb-1 text-3xl text-violet-400">Email</label>
            <div className="flex">
              <input
                value={userFormData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Email address"
                id="email"
                name="email"
                required
                className="text-red-500 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="mb-1 text-3xl text-violet-400">Password</label>
          <div className="flex">
          <input
            value={userFormData.password}
            onChange={handleInputChange}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
            className="text-red-500 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button type="submit" className="bg-cyan-400 hover:bg-yellow-300 text-green--800 font-bold py-2 px-4 mt-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
      </form>

      <button onClick={() => props.onFormSwitch("signup")} className="text-stone-950 hover:text-yellow-300 mt-4">
        Don't have an account? Signup here!
      </button>
    </div>
  );
}

export default Login;