// Section1.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Img2 from "../../assets/images/landing page/couriers-deliver-online-goods-to-customers-vector 1.png";
import Img1 from "../../assets/images/landing page/pngtree-delivery-man-with-yellow-scooter-and-location-icon-vector-illustration-png-image_6468357 1.png";
import Img3 from "../../assets/images/landing page/Arrow 06.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section1 = () => {
  // Your ScrollTrigger setup code can go here if needed

  return (
    <section className="section-1 relative   sm:w-full min-h-screen bg-bg  sm:pt-[100px] pb-10 flex flex-col space-x-10">
      <div className="relative sm:flex-col sm:p-0 flex laptop:justify-center justify-center items-center w-full px-4 md:px-16">
        <div className="text-left w-[526px] sm:w-[300px] flex justify-center items-center text-black text-5xl font-normal leading-[60px]">
          Your Trusted Partner for Swift Deliveries.
        </div>
        <img className="top-image w-[656px] h-[428px] object-contain" src={Img1} alt="Top Right Image" />
      </div>
      <div className="lg:relative sm:flex-col sm:p-0 sm:m-0 flex laptop:justify-center sm:justify-center sm:items-center laptop:items-center laptop:w-full sm:max-w-[300px] max-w-7xl px-4 md:px-16 mt-10 sm:mt-0">
        <img className="bottom-image w-[721px] h-[389px] sm:h-[250px] laptop:object-contain" src={Img2} alt="Bottom Left Image" />
        <img className="arrow-image sm:-rotate-90 sm:max-w-[90px] laptop:w-[251px] h-[81px] sm:h-[200px] object-contain mx-10" src={Img3} alt="Arrow Image" />
        
        <div className='flex items-center justify-center flex-col'>
          <div className="text-right text-black text-4xl font-normal leading-[60px]">
          All Over
          <br />
          Lebanon
        </div>
        <button className="w-[158px] h-[47px] bg-color2 rounded-[10px] flex items-center justify-center mt-8">
          <span className="text-black text-[15px] font-normal">Find more</span>
        </button>
        </div>
      </div>
      
    </section>
  );
};

export default Section1;
