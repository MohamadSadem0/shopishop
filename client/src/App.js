import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./componets/login";
import Signup from "./componets/signup";
import PhoneRole from "./global/phoneRole/index";
import SuperAdminHome from './pages/superAdmin/SuperAdminHome';
import Sections from './pages/superAdmin/sections/sections';
import AddSection from './pages/superAdmin/addSection/addSection';
import AddCategories from './pages/superAdmin/addSection/addCategories';
import MerchantHome from './pages/merchant/merchantHome/merchantHome';
import MerchantAddStore from './pages/merchant/merchantAddStore/merchantAddStore';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/signup" element={<Signup />} />


        <Route path="/phoneRole" element={<PhoneRole />} />


        <Route path="/superAdmin/home" element={<SuperAdminHome />} />
        <Route path="/superAdmin/sections" element={<Sections />} />
        <Route path="/superAdmin/addSection" element={<AddSection />} />
        <Route path="/superAdmin/sections" element={<AddCategories />} />


        <Route path="/merchant/home" element={<MerchantHome />} />
        <Route path="/merchant/addStore" element={<MerchantAddStore />} />


        <Route path="/user/home" element={<h1>User Home</h1>} />
        <Route path="/biker" element={<h1>Biker Home</h1>} />
        <Route path="/driver" element={<h1>Driver Home</h1>} />
        {/* Catch-all route to handle unmatched paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
