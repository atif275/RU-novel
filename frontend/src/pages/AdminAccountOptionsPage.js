import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaHome, FaPaperPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AdminAccountOptionsPage() {
    const [activeTab, setActiveTab] = useState("");
    const [input, setInput] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const currentuser = useSelector((state) => state.userData.user);

    // console.log(currentuser.username)

    useEffect(() => {
        
        if (input.trim()) {
            const fetchUsernames = async () => {
                try {
                    const response = await axios.get(`https://api.ru-novel.ru/api/search-users?q=${input}`);
                    setUsernames(response.data);
                } catch (error) {
                    console.error('Error fetching usernames', error);
                }
            };

            fetchUsernames();
        } else {
            setUsernames([]);
        }
    }, [input]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      

    const handleSelectUsername = (username) => {
        setInput(username);  // Set the input field with the selected username
        setShowDropdown(false);  // Close the dropdown after selection
    }
    const handleFormSubmit = async (event, status) => {
        event.preventDefault();
        try {
            await axios.post('https://api.ru-novel.ru/api/messages', {
                recipient: input,
                subject: subject,
                message: message,
                sender:currentuser.username,
                status: status, // "sent" or "draft"
            });
            alert(`Message ${status}`);
            // Clear form after submission
            setSubject('');
            setMessage('');
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message');
        }
    };

    const messageOptions = [
        { key: 'compose', icon: 'fa-envelope', label: 'Compose', link: '/admin/messages', isActive: true },
        { key: 'inbox', icon: 'fa-folder', label: 'Inbox', link: '/admin/private/1' },
        { key: 'sentItems', icon: 'fa-folder-open', label: 'Sent Items', link: '/admin/private/2' },
        { key: 'drafts', icon: 'fa-folder-open', label: 'Drafts', link: '/admin/private/3' },
        { key: 'trashCan', icon: 'fa-trash', label: 'Trash Can', link: '/admin/private/4' }
    ];
    const settingsOptions = [
        { key: 'profileInfo', icon: "fa-id-card", label: "Profile Info", link: "/admin/account" },
        // { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
        // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
        // { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
        // { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
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
                {/* Image Container */}
                <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
                    {/* Icon and Text aligned left */}
                    <div className="absolute left-0 ml-10 flex items-center">
                        <FaHome className="text-white text-6xl mr-4" />{" "}
                        {/* Ensure you have imported FaEnvelope */}
                        <div>
                            <h2 className="text-white text-2xl">User Control Panel</h2>
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

                        {/* <div className="mt-4 bg-white">
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
                        </div> */}

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

                        {/* <div className="mt-4 bg-white">
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
                        </div> */}

                        {/* My List */}

                        {/* <div className="mt-4 bg-white">
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
                        </div> */}
                    </div>
                    {/* mian div  */}
                    <div className="flex-1 ml-4 mt-4">

                        <div className="flex justify-between ">
                            <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4  inline-flex items-center">
                                <FaArrowLeft className="mr-2" /> Back to Inbox
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  inline-flex items-center">
                                <FaPaperPlane className="mr-2" /> Send Reply
                            </button>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className='bg-white p-6'>
                            <h2 className="text-xl font-bold mb-4">New Message</h2>
                            <hr className="my-4 border-gray-300" />
                            {/* <form>
                                <div className="mb-4 relative">
                                    <label htmlFor="recipients" className="block font-bold mb-2">Recipients</label>
                                    <input
                                        type="text"
                                        id="recipients"
                                        placeholder="Search for a user"
                                        className="w-full p-2 border border-gray-300"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onFocus={() => setShowDropdown(true)}
                                        // Adjust onBlur to manage dropdown with a delay or additional conditions
                                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                                    />
                                    {showDropdown && usernames.length > 0 && (
                                        <ul className="absolute bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-y-auto z-50">
                                            {usernames.map((username, index) => (
                                                <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onMouseDown={() => handleSelectUsername(username)}>
                                                    {username}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block font-bold mb-2">Subject</label>
                                    <input type="text" id="subject" className="w-full p-2 border border-gray-300 " />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-bold mb-2">Message</label>
                                    <Editor
                                        apiKey='cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3'
                                        initialValue="<p>This is the initial content of the editor</p>"
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help'
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center items-center m-4 space-x-4">
                                    <button type="submit" className="bg-gray-500 text-white py-2 px-4  hover:bg-blue-600">Send Message</button>
                                    <button type="button" className="bg-gray-500 text-white py-2 px-4  hover:bg-gray-600 mr-2">Save as Draft</button>
                                    <button type="button" className="bg-gray-500 text-white py-2 px-4  hover:bg-green-600">Preview</button>
                                </div>
                            </form> */}
                            <div>
                                <form onSubmit={(e) => handleFormSubmit(e, 'sent')}>
                                    <div className="mb-4 relative">
                                        <label htmlFor="recipients" className="block font-bold mb-2">Recipients</label>
                                        <input
                                            type="text"
                                            id="recipients"
                                            placeholder="Search for a user"
                                            className="w-full p-2 border border-gray-300"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onFocus={() => setShowDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                                        />
                                        {showDropdown && usernames.length > 0 && (
                                            <ul className="absolute bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-y-auto z-50">
                                                {usernames.map((username, index) => (
                                                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onMouseDown={() => handleSelectUsername(username)}>
                                                        {username}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="subject" className="block font-bold mb-2">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="w-full p-2 border border-gray-300"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-bold mb-2">Message</label>
                                        <Editor
                                            apiKey='cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3'
                                           
                                            value={message}
                                            onEditorChange={(content) => setMessage(content)}
                                            init={{
                                                height: 300,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                    'bold italic backcolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help'
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center m-4 space-x-4">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Send Message</button>
                                        <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 mr-2" onClick={(e) => handleFormSubmit(e, 'draft')}>Save as Draft</button>
                                        <button type="button" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4">Preview</button>
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

export default AdminAccountOptionsPage;
