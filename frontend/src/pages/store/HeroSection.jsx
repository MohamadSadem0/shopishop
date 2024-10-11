import React from 'react';

const HeroSection = () => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-r from-color1  to-yellow-500 flex justify-center items-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">NIKE Blue Shoes</h1>
        <p className="text-xl max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
        <button className="mt-6 bg-white text-color1 py-3 px-6 rounded-full font-semibold hover:bg-bg transition duration-300">Buy Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
