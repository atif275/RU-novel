import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Borderwardrobe() {
    const [activeTab, setActiveTab] = useState("");
    const [sidebarcollapse, setsidebarcollapse] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




    const currentUser = useSelector((state) => state.userData.user);
    const premium = currentUser.premium;
    const fictionCounts = currentUser?.fictions?.length || 0;
    //const fictionCounts = 5;
    const premier = premium ? 1 : 0;



    const [borders, setBorders] = useState([]);
    const [bordersP, setBordersP] = useState([]);

    const [currentBorder, setCurrentBorder] = useState('');
    const [selectedBorder, setSelectedBorder] = useState(currentUser.profilePictureBorder);

    useEffect(() => {
        const fetchBorders = async () => {
            try {
                const { data } = await axios.get('https://api.ru-novel.ru/api/level/borders', {
                    params: {
                        tag: 'level',
                        fictionCount: fictionCounts // Assuming the desired number of borders based on a specific condition
                    }
                });
                //console.log("fictions:" + fictionCounts);
                //console.log(data);
                setBorders(data);
                if (currentUser && currentUser.profilePictureBorder) {
                    setCurrentBorder(currentUser.profilePictureBorder);
                }
            } catch (error) {
                console.error('Error fetching borders:', error);
            }
        };
        fetchBorders();
    }, [currentUser]);

    const fetchPremiumBorders = async () => {
        try {
            const { data } = await axios.get('https://api.ru-novel.ru/api/premium/borders', {
                params: {
                    tag: 'premium' // Fetch only premium borders
                }
            });
            // //console.log(data);  
            setBordersP(data); // Assuming you have a state variable 'setBorders' for storing the borders
            if (currentUser && currentUser.profilePictureBorder) {
                setCurrentBorder(currentUser.profilePictureBorder); // Update current border if needed
            }
        } catch (error) {
            console.error('Error fetching premium borders:', error);
        }
    };

    useEffect(() => {
        fetchPremiumBorders();
    }, [currentUser]);




    const changeBorder = async (newBorder) => {
        try {
            const response = await axios.put(`https://api.ru-novel.ru/update-border/${currentUser.username}`, {
                newBorder: newBorder.imageUrl
            });

            setCurrentBorder(newBorder.imageUrl);
            toast.success('Border updated successfully!');
            window.location.reload();

        } catch (error) {
            console.error('Error updating border:', error);
            toast.error('Failed to update border.');
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
            <ToastContainer position="top-right" autoClose={5000} />
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
                    <div className="flex-1 ml-4 mt-4  h-[1400px] sm:h-auto">

                        <div className="bg-white p-6">
                            <h2 className="text-xl font-bold mb-4 text-red-600">
                                <i className="fas fa-border-style mr-2"></i> BORDERS
                            </h2>
                            <hr className="my-4 border-gray-300" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Left side: Current Level Image */}
                                <div className="relative flex justify-center items-center">
                                    {/* Background Image (Avatar) */}
                                    <img
                                        src={currentUser.profilePicture}
                                        alt="Avatar"
                                        className="w-[75px] h-[75px] object-cover rounded-full"
                                    />

                                    {/* Overlay Image (Border) */}
                                    {currentUser.profilePictureBorder && currentUser.profilePictureBorder !== "" && (
                                        <img
                                            src={currentUser.profilePictureBorder}
                                            alt="Border"
                                            className="absolute w-50 h-40"  // Adjust width and height to fit perfectly around the avatar
                                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Center the border image
                                        />
                                    )}
                                </div>

                                {/* Right side: Current Level Box */}
                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-center">current level</h3>
                                    <div className="cursor-pointer hover:bg-blue-500 bg-blue-200 p-5">

                                        <div className=" relative flex justify-center items-center">
                                            {/* Background Image (Avatar) */}
                                            <img
                                                src={currentUser.profilePicture}
                                                alt="Avatar"
                                                className="w-[37px] h-[37px] object-cover rounded-full"
                                            />

                                            {/* Overlay Image (Border) */}
                                            {currentUser.profilePictureBorder && currentUser.profilePictureBorder !== "" && (
                                                <img
                                                    src={currentUser.profilePictureBorder}
                                                    alt="Border"
                                                    className="absolute w-25 h-20"  // Adjust width and height to fit perfectly around the avatar
                                                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Center the border image
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <hr className="my-4 border-gray-300" />

                            {/* Level Borders */}
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold mb-2">Level Borders</h3>
                                <div className="">
                                    <div className="grid grid-cols-3 gap-4">
                                        {borders.map((border, index) => (
                                            <div key={index} className="cursor-pointer hover:bg-blue-500 relative flex justify-center items-center bg-blue-200 p-4" onClick={() => changeBorder(border)}>
                                                <img
                                                    src={currentUser.profilePicture}
                                                    alt="Avatar"
                                                    className="w-[37px] h-[37px] object-cover rounded-full"
                                                />
                                                <img
                                                    src={border.imageUrl}
                                                    alt={border.name}
                                                    className="absolute w-25 h-20"
                                                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />

                            {/* Premium Unlock */}

                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold mb-2">Get Premium this month to unlock:</h3>
                                <div className="">
                                    <div className="grid grid-cols-3 gap-4">
                                        {bordersP.map((border, index) => (
                                            <div
                                                key={index}
                                                className={`cursor-pointer hover:bg-blue-500  relative flex justify-center items-center bg-blue-200 p-4 ${index < premier ? '' : 'grayscale cursor-not-allowed'}`}
                                                onClick={() => index < premier ? changeBorder(border) : null}
                                                style={{
                                                    pointerEvents: index < premier ? 'auto' : 'none', // Disables click events for non-premier items
                                                }}
                                            >
                                                <img
                                                    src={currentUser.profilePicture}
                                                    alt="Avatar"
                                                    className="w-[37px] h-[37px] object-cover rounded-full"
                                                />
                                                <img
                                                    src={border.imageUrl}
                                                    alt={border.name}
                                                    className="absolute w-25 h-20"
                                                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            <div className="flex justify-end mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
                                    Save
                                </button>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default Borderwardrobe;