import React, { useState } from 'react';
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux'; // Import useSelector to get theme

const Info = ({ bookData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  const visibleTags = showAllTags ? bookData.tags : bookData.tags.slice(0, 3);

  // Conditional styles based on theme
  const containerStyles = theme === 'dark'
    ? 'bg-gray-800 text-white' // Dark mode styles
    : 'bg-white text-black'; // Light mode styles

  const tagStyles = theme === 'dark'
    ? 'bg-gray-600 text-white' // Dark mode tag styles
    : 'bg-[#67809f] text-white'; // Light mode tag styles

  const synopsisStyles = theme === 'dark'
    ? 'text-gray-300' // Dark mode text for synopsis
    : 'text-gray-800'; // Light mode text for synopsis

  const buttonStyles = theme === 'dark'
    ? 'text-gray-300' // Dark mode button text
    : 'text-gray-800'; // Light mode button text

  const warningTextStyles = theme === 'dark'
    ? 'text-red-400' // Dark mode warning text
    : 'text-red-500'; // Light mode warning text

  return (
    <div className={`m-0 p-0 mb-4 ${containerStyles}`}>
      <div className="p-4 ml-auto w-full lg:w-2/3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTags.map((tag, index) => (
            <span key={index} className={`px-2 py-1 text-xs ${tagStyles}`}>
              {tag}
            </span>
          ))}
          {bookData.tags.length > 3 && (
            <button
              className="h-5 w-5 text-[#67809f] flex items-center leading-none ml-auto"
              onClick={toggleShowAllTags}
            >
              {showAllTags ? <FaSquareMinus className='w-full h-full'/> : <FaSquarePlus className='w-full h-full'/>}
            </button>
          )}
        </div>

        {/* Warning Messages */}
        {bookData.warnings && bookData.warnings.length > 0 && (
          <div className="mb-4 flex flex-col justify-center items-center">
            <div>
              <span className={`font-bold text-[14px] ${warningTextStyles}`}>Warning: </span>
              <span className={`text-[14px] ${warningTextStyles}`}>This fiction contains:</span>
            </div>
            {bookData.warnings.map((warning, index) => (
              <span key={index} className={`text-[14px] ${warningTextStyles}`}>
                {warning}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <h2 className="font-bold text-[14px]">
            {bookData.title}
          </h2>
        </div>

        {/* Synopsis */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-[200px]'}`}>
          {bookData.synopsis && (
            <div
              className={`mt-2 ${synopsisStyles}`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bookData.synopsis) }}
            />
          )}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mt-4">
          <button onClick={toggleExpansion} className={`font-bold text-[14px] ${buttonStyles}`}>
            {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;