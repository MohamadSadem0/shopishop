// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Spinner from '../../../components/common/Spinner';
// import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
// import Input from '../../../components/common/Input';
// import Button from '../../../components/common/Button';

// import logo from '../../../assets/images/logo.svg';
// import backgroundImage from "../../../assets/images/loginBackground.png";



// const fetchServiceCategories = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(['Photography', 'Design', 'Tutoring', 'Web Development']);
//     }, 500);
//   });
// };

// const Signup = () => {
//   const [currentStep, setCurrentStep] = useState(1); 
//   const [userType, setUserType] = useState('Customer');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [serviceCategory, setServiceCategory] = useState('');
//   const [location, setLocation] = useState('');
//   const [currency, setCurrency] = useState('USD');
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch service categories if user type is Seller
//     if (userType === 'Seller' && currentStep === 3) {
//       fetchServiceCategories().then(setCategories);
//     }
//   }, [userType, currentStep]);

//   const handleNext = () => {
//     if (currentStep === 1 && userType === 'Customer') {
//       setCurrentStep(2);
//     } else if (currentStep === 1 && userType === 'Seller') {
//       setCurrentStep(2);
//     } else if (currentStep === 2) {
//       setCurrentStep(3);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     // Simulate signup logic here
//     try {
//       console.log('Signup data:', { userType, username, email, password, serviceName, serviceCategory, location, currency });
//     } catch (err) {
//       setError('Failed to sign up. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen relative overflow-hidden flex items-center pl-10">
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

//         {/* Step 1: Role Selection */}
//         {currentStep === 1 && (
//           <div>
//             <h1 className="text-white text-4xl mb-4">Get Started</h1>
//             <p className="text-[#c4c4c4] text-2xl mb-6">Welcome to Shopiishop - let’s create your account</p>
//             <div className="flex space-x-4 mb-6">
//               <button
//                 onClick={() => setUserType('Customer')}
//                 className={`w-1/2 py-2 rounded ${userType === 'Customer' ? 'bg-[#4A525C] text-[#EDB502]' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 Customer
//               </button>
//               <button
//                 onClick={() => setUserType('Seller')}
//                 className={`w-1/2 py-2 rounded ${userType === 'Seller' ? 'bg-[#EDB502] text-black' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 Seller
//               </button>
//             </div>
//             <Button
//               label="Next"
//               onClick={handleNext}
//               className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400"
//             />
//           </div>
//         )}

//         {/* Step 2: Common Details */}
//         {currentStep === 2 && (
//           <form onSubmit={handleNext} className="flex flex-col text-white w-full">
//             <h1 className="text-white text-4xl mb-4">Enter Your Details</h1>
//             <Input
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             <Input
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             <Input
//               label="Confirm Password"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <div className="flex justify-between">
//               <Button
//                 label="Back"
//                 onClick={handleBack}
//                 className="bg-gray-500 text-white text-xl py-2 rounded hover:bg-gray-600"
//               />
//               <Button
//                 label="Next"
//                 onClick={handleNext}
//                 className="bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400"
//               />
//             </div>
//           </form>
//         )}

//         {/* Step 3: Seller Details */}
//         {currentStep === 3 && userType === 'Seller' && (
//           <form onSubmit={handleSignup} className="flex flex-col text-white w-full">
//             <h1 className="text-white text-4xl mb-4">Enter Seller Details</h1>
//             <Input
//               label="Service Name"
//               value={serviceName}
//               onChange={(e) => setServiceName(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             <div className="mb-4">
//               <label className="block text-white mb-2">Service Category</label>
//               <select
//                 className="w-full p-2 border rounded text-black"
//                 value={serviceCategory}
//                 onChange={(e) => setServiceCategory(e.target.value)}
//                 required
//               >
//                 <option className='text-black' value="">Select Category</option>
//                 {categories.map((category, index) => (
//                   <option className='text-black' key={index} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
//             <Input
//               label="Location"
//               value={location}
              
//               onChange={(e) => setLocation(e.target.value)}
//               required
//               className="mb-4 text-black"
//             />
//             <div className="mb-4">
//               <label className="block text-white mb-2">Currency</label>
//               <select
//                 className="w-full p-2 border rounded text-black"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 required
//               >
//                 <option value="USD">USD ($)</option>
//                 <option value="LBP">LBP (ل.ل)</option>
//               </select>
//             </div>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <div className="flex justify-between">
//               <Button
//                 label="Back"
//                 onClick={handleBack}
//                 className="bg-gray-500 text-white text-xl py-2 rounded hover:bg-gray-600"
//               />
//               <Button
//                 label={loading ? <Spinner /> : 'Sign up'}
//                 type="submit"
//                 className="bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400"
//               />
//             </div>
//           </form>
//         )}

//         {/* Google Sign-Up Button */}
//         {currentStep === 2 && (
//           <div className="flex mt-4 w-2/4 ml-auto mr-auto">
//             <GoogleSignInButton />
//           </div>
//         )}

//         {/* Already Have Account Link */}
//         {currentStep < 3 && (
//           <p className="mt-4 text-center text-white">
//             Already have an account? <Link to="/login" className="text-[#fede02]">Login</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../redux/authSlice';  
import RoleSelection from './RoleSelection';  
import CommonDetails from './CommonDetails';  
import SellerDetails from './SellerDetails';  
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';  
import { signup } from '../../../services/authService';  
// import backgroundImage from '../../../assets/images/signupBackground.png';
import backgroundImage from "../../../assets/images/loginBackground.png";
import logo from '../../../assets/images/logo.svg';  
import { Link } from 'react-router-dom';  
import { fetchServiceCategories } from '../../../services/authService';



const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userType === 'Seller' && currentStep === 3) {
      fetchServiceCategories().then(setCategories);
    }
  }, [userType, currentStep]);

  const handleNext = () => {
    if (currentStep === 1 && userType === 'Customer') {
      setCurrentStep(2);
    } else if (currentStep === 1 && userType === 'Seller') {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = await signup({ username, email, password, userType, serviceName, serviceCategory, location, currency });
      dispatch(loginAction({ user }));
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden flex  pl-10">
      <img src={backgroundImage} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
      <div className="flex flex-col items-start h-full w-full max-w-lg ">
        <img src={logo} alt="Logo" className="w-36 h-36 mb-8" />

        {currentStep === 1 && <RoleSelection userType={userType} setUserType={setUserType} handleNext={handleNext} />}
        {currentStep === 2 && <CommonDetails username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} error={error} handleNext={handleNext} handleBack={handleBack} />}
        {currentStep === 3 && userType === 'Seller' && <SellerDetails serviceName={serviceName} setServiceName={setServiceName} serviceCategory={serviceCategory} setServiceCategory={setServiceCategory} location={location} setLocation={setLocation} currency={currency} setCurrency={setCurrency} categories={categories} error={error} handleSignup={handleSignup} handleBack={handleBack} loading={loading} />}
        
        {currentStep === 2 && (
          <div className="flex mt-4 w-2/4 ml-auto mr-auto">
            <GoogleSignInButton />
          </div>
        )}

        {currentStep < 3 && (
          <p className="mt-4 text-center text-white">
            Already have an account? <Link to="/login" className="text-[#fede02]">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
