// PopularItemsSection.jsx
import React from 'react';
import ItemCard from '../../../components/cards/ItemCard';

const PopularItemsSection = () => {
  const items = [
    { title: 'Item 1', price: '7.99', imageSrc: 'https://via.placeholder.com/144x159' },
    { title: 'Item 2', price: '5.99', imageSrc: 'https://via.placeholder.com/144x159' },
    { title: 'Item 3', price: '3.99', imageSrc: 'https://via.placeholder.com/144x159' },
    { title: 'Item 4', price: '9.99', imageSrc: 'https://via.placeholder.com/144x159' },
    { title: 'Item 5', price: '6.99', imageSrc: 'https://via.placeholder.com/144x159' },
    { title: 'Item 6', price: '4.99', imageSrc: 'https://via.placeholder.com/144x159' },
  ];

  return (
    <div className="relative w-full h-full p-4">
      {/* Background Rectangle */}
      <div className="absolute w-full h-[720px] bg-[#585749] rounded-[30px]"></div>

      {/* Title Text */}
      <div className="absolute left-10 top-7 text-white text-[32px] font-roboto font-bold leading-[48px] sm:text-[24px] sm:leading-[36px]">
        Popular Items
      </div>

      {/* Items Container */}
      <div className="absolute left-10 top-[110px] flex flex-wrap gap-6 sm:gap-4">
        {items.map((item, index) => (
          <ItemCard key={index} title={item.title} price={item.price} imageSrc={item.imageSrc} />
        ))}
      </div>
    </div>
  );
};

export default PopularItemsSection;
