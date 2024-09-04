import React from 'react';
import { FaCalendar, FaInfoCircle, FaBook, FaComment, FaListAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const AuthorProfile2 = ({ authorData, onUnfollow }) => {
  if (!authorData) return null;

  return (
    <div className="bg-white p-[15px] font-[Open Sans, sans-serif] border-b border-gray-300 pb-12">
      
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 justify-center items-center w-full md:w-1/6">
          <div className="relative w-[100px] h-[100px]">
            <img
              src={authorData.profilePicture || "https://www.royalroadcdn.com/public/avatars/avatar-460434-AACAmlsHkBU.png?time=1722049568"}
              alt="Author Badge"
              className="absolute w-[50px] h-[50px] object-cover left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            />
            <img
              src="https://www.royalroad.com/dist/img/borders/bordersbronze-5-min.png"
              alt="Border Frame"
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className="bg-[#337ab7] text-white text-[12px] px-[10px] py-[5px] w-[100px] h-[30px] flex gap-1 items-center">
              <FaBook /> {authorData.fictions.length} Fictions
            </button>
            <button className="bg-[#337ab7] text-white text-[12px] px-[10px] py-[5px] w-[100px] h-[30px] mt-2 flex gap-1 items-center">
              <FaComment /> 0 Posts
            </button>
            <button className="bg-[#337ab7] text-white text-[12px] px-[10px] py-[5px] w-[100px] h-[30px] mt-2 flex gap-1 items-center">
              <FaListAlt /> 0 Threads
            </button>
          </div>
        </div>

        {/* Middle Div */}
        <div className="flex flex-col justify-center text-black w-full md:w-3/5">
          <div className='flex items-center gap-4 mb-2'>
            <h3 className="text-[36px] font-bold text-[#5e738b]">{authorData.username}</h3>
            <button
              onClick={() => onUnfollow(authorData.username)}
              className="bg-[#337ab7] text-white text-[12px] px-[10px] py-[5px] w-[100px] h-[30px] mt-2"
            >
              Unfollow
            </button>
          </div>
          <div className='flex flex-col md:flex-row mb-2 gap-1 md:gap-3'>  
            <p className="text-[14px] flex gap-1 items-center"><FaCalendar /> {new Date(authorData.createdAt).toLocaleString()}</p>
            <p className="text-[14px] flex gap-1 items-center"><FaLocationPin /> {authorData.location || 'Unknown'}</p>
          </div>
          <p className="text-[14px] mb-2 flex gap-1 items-center">
            <FaInfoCircle /> <strong>Bio:</strong> {authorData.bio || 'No bio available'}
          </p>
          <ul className="text-[14px] list-disc list-inside">
            {authorData.fictions.map((fiction, index) => (
              <li key={index}>
                {fiction}
              </li>
            ))}
          </ul>
        </div>

        {/* Last Div */}
        <div className="flex flex-col justify-center w-full md:w-1/5">
          <h3 className="text-[18px] text-[#e7505a] font-bold border-b border-gray-300 pb-3">Achievements</h3>
          <div className="flex flex-wrap justify-start gap-6 mt-4">
            <img
              src="https://www.royalroadcdn.com/public/achievements/village-head-vi-small-AADAITeyIg0.png"
              alt="Achievement 1"
              className="w-8 h-8 object-cover"
            />
            <img
              src="https://www.royalroadcdn.com/public/achievements/350-comments-small-AACA7hC0Ig0.png"
              alt="Achievement 2"
              className="w-8 h-8 object-cover"
            />
            <img
              src="https://www.royalroadcdn.com/public/achievements/word-smith-13-small-AAAA+ygmIg0.png"
              alt="Achievement 3"
              className="w-8 h-8 object-cover"
            />
            <img
              src="https://www.royalroadcdn.com/public/achievements/250000-views-small-AABA6oQMIw0.png"
              alt="Achievement 4"
              className="w-8 h-8 object-cover"
            />
            <img
              src="https://www.royalroadcdn.com/public/achievements/top-list-1000-small-AADA6AGfJQ0.png"
              alt="Achievement 5"
              className="w-8 h-8 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile2;
