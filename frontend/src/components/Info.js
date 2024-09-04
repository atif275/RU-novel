import React, { useState } from 'react';
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import DOMPurify from 'dompurify';

const Info = ({ bookData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  const visibleTags = showAllTags ? bookData.tags : bookData.tags.slice(0, 3);

  return (
    <div className='m-0 p-0 bg-white mb-4'>
      <div className="p-4 bg-white ml-auto w-full lg:w-2/3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTags.map((tag, index) => (
            <span key={index} className="bg-[#67809f] text-white px-2 py-1 text-xs">
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
            <div><span className="text-red-500 text-[14px] font-bold">Warning: </span>
              <span className="text-red-500 text-[14px]">This fiction contains:</span>
            </div>
            {bookData.warnings.map((warning, index) => (
              <span key={index} className="text-red-500 text-[14px]">
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
              className="text-gray-800 text-[14px] mt-2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bookData.synopsis) }}
            />
          )}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mt-4">
          <button onClick={toggleExpansion} className="text-gray-800 font-bold text-[14px]">
            {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
