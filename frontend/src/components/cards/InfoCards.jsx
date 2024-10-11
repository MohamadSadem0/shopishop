import React from 'react';
import { FaGlobe, FaComments, FaLock, FaHeadset } from 'react-icons/fa'; // Import icons from Font Awesome

const InfoCards = () => {
  const infoCards = [
    { title: 'World Shopping', desc: 'Worldwide delivery', icon: <FaGlobe /> },
    { title: 'Customer Feedback', desc: '99% satisfaction', icon: <FaComments /> },
    { title: 'Payment Secured', desc: 'Safe payments', icon: <FaLock /> },
    { title: '24/7 Support', desc: 'Helpline - 121', icon: <FaHeadset /> },
  ];

  return (
    <div className="flex flex-wrap justify-around gap-8 mt-10 px-4">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center flex-grow p-6 bg-white rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          {/* Icon */}
          <div className="text-5xl text-color2 mb-4">
            {card.icon}
          </div>

          {/* Card content */}
          <h3 className="text-xl font-bold text-color1 mb-2">{card.title}</h3>
          <p className="text-gray-500">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
