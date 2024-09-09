// Section2.jsx
import React from 'react';
import OffersSection from './OffersSection';
import CategoriesSection from '../section2/CategoriesSection';
import PopularItemsSection from "./PopularItemsSection"


const Section2 = () => {
  return (
    <div className=' h-full w-full flex flex-col items-center gap-6 p-4 bg-[#fff8c0]'>
      <OffersSection />
      <div className='flex justify-center items-center w-full'>
        <button className='bg-[#FEDE02] text-black rounded-[10px] px-4 py-2'>
          Find more
        </button>

 
      </div>
      <CategoriesSection />
      <PopularItemsSection />
    </div>
  );
};

export default Section2;
