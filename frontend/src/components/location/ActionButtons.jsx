import React from 'react';
import Button from '../common/Button';

const ActionButtons = ({ handleBack, handleNext, handleSignup, userType }) => (
  <div className="flex justify-between mt-4">
    <Button
      label="Back"
      onClick={handleBack}
      className="bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600"
    />
    {userType === 'Merchant' ? (
      <Button
        label="Next"
        onClick={handleNext}
        className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500"
      />
    ) : (
      <Button
        label="Signup"
        onClick={handleSignup}
        className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500"
      />
    )}
  </div>
);

export default ActionButtons;
