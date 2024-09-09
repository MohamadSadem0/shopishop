// import React, { useState } from 'react';
// import { login } from '../../../services/authService';
// import Spinner from '../../../components/common/Spinner';
// import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
// import Input from '../../../components/common/Input';
// import Button from '../../../components/common/Button';
// import logo from '../../../assets/images/logo.svg'; 
// import backgroundImage from "../../../assets/images/loginBackground.png";
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import "./login.css"

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate for redirection

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const user = await login({ email, password });
//       const data = user.data;
//       console.log('Logged in user:', data.email);
//     } catch (err) {
//       setError('Failed to login. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle redirection back to the landing page
//   const handleBackToWebsite = () => {
//     navigate('/'); // Redirect to the landing page
//   };

//   return (
//     <div className="w-full h-screen relative overflow-hidden flex items-center pl-10 ">
//       {/* Background Image */}
//       <img
//         src={backgroundImage}
//         alt="Background"
//         className="absolute top-0 left-0 w-full h-full object-cover -z-10" 
//       />

//       {/* Left Aligned Content */}
//       <div className="flex flex-col items-start h-full w-full max-w-md p-8">
//         {/* Logo */}
//         <img
//           className="w-[50] max-w-[150px] mb-8"
//           src={logo}
//           alt="Logo"
//         />

//         {/* Page Content */}
//         <h1 className="text-white text-4xl mb-10 mt-10">Welcome back</h1>
//         <p className="text-[#c4c4c4] text-2xl mb-6">Please enter your account details</p>

//         <form onSubmit={handleLogin} className="flex flex-col text-white w-full">
//           <Input
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mb-4 w-full text-black"
//             required
//           />
//           <Input
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mb-4 w-full text-black"
//             required
//           />
          
//           {/* Forgot Password Link */}
//           <p className="text-white text-right w-full mb-4">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </p>

//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <div className='flex justify-center'>
//             <Button
//               label={loading ? <Spinner /> : 'Sign in'}
//               type="submit"
//               className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded w-2/4 hover:bg-[#FEDE02]"
//             />
//           </div>
//         </form>

//         {/* Google Sign-In Button */}
//         <div className='flex mt-4 w-2/4 ml-auto mr-auto'>
//           <GoogleSignInButton />
//         </div>

//         {/* Sign Up Link */}
//         <p className="mt-4 text-white text-center">
//           Don’t have an account? <Link to="/signup" className="text-[#fede02]">Sign up</Link>
//         </p>
//       </div>

//       {/* Go Back to Website Button */}
//       <button
//         onClick={handleBackToWebsite}
//         className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-700 underline"
//       >
//         Go Back to Website
//       </button>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { login } from '../../../services/authService';
import Spinner from '../../../components/common/Spinner';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import logo from '../../../assets/icons/logo.svg'; 
import backgroundImage from "../../../assets/images/loginBackground.png";
import { Link, useNavigate } from 'react-router-dom';
// import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login({ email, password });
      const data = user.data;
      console.log('Logged in user:', data.email);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWebsite = () => {
    navigate('/');
  };

  return (
    <div className="laptop:w-full sm:w-7/12 sm:pl-6 h-screen  overflow-hidden flex items-center laptop:pl-10">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Left Aligned Content */}
      <div className="flex flex-col items-start h-full   w-full max-w-md laptop:p-8">
        {/* Logo */}
        <img
          className="w-[50] max-w-[150px] laptop:mb-8"
          src={logo}
          alt="Logo"
        />

        {/* Page Content */}
        <h1 className="text-white text-4xl mb-10 mt-10">Welcome back</h1>
        <p className="text-[#c4c4c4] text-2xl mb-6">Please enter your account details</p>

        <form onSubmit={handleLogin} className="flex flex-col text-white w-full">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 laptop:w-full text-black"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full text-black"
            required
          />

          {/* Forgot Password Link */}
          <p className="text-white text-right w-full mb-4">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className='flex justify-center'>
            <Button
              label={loading ? <Spinner /> : 'Sign in'}
              type="submit"
              className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded w-2/4 hover:bg-[#FEDE02]"
            />
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className='flex mt-4 w-2/4 ml-auto mr-auto'>
          <GoogleSignInButton />
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-white text-center">
          Don’t have an account? <Link to="/signup" className="text-[#fede02]">Sign up</Link>
        </p>
      </div>

      {/* Go Back to Website Button */}
      <Button
        label="Go Back to Website"
        onClick={handleBackToWebsite}
        className="absolute bottom-4 right-4 bg-blue-500 text-white hover:bg-blue-700"
      />
    </div>
  );
};

export default Login;
