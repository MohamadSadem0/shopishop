// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [step, setStep] = useState(1); // Step management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const resetForm = () => setValues(initialState);

  return {
    values,
    setValues,
    handleChange,
    nextStep,
    prevStep,
    resetForm,
    step,
    loading,
    setLoading,
    error,
    setError,
  };
};
