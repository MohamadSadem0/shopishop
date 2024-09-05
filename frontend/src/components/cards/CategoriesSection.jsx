// import React from 'react';
// import CategoryCard from './CategoryCard';
// import categoriesData from './categoriesData'; 

// const CategoriesSection = () => {
//   return (
//     <div className="relative w-full h-full p-4">
//       {/* Background Rectangle */}
//       <div className="absolute inset-0 bg-[#585749] rounded-[30px]"></div>

//       {/* Title Text */}
//       <div className="absolute top-4 left-7 flex text-white text-[32px] font-roboto font-bold leading-[48px] sm:text-[24px] sm:leading-[36px]">
//         <span>Categories at a </span>
//         <span className="text-[#DD5838]">Glance</span>
//       </div>

//       {/* Categories Container */}
//       <div className="absolute left-7 right-7 top-[92px] bottom-7 overflow-x-auto overflow-y-hidden flex items-center">
//         <div className="flex flex-row gap-6 sm:gap-4">
//           {categoriesData.map((category, index) => (
//             <CategoryCard key={index} title={category.title} src={category.src} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesSection;

import React, { useRef } from 'react';
import CategoryCard from './CategoryCard';
import categoriesData from './categoriesData';

const CategoriesSection = () => {
  const containerRef = useRef(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll-fast speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="relative w-full h-full p-4">
      {/* Background Rectangle */}
      <div className="absolute inset-0 bg-[#585749] rounded-[30px]"></div>

      {/* Title Text */}
      <div className="absolute top-4 left-7 flex text-white text-[32px] font-roboto font-bold leading-[48px] sm:text-[24px] sm:leading-[36px]">
        <span>Categories at a </span>
        <span className="text-[#DD5838]">Glance</span>
      </div>

      {/* Categories Container */}
      <div
        ref={containerRef}
        className="absolute left-7 right-7 top-[92px] bottom-7 overflow-hidden flex items-center scroll-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-row gap-6 sm:gap-4">
          {categoriesData.map((category, index) => (
            <CategoryCard key={index} title={category.title} src={category.src} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
