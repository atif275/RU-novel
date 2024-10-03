import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaHome, FaPaperPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useSelector } from 'react-redux';



function Compose() {

    const [sidebarcollapse, setsidebarcollapse] = useState(false)
    const [activeTab, setActiveTab] = useState("compose");
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
                sender: currentuser.username,
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



                    {/* mian div  */}
                    <div className="flex-1 h-[1100px] sm:h-[100%] ml-4 mt-4">
                        <div className="flex justify-between">
                            <button className="bg-gray-300 hover:bg-gray-400 text-black text-[10px] md:text-[14px] md:py-2 py-1 px-2 md:px-4 py-2 px-4 inline-flex items-center">
                                <FaArrowLeft className="mr-2" /> Back to Inbox
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] md:text-[14px] md:py-2 py-1 px-2 md:px-4 py-2 px-4 inline-flex items-center">
                                <FaPaperPlane className="mr-2" /> Send Reply
                            </button>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="bg-white  p-6">
                            <h2 className="text-xl font-bold mb-4">New Message</h2>
                            <hr className="my-4 border-gray-300" />

                            {/* Form */}
                            <form onSubmit={(e) => handleFormSubmit(e, 'sent')}>
                                <div className="mb-4 ">
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
                                        <ul className=" bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-y-auto z-50">
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
                                    <label className=" font-bold mb-2">Message</label>
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
                                <div className="flex flex-wrap justify-center items-center m-4 space-x-4">
                                    <button type="submit" className="bg-blue-500 md:text-[14px] mb-[10px] text-[10px] hover:bg-blue-600 text-white md:py-2 py-1 px-2 md:px-4">Send Message</button>
                                    <button type="button" className="bg-gray-500 md:text-[14px] mb-[10px] text-[10px] hover:bg-gray-600 text-white md:py-2 py-1 px-2 md:px-4 mr-2" onClick={(e) => handleFormSubmit(e, 'draft')}>Save as Draft</button>
                                    <button type="button" className="bg-green-500 md:text-[14px] mb-[10px] text-[10px] hover:bg-green-600 text-white md:py-2 py-1 px-2 md:px-4">Preview</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Compose;
