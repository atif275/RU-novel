import React, { useState, useEffect } from 'react';
import { FaCalendar, FaInfoCircle, FaBook, FaComment, FaListAlt } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AuthorProfile = ({ authorData, authorName }) => {
  // Always call hooks at the top level of the component
  const email = useSelector((state) => state.userData.email);
  const [isFollowing, setIsFollowing] = useState(false);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.info(message);

  useEffect(() => {
    // Check if the user is already following the author
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
        setIsFollowing(response.data.follows.includes(authorName));
      } catch (error) {
        // console.error('Error fetching follow status:', error);
      }
    };

    if (email && authorName) {
      fetchFollowStatus();
    }
  }, [email, authorName]);

  const handleFollow = async () => {
    if (!email) {
      notifyInfo('Please log in to follow an author.');
      return;
    }
    try {
      const apiEndpoint = isFollowing ? 'unfollow' : 'follow';
      const response = await axios.post(
        `https://api.ru-novel.ru/api/user/${apiEndpoint}`,
        { authorName, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        notifySuccess(`Author ${isFollowing ? 'unfollowed' : 'followed'} successfully!`);
      } else {
        notifyError('Error updating follow status.');
      }
    } catch (error) {
      notifyError('Error updating follow status.');
      // console.error('Error updating follow status:', error);
    }
  };

  // Return null if there's no author data
  if (!authorData) return null;

  return (
    <div className="bg-white p-[15px] font-[Open Sans, sans-serif]">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <h2 className="h-[48px] text-[18px] text-[#5e738b] mb-[20px] font-semibold border-b border-gray-300">About the author</h2>
      
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between">
        {/* First Div */}
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
            <button className="bg-[#337ab7] text-white text-[12px] px-[10px] py-[5px] w-[100px] h-[30px] mt-2"
            onClick={handleFollow}>
              {isFollowing ? 'Unfollow' : 'Follow'}
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

export default AuthorProfile;
