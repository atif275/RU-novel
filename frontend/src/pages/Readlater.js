import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useSelector } from "react-redux"; // Assuming you use Redux to manage authentication state
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';

function ReadLater() {
    const [readLaterBooks, setReadLaterBooks] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [sortOption, setSortOption] = useState('v2');

    const email = useSelector((state) => state.userData.email); // Get the user's email from the state

    useEffect(() => {
        const fetchReadLaterBooks = async () => {
            try {
                // Fetch the user's data to get their read later books
                const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
                const readLaterTitles = userResponse.data.readLater;

                // Fetch the book data for each read later book
                const bookRequests = readLaterTitles.map((title) =>
                    axios.get(`https://api.ru-novel.ru/api/bookthreads/${encodeURIComponent(title)}`)
                );
                const bookResponses = await Promise.all(bookRequests);
                const books = bookResponses.map(response => response.data);

                setReadLaterBooks(books);
            } catch (error) {
                console.error("Error fetching read later books:", error);
            }
        };

        if (email) {
            fetchReadLaterBooks();
        }
    }, [email]);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      

    const handleUnfavorite = async (bookTitle) => {
        try {
            await axios.post(`https://api.ru-novel.ru/api/users/${email}/remove`, { bookTitle });
            toast.success('Book removed from favorites successfully!');
            // Re-fetch favorite books after removal
            const updatedreadLaterBooks = readLaterBooks.filter(book => book.title !== bookTitle);
            setReadLaterBooks(updatedreadLaterBooks);
        } catch (error) {
            console.error("Error removing book from favorites:", error);
            toast.error('Error removing book from favorites.');
        }
    };

    const toggleShowMore = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        // Implement sorting logic here if needed
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
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Messages
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {messageOptions.map((option) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                                    >
                                        <i
                                            className={`fas ${option.icon} text-black mr-2`}
                                        ></i>
                                        <Link to={option.link} className="flex-grow">{option.label}</Link>
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
                                {settingsOptions.map((option) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}
                                    >
                                        <i
                                            className={`fas ${option.icon} text-black mr-2`}
                                        ></i>
                                        <Link to={option.link} className="flex-grow">{option.label}</Link>
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
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
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
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
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
                                        <i
                                            className={`fa fa-fw ${option.icon} text-black mr-2`}
                                        ></i>
                                        <Link to={option.link} className="flex-grow">
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 ml-4 mt-4">
                        <div className="flex space-x-8 mb-6 ml-1">
                        <Link to="/my/follows" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Follows</Link>
                            <Link to="/my/favorites" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Favorites</Link>
                            <Link to="/my/readlater" className="text-gray-900 font-bold border-b-4 border-blue-500">Readlater</Link>
                            <Link to="/my/history" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">History</Link>
                            <Link to="/my/reviews" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Reviews</Link>
                            <Link to="/my/comments" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Comments</Link>
                            <Link to="/fictions" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Fictions</Link>
                            <Link to="/bookshelf" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Bookshelf</Link>
                        </div>
                        <div className='bg-white p-6'>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-red-600"><FaClock className="inline mr-2" />READ LATER</h2>
                                {/* <div className="flex space-x-2">
                                    <p className='text-xl pt-1'>sort: </p>
                                    <button onClick={() => handleSortChange('dAT')} className={`py-1 px-3 rounded-full ${sortOption === 'v2' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>Date</button>
                                    <button onClick={() => handleSortChange('grouping')} className={`py-1 px-3 rounded-full ${sortOption === 'grouping' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>Title</button>
                                    <button onClick={() => handleSortChange('list')} className={`py-1 px-3 rounded-full ${sortOption === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>Length</button>
                                </div> */}
                            </div>
                            <hr className="my-4 border-gray-300" />

                            {readLaterBooks.map((item, index) => (
    <div key={index} className="mb-6 border-b border-gray-300 pb-6">
        <div className="flex justify-between">
            {/* Left side: Cover Image */}
            <div className="flex items-start space-x-4">
                <img src={item.image} alt={item.title} className="w-24 h-36 object-cover" />
                <div className="flex flex-col">
                    {/* Title and Page Count */}
                    <div className="flex flex-col mb-4">
                        <h3 className="text-2xl font-bold text-red-600">{item.title}</h3>
                        <span className="text-sm font-semibold text-blue-600">{item.stats.pages} PAGES</span>
                    </div>
                    {/* Description */}
                    <div className="text-sm mt-2">
                        <p className="font-semibold mb-2">Readers can expect:</p>
                        <div
                            className={`transition-all overflow-hidden ${expandedIndex === index ? 'max-h-none' : 'max-h-[100px]'}`}
                            style={{ maxHeight: expandedIndex === index ? 'none' : '100px' }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.synopsis) }} />
                            {expandedIndex === index && (
                                <p className="mt-2 text-gray-700">{item.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Show More Button and Remove Button */}
        <div className="flex justify-between items-center mt-4">
            <div className="flex-1 text-center">
                <button
                    onClick={() => toggleShowMore(index)}
                    className="text-gray-600 font-semibold hover:text-gray-800"
                >
                    {expandedIndex === index ? "SHOW LESS" : "SHOW MORE"}
                </button>
            </div>
            <div className="flex border border-transparent">
                <button
                    className="bg-[#e26a6a] text-white px-4 py-2 hover:bg-red-600 whitespace-nowrap border-white"
                    onClick={() => handleUnfavorite(item.title)}
                >
                    Remove
                </button>
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

export default ReadLater;