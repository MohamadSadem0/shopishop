// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess as loginAction } from '../../../redux/authSlice';
// import { signup } from '../../../services/authService';
// import { fetchSections } from '../../../services/sectionService'; // Import the section fetching service
// import RoleSelection from './RoleSelection';
// import CommonDetails from './CommonDetails';
// import LocationDetails from './LocationDetails';
// import MerchantDetails from './MerchantDetails';
// import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
// import Button from '../../../components/common/Button';
// import { useNavigate, Link } from 'react-router-dom';
// import logo from '../../../assets/icons/logo.svg';

// const Signup = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [userType, setUserType] = useState('Customer');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [serviceName, setServiceName] = useState('');
//   const [serviceSection, setServiceSection] = useState(''); // Store the sectionId here
//   const [currency, setCurrency] = useState('USD');
//   const [error, setError] = useState('');

//   // Location-related fields
//   const [latitude, setLatitude] = useState(40.712776);
//   const [longitude, setLongitude] = useState(-74.005974);
//   const [addressLine, setAddressLine] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [country, setCountry] = useState('USA');
//   const [sections, setSections] = useState([]); // State to store fetched sections
//   const [loadingSections, setLoadingSections] = useState(false); // Loading state for sections

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Fetch sections when merchant reaches Step 4 (business details)
//   useEffect(() => {
//     if (userType === 'Merchant' && currentStep === 4) {
//       setLoadingSections(true);
//       fetchSections()
//         .then((data) => {
//           setSections(data); // Store the fetched sections
//           setLoadingSections(false);
//         })
//         .catch((error) => {
//           console.error('Failed to fetch sections:', error);
//           setLoadingSections(false);
//         });
//     }
//   }, [userType, currentStep]);



//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous error messages
    
//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
  
//     try {
//       // Create the payload based on whether the user is a merchant or customer
//       const userDetails = {
//         name: username,
//         email,
//         password,
//         role: userType === 'Customer' ? 'CUSTOMER' : 'MERCHANT',
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//         addressLine,
//         city,
//         state,
//         zipCode,
//         country,
//         ...(userType === 'Merchant' && {
//           businessName: serviceName, // Only include this field if it's a merchant
//           sectionId: serviceSection, // Only include this field if it's a merchant
//           currency, // Only include this field if it's a merchant
//         }),
//       };
  
//       console.log(userDetails); // Logging userDetails to verify payload
  
//       // Send the signup request to the backend using Axios
//       const response = await signup(userDetails);
  
//       if (response && response.message === 'User registered successfully') {
//         // If signup is successful, dispatch the loginSuccess action
//         dispatch(loginAction({ user: response.userId }));
  
//         // Redirect based on user role
//         if (userType === 'Merchant') {
//           navigate('/dashboard'); // Redirect merchant to the dashboard
//         } else {
//           navigate('/'); // Redirect customer to the home page
//         }
//       }
//     } catch (err) {
//       // Handle errors during signup
//       if (err.response) {
//         if (err.response.status === 409) {
//           // User already exists
//           setError('User with this email already exists.');
//         } else if (err.response.status >= 400 && err.response.status < 500) {
//           // Handle client-side errors (4xx)
//           setError('Failed to sign up. Please check your details.');
//         } else if (err.response.status >= 500) {
//           // Handle server-side errors (5xx)
//           setError('Server error. Please try again later.');
//         }
//       } else {
//         // Handle any other errors (e.g., network errors)
//         setError('Failed to sign up. Please check your internet connection.');
//       }
//     }
//   };
  
  

//   const handleBackToWebsite = () => {
//     navigate('/');
//   };

//   return (
//     <div id="signup" className="min-h-screen flex items-center justify-center relative bg-white">
//       <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
//       <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
//         <div className="flex justify-center mb-6">
//           <img className="w-20 sm:w-24" src={logo} alt="Logo" />
//         </div>

//         {/* Conditional Step Rendering */}
//         {currentStep === 1 && <RoleSelection userType={userType} setUserType={setUserType} handleNext={() => setCurrentStep(2)} />}
//         {currentStep === 2 && (
//           <CommonDetails
//             username={username}
//             setUsername={setUsername}
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             confirmPassword={confirmPassword}
//             setConfirmPassword={setConfirmPassword}
//             error={error}
//             handleNext={() => setCurrentStep(3)}
//             handleBack={() => setCurrentStep(1)}
//           />
//         )}
//         {currentStep === 3 && (
//   <LocationDetails
//     latitude={latitude}
//     setLatitude={setLatitude}
//     longitude={longitude}
//     setLongitude={setLongitude}
//     addressLine={addressLine}
//     setAddressLine={setAddressLine}
//     city={city}
//     setCity={setCity}
//     state={state}
//     setState={setState}
//     zipCode={zipCode}
//     setZipCode={setZipCode}
//     country={country}
//     setCountry={setCountry}
//     handleNext={userType === 'Merchant' ? () => setCurrentStep(4) : null} // Only pass handleNext for merchants
//     handleSignup={userType === 'Customer' ? handleSignup : null} // Pass handleSignup for customers
//     handleBack={() => setCurrentStep(2)}
//     userType={userType}
//   />
// )}

//         {currentStep === 4 && userType === 'Merchant' && (
//           <MerchantDetails
//             serviceName={serviceName}
//             setServiceName={setServiceName}
//             serviceSection={serviceSection}
//             setServiceSection={setServiceSection}
//             currency={currency}
//             setCurrency={setCurrency}
//             sections={sections}
//             loading={loadingSections}
//             handleSignup={handleSignup}
//             error={error}
//           />
//         )}

//         <div className="flex mt-4 w-full">
//           <GoogleSignInButton />
//         </div>

//         {currentStep < 4 && (
//           <p className="mt-6 text-center text-gray-700">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         )}

//         <div className="mt-4 flex justify-center">
//           <Button
//             label="Go Back to Website"
//             onClick={handleBackToWebsite}
//             className="w-full bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600 transition"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup


import React, { useState, useEffect } from 'react';
import { fetchSections } from '../../../services/sectionService';
import { useSignup } from '../../../hooks/useSignup';
import RoleSelection from './RoleSelection';
import CommonDetails from './CommonDetails';
import LocationDetails from './LocationDetails';
import MerchantDetails from './MerchantDetails';
import GoogleSignInButton from '../../../components/common/GoogleSignInButton';
import SignupStatus from '../../../components/common/SignupStatus';
import Button from '../../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';

const Signup = () => {
  const { handleSignup, loading, error, success } = useSignup();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('Customer');
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: 40.712776,
    longitude: -74.005974,
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    serviceName: '',
    serviceSection: '',
    currency: 'USD',
  });
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(false);

  useEffect(() => {
    if (userType === 'Merchant' && currentStep === 4) {
      setLoadingSections(true);
      fetchSections()
        .then((data) => setSections(data))
        .catch(() => console.error('Failed to fetch sections'))
        .finally(() => setLoadingSections(false));
    }
  }, [userType, currentStep]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handleBackStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const payload = {
      name: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
      role: userType === 'Merchant' ? 'MERCHANT' : 'CUSTOMER',
      latitude: userDetails.latitude,
      longitude: userDetails.longitude,
      addressLine: userDetails.addressLine,
      city: userDetails.city,
      state: userDetails.state,
      zipCode: userDetails.zipCode,
      country: userDetails.country,
      currency: userDetails.currency,
      ...(userType === 'Merchant' && {
        sectionId: userDetails.sectionId || '01ed7cfb-e1d6-4c16-b8b5-b22e753c51a1',
        businessName: userDetails.businessName,
      }),
    };
  
    handleSignup(payload);
  };
  
  return (
    <div id="signup" className="min-h-screen flex items-center justify-center relative bg-white">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 rounded-lg p-6 sm:p-10">
        <div className="flex justify-center mb-6">
          <img className="w-20 sm:w-24" src={logo} alt="Logo" />
        </div>

        {currentStep === 1 && (
          <RoleSelection userType={userType} setUserType={setUserType} handleNext={handleNextStep} />
        )}
        {currentStep === 2 && (
          <CommonDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleNext={handleNextStep}
            handleBack={handleBackStep}
          />
        )}
        {currentStep === 3 && (
          <LocationDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleNext={userType === 'Merchant' ? handleNextStep : null}
            handleSignup={userType === 'Customer' ? onSubmit : null}
            handleBack={handleBackStep}
            userType={userType}
          />
        )}
        {currentStep === 4 && userType === 'Merchant' && (
          <MerchantDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            sections={sections}
            loading={loadingSections}
            handleSignup={onSubmit}
          />
        )}

        <SignupStatus loading={loading} error={error} success={success} />

        <div className="flex mt-4 w-full">
          <GoogleSignInButton />
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            label="Go Back to Website"
            onClick={() => navigate('/')}
            className="w-full bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
