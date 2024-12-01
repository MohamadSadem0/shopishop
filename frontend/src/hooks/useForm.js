import { useState } from 'react';

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);  // Form values
  const [loading, setLoading] = useState(false);       // Loading state
  const [error, setError] = useState('');              // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    handleChange,
    loading,
    setLoading,      // Ensure setLoading is returned
    error,
    setError,        // Ensure setError is returned
  };
};
