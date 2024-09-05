// import React from 'react';

// const CategoryCard = ({ title, src }) => {
//   return (
//     <div className="relative w-[117px] h-[132px] sm:w-[90px] sm:h-[115px]">
//       {/* Category Background */}
//       <div className="absolute w-full h-full bg-[#EFECD6] rounded-[20px]"></div>
//       {/* Category Image */}
//       <div className="absolute left-3 top-1 w-[90px] h-[90px] rounded-full border-[0.1px] border-black overflow-hidden">
//         <img src={src} alt={title} className="object-cover w-full h-full" />
//       </div>
//       {/* Category Title */}
//       <div className="absolute top-[95px] left-0 w-full text-center text-black text-[18px] font-roboto font-normal leading-[27px] sm:top-[85px]">
//         {title}
//       </div>
//     </div>
//   );
// };

// export default CategoryCard;

// CategoryCard.jsx
// CategoryCard.jsx
// CategoryCard.jsx
import React from 'react';

const CategoryCard = ({ title, src }) => {
  return (
    <div className="relative w-[117px] h-[132px] bg-[#EFECD6] rounded-[20px] flex flex-col items-center justify-center">
      <div className="relative w-[90px] h-[120px] flex flex-col items-center justify-center">
        <img className="w-[90px] h-[90px] rounded-[35.56px] border-[0.10px] border-black mb-4" src={src} alt={title} />
        <div className="absolute bottom-0 text-black text-[18px] font-roboto font-normal leading-[27px]">
          {title}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
