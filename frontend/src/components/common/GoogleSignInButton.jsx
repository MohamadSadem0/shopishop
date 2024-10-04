// src/components/GoogleSignInButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/actions/authActions';

const GoogleSignInButton = () => {
  const dispatch = useDispatch();

  const handleGoogleSuccess = (response) => {
    const googleToken = response.credential;
    const decoded = jwt_decode(googleToken);

    const userData = {
      name: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
      avatar: decoded.picture,
    };

    dispatch(googleLogin(userData)); // Dispatch the Google login action
  };

  const handleGoogleFailure = () => {
    console.error('Google Sign-In failed');
  };

  return <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />;
};

export default GoogleSignInButton;
