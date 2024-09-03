import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Section2 = () => {
  useEffect(() => {
    console.log("Initial Scroll Position:", window.scrollY);
  
    gsap.fromTo('.section2-title', { opacity: 0, y: 100 }, { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      scrollTrigger: { 
        trigger: '.section-2', 
        start: 'top center', 
        end: 'bottom center', 
        scrub: true 
      } 
    });
  
    ScrollTrigger.create({
      trigger: '.section-2',
      start: 'top 80%', 
      onEnterBack: () => {
        gsap.to(window, { scrollTo: { y: '.section-1', offsetY: 0 }, duration: 1, ease: 'power2.out' });
      },
      once: false
      
    });
    console.log("erkjeoi");
    
  }, []);
  

  return (
    <section className="section-2 w-full h-screen bg-[#e0f7fa] flex items-center justify-center">
      <h2 className="section2-title text-4xl font-semibold">Welcome to Section 2</h2>
    </section>
  );
};

export default Section2;
