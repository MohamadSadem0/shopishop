import React from 'react';
import logo from "../../assets/images/google logo.svg"

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    window.location.href = 'localhost:8080'; 
  };

  return (
    <div className='flex flex-row'>
      <img src={logo}></img>
    <button
      onClick={handleGoogleSignIn}
      className="w-full  text-black py-2 px-4 rounded text-sm "
    >
      Sign in with Google
    </button>
 
    </div> );
};

export default GoogleSignInButton;
