// import React, { useState } from 'react';
// import Input from '../../../components/common/Input';
// import Button from '../../../components/common/Button';
// import { validateSignup } from '../../../utils/validation'; // Import the validation function

// const CommonDetails = ({
//   username,
//   setUsername,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   confirmPassword,
//   setConfirmPassword,
//   error,
//   handleNext,
//   handleBack
// }) => {
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleNextClick = () => {
//     // Collect the values for validation
//     const values = {
//       username,
//       email,
//       password,
//       confirmPassword
//     };

//     // Validate the values
//     const errors = validateSignup(values);

//     // If there are no validation errors, call handleNext, otherwise set validation errors
//     if (Object.keys(errors).length === 0) {
//       setValidationErrors({});
//       handleNext(); // Proceed to the next step
//     } else {
//       setValidationErrors(errors); // Set the validation errors to display
//     }
//   };

//   return (
//     <form className="flex flex-col w-full">
//       <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Details</h1>

//       <Input
//         label="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//         className="mb-4"
//       />
//       {validationErrors.username && (
//         <p className="text-red-500 text-center mb-2">{validationErrors.username}</p>
//       )}

//       <Input
//         label="Email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="mb-4"
//       />
//       {validationErrors.email && (
//         <p className="text-red-500 text-center mb-2">{validationErrors.email}</p>
//       )}

//       <Input
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="mb-4"
//       />
//       {validationErrors.password && (
//         <p className="text-red-500 text-center mb-2">{validationErrors.password}</p>
//       )}

//       <Input
//         label="Confirm Password"
//         type="password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//         className="mb-4"
//       />
//       {validationErrors.confirmPassword && (
//         <p className="text-red-500 text-center mb-2">{validationErrors.confirmPassword}</p>
//       )}

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       <div className="flex justify-between">
//         <Button label="Back" onClick={handleBack} className="bg-gray-500 text-white py-2 rounded" />
//         <Button label="Next" onClick={handleNextClick} className="bg-yellow-400 text-black py-2 rounded" />
//       </div>
//     </form>
//   );
// };

// export default CommonDetails;
import React, { useState } from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { validateSignup } from '../../../utils/validation'; // Import the validation function

const CommonDetails = ({ userDetails, setUserDetails, error, handleNext, handleBack }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const handleNextClick = () => {
    // Validate the userDetails object
    const errors = validateSignup(userDetails);

    if (Object.keys(errors).length === 0) {
      setValidationErrors({});
      handleNext(); // Proceed to the next step if no validation errors
    } else {
      setValidationErrors(errors); // Display validation errors if any
    }
  };

  // Update handler for individual fields within userDetails
  const handleChange = (field) => (e) => {
    setUserDetails((prevDetails) => ({
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
