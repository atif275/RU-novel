import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaTrophy } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AuthorInfo = ({ authorData, authorName }) => {
  const email = useSelector((state) => state.userData.email);
  const [isFollowing, setIsFollowing] = useState(false);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.info(message);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (email && authorName) {
        try {
          const response = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
          setIsFollowing(response.data.follows.includes(authorName));
        } catch (error) {
          // console.error('Error fetching follow status:', error);
        }
      }
    };

    fetchFollowStatus();
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

  if (!authorData) return null;

  return (
    <div className="w-full bg-white p-4 shadow-md mb-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {/* Author Section */}
      <div className="text-gray-700 text-sm font-bold flex items-center space-x-2">
        <FaUser />
        <span>AUTHOR</span>
      </div>

      <hr className="border-gray-300 mt-4" />

      <div className="flex flex-col items-center space-y-4 mt-4">
        {/* Author Avatar */}
        <img
          src={authorData.profilePicture || "https://www.royalroadcdn.com/public/avatars/avatar-460434-AACAmlsHkBU.png?time=1722049568"}
          alt="Author Avatar"
          className="w-32 h-32 object-cover rounded-full"
        />

        {/* Author Name */}
        <span className="text-red-500 font-bold text-lg">{authorData.username}</span>

        {/* Follow Button */}
        <button
          className={`px-4 py-2 border border-gray-400 rounded-lg font-semibold hover:bg-gray-200`}
          onClick={handleFollow}
        >
          {isFollowing ? 'Unfollow Author' : 'Follow Author'}
        </button>
      </div>

      {/* Achievements Section */}
      <div className="text-gray-700 text-sm font-bold flex items-center space-x-2 mt-8">
        <FaTrophy />
        <span>ACHIEVEMENTS</span>
      </div>

      <hr className="border-gray-300 mt-4" />

      {/* Achievements Icons */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <img
          src="https://www.royalroadcdn.com/public/achievements/village-head-vi-small-AADAITeyIg0.png"
          alt="Achievement 1"
          className="w-12 h-12 object-cover"
        />
        <img
          src="https://www.royalroadcdn.com/public/achievements/350-comments-small-AACA7hC0Ig0.png"
          alt="Achievement 2"
          className="w-12 h-12 object-cover"
        />
        <img
          src="https://www.royalroadcdn.com/public/achievements/word-smith-13-small-AAAA+ygmIg0.png"
          alt="Achievement 3"
          className="w-12 h-12 object-cover"
        />
        <img
          src="https://www.royalroadcdn.com/public/achievements/250000-views-small-AABA6oQMIw0.png"
          alt="Achievement 4"
          className="w-12 h-12 object-cover"
        />
        <img
          src="https://www.royalroadcdn.com/public/achievements/top-list-1000-small-AADA6AGfJQ0.png"
          alt="Achievement 5"
          className="w-12 h-12 object-cover"
        />
      </div>
    </div>
  );
};

export default AuthorInfo;
