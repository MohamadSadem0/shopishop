import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Img2 from "../../assets/images/landing page/couriers-deliver-online-goods-to-customers-vector 1.png";
import Img1 from "../../assets/images/landing page/pngtree-delivery-man-with-yellow-scooter-and-location-icon-vector-illustration-png-image_6468357 1.png";
import Img3 from "../../assets/images/landing page/Arrow 06.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section1 = () => {
  // useEffect(() => {
  //   // Create ScrollTrigger for jumping to Section 2
  //   const scrollTrigger1 = ScrollTrigger.create({
  //     trigger: '.section-2',
  //     start: '  top top',
  //     markers:true,

  //     onLeave: () => { // Trigger when scrolling past Section 1
  //       gsap.to(window, { 
  //         scrollTo: { y: '.section-2', offsetY: 0 }, 
  //         duration: 1, 
  //         ease: 'power2.out' 
  //       });
  //     },
  //     once: false, 
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     scrollTrigger1.kill(); // Manually kill the ScrollTrigger instance
  //   };
  // }, []);
 
  return (
    <section className="section-1 relative w-full min-h-screen bg-[#fff8c0] pt-[200px] pb-10 flex flex-col space-x-10">
      <div className="relative flex justify-between w-full px-4 md:px-16">
        <div className="text-left w-[526px] flex justify-center items-center text-black text-5xl font-normal leading-[60px]">
          Your Trusted Partner for Swift Deliveries.
        </div>
        <img className="top-image w-[656px] h-[498px] object-contain" src={Img1} alt="Top Right Image" />
      </div>
      <div className="relative flex justify-between items-center w-full max-w-7xl px-4 md:px-16 mt-20">
        <img className="bottom-image w-[721px] h-[389px] object-contain" src={Img2} alt="Bottom Left Image" />
        <img className="arrow-image w-[251px] h-[81px] object-contain mx-10" src={Img3} alt="Arrow Image" />
        <div className="text-right text-black text-4xl font-normal leading-[60px]">
          All Over
          <br />
          Lebanon
        </div>
      </div>
      <div className="absolute right-0 bottom-8 flex flex-col items-end px-4">
        <button className="w-[158px] h-[47px] bg-[#fede02] rounded-[10px] flex items-center justify-center mt-8">
          <span className="text-black text-[15px] font-normal">Find more</span>
        </button>
      </div>
    </section>
  );
};

export default Section1;
