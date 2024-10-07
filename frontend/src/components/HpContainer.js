import React from 'react';
import { useSelector } from 'react-redux';

const HpContainer = ({ children }) => {
  const theme = useSelector(state => state.userData.theme); // Get the current theme

  // Conditional classes based on the selected theme
  const containerStyles = theme === 'dark' 
    ? 'bg-[#1a1a1a] text-white'  // Dark mode styles
    : 'bg-[#eff3f8] text-black';  // Light mode styles (default)

  return (
    <div
      className={`
        ${containerStyles} 
        xl:mx-[200px] lg:mx-[100px] mx-0
        px-4 py-4
      `}
    >
      {children}
    </div>
  );
};

export default HpContainer;