import React, { useEffect, useState } from 'react';
import SectionMobileCard from './SectionMobileCard';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Banner from './Banner';
import { fetchSections, fetchDiscountItems, fetchShopiiShopItems } from '../../services/sectionService';

const SectionMobile = () => {
  const [sections, setSections] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [shopiiItems, setShopiiItems] = useState([]);

  useEffect(() => {
    const getSections = async () => {
      const data = await fetchSections();

      // Define priority order for specific sections
      const priorityOrder = ['Food', 'Shops', 'Market', 'Butler'];

      // Get priority sections and fill the rest to make a total of 6
      const prioritySections = data.filter(section => priorityOrder.includes(section.name));
      const remainingSections = data.filter(section => !priorityOrder.includes(section.name));
      const finalSections = [...prioritySections, ...remainingSections.slice(0, 6 - prioritySections.length)];

      setSections(finalSections);
    };

    const fetchAdditionalData = async () => {
      const [discountData, shopiiData] = await Promise.all([fetchDiscountItems(), fetchShopiiShopItems()]);
      setDiscounts(discountData);
      setShopiiItems(shopiiData);
    };

    getSections();
    fetchAdditionalData();
  }, []);

  return (
    <div className="p-4 mb-20 bg-[#fff8c0]">
      {/* Banner Section */}
      <Banner 
        title="We're here to help"
        description="Get access to free online medical consultations from 100+ doctors on DRAPP"
        buttonText="Download now"
      />

      {/* Service Menu Grid with Cards */}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        {sections.map((section) => (
          <SectionMobileCard 
            key={section.id} 
            name={section.name} 
            url={section.url} 
          />
        ))}
      </div>

      {/* Now on ShopiiShop Section */}
      <SectionHeader 
        title="Now on ShopiiShop 💥" 
        subtitle="Check out our newest partners, carefully selected just for you."
      />
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {shopiiItems.map((item) => (
          <Card 
            key={item.id} 
            url={item.url} 
            name={item.name} 
            description={item.description} 
            deliveryTime={item.deliveryTime} 
          />
        ))}
      </div>

      {/* Daily Discounts Section */}
      <SectionHeader 
        title="Daily Discounts ✨" 
        subtitle="Get up to 50% OFF on selected restaurants every day!"
      />
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {discounts.map((discount) => (
          <Card 
            key={discount.id} 
            url={discount.url} 
            name={discount.name} 
            description={discount.description} 
            deliveryTime={discount.deliveryTime}
            price={discount.price}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionMobile;
