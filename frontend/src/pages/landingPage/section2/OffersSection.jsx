// OffersSection.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ClickableCard from '../../../components/cards/ClickableCard'; // Adjust the import path as needed
import Img1 from "../../../assets/images/landing page/section2-images/images.jpg";
import Img2 from "../../../assets/images/landing page/section2-images/restaurant-food-combo-offers.jpg";
import Img3 from "../../../assets/images/landing page/section2-images/WhatsApp-Image-2020-10-18-at-1.27.54-PM.jpg";

gsap.registerPlugin(ScrollTrigger);

const OffersSection = () => {
  const cardsRef = useRef(null);

  // useEffect(() => {
  //   gsap.fromTo(
  //     cardsRef.current.children,
  //     { y: 50, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 1,
  //       stagger: 0.3,
  //       scrollTrigger: {
  //         trigger: cardsRef.current,
  //         start: 'top top',
  //         end: 'top top',
  //         scrub: true
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-[#fff8c0]">
      <div ref={cardsRef} className="flex flex-wrap gap-6 justify-center">
        <ClickableCard src={Img1} to={"/"} style="w-full h-full object-cover" />
        <ClickableCard src={Img2} to={"/"} style="w-full h-full object-cover" />
        <ClickableCard src={Img3} to={"/"} style="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default OffersSection;
