// import React, { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
// import AddressForm from '../../../components/location/AddressForm';
// import MapModal from '../../../components/location/MapModal';
// import ActionButtons from '../../../components/location/ActionButtons';

// const LocationDetails = ({
//   setLatitude,
//   setLongitude,
//   addressLine,
//   setAddressLine,
//   city,
//   setCity,
//   state,
//   setState,
//   zipCode,
//   setZipCode,
//   country,
//   setCountry,
//   handleNext,
//   handleSignup,
//   handleBack,
//   userType
// }) => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const [isMapOpen, setIsMapOpen] = useState(false);
//   const [currentPosition, setCurrentPosition] = useState({ lat: 40.712776, lng: -74.005974 });
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleMapClick = (event) => {
//     const newLat = event.latLng.lat();
//     const newLng = event.latLng.lng();
//     setLatitude(newLat);
//     setLongitude(newLng);
//     setMarkerPosition({ lat: newLat, lng: newLng });
//     setCurrentPosition({ lat: newLat, lng: newLng });
//   };

//   const detectCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLatitude(latitude);
//           setLongitude(longitude);
//           setCurrentPosition({ lat: latitude, lng: longitude });
//           setMarkerPosition({ lat: latitude, lng: longitude });
//         },
//         () => setErrorMessage('Failed to detect your location. Please enable location services.')
//       );
//     } else {
//       setErrorMessage('Geolocation is not supported by this browser.');
//     }
//   };

//   if (loadError) return <p>Error loading maps</p>;
//   if (!isLoaded) return <p>Loading...</p>;

//   return (
//     <form className="flex flex-col w-full">
//       <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Location</h1>
//       <AddressForm
//         addressLine={addressLine}
//         setAddressLine={setAddressLine}
//         city={city}
//         setCity={setCity}
//         state={state}
//         setState={setState}
//         zipCode={zipCode}
//         setZipCode={setZipCode}
//         country={country}
//         setCountry={setCountry}
//       />
//       <button
//         type="button"
//         onClick={() => setIsMapOpen(true)}
//         className="bg-yellow-400 text-black text-lg py-2 rounded flex items-center justify-center mb-4"
//       >
//         Choose Your Location
//       </button>
//       {isMapOpen && (
//         <MapModal
//           currentPosition={currentPosition}
//           markerPosition={markerPosition}
//           onClose={() => setIsMapOpen(false)}
//           onMapClick={handleMapClick}
//           detectCurrentLocation={detectCurrentLocation}
//           errorMessage={errorMessage}
//         />
//       )}
//       <ActionButtons
//         handleBack={handleBack}
//         handleNext={handleNext}
//         handleSignup={handleSignup}
//         userType={userType}
//       />
//     </form>
//   );
// };

// export default LocationDetails;
import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AddressForm from '../../../components/location/AddressForm';
import MapModal from '../../../components/location/MapModal';
import ActionButtons from '../../../components/location/ActionButtons';

const LocationDetails = ({
  userDetails,
  setUserDetails,
  handleNext,
  handleSignup,
  handleBack,
  userType
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 40.712776, lng: -74.005974 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      latitude: newLat,
      longitude: newLng,
    }));
    setMarkerPosition({ lat: newLat, lng: newLng });
    setCurrentPosition({ lat: newLat, lng: newLng });
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            latitude,
            longitude,
          }));
          setCurrentPosition({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => setErrorMessage('Failed to detect your location. Please enable location services.')
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <form className="flex flex-col w-full">
      <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Location</h1>
      <AddressForm
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <button
        type="button"
        onClick={() => setIsMapOpen(true)}
        className="bg-yellow-400 text-black text-lg py-2 rounded flex items-center justify-center mb-4"
      >
        Choose Your Location
      </button>
      {isMapOpen && (
        <MapModal
          currentPosition={currentPosition}
          markerPosition={markerPosition}
          onClose={() => setIsMapOpen(false)}
          onMapClick={handleMapClick}
          detectCurrentLocation={detectCurrentLocation}
          errorMessage={errorMessage}
        />
      )}
      <ActionButtons
        handleBack={handleBack}
        handleNext={handleNext}
        handleSignup={handleSignup}
        userType={userType}
      />
    </form>
  );
};

export default LocationDetails;
