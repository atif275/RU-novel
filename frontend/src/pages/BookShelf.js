import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import AuthorProfile from '../components/AuthorProfile2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookShelf() {
    const [activeTab, setActiveTab] = useState("");
    const [followedAuthors, setFollowedAuthors] = useState([]);
    const [authorProfiles, setAuthorProfiles] = useState([]);

    const email = useSelector((state) => state.userData.email);

    useEffect(() => {
        const fetchFollowedAuthors = async () => {
            try {
                const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
                const followedAuthors = userResponse.data.follows;
                setFollowedAuthors(followedAuthors);

                const authorProfilesPromises = followedAuthors.map(authorName => 
                    axios.get(`https://api.ru-novel.ru/api/userssssss/${authorName}`)
                );
                const profiles = await Promise.all(authorProfilesPromises);
                setAuthorProfiles(profiles.map(profile => profile.data));
            } catch (error) {
                console.error('Error fetching followed authors:', error);
            }
        };

        fetchFollowedAuthors();
    }, [email]);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      

    const handleUnfollow = async (authorName) => {
        try {
            await axios.post(`https://api.ru-novel.ru/api/users/${email}/unfollow`, { authorName });
            toast.success('Author unfollowed successfully!');
            const updatedAuthors = authorProfiles.filter(author => author.username !== authorName);
            setAuthorProfiles(updatedAuthors);
        } catch (error) {
            console.error('Error unfollowing author:', error);
            toast.error('Error unfollowing author.');
        }
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
        // { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
        // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
        { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
        { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
        // {
        //     key: 'referFriend',
        //     icon: "fa-envelope-square",
        //     label: "Refer A Friend",
        //     link: "/account/refer-a-friend",
        // },
    ];
    const securityOptions = [
        { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
        { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
        // { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
        { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
        // { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
        // { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' },
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
        { icon: 'fa-book', label: 'Fictions', link: '/fictions' },
        { icon: 'fa-bookmark', label: 'Follow List', link: '/my/follows' },
        { icon: 'fa-star', label: 'Favorites', link: '/my/favorites' },
        { icon: 'fa-clock', label: 'Read Later', link: '/my/readlater' },
        { icon: 'fa-history', label: 'Reading History', link: '/my/history' },
        { icon: 'fa-star-half-alt', label: 'Reviews', link: '/my/reviews' },
        { icon: 'fa-comments', label: 'Comments', link: '/my/comments' },
        // { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
    ];
    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

                <div className="flex mt-4">
                    <div className="w-48 shadow-lg rounded-lg h-auto">
                        {/* Message List */}
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">Messages</div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {messageOptions.map((option) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                                    >
                                        <i className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key ? "bg-custom-blue text-white" : ""}`}></i>
                                        <Link to={option.link} className="flex-grow">{option.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Settings List */}
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">Settings</div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {settingsOptions.map((option) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                                    >
                                        <i className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key ? "bg-custom-blue text-white" : ""}`}></i>
                                        <Link to={option.link} className="flex-grow">{option.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Security & Privacy List */}
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">Security & Privacy</div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {securityOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                       
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">Forum</div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {forumOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* My List */}
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">My</div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {myOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 ml-4 mt-4">
                        <div className="lg:flex  lg:space-x-8 lg:mb-6 md:ml-1   grid sm:grid-cols-5  md:grid-cols-7   grid-cols-4 gap-4 mb-6 ml-1">
                        <Link to="/my/follows" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Follows</Link>
                            <Link to="/my/favorites" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Favorites</Link>
                            <Link to="/my/readlater" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Readlater</Link>
                            <Link to="/my/history" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">History</Link>
                            <Link to="/my/reviews" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Reviews</Link>
                            <Link to="/my/comments" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Comments</Link>
                            <Link to="/fictions" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Fictions</Link>
                            <Link to="/bookshelf" className="text-gray-900 font-bold border-b-4 border-blue-500">Bookshelf</Link>
                            
                        </div>
                        <div className="bg-white p-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-red-600">
      <FaBookmark className="inline mr-2" />
      BookShelf
    </h2>
  </div>
  <hr className="my-4 border-gray-300" />

  {/* Bookshelf Content */}
  <div className="flex flex-wrap">
    {/* Follow List */}
    <div className="w-full md:w-1/3 p-4">
      <Link to="/my/follows">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col justify-between">
          <h2 className="text-xl font-bold text-red-600 hover:underline">Follow List</h2>
          <p className="text-gray-500 text-sm mt-2">
            What you're currently following
          </p>
        </div>
      </Link>
    </div>

    {/* Read Later */}
    <div className="w-full md:w-1/3 p-4">
      <Link to="/my/readlater">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col justify-between">
          <h2 className="text-xl font-bold text-red-600 hover:underline">Read Later</h2>
          <p className="text-gray-500 text-sm mt-2">
            Fictions you've saved for another time.
          </p>
        </div>
      </Link>
    </div>

    {/* Favorites */}
    <div className="w-full md:w-1/3 p-4">
      <Link to="/my/favorites">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col justify-between">
          <h2 className="text-xl font-bold text-red-600 hover:underline">Favorites</h2>
          <p className="text-gray-500 text-sm mt-2">Your favorite fictions.</p>
        </div>
      </Link>
    </div>
  </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookShelf;
