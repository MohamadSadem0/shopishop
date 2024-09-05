// import React, { useState } from 'react';
// import SellerDetailsForm from './SellerDetailsForm';
// import { signup } from '../services/authService';

// const SignupForm = ({ role }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showSellerForm, setShowSellerForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (role === 'seller') {
//       setShowSellerForm(true);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const user = await signup({ username, email, password, role });
//       console.log('Signed up user:', user);
//       // Redirect or update state as needed
//     } catch (err) {
//       setError('Failed to signup. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (showSellerForm) {
//     return <SellerDetailsForm username={username} email={email} password={password} />;
//   }

//   return (
//     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//       <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             className="mt-1 block w-full p-2 border rounded"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             className="mt-1 block w-full p-2 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             className="mt-1 block w-full p-2 border rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             className="mt-1 block w-full p-2 border rounded"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {loading ? 'Loading...' : 'Continue'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
import React, { useState } from 'react';
import { signup } from '../services/authService';
import Spinner from '../components/common/Spinner';
import GoogleSignInButton from '../components/common/GoogleSignInButton';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import logo from '../assets/icons/Logo.svg';
import backgroundImage from '../assets/images/loginBackground.png';
import { Link } from 'react-router-dom';
import "../styles/login.css";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await signup({ username, email, password });
      console.log('Signed up user:', user.data.email);
    } catch (err) {
      setError('Failed to sign up. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden flex items-center pl-10">
      {/* Background Image */}
      {/* <img
        src={backgroundImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      /> */}

      {/* Left Aligned Content */}
      <div className="flex flex-col items-start h-full w-full max-w-md p-8">
        {/* Logo */}
        {/* <img
          className="w-[50] max-w-[150px] mb-8"
          src={logo}
          alt="Logo"
        /> */}

        {/* Page Content */}
        <h1 className="text-white text-4xl mb-10 mt-10">Create an account</h1>
        <p className="text-[#c4c4c4] text-2xl mb-6">Please enter your details</p>

        <form onSubmit={handleSignup} className="flex flex-col text-white w-full">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full text-white"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full text-white"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 w-full"
            required
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className='flex justify-center'>
            <Button
              label={loading ? <Spinner /> : 'Sign up'}
              type="submit"
              className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded w-2/4 hover:bg-[#FEDE02]"
            />
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className='flex mt-4 w-2/4 ml-auto mr-auto'>
          <GoogleSignInButton />
        </div>

        {/* Login Link */}
        <p className="mt-4 text-white ml-auto mr-auto">
          Already have an account? <Link to="/login" className="text-[#fede02]">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;