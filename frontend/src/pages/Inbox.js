
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaHome, FaPaperPlane } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';


function Inbox() {
    const [activeTab, setActiveTab] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(10);


    const currentUser = useSelector((state) => state.userData.user);  // Assuming you have a Redux store setup


    const fetchMessages = async () => {
        if (!currentUser) return;

        try {
            const response = await axios.get(`https://api.ru-novel.ru/api/messages/${currentUser.username}`, {
                params: {
                    status: 'sent',
                    sender: currentUser.username  // Assuming you have the username in the currentUser object
                }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };



    useEffect(() => {
        if (!currentUser) return;
        fetchMessages();
    }, [currentUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    const toggleMessageDetails = (subject) => {
        setSelectedSubject(selectedSubject === subject ? "" : subject);
    };

    const handleMoveTo = async (subject, newStatus) => {
        try {
            const response = await axios.put(`https://api.ru-novel.ru/api/messages/status`, { subject, status: newStatus });
            alert(response.data.message); // Alerting the user about the operation status
            fetchMessages(); // Refresh the list of messages
        } catch (error) {
            console.error('Error updating message status:', error);
            alert('Failed to update message status.');
        }
    };

    const handleDelete = async (subject) => {
        try {
            await axios.delete(`https://api.ru-novel.ru/api/messages/${subject}`);
            fetchMessages(); // Refresh the list of messages
            alert('Message deleted successfully!');
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);  // Reset to the first page when search changes
    };

    // This needs to be declared after states are initialized to avoid "Cannot access 'filteredMessages' before initialization"
    const filteredMessages = messages.filter(message =>
        message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentFilteredMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredMessages.length / messagesPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderSenderName = (sender) => {
        if (searchTerm && sender.toLowerCase().includes(searchTerm.toLowerCase())) {
            const parts = sender.split(new RegExp(`(${searchTerm})`, 'gi'));
            return (
                <span>
                    {parts.map((part, index) => part.toLowerCase() === searchTerm.toLowerCase()
                        ? <span key={index} className="bg-yellow-200 px-1">{part}</span> // Highlight with Tailwind CSS
                        : part)}
                </span>
            );
        } else {
            return sender;
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
                    {/* mian div  */}

                    <div className="flex-1 ml-4 mt-4">

                        <div className="bg-white p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Inbox
                            </h2>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex items-center mb-4">
                                <input
                                    type="search"
                                    className="border p-2 w-full"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    style={{ flex: "auto", marginRight: "8px" }}
                                />
                                <button className="bg-custom-blue hover:bg-blue-600 text-white py-2 px-4" onClick={() => setCurrentPage(1)}>
                                    Go
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Message Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sender
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date/Time Sent
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentFilteredMessages.map((message) => (
                                            <React.Fragment key={message._id}>
                                                <tr className="hover:bg-gray-50" onClick={() => toggleMessageDetails(message.subject)}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
                                                        {message.subject}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {renderSenderName(message.sender)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(message.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex items-center space-x-4">
                                                            <select
                                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                                defaultValue=""
                                                                onChange={(e) => handleMoveTo(message.subject, e.target.value)}
                                                            >
                                                                <option value="" disabled>Move to...</option>
                                                                <option value="sent">Sent Items</option>
                                                                <option value="draft">Drafts</option>
                                                                <option value="trashcan">Trash Can</option>
                                                            </select>
                                                            <button
                                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                                onClick={(e) => { e.stopPropagation(); handleDelete(message.subject); }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {selectedSubject === message.subject && (
                                                    <tr className="bg-gray-50">
                                                        <td colSpan="4" className="px-6 py-4 whitespace-wrap text-sm text-gray-800">
                                                            <div dangerouslySetInnerHTML={{ __html: message.message }} />
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <nav className="mt-4">
                                <ul className="flex pl-0 list-none rounded my-2 justify-center">
                                    {pageNumbers.map(number => (
                                        <li key={number} className="mx-1 bg-white border-gray-300 text-blue-700 hover:bg-blue-500 hover:text-white rounded shadow cursor-pointer">
                                            <a className="block px-4 py-2" onClick={() => paginate(number)}>
                                                {number}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>


                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
}

export default Inbox;
