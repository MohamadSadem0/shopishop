// src/components/LoginForm.js
import React from 'react';
import { useForm } from '../hooks/useForm';

const LoginForm = () => {
  const initialState = { email: '', password: '' };
  
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate);

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={values.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
