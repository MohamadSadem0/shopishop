import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const CommonDetails = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  handleNext,
  handleBack,
  userType,
  handleSignup
}) => (
  <form onSubmit={handleNext} className="flex flex-col w-full">
    <h1 className="text-black text-3xl sm:text-4xl font-bold mb-4 text-center">
      Enter Your Details
    </h1>
    <Input
      label="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="mb-4 w-full"
    />
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="mb-4 w-full"
    />
    <Input
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="mb-4 w-full"
    />
    <Input
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="mb-4 w-full"
    />
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    <div className="flex justify-between">
      <Button
        label="Back"
        onClick={handleBack}
        className="bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600"
      />
      {userType === 'Customer' ? (
        <Button
          label="Signup"
          type="submit"
          onClick={handleSignup}
          className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
        />
      ) : (
        <Button
          label="Next"
          onClick={handleNext}
          className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
        />
      )}
    </div>
  </form>
);

export default CommonDetails;
