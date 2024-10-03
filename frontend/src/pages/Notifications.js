import React, { useState,useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';



function Notifications() {
    const [activeTab, setActiveTab] = useState("");
    const [sidebarcollapse, setsidebarcollapse] = useState(false)

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
        { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
    ];

    const accountData = [
        { number: 45, category: "Fictions" },
        { number: 0, category: "Chapters" },
        { number: 0, category: "Drafts" },
        { number: 0, category: "Comments" },
        { number: 0, category: "Posts" },
        { number: 0, category: "Private Messages" }
    ];

    const handlecollpase = () => {
        setsidebarcollapse(!sidebarcollapse);
    };

    const checkScreenSize = () => {
        if (window.innerWidth < 500) {
            // Collapse the sidebar on small screens
        } else {
            setsidebarcollapse(false); // Expand the sidebar on larger screens
        }
    };

    // Run the check when the component mounts and when window is resized
    useEffect(() => {
        checkScreenSize(); // Initial check
        window.addEventListener('resize', checkScreenSize); // Add resize event listener

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);



    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
                {/* Image Container */}
                <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
                    {/* Icon and Text aligned left */}
                    <div className="absolute left-0 ml-10 flex items-center">
                        <FaExclamationCircle className="text-white text-6xl mr-4" />{" "}
                        {/* Ensure you have imported FaEnvelope */}
                        <div>
                            <h2 className="text-white text-2xl">Notification Settings</h2>
                            <p className="text-white text-sm">
                                Manage your account
                            </p>

                        </div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className={` bg-white   ${sidebarcollapse ? 'w-full absolute z-50' : 'static'} static  w-[50px] sm:w-auto shadow-lg rounded-lg h-auto`}>


                        <div className="sm:hidden p-2 bg-white ml-[5px] max-w-[10px]">
                            <i onClick={handlecollpase} className="fas fa-bars text-2xl cursor-pointer"></i>
                        </div>

                        {/* Message List */}

                        <div className={`mt-4 bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
                            <div className={`bg-gray-600 md text-white ${sidebarcollapse ? 'block' : 'hidden'} sm:block  text-md p-2 pl-4`}>
                                Messages
                            </div>

                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {messageOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        {/* Settings List */}
                        <div className={`mt-4  bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
                            <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
                                Settings
                            </div>



                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {settingsOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        {/* Security & Privacy List */}

                        <div className="mt-4 bg-white">
                            <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
                                Security & Privacy
                            </div>

                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {securityOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* Notification List */}

                        <div className="mt-4 bg-white">
                            <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
                                Notifications
                            </div>




                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {notificationOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* Forum List */}

                        <div className="mt-4 bg-white">
                            <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
                                Forum
                            </div>


                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {forumOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>

                        {/* My List */}

                        <div className="mt-4 bg-white">
                            <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`} >My</div>



                            <hr className="w-[50px] block sm:hidden"></hr>
                            <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
                                {myOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

                                    >

                                        <Link to={option.link} className={`flex-grow `}> <i
                                            className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>



                    {/* main div */}
                    <div className="flex-1 ml-4 h-[1400px] sm:h-auto ">
                        <div className="bg-white shadow-lg mt-4 p-6">
                            <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6">
                                <FaExclamationCircle className="mr-2" />
                                NOTIFICATIONS
                            </h2>

                            {/* General Section */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold text-gray-800 ">General</h3>
                                <hr className="border-gray-400" />
                                <div className="space-y-4">
                                    {/* Comment Replies */}
                                    <div className="mt-4 bg-pink">
                                        <span className="text-gray-700">Comment Replies</span>
                                        <div className="ml-auto flex  justify-center items-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>On-site notification</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* Mentioning */}
                                    <div className="">
                                        <span className="text-gray-700">Mentioning</span>
                                        <div className="ml-auto flex justify-center items-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>On-site notification</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* Private Messages */}
                                    <div className="">
                                        <span className="text-gray-700">Private Messages</span>
                                        <div className="flex justify-center items-center">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* New Chapters */}
                                    <div className="">
                                        <span className="text-gray-700">New Chapters</span>
                                        <div className="flex justify-center items-cente">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* Weekly Chapter Summary */}
                                    <div className="">
                                        <span className="text-gray-700">Weekly Chapter Summary</span>
                                        <div className="flex justify-center items-cente">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* Marketing Emails */}
                                    <div className="">
                                        <span className="text-gray-700">Marketing Emails</span>
                                        <div className="ml-auto flex justify-center items-center items-cente space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Weekly</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>Monthly</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            {/* For Authors Section */}
                            <div className="border-t border-gray-200 pt-4 mt-6">
                                <h3 className="text-lg font-semibold text-gray-800">For authors</h3>
                                <hr className="border-gray-400" />
                                <div className="space-y-4">
                                    {/* New comment in chapter */}
                                    <div className="mt-4">
                                        <span className="text-gray-700">New comment in chapter</span>
                                        <div className="ml-auto">
                                            <label className="flex justify-center items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>On-site notification</span>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200" />
                                    {/* Reviews */}
                                    <div className="">
                                        <span className="text-gray-700">Reviews</span>
                                        <div className="ml-auto">
                                            <label className="flex justify-center items-cente space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>On-site notification</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-gray-400" />
                            {/* Submit Button */}
                            <div className="mt-6 text-center">
                                <button className="bg-custom-blue text-white px-6 py-2  hover:bg-blue-600">
                                    Submit
                                </button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications
    ;
