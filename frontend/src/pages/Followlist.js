
import React, { useState,useRef,useEffect } from "react";
import { FaEllipsisV, FaHome, FaBookmark,FaBell,FaRegBell,FaEnvelope,FaBan } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';


function Followlist() {
    const [activeTab, setActiveTab] = useState("");
    const [sortOption, setSortOption] = useState('v2');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const dropdownRef = useRef(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleShowMore = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };


    const [followListData, setFollowListData] = useState([
        {
            title: "Super Supportive",
            update: "ONE HUNDRED SIXTY-THREE: The Primary's Youngest Child",
            author: "Sleyca",
            timeAgo: "1 day ago",
            cover: "https://www.royalroadcdn.com/public/covers-large/63759-super-supportive.jpg?time=1691780497"
        },
        {
            title: "Mother of Learning",
            update: "New story is out - Zenith of Sorcery",
            author: "nobody103",
            timeAgo: "13 months ago",
            cover: "https://www.royalroadcdn.com/public/covers-full/21220-mother-of-learning.jpg?time=1637247458"
        }
    ]);

    const handleTabClick = (key) => {
        setActiveTab(key);
         // Hide image if 'My' section is clicked

        // Adding a call to reset the sorting option to default when switching tabs
        if (key === 'followList') {
            handleSortChange('v2');  // Default to 'v2' sort when Follow List is clicked
        }
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedData = [...followListData[0]]; // Since followListData is managed by useState and contains an array within the state, use followListData[0]

        switch (option) {
            case 'v2':
                // Assuming 'v2' is a sort type you want to define
                sortedData.sort((a, b) => a.type.localeCompare(b.type)); // Adjust 'type' if it is different in your data structure
                break;
            case 'grouping':
                // Assuming 'grouping' sorts by a 'grouping' attribute in your data
                sortedData.sort((a, b) => (a.grouping || "").localeCompare(b.grouping || ""));
                break;
            case 'list':
                // Sorting by 'name' if 'list' refers to sorting by the name or title
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Default sort, if none of the above or incorrect option selected
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
        }

        followListData[1](sortedData); // Update the state with the sorted data
    };

    const toggleDropdown = (index) => {
        setDropdownOpen(!dropdownOpen && activeIndex === index ? false : true);
        setActiveIndex(index);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        {
            key: 'referFriend',
            icon: "fa-envelope-square",
            label: "Refer A Friend",
            link: "/account/refer-a-friend",
        },
    ];
    const securityOptions = [
        { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
        { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
        { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
        { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
        { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
        { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' },
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
        { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
    ];


    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
 
                <div className="flex mt-4">
                    <div className="w-48  shadow-lg rounded-lg h-auto">


                        {/* Message List */}

                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Messages
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {messageOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

                                    >
                                        <i
                                            className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">{option.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Settings List */}
                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Settings
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {settingsOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

                                    >
                                        <i
                                            className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">{option.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Security & Privacy List */}

                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Security & Privacy
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {securityOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i
                                            className={`fa fa-fw ${option.icon} text-black mr-2`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">
                                            {option.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notification List */}

                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Notifications
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {notificationOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i
                                            className={`fa fa-fw ${option.icon} text-black mr-2`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">
                                            {option.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Forum List */}

                        <div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Forum
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {forumOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
                                    >
                                        <i
                                            className={`fa fa-fw ${option.icon} text-black mr-2`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">
                                            {option.label}
                                        </a>
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
                                        <i
                                            className={`fa fa-fw ${option.icon} text-black mr-2`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">
                                            {option.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* mian div  */}
                    <div className="flex-1 ml-4 mt-4">
                    <div className="flex  space-x-8 mb-6 ml-1">
                            <Link to="/fictions" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Fictions</Link>
                            <Link to="/bookshelf" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Bookshelf</Link>
                            <Link to="/history" className="text-gray-900 font-bold border-b-4 border-blue-500">History</Link>
                            <Link to="/reviews" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Reviews</Link>
                            <Link to="/comments" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Comments</Link>
                        </div>
                        <div className='bg-white p-6'>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-red-600"><FaBookmark className="inline mr-2" />Follow List</h2>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleSortChange('v2')} className={`py-1 px-3 rounded-full ${sortOption === 'v2' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>V2</button>
                                    <button onClick={() => handleSortChange('grouping')} className={`py-1 px-3 rounded-full ${sortOption === 'grouping' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>Grouping</button>
                                    <button onClick={() => handleSortChange('list')} className={`py-1 px-3 rounded-full ${sortOption === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>List</button>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />


                            {followListData.map((item, index) => (
                                <div key={index} className="mb-4 border-b border-gray-300 pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.cover} alt={item.title} className="w-16 h-24" />
                                            <div>
                                                <h3 className="text-lg font-bold text-red-600">{item.title}</h3>
                                                <p className="text-sm">Last Update:</p>
                                                <p className="text-blue-600">{item.update}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-1">
                                            <div className="flex items-center">
                                                <span className="bg-red-500 rounded-full w-2 h-2 mr-2"></span>
                                                <span className="text-xs text-red-600">by {item.author}</span>
                                            </div>
                                            <span className="text-xs text-blue-600">{item.timeAgo}</span>
                                            <div className="relative flex items-center space-x-2">
                                                <button className="bg-[#337ab7] text-white px-3 py-1  hover:bg-blue-900 whitespace-nowrap flex-shrink-0">
                                                    Next Chapter
                                                </button>
                                                <div ref={dropdownRef} onClick={() => toggleDropdown(index)} className="relative flex items-center bg-white border border-gray-500 p-2 cursor-pointer">
                                                    <FaEllipsisV className="text-gray-700 transform rotate-90" size="1em" />
                                                    <FaBell className='' size="1em" />
                                                    {dropdownOpen && activeIndex === index && (
                                                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg py-1 z-50">
                                                            <div className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 whitespace-nowrap">
                                                                <FaRegBell className="text-gray-700" />
                                                                <span>Push Notification</span>
                                                            </div>
                                                            <div className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 whitespace-nowrap">
                                                                <FaEnvelope className="text-gray-700" />
                                                                <span>Email subscription</span>
                                                            </div>
                                                            <div className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 whitespace-nowrap">
                                                                <FaBan className="text-gray-700" />
                                                                <span>Unfollow</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}






                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default Followlist;
