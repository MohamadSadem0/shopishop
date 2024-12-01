// GoogleSignInButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux for state management

const GoogleSignInButton = () => {
  const dispatch = useDispatch();

  const handleGoogleSuccess = async (response) => {
    const googleToken = response.credential; // The Google token you receive

    try {
      const res = await fetch('/api/auth/google', { // Your endpoint to handle Google login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data }); // Dispatching login success with the JWT and user data
      } else {
        throw new Error(data.message || 'Failed to authenticate with Google');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In failed', error);
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleFailure}
      useOneTap
    />
  );
};

export default GoogleSignInButton;
