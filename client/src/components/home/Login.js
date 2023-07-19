import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';

const Login = (props) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await login({
        variables: { ...userFormData }
      });
      console.log(response);

      Auth.login(response.data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Incorrect login credentials. Please re-enter or signup.
        </alert>
        <label htmlfor="email">Email</label>
        <input
          value={userFormData.email}
          onChange={handleInputChange}
          type="text"
          placeholder="Email address"
          id="email"
          name="email"
          required
        />
        <label htmlfor="password">Password</label>
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
      </form>

      <button onClick={() => props.onFormSwitch("signup")}>
        Don't have an account? Signup here!
      </button>
    </>
  );
};

export default Login;