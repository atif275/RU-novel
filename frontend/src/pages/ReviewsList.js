import React, { useState, useEffect } from 'react';
import ReviewSection from '../components/ReviewCard2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const email = useSelector((state) => state.userData.email);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserAndReviews = async () => {
      try {
        // Fetch the username based on the email
        const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
        const { username } = userResponse.data;
        setUsername(username);

        // Fetch the reviews by the username
        const reviewsResponse = await axios.get(`https://api.ru-novel.ru/api/reviews/usersss/${username}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching user data and reviews:', error);
      }
    };

    if (email) {
      fetchUserAndReviews();
    }
  }, [email]);

  const handleReviewDelete = (reviewId) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
  };

  const messageOptions = [
    { key: 'compose', icon: 'fa-envelope', label: 'Compose', link: '/private/send', isActive: true },
    { key: 'inbox', icon: 'fa-folder', label: 'Inbox', link: '/private/1' },
    { key: 'sentItems', icon: 'fa-folder-open', label: 'Sent Items', link: '/private/2' },
    { key: 'drafts', icon: 'fa-folder-open', label: 'Drafts', link: '/private/3' },
    { key: 'trashCan', icon: 'fa-trash', label: 'Trash Can', link: '/private/4' }
  ];

  const settingsOptions = [
    { key: 'profileInfo', icon: "fa-id-card", label: "Profile Info", link: "/account" },
    { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
    { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
    { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
    { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
    { key: 'referFriend', icon: "fa-envelope-square", label: "Refer A Friend", link: "/account/refer-a-friend" }
  ];

  const securityOptions = [
    { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
    { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
    { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
    { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
    { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
    { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' }
  ];

  const notificationOptions = [
    { icon: 'fa-exclamation-circle', label: 'General Settings', link: '/account/notifications' },
    { icon: 'fa-list-alt', label: 'Threads', link: '/notifications/threads' },
    { icon: 'fa-bell', label: 'Notification History', link: '/notifications/list' }
  ];

  const forumOptions = [
    { icon: 'fa-home', label: 'UserCP', link: '/my/usercp' },
    { icon: 'fa-list', label: 'Edit Signature', link: '/account/signature' }
  ];

  const myOptions = [
    { icon: 'fa-book', label: 'Fictions', link: '/author-dashboard' },
    { icon: 'fa-bookmark', label: 'Follow List', link: '/my/follows' },
    { icon: 'fa-star', label: 'Favorites', link: '/my/favorites' },
    { icon: 'fa-clock', label: 'Read Later', link: '/my/readlater' },
    { icon: 'fa-history', label: 'Reading History', link: '/my/history' },
    { icon: 'fa-star-half-alt', label: 'Reviews', link: '/my/reviews' },
    { icon: 'fa-comments', label: 'Comments', link: '/my/comments' },
    
  ];

  return (
    <div className="w-full bg-cover bg-center bg-fixed">
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
        <div className="flex mt-4">
          {/* Sidebar */}
          <div className="w-48 shadow-lg rounded-lg h-auto">
            {/* Messages Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">Messages</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
                {messageOptions.map((option) => (
                  <li
                    key={option.key}
                    className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                  >
                    <i className={`fas ${option.icon} text-black mr-2`}></i>
                    <a href={option.link} className="flex-grow">{option.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Settings Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">Settings</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
                {settingsOptions.map((option) => (
                  <li
                    key={option.key}
                    className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                  >
                    <i className={`fas ${option.icon} text-black mr-2`}></i>
                    <a href={option.link} className="flex-grow">{option.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security & Privacy Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">Security & Privacy</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
                {securityOptions.map((option, index) => (
                  <li
                    key={index}
                    className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                  >
                    <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                    <a href={option.link} className="flex-grow">
                      {option.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notifications Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">Notifications</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
                {notificationOptions.map((option, index) => (
                  <li
                    key={index}
                    className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                  >
                    <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                    <a href={option.link} className="flex-grow">
                      {option.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forum Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">Forum</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
                {forumOptions.map((option, index) => (
                  <li
                    key={index}
                    className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                  >
                    <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                    <a href={option.link} className="flex-grow">
                      {option.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Section */}
            <div className="mt-4 bg-white">
              <div className="bg-gray-600 text-white text-md p-2 pl-4">My</div>
              <ul className="divide-y divide-gray-200 p-2 text-sm">
              {myOptions.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                  <a href={option.link} className="flex-grow">
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-4 mt-4">
        <div className="flex space-x-8 mb-6 ml-1">
                <Link to="/fictions" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Fictions</Link>
                <Link to="/bookshelf" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Bookshelf</Link>
                <Link to="/my/history" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">History</Link>
                <Link to="/my/reviews" className="text-gray-900 font-bold border-b-4 border-blue-500">Reviews</Link>
                <Link to="/my/comments" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Comments</Link>
            </div>
          <ReviewSection reviews={reviews} onReviewDelete={handleReviewDelete} />
        </div>
      </div>
    </div>
  </div>
  );
}

export default ReviewsList;