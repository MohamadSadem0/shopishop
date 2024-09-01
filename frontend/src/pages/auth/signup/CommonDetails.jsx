import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const CommonDetails = ({ username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, handleNext, handleBack }) => (
  <form onSubmit={handleNext} className="flex flex-col text-white w-full">
    <h1 className="text-white text-4xl mb-4">Enter Your Details</h1>
    <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mb-4" />
    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-4" />
    <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-4" />
    <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mb-4" />
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="flex justify-between">
      <Button label="Back" onClick={handleBack} className="bg-gray-500 text-white text-xl py-2 rounded hover:bg-gray-600" />
      <Button label="Next" onClick={handleNext} className="bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400" />
    </div>
  </form>
);

export default CommonDetails;
