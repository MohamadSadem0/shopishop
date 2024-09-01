import React from 'react';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    window.location.href = 'https://your-api-url.com/api/auth/google'; 
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
