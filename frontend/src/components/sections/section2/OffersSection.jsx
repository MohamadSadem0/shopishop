// OffersSection.jsx
import React, {  useRef } from 'react';
import ClickableCard from '../../cards/ClickableCard'; // Adjust the import path as needed
import Img1 from "../../../assets/images/landing page/section2-images/images.jpg";
import Img2 from "../../../assets/images/landing page/section2-images/restaurant-food-combo-offers.jpg";
import Img3 from "../../../assets/images/landing page/section2-images/WhatsApp-Image-2020-10-18-at-1.27.54-PM.jpg";


const OffersSection = () => {
  const cardsRef = useRef(null);

 
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-bg">
      <div ref={cardsRef} className="flex flex-wrap gap-6 justify-center">
        <ClickableCard src={Img1} to={"/"} style="w-full h-full object-cover" />
        <ClickableCard src={Img2} to={"/"} style="w-full h-full object-cover" />
        <ClickableCard src={Img3} to={"/"} style="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default OffersSection;
