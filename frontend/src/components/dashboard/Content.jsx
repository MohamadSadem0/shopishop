import React from 'react';
import Nav from "./DashboardNavbar"
import DashboardItemCard from '../cards/DashboardItemCard ';
const Content = () => {
  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <Nav />
      <div className="flex flex-row space-x-11 space-y-10">
        {/* Left side */}
        <div className="w-2/3">
          {/* First row - Welcome back and role */}
          <div className="flex justify-between  items-center mb-8">
            <div className="text-2xl">Welcome back, John Doe!</div>
            <div className="text-lg">Role: Merchant</div>
          </div>

          {/* Second row - 3 boxes */}
          <div className="flex flex-row  space-x-4 mb-8">
            <div className="w-full p-4 bg-white shadow-md">Website Detail 1</div>
            <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>
            <div className="w-full p-4 bg-white shadow-md">Website Detail 3</div>
          </div>

          {/* Third row - Single box */}
          <div className="w-full flex flex-col p-4 h-[294px] mb-10 bg-white shadow-md">
            <div>Customers numbers</div> 
            <div className="w-full p-4 bg-white shadow-md">Website Detail 1</div>

            </div>
          <div className='flex flex-row space-x-3'>
          <div className="w-full flex flex-col p-4 h-[294px]  bg-white shadow-md">
            <div>Customers numbers</div> 
            <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>

            </div><div className="w-full flex flex-col p-4 h-[294px] bg-white shadow-md">
            <div>Customers numbers</div> 
            <div className="w-full p-4 bg-white shadow-md">Website Detail 2</div>

            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/3 mt-16 h-full">
          {/* Content for the right side */}
          <div className="flex flex-col space-y-4 mb-8">
            <div className="w-full p-4 bg-white shadow-md h-[238px]">Website Detail 1</div>
            <div className="w-full p-4 bg-white shadow-md h-auto">
          <DashboardItemCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;



// <div className="text-2xl mb-8">Welcome back, John Doe!</div>

// <div className="grid grid-cols-2 gap-6">
//   <div className="bg-white p-6 rounded shadow-md">
//     <h3 className="font-bold text-xl mb-4">Service Location</h3>
//     <img
//       src="https://via.placeholder.com/331x164"
//       alt="Service Location"
//       className="rounded"
//     />
//   </div>
//   <div className="bg-white p-6 rounded shadow-md">
//     <h3 className="font-bold text-xl mb-4">Last Added Offer</h3>
//     <img
//       src="https://via.placeholder.com/272x164"
//       alt="Offer"
//       className="rounded"
//     />
//   </div>
//   <div className="bg-white p-6 rounded shadow-md">
//     <h3 className="font-bold text-xl mb-4">Last Added Item</h3>
//     <img
//       src="https://via.placeholder.com/272x164"
//       alt="Item"
//       className="rounded"
//     />
//   </div>
// </div>