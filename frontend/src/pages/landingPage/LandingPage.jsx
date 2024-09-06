// LandingPage.jsx
import React from 'react';
import Navbar from '../../components/NavBar';
import Section1 from './Section1';
import Section2 from './section2/Section2';
import Section3 from './section3/Section3';

const LandingPage = () => {
  return (
    <div className="relative pl-[71px] landingpage pr-[71px] sm:p-0 lg:pr-auto w-full min-h-screen bg-[#fff8c0]">
      <Navbar />
      <div className='flex flex-col'>
        <Section1 />
        <Section2 />
        <Section3/>
      </div>
    </div>
  );
};

export default LandingPage;
