import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NProgress from 'nprogress'; // Import NProgress for progress bar
import 'nprogress/nprogress.css'; // Import the NProgress CSS
import './index.css'; // Import your CSS file

const PhoneRole = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    role: 'user',
    phoneNumber: '',
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user_info"));
    if (localUser?.result?._id) {
      console.log("User ID:", localUser.result._id); // Log the user ID from localStorage
    } else {
      navigate("/signin"); // If no user data is available, redirect to sign in
    }
  }, [navigate]);

  const handleCheckboxChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      role: event.target.value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const localUser = JSON.parse(localStorage.getItem("user_info"));
    const userId = localUser?.result?._id;

    if (!userId) {
      console.log("User ID is not available.");
      return;
    }

    try {
      NProgress.start(); // Start the progress bar
      console.log(formState);
      const response = await axios.put('http://localhost:5000/users/phoneRole', {
        userId,
        ...formState,
      });
      console.log("Response:", response.data); // Log the response for debugging

      // Simulate a delay for progress bar effect
      setTimeout(() => {
        NProgress.done(); // Complete the progress bar

        // Handle navigation based on role
        switch (formState.role) {
          case 'magazineOwner':
            console.log("Navigating to /merchant/home");
            navigate('/merchant/home');
            break;
          case 'user':
            console.log("Navigating to /user/home");
            navigate('/user/home');
            break;
          case 'biker':
            console.log("Navigating to /biker/home");
            navigate('/biker/home');
            break;
          case 'driver':
            console.log("Navigating to /driver/home");
            navigate('/driver/home');
            break;
          default:
            console.log("Unknown role, navigating to /signin");
            navigate('/signin');
        }
      }, 500); // Adjust the duration to your preference (500ms is for demonstration)

    } catch (error) {
      NProgress.done(); // Ensure the progress bar stops on error
      console.log("Error:", error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form-content'>
        <h1 className='main-header'>
          If you are a user, do not check any of these options
        </h1>
        <label className='mt-3'>
          Phone Number:
          <input
            type="text"
            value={formState.phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number"
            required
            className='form-input'
          />
        </label>
        <div className='role-options'>
          <label>
            <input
              type="radio"
              value="magazineOwner"
              checked={formState.role === 'magazineOwner'}
              onChange={handleCheckboxChange}
            /> Merchant
          </label>
          <label>
            <input
              type="radio"
              value="driver"
              checked={formState.role === 'driver'}
              onChange={handleCheckboxChange}
            /> Driver
          </label>
          <label>
            <input
              type="radio"
              value="biker"
              checked={formState.role === 'biker'}
              onChange={handleCheckboxChange}
            /> Biker
          </label>
        </div>
        <button className='btn btn-warning mt-3' type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PhoneRole;
