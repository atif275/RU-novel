import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector for theme

const FnContainer = ({ children }) => {
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  // Conditional styles based on theme
  const containerStyles = theme === 'dark'
    ? 'bg-[#333333] text-white' // Dark mode background and text
    : 'bg-slate-600 text-black'; // Light mode background and text

  return (
    <div className={`block lg:mx-[80px] xl:mx-[160px] mx-0 my-0 ${containerStyles}`}>
      {children}
    </div>
  );
};

export default FnContainer;