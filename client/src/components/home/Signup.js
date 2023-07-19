import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = (props) => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await createUser({
        variables: { ...userFormData }
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    };

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </alert>
        <label htmlfor="username">Username</label>
        <input
          value={userFormData.username}
          onChange={handleInputChange}
          type="text"
          placeholder=" Your username"
          id="username"
          name="username"
          required
        />
        <label htmlfor="email">Email</label>
        <input
          value={userFormData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Your email address"
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

      <button onClick={() => props.onFormSwitch("login")}>
        If you already have an account. Login here!
      </button>
    </>
  );
};

export default Signup;