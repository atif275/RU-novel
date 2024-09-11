import React, { useState } from "react";
import { FaPen, FaEnvelope, FaArrowLeft, FaPaperPlane, FaCheckCircle, FaCogs } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';

function Changeemail() {
    const [activeTab, setActiveTab] = useState("");

    const currentUser = useSelector((state) => state.userData.user);  // Assuming you have a Redux store setup


   // console.log(currentUser.email)

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

    
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newEmail === confirmEmail) {
            try {
                const response = await axios.put('https://api.ru-novel.ru/api/update-email', {
                    currentEmail: currentUser.email,
                    newEmail: newEmail
                });
                alert('Email updated successfully!');
                // console.log(response.data);
            } catch (error) {
                console.error('Error updating email:', error.response.data.message);
                alert(error.response.data.message);
            }
        } else {
            alert('Emails do not match!');
        }
    };




    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
                {/* Image Container */}
                <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
                    {/* Icon and Text aligned left */}
                    <div className="absolute left-0 ml-10 flex items-center">
                        <FaEnvelope className="text-white text-6xl mr-4" />{" "}
                        {/* Ensure you have imported FaEnvelope */}
                        <div>
                            <h2 className="text-white text-2xl">Change Email</h2>
                            <p className="text-white text-sm">
                                Manage your account
                            </p>

                        </div>
                    </div>
                </div>
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
                                            className={`fa fa-fw ${option.icon} text-black mr-2  ${activeTab === option.key
                                                ? "bg-custom-blue text-white"
                                                : ""
                                                }`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">
                                            {option.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notification List */}

                        {/* <div className="mt-4 bg-white">
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
                        </div> */}

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
                    {/* <div className="flex-1 ml-4 ">

                        <div className="bg-white shadow-lg mt-4 p-6">
                            <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6 border-b pb-2">
                                <FaCogs className="mr-2" />
                                CHANGE EMAIL
                            </h2>

                            <div className="mt-6">
                                <div className="mb-4 border-b pb-4">
                                    <label className="block text-gray-700 text-sm mb-2">Current Email Address</label>
                                    <p className="text-gray-600 text-center text-lg">{currentUser.email}</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4 border-b pb-4">
                                        <label className="block text-gray-700 text-sm mb-2">Insert new Email</label>
                                        <div className="mt-2">
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                    <FaEnvelope />
                                                </span>
                                                <input
                                                    type="email"
                                                    placeholder="New Email Address"
                                                    value={newEmail}
                                                    onChange={handleNewEmailChange}
                                                    className="w-full pl-10 pr-4 py-2 border  focus:border-blue-500 bg-gray-100 "
                                                />
                                            </div>
                                            <div className="relative mt-4">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                    <FaCheckCircle />
                                                </span>
                                                <input
                                                    type="email"
                                                    placeholder="Confirm Email Address"
                                                    value={confirmEmail}
                                                    onChange={handleConfirmEmailChange}
                                                    className="w-full pl-10 pr-4 py-2 border focus:border-blue-500  bg-gray-100 "
                                                    style={{}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <button
                                            type="submit"
                                            className="bg-custom-blue text-white px-6 py-2  hover:bg-blue-500"
                                        >
                                            Update Email
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> */}
                     <div className="flex-1 ml-4">
            <div className="bg-white shadow-lg mt-4 p-6">
                <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6 border-b pb-2">
                    <FaCogs className="mr-2" />
                    CHANGE EMAIL
                </h2>
                <div className="mt-6">
                    <div className="mb-4 border-b pb-4">
                        <label className="block text-gray-700 text-sm mb-2">Current Email Address</label>
                        <p className="text-gray-600 text-center text-lg">{currentUser.email}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 border-b pb-4">
                            <label className="block text-gray-700 text-sm mb-2">Insert new Email</label>
                            <div className="mt-2">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="New Email Address"
                                        value={newEmail}
                                        onChange={handleNewEmailChange}
                                        className="w-full pl-10 pr-4 py-2 border focus:border-blue-500 bg-gray-100"
                                    />
                                </div>
                                <div className="relative mt-4">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                        <FaCheckCircle />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Confirm Email Address"
                                        value={confirmEmail}
                                        onChange={handleConfirmEmailChange}
                                        className="w-full pl-10 pr-4 py-2 border focus:border-blue-500 bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                disabled={newEmail !== confirmEmail || !newEmail}
                                className={`bg-custom-blue text-white px-6 py-2 hover:bg-blue-500 ${newEmail !== confirmEmail || !newEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Update Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
                </div>
            </div>
        </div>
    );
}

export default Changeemail;