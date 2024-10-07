import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get theme

const InnerContainer = ({ children }) => {
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  // Conditional styles based on theme
  const containerStyles = theme === 'dark'
    ? 'bg-black text-white'  // Dark mode background and text color
    : 'bg-gray-200 text-black'; // Light mode background and text color

  return (
    <div className={`block w-full m-0 px-4 ${containerStyles}`}>
      { children }
    </div>
  );
};

export default InnerContainer;