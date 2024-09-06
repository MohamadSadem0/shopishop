import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ItemCard from '../../../components/cards/ItemCard';
import itemsData from '../../../data/itemsData'; // Adjust the path as needed

gsap.registerPlugin(ScrollTrigger);

const PopularItemsSection = () => {
  const itemsRef = useRef(null);

 

  return (
    <div className="relative w-full min-h-[400px] p-4">
      {/* Background Rectangle */}
      <div className="bg-[#585749] rounded-[30px] w-full h-full absolute inset-0"></div>

      {/* Container for Title and Items */}
      <div className="relative z-10 flex flex-col w-full h-full">
        {/* Title Text */}
        <h2 className="text-white text-[24px] sm:text-[20px] md:text-[32px] font-roboto font-bold leading-[36px] md:leading-[48px] mb-4 sm:mb-3 md:mb-6">
          Popular Items
        </h2>

        {/* Items Container */}
        <div ref={itemsRef} className="flex flex-wrap gap-4 md:gap-6 justify-center w-full">
          {itemsData.map((item, index) => (
            <ItemCard
              key={index}
              title={item.title}
              price={item.price}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularItemsSection;
