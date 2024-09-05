import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import PopularItemsSection from './PopularItemsSection';
import CategoriesSection from '../../../components/cards/CategoriesSection';
import ClickableCard from '../../../components/cards/ClickableCard';

import Button from "../../../components/common/Button"
import OffersSection from './OffersSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section2 = () => {
  // useEffect(() => {
  //   // Create ScrollTrigger for jumping back to Section 1
  //   const scrollTrigger2 = ScrollTrigger.create({
  //     trigger: '.section-2',
  //     start: 'top top', // When the top of Section 2 hits the top of the viewport
  //     onEnterBack: () => { // Trigger when scrolling back into Section 2 from below
  //       gsap.to(window, { 
  //         scrollTo: { y: '.section-1', offsetY: 0 }, 
  //         duration: 1, 
  //         ease: 'power2.out' 
  //       });
  //     },
  //     once: false, 
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     scrollTrigger2.kill(); // Manually kill the ScrollTrigger instance
  //   };
  // }, []);

  return (
    <div className='pt-[200px] relative w-full   justify-center gap-6 p-4 bg-[#fff8c0]'>
      
<OffersSection/>
        <Button className='  pl-auto pr-auto'/>
        

        <CategoriesSection/>
    
     {/* <PopularItemsSection/> */}
    </div>
  );
};

export default Section2;
