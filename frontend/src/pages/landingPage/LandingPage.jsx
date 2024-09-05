import React from 'react';
import Navbar from '../../components/NavBar';
import Section1 from './Section1';
import Section2 from './section2/Section2';

const LandingPage = () => {
  return (
    <div className="relative ">
      <Navbar />
      <div className='flex flex-col'>
      {/* <Section1 /> */}
      <Section2 />
      </div>
    </div>
  );
};

export default LandingPage;
