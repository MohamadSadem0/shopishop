import { useState } from 'react';

const useFormValidation = (initialState, validateSignup) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const validationErrors = validateSignup(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  return { values, handleChange, errors, validate };
};

export default useFormValidation;
