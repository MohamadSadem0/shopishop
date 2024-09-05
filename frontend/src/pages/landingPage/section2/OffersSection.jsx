// OffersSection.jsx
import React from 'react';
import ClickableCard from '../../../components/cards/ClickableCard'; // Adjust the import path as needed
import Img1 from "../../../assets/images/landing page/section2-images/images.jpg"
import Img2 from "../../../assets/images/landing page/section2-images/restaurant-food-combo-offers.jpg"
import Img3 from "../../../assets/images/landing page/section2-images/WhatsApp-Image-2020-10-18-at-1.27.54-PM.jpg"

const OffersSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-[#fff8c0]">
      <ClickableCard src={Img1} to={"/"} style="w-full h-full object-cover" />
      <ClickableCard src={Img2} to={"/"} style="w-full h-full object-cover" />
      <ClickableCard src={Img3} to={"/"} style="w-full h-full object-cover" />
    </div>
  );
};

export default OffersSection;
