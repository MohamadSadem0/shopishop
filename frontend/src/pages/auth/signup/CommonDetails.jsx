import React, { useState } from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { validateSignup } from '../../../utils/validation'; // Import the validation function
import axiosInstance from '../../../utils/axiosInstance';

const CommonDetails = ({ userDetails, setUserDetails, error, handleNext, handleBack }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [emailLoading, setEmailLoading] = useState(false);

  const checkEmailAvailability = async () => {
    setEmailLoading(true);
    try {
      const response = await axiosInstance.post(`public/users/check-email`, { email: userDetails.email });
      setEmailLoading(false);
      return response.data;  // Adjust according to your API's actual response structure
    } catch (error) {
      console.error('Failed to check email availability:', error);
      setEmailLoading(false);
      if (error.response) {
          // Handle responses sent from the server, such as 4xx or 5xx errors
          console.error('Server responded with:', error.response.status, error.response.data);
      }
      return false;  // Adjust error handling as needed
  }
  
  };

  const handleNextClick = async () => {
    const errors = validateSignup(userDetails);
    if (Object.keys(errors).length === 0) {
        const emailIsAvailable = await checkEmailAvailability();
        if (!emailIsAvailable) {
            setValidationErrors({ ...errors, email: 'This email is already in use.' });
        } else {
            setValidationErrors({});
            handleNext();
        }
    } else {
        setValidationErrors(errors);
    }
};


  const handleChange = (field) => (e) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [field]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col w-full">
      <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Details</h1>

      <Input
        label="Username"
        value={userDetails.username}
        onChange={handleChange('username')}
        required
        className="mb-4"
      />
      {validationErrors.username && (
        <p className="text-red-500 text-center mb-2">{validationErrors.username}</p>
      )}

      <Input
        label="Email"
        type="email"
        value={userDetails.email}
        onChange={handleChange('email')}
        required
        className="mb-4"
      />
      {emailLoading && (
        <p className="text-center text-blue-500">Checking email availability...</p>
      )}
      {validationErrors.email && (
        <p className="text-red-500 text-center mb-2">{validationErrors.email}</p>
      )}

      <Input
        label="Password"
        type="password"
        value={userDetails.password}
        onChange={handleChange('password')}
        required
        className="mb-4"
      />
      {validationErrors.password && (
        <p className="text-red-500 text-center mb-2">{validationErrors.password}</p>
      )}

      <Input
        label="Confirm Password"
        type="password"
        value={userDetails.confirmPassword}
        onChange={handleChange('confirmPassword')}
        required
        className="mb-4"
      />
      {validationErrors.confirmPassword && (
        <p className="text-red-500 text-center mb-2">{validationErrors.confirmPassword}</p>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between">
        <Button label="Back" onClick={handleBack} className="bg-gray-500 text-white py-2 rounded" />
        <Button label="Next" onClick={handleNextClick} className="bg-yellow-400 text-black py-2 rounded" />
      </div>
    </form>
  );
};

export default CommonDetails;
