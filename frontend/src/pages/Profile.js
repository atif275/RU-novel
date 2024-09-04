import React, { useState } from 'react';
import { FaBook, FaCommentDots, FaStar, FaStream, FaMailBulk, FaAward, FaUserAlt, FaUser, FaTrophy, FaHeart, FaThumbsUp, FaPen, FaComment } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { BiUserCircle } from 'react-icons/bi';
import { MdRateReview, MdMessage, MdStarBorder } from 'react-icons/md';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const user = useSelector((state) => state.userData.user);
  // Mapping of tabs to icons
  const tabIcons = {
    fictions: <FaBook className="inline mr-2 text-xl" />,
    reviews: <FaCommentDots className="inline mr-2 text-xl" />,
    favorites: <FaStar className="inline mr-2 text-xl" />,
    threads: <FaStream className="inline mr-2 text-xl" />,
    posts: <FaMailBulk className="inline mr-2 text-xl" />,
    achievements: <FaAward className="inline mr-2 text-xl" />,
    reputation: <MdStarBorder className="inline mr-2 text-xl" />,
  };
  const profilePictureUrl = user.profilePicture
   

  return (
    <div className="w-full bg-cover bg-center bg-fixed">
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
        {/* Image Container */}
        <div className="relative flex justify-center items-center p-4 bg-gradient-to-r from-blue-400 to-blue-200">
          <div className="m-4">
            {/* Background Image (Avatar) */}
            <img
              src={profilePictureUrl}
              alt="Avatar"
              className="w-[75px] h-[75px] object-cover rounded-full"
            />

            {/* Overlay Image (Border) */}
            <img
              src={user.profilePictureBorder}
              alt="Border"
              className="absolute w-100 h-40"  // Adjust width and height to fit perfectly around the avatar
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Center the border image
            />
          </div>
          {/* <img src={profilePictureUrl}
            alt={user.username} className="h-24 w-24 rounded-full" /> */}
          {/* Buttons in the upper right corner */}
          <div className=''>
            <div className="absolute top-0 right-0 flex">
              <button className="bg-white p-2 mr-1 rounded-lg shadow-lg m-4">
                <FaComment className="text-blue-500" />
              </button>
              <button className="bg-white p-2 rounded-lg shadow-lg m-4 ml-1">
                <FaPen className="text-blue-500 " />
              </button>
            </div>
          </div>
        </div>
        {/* User Info and Stats */}
        <div className="bg-white p-4 shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="mr-10"><strong>0</strong> Follows</div>
              <div><strong>0</strong> Favorites</div>
            </div>
            <div className="text-3xl font-bold">{user.username}</div>
            <div className="flex">
              <div className="mr-10"><strong>0</strong> Reviews</div>
              <div><strong>0</strong> Fictions</div>
            </div>
          </div>
        </div>
        {/* Navigation Sidebar and Main Content */}
        <div className="flex mt-4">
          {/* Navigation Sidebar */}
          <div className="w-48 bg-white shadow-lg rounded-lg" style={{ maxHeight: '330px', overflowY: 'auto' }}>
            <ul className="divide-y divide-gray-200">
              {['overview', 'fictions', 'reviews', 'favorites', 'threads', 'posts', 'achievements', 'reputation'].map((tab) => (
                <li
                  key={tab}
                  className={`hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center ${activeTab === tab ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'overview' && <BiUserCircle className="mr-2" />}
                  {tab === 'fictions' && <FaBook className="mr-2" />}
                  {tab === 'reviews' && <FaCommentDots className="mr-2" />}
                  {tab === 'favorites' && <FaStar className="mr-2" />}
                  {tab === 'threads' && <FaStream className="mr-2" />}
                  {tab === 'posts' && <FaMailBulk className="mr-2" />}
                  {tab === 'achievements' && <FaAward className="mr-2" />}
                  {tab === 'reputation' && <FaUserAlt className="mr-2" />}
                  {tab[0].toUpperCase() + tab.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          {/* Main Content */}
          <div className="flex-1 ml-4">
            {activeTab === 'overview' ? (
              <>
                <div className='mb-4 bg-white shadow-lg rounded-lg p-4'>
                  <FaUser className="inline mr-2 text-xl" /><h2 className="inline text-xl font-bold mb-2">Personal Information</h2>
                  <div className="border-t mt-2 pt-2 space-y-1">
                    {["Joined: 8/4/2024, 1:04 PM", "Last Active: 8/19/2024, 6:13 PM", `Gender: ${user.gender || ''}`, `Location: ${user.location || ''}`, `Bio: ${user.bio || ''}`].map((info, idx) => (
                      <p key={idx} className="border-b border-gray-200 pb-2">{info}</p>
                    ))}
                  </div>
                </div>
                <div className='mt-4 mb-4 bg-white shadow-lg rounded-lg p-4'>
                  <MdRateReview className="inline mr-2 text-xl" /><h2 className="inline text-xl font-bold mt-4 mb-2">Activity</h2>
                  <div className="border-t mt-2 pt-2 space-y-1">
                    {["Follows: 0", "Favorites: 0", "Ratings: 0", "Reviews: 0", "Comments: 0"].map((activity, idx) => (
                      <p key={idx} className="border-b border-gray-200 pb-2">{activity}</p>
                    ))}
                  </div>
                </div>
                <div className=' bg-white shadow-lg rounded-lg p-4'>
                  <FaTrophy className="inline mr-2 text-xl" /><h2 className="inline text-xl font-bold mt-4 mb-2">Author Information</h2>
                  <div className="border-t mt-2 pt-2 space-y-1">
                    {["Fictions: 0", "Total Words: 0", "Total Reviews Received: 0", "Total Ratings Received: 0", "Followers: 0", "Favorites: 0"].map((authorInfo, idx) => (
                      <p key={idx} className="border-b border-gray-200 pb-2">{authorInfo}</p>
                    ))}
                  </div>
                </div>
              </>
            ) : activeTab === 'reputation' ? (
              <>
                <div className='flex justify-between'>
                  {/* Level */}
                  <div className='flex-1 p-2 bg-white shadow-lg rounded-lg'>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">2</div>
                        <h2 className="text-lg font-bold">Level</h2>
                      </div>
                      <FaUser className="text-4xl" />
                    </div>
                    <p className="text-sm">Progress: 8.57% (280)</p>
                    <div className="bg-gray-200 rounded-full overflow-hidden h-2 mb-2">
                      <div className="bg-purple-600 h-full" style={{ width: '8.57%' }}></div>
                    </div>
                  </div>

                  {/* Reputation Level */}
                  <div className='flex-1 p-2 ml-2 bg-white shadow-lg rounded-lg'>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="text-2xl font-bold text-green-400">0</div>
                        <h2 className="text-lg font-bold">Reputation Level</h2>
                      </div>
                      <MdStarBorder className="text-4xl" />
                    </div>
                    <p className="text-sm">Progress: 0.00% (0)</p>
                    <div className="bg-gray-200 rounded-full overflow-hidden h-2 mb-2">
                      <div className="bg-green-600 h-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                </div>
                {/* Additional Reputation Information */}
                <div className='bg-white shadow-lg rounded-lg p-4 mt-4'>
                  <h2 className="text-lg font-bold">Reputation</h2>
                  <div className="flex justify-between items-center border-t pt-2">
                    <p>Total: 0</p>
                  </div>
                </div>
              </>


            ) : (
              <div className='mb-4 bg-white shadow-lg rounded-lg p-4'>
                {tabIcons[activeTab] || <MdMessage className="inline mr-2 text-xl" />}
                <h2 className="inline text-xl font-bold mb-2">{activeTab[0].toUpperCase() + activeTab.slice(1)}</h2>
                <div className="border-t mt-2 pt-2">
                  Content for {activeTab[0].toUpperCase() + activeTab.slice(1)} goes here...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;