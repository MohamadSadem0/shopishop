import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-color1 text-white py-8 text-center mt-20">
      <p>© 2024 My Store - All Rights Reserved</p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" className="hover:text-color2">Facebook</a>
        <a href="#" className="hover:text-color2">Twitter</a>
        <a href="#" className="hover:text-color2">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
