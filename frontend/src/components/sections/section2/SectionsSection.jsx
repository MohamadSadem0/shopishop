

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SetcionCard from '../../cards/SetcionCard';
import { fetchSections } from '../../../services/sectionService'; // Import the fetch function
import '../../../styles/Section.css';

gsap.registerPlugin(ScrollTrigger);

const SectionsSection = () => {
  const containerRef = useRef(null);
  const [sections, setSections] = useState([]); // State to hold fetched sections data
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickPrevented, setIsClickPrevented] = useState(false);

  // Fetch sections data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsData = await fetchSections();

        setSections(sectionsData); // Update state with the fetched sections
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsClickPrevented(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(x - startX) > 5) {
      setIsClickPrevented(true);
    }

    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsClickPrevented(false);
    setStartX(e.touches[0].clientX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].clientX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(x - startX) > 5) {
      setIsClickPrevented(true);
    }

    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    if (isClickPrevented) {
      e.preventDefault();
      setIsClickPrevented(false);
    }
  };

  return (
    <div className="relative w-full sm:max-h-[250px] h-[250px] sm:h-[350px] overflow-hidden">
      {/* Background Rectangle */}
      <div className="absolute inset-0 bg-[#585749] sm:bg-[#5B2F13] sm:bg-transparent rounded-[30px]"></div>

      {/* Title Text */}
      <div className="absolute top-4 left-6 flex sm:hidden  text-white text-[28px] sm:text-[20px]  font-roboto font-bold leading-[36px] sm:leading-[48px]">
        <span>Sections  </span>
      </div>

      {/* Categories Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        className="absolute left-6 right-6 top-[60px] sm:top-[80px] h-[150px] sm:h-[180px] overflow-x-auto flex items-center no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <div className="flex flex-row gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <SetcionCard key={index} title={section.name} src={section.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionsSection;
