import React from 'react';
import logo from "../../assets/images/google logo.svg"

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    window.location.href = 'https://your-api-url.com/api/auth/google'; 
  };

  return (
    <div className='flex flex-row'>
      <img src={logo}></img>
    <button
      onClick={handleGoogleSignIn}
      className="w-full  text-white py-2 px-4 rounded text-sm "
    >
      Sign in with Google
    </button>
 
    </div> );
};

export default GoogleSignInButton;
