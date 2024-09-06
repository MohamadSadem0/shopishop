import React from 'react';
import Truck from "../../../assets/images/landing page/section3-icons/Truck.svg";
import Star from "../../../assets/images/landing page/section3-icons/Star.svg";
import healthy from "../../../assets/images/landing page/section3-icons/healthy icon.svg";

const Section3 = () => {
  return (
    <section className="w-11/12 h-full flex flex-col gap-16 p-8 mx-auto">
      {/* Title and Description */}
      <div className="flex flex-col justify-start items-start gap-8">
        <h2 className="w-full text-black text-2xl md:text-4xl font-roboto font-normal leading-[48px] break-words">
          Who we are?
        </h2>
        <p className="text-black text-lg md:text-2xl w-full md:w-2/3 font-roboto font-normal leading-[36px] break-words">
          At ShopiiShop, we are Lebanon's reliable delivery service, specializing in the fast and secure transport of various products. From groceries to gifts, our dedicated team ensures prompt and safe delivery, making your experience seamless and trustworthy.
        </p>
      </div>

      {/* Responsive Cards */}
      <div className="flex flex-row md:flex-row justify-center items-center md:items-start gap-8 md:gap-12 w-full">
        {/* Card: Fast Delivery */}
        <div className="relative flex flex-col justify-center items-center w-72 md:w-80 h-72 md:h-80">
          <div className="absolute inset-0 bg-black bg-opacity-70 shadow-lg rounded-[45px] backdrop-blur-[27.9px]" />
          <div className="relative z-10 flex flex-col justify-center items-center gap-4">
            <img src={Star} alt="Fast Delivery" className="w-24 h-24" />
            <h3 className="text-center text-white text-2xl md:text-3xl font-[Bebas Neue]">
              FAST DELIVERY
            </h3>
            <p className="text-center text-white text-sm md:text-lg font-[Lato]">
              Your cravings can’t wait—neither<br />should you. Enjoy lightning-fast<br />delivery right to your door!
            </p>
          </div>
        </div>

        {/* Card: High Ratings */}
        <div className="relative flex flex-col justify-center items-center w-72 md:w-80 h-72 md:h-80">
          <div className="absolute inset-0 bg-black bg-opacity-70 shadow-lg rounded-[45px] backdrop-blur-[27.9px]" />
          <div className="relative z-10 flex flex-col justify-center items-center gap-4">
          <img src={Truck} alt="High Ratings" className="w-24 h-24" />

            <h3 className="text-center text-white text-2xl md:text-3xl font-[Bebas Neue]">
              HIGH RATINGS
            </h3>
            <div className="text-center text-white text-4xl md:text-5xl font-[Bebas Neue]">
              999+
            </div>
          </div>
        </div>

        {/* Card: Serve Healthy Food */}
        <div className="relative flex flex-col justify-center items-center w-72 md:w-80 h-72 md:h-80">
          <div className="absolute inset-0 bg-black bg-opacity-70 shadow-lg rounded-[45px] backdrop-blur-[27.9px]" />
          <div className="relative z-10 flex flex-col justify-center items-center gap-4">
          <img src={healthy} alt="Serve Healthy Food" className="w-24 h-24" />

            <h3 className="text-center text-white text-2xl md:text-3xl font-[Bebas Neue]">
              SERVE HEALTHY FOOD
            </h3>
            <p className="text-center text-white text-sm md:text-lg font-[Lato]">
              We care about your health,<br />serving up fresh, healthy<br />dishes made just for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
