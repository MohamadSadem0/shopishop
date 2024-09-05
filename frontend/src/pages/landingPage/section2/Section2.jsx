import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import PopularItemsSection from './PopularItemsSection';
import CategoriesSection from '../../../components/cards/CategoriesSection';
import ClickableCard from '../../../components/cards/ClickableCard';
import Img1 from "../../../assets/images/landing page/section2-images/images.jpg"
import Img2 from "../../../assets/images/landing page/section2-images/restaurant-food-combo-offers.jpg"
import Img3 from "../../../assets/images/landing page/section2-images/WhatsApp-Image-2020-10-18-at-1.27.54-PM.jpg"

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
    <div className='pt-[200px] relative w-full  flex flex-wrap justify-center gap-6 p-4 bg-[#fff8c0]'>
      
        <ClickableCard src={Img1} to={"/"} style=" w-full h-full object-cover" />
        <ClickableCard src={Img2} to={"/"} style=" w-full h-full object-cover"/>
        <ClickableCard src={Img3} to={"/"} style=" w-full h-full object-cover"/>
        
        <CategoriesSection/>
    
     {/* <PopularItemsSection/> */}
    </div>
  );
};

export default Section2;
