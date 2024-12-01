// Banner.jsx
import React from 'react';

const Banner = ({ title, description, buttonText }) => (
  <div className="bg-teal-500 p-4 rounded-lg text-center text-white mb-4">
    <p className="font-semibold text-lg">{title}</p>
    <p>{description}</p>
    <button className="mt-3 bg-white text-teal-500 px-4 py-2 rounded-full">{buttonText}</button>
  </div>
);

export default Banner;
