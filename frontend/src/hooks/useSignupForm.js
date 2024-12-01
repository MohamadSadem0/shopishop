// src/hooks/useSignupForm.js
import { useState, useEffect } from 'react';
import { fetchSections } from '../services/sectionService'; // Import fetchSections for section fetching

export const useSignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceSection, setServiceSection] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');

  const [latitude, setLatitude] = useState(40.712776);
  const [longitude, setLongitude] = useState(-74.005974);
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('USA');
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);

  // Fetch sections when merchant reaches Step 4 (business details)
  useEffect(() => {
    if (userType === 'Merchant' && currentStep === 4) {
      setLoadingSections(true);
      fetchSections()
        .then((data) => {
          setSections(data); // Store the fetched sections
          setLoadingSections(false);
        })
        .catch(() => {
          setLoadingSections(false);
          setError('Failed to fetch sections');
        });
    }
  }, [userType, currentStep]);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  return {
    currentStep,
    userType,
    username,
    email,
    password,
    confirmPassword,
    serviceName,
    serviceSection,
    currency,
    error,
    latitude,
    longitude,
    addressLine,
    city,
    state,
    zipCode,
    country,
    sections,
    loadingSections,
    setUserType,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    setServiceName,
    setServiceSection,
    setCurrency,
    setLatitude,
    setLongitude,
    setAddressLine,
    setCity,
    setState,
    setZipCode,
    setCountry,
    setError,
    nextStep,
    prevStep,
    validatePassword,
  };
};
