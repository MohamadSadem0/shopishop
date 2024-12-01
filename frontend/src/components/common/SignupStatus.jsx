import React from 'react';

const SignupStatus = ({ loading, error, success }) => (
  <div>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">Signup successful! Redirecting to login...</p>}
  </div>
);

export default SignupStatus;
