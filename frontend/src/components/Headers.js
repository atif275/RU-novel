import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';
export const Header = ({ selectedComponent, breadcrumb }) => {
  const dispatch = useDispatch();
  const [readDropdownVisible, setReadDropdownVisible] = useState(false);
  const [supportDropdownVisible, setSupportDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to manage sidebar visibility
  const user = useSelector((state) => state.userData.user);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const menuItems = [
    { icon: "fa-user", label: "My Profile", link: "/profile" },
    { icon: "fa-envelope", label: "My Messages", link: "/private/send" },
    { icon: "fa-bookmark", label: "Follows", link: "/my/follows" },
    { icon: "fa-clock", label: "Read Later", link: "/my/readlater" },
    { icon: "fa-star", label: "Favorites", link: "/my/favorites" },
    { icon: "fa-history", label: "History", link: "/my/history" },
    { icon: "fa-cog", label: "Settings", link: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(userActions.setLogout(false));
    localStorage.removeItem('authtoken')
    localStorage.removeItem('userEmail')
    navigate('/');
    window.location.reload(); 
  };
  const profilePictureUrl = user.profilePicture
  // ? `https://api.ru-novel.ru/uploads/${user.profilePicture}`
  // : '/default-avatar.png';


  return (
    <>
      <header className="bg-white shadow-md w-full">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-3">
              {/* Read Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setReadDropdownVisible(true)}
                onMouseLeave={() => setReadDropdownVisible(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <i className="fas fa-book-open mr-2"></i> Read{" "}
                  <i className="fas fa-chevron-down ml-1"></i>
                </button>
                <div
                  className={`absolute top-full mt-1 w-48 bg-white shadow-lg rounded-md py-2 z-50 transition-opacity ${
                    readDropdownVisible
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/fictions/best-rated"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-star mr-2"></i> Best Rated
                  </Link>
                  <Link
                    to="/fictions/trending"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-chart-line mr-2"></i> Trending
                  </Link>
                  <Link
                    to="/fictions/active-popular"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-sync-alt mr-2"></i> Ongoing Fictions
                  </Link>
                  <Link
                    to="/fictions/weekly-popular"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-fire mr-2"></i> Popular this week
                  </Link>
                  <Link
                    to="/fictions/latest-updates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-clock mr-2"></i> Latest Updates
                  </Link>
                  <Link
                    to="/fictions/new"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-plus-square mr-2"></i> Newest Fictions
                  </Link>
                  <Link
                    to="/fictions/rising-stars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-chart-bar mr-2"></i> Rising Stars
                  </Link>
                  <Link
                    to="/fictions/writathon"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-trophy mr-2"></i> Writathon
                  </Link>
                  <Link
                    to="/fictions/search"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-search mr-2"></i> Search
                  </Link>
                  {/* <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-surprise mr-2"></i> Surprise me!
                  </Link> */}
                </div>
              </div>
              {/* Other menu items */}

              <Link
                to="/author-dashboard"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-feather-alt mr-2"></i> Write
              </Link>

              <Link
                to="/forums"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-comments mr-2"></i> Forums
              </Link>
              <Link
                to="/user/memberlist"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-users mr-2"></i> Members
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setSupportDropdownVisible(true)}
                onMouseLeave={() => setSupportDropdownVisible(false)}
              >
                <button className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <i className="fas fa-life-ring mr-2"></i> Support{" "}
                  <i className="fas fa-chevron-down ml-1"></i>
                </button>
                <div
                  className={`absolute top-full mt-1 w-48 bg-white shadow-lg rounded-md py-2 z-50 ${
                    supportDropdownVisible ? "block" : "hidden"
                  }`}
                >
                  <Link
                    to="/support/knowledgebase"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-book mr-2"></i> Knowledge Base
                  </Link>
                  <Link
                    to="/support/suggestions"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-lightbulb mr-2"></i> Suggestions
                  </Link>
                  <Link
                    to="/forums"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-users mr-2"></i> Community Help
                  </Link>
                  <Link
                    to="/support/ticket"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-ticket-alt mr-2"></i> Support Tickets
                  </Link>
                  <Link
                    to="/support/status"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-heartbeat mr-2"></i> Status
                  </Link>
                </div>
              </div>
              <Link
                to="/premium"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-crown mr-2"></i> Premium
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-bell"></i>
            </Link>
            <Link to="/private/send" className="text-blue-500 hover:text-blue-700">
              <i className="fas fa-envelope"></i>
            </Link>
            <span className="text-gray-700">Hi, {user.username}</span>
            <img
              src={profilePictureUrl}
              alt={user.username}
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={toggleSidebar} // Toggle sidebar visibility on click
            />
          </div>
        </div>
        <div className="p-4 flex items-baseline space-x-2">
          <h1 className="text-lg text-gray-900 font-semibold">
            {selectedComponent}
          </h1>
          {breadcrumb.map((item, index) => (
            <Link
              to="/"
              key={index}
              className="text-sm hover:text-blue-500 text-gray-500"
            >
              {index > 0 && " . "}
              {item}
            </Link>
          ))}
        </div>
      </header>

      {/* Off-Canvas Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform ${
          sidebarVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="text-lg font-semibold">Quick Menu</span>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4 flex flex-col items-center">
          <img
             src={profilePictureUrl}
             alt={user.username}
            className="h-24 w-24 rounded-full mb-3"
          />
          <span className="text-lg font-semibold">{user.username}</span>
          <span className="text-gray-500 text-sm">{(user.role?.type && user.role.type.toLowerCase()) || 'author'}</span>
          <div className="flex items-center my-2">
            <i className="fas fa-envelope text-blue-500 mr-2"></i>
            <span className="text-gray-500 text-sm">
              {user.email}
            </span>
          </div>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold py-2 px-4 rounded" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
        <hr className="my-4" />
        {/* side bar list */}
        <ul className="p-4 space-y-4">
          {menuItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                <i className={`fas ${item.icon} text-blue-500`}></i>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </ul>
      </div>

      {/* Overlay to close the sidebar */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars,faSignIn, faChevronDown, faUser, faPencil, faEnvelopeOpen, faBook, faClock, faStar, faHistory, faCogs, faSignOut } from '@fortawesome/free-solid-svg-icons';
// import { faBell,faEnvelope} from '@fortawesome/free-regular-svg-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { userActions } from '../store';
// import { useNavigate } from 'react-router-dom';
// import Message from "./Message";

// const PageHeader = () => {
  
//   const [messagesVisible, setMessagesVisible] = useState(false);
//   const [messages, setMessages] = useState([]); 
//   const [noMessages, setNoMessages] = useState(false); 
//   const [unreadCount, setUnreadCount] = useState('0');
//   const dropdownRef = useRef(null);
//   const messagedownRef = useRef(null);
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.userData.theme);
//   const barsClick = useSelector((state) => state.userData.barsClick);
//   const user = useSelector((state) => state.userData.user);
//   const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
//   const navigate = useNavigate();
  
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const toggleNavbar = () => {
//     dispatch(userActions.setBarsClick(!barsClick));
//   };



//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };
//   // const toggleMessages = async () => {
//   //   setMessagesVisible(!messagesVisible);

//   //   // Fetch messages when opening the messages div
//   //   if (!messagesVisible) {
//   //     try {
//   //       const response = await fetch("https://api.ru-novel.ru/api/header/messages", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({
//   //           recipient: user.username,
//   //         }),
//   //       });

//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         if (data.length === 0) {
//   //           setNoMessages(true);
//   //           setMessages([]);
//   //         } else {
//   //           setNoMessages(false);
//   //           setMessages(data);
//   //         }
//   //       } else {
//   //         console.error("Error fetching messages");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   }
//   // };
//   const fetchNotifications = async () => {
       

//     try {
//       const response = await fetch("https://api.ru-novel.ru/api/header/messages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           recipient: user.username,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         //console.log('my_data',data)
//         if (data.length === 0) {
//           setNoMessages(true);
//           setMessages([]);
//           localStorage.setItem('unreadNotifications', '0');
//         } else {
//           setNoMessages(false);
//           setMessages(data);

//           const unreadMessages = data.length;
//           const previousUnreadCount = parseInt(localStorage.getItem('lastKnownUnreadCount'), 10) ;
//            //console.log("hey",previousUnreadCount)
//            //console.log("bey",unreadMessages)


//            if (!localStorage.getItem('lastKnownUnreadCount') || window.location.pathname === '/private/1') {
//             // Only set lastKnownUnreadCount if it hasn't been set, or user is on /private
//             localStorage.setItem('lastKnownUnreadCount', unreadMessages.toString());
//             //localStorage.setItem('unreadNotifications', '0');
           
//           }
  

//           if (unreadMessages > previousUnreadCount) {
            
//             localStorage.setItem('unreadNotifications', (unreadMessages - previousUnreadCount).toString());
//             const storedUnreadCount = localStorage.getItem('unreadNotifications');
//             setUnreadCount(storedUnreadCount );
//           } else if (unreadMessages < previousUnreadCount) {
//             localStorage.setItem('unreadNotifications', (previousUnreadCount - unreadMessages).toString());
//             const storedUnreadCount = localStorage.getItem('unreadNotifications');
//             setUnreadCount(storedUnreadCount );
//           } else {
//             localStorage.setItem('unreadNotifications', '0');
//           }

//           // localStorage.setItem('lastKnownUnreadCount', unreadMessages.toString());
//         }
//       } else {
//         console.error("Error fetching notifications");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const toggleMessages = async () => {
//     setMessagesVisible(!messagesVisible);

//     if (!messagesVisible) {
//       // Mark all notifications as read (not implemented)
//     }
//   };

//   useEffect(() => {
   
     
    
//     const handleClickOutside = (event) => {
      
//       // Close profile dropdown if clicked outside
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
  
//       // Close message dropdown if clicked outside
//       if (messagedownRef.current && !messagedownRef.current.contains(event.target)) {
//         setMessagesVisible(false); // Close the message dropdown
//       }
//     };
  
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef, messagedownRef]);

//   useEffect(() => {

//     fetchNotifications();

//   }, []);
  

//   const handleLogout = () => {
//     dispatch(userActions.setLogout(false));
//     localStorage.removeItem('authtoken')
//     localStorage.removeItem('userEmail')
//     navigate('/');
//     window.location.reload(); // This will refresh the entire page
//   };

  
    
//   const profilePictureUrl = user.profilePicture;
//     // ? `https://api.ru-novel.ru/uploads/${user.profilePicture}`
//     // : '/default-avatar.png';

//     return (
//       <header className={`h-20 w-full z-50 ${theme === 'dark' ? 'bg-[#131313] text-white' : 'bg-white text-black'}`}>
//         <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
//           <div className="flex items-center lg:ml-20 ml-0">
//             <Link to="/" title="RU Novel">
//               <img
//                 // src="https://www.royaload.com/dist/img/logo/rr-logo-gold-white-small-min.png"
//                 src="https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/border-images%2Flogo3.png?alt=media&token=5992bcd8-4adb-4c8c-89db-9e40ac5b2cef"
//                 alt="RU Novel"
//                 className="h-64 lg:h-64"
//               />
              
                
              
//             </Link>
//           </div>
  
//           {/* Large Screen */}
//           <div className="flex items-center space-x-2">
//             <ul className="flex space-x-4">
//               <li className="relative">
//                 <Link
//                   to="/private/1"
//                   className="flex items-center text-gray-400 hover:text-[#23527C]"
//                   aria-label="Notifications - 0 new"
//                 >
                  
//                     <span className="notification-count absolute top-2 right-0 bottom-1 block h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center ml-2">
//                       {unreadCount}
//                     </span>
                
//                   <FontAwesomeIcon icon={faBell} className="mr-2 text-[18px] lg:text-[20px] mt-4 lg:mt-5" />
//                 </Link>
//               </li>
//               {isAuthenticated ? (
//                 <>
//                <li className="relative block mt-5" ref={messagedownRef} >
//                   <button
//                     onClick={toggleMessages}
//                     className="flex items-center text-gray-400 hover:text-[#23527C]"
//                     aria-label="Messages"
//                   >
//                     <FontAwesomeIcon icon={faEnvelope} className="text-[18px] lg:text-[20px]" />
//                   </button>
//                   {/* Messages div */}
//                   {messagesVisible && (
//                     <Message messages={messages} noMessages={noMessages} />
                    
//                   )}
//                 </li>
                
                
//                 <li className="relative group" ref={dropdownRef}>
                  
//                   <button
//                     className={`flex items-center px-2 py-2 lg:py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}
//                     style={{ height: '110%' }}
//                     onClick={toggleDropdown}
//                   >
//                     <img
//                       src={profilePictureUrl}
//                       alt={user.username}
//                       className="w-7 h-7 lg:w-8 lg:h-8 rounded-full mr-2"
//                     />
//                     <span className="text-gray-500 font-bold hover:text-gray-400">{user.username}</span>
//                     <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-500" />
//                   </button>
//                   {dropdownVisible && (
//                     <ul
//                       style={{ zIndex: 10 }}
//                       className={`absolute right-0 mt-2 text-[#bcc2cb] space-y-2 w-40 lg:w-48 text-sm ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-600'}`}
//                     >
//                       <li>
//                         <Link to="/profile" className="flex items-center px-3 py-1 hover:bg-[#55616f]" onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faUser} className="mr-2 text-[#6fa7d7]" />
//                           My Profile
//                         </Link>
//                       </li>
//                       <li onClick={fetch}>
//                       <Link to={
//                             user.role === 'author'
//                             ? '/author-dashboard'
//                             : '/admin-dashboard'
//                           } 
//                           className="flex items-center px-3 py-1 hover:bg-[#55616f]" onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faPencil} className="mr-2 text-[#6fa7d7]"  />
//                           {user.role === 'author'
//                             ? 'Author Dashboard'
//                             : user.role === 'admin'
//                             ? 'Admin Dashboard'
//                             : 'Moderator Dashboard'}
//                         </Link>
//                         {/* <Link to="/author-dashboard" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
//                           <FontAwesomeIcon icon={faPencil} className="mr-2 text-[#6fa7d7]" />
//                           Author Dashboard
//                         </Link> */}
//                       </li>
//                       <li>
//                         <Link to="/private/1" className="flex items-center px-3 py-1 hover:bg-[#55616f]"onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faEnvelopeOpen} className="mr-2 text-[#6fa7d7]" />
//                           Inbox
//                         </Link>
//                       </li>
//                       <li className="divider"></li>
//                       <li>
//                         <Link to="/my/follows" className="flex items-center px-3 py-1 hover:bg-[#55616f]" onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faBook} className="mr-2 text-[#6fa7d7]" />
//                           Follow List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/my/readlater" className="flex items-center px-3 py-1 hover:bg-[#55616f]"onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faClock} className="mr-2 text-[#6fa7d7]" />
//                           Read Later
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/my/favorites" className="flex items-center px-3 py-1 hover:bg-[#55616f]"onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faStar} className="mr-2 text-[#6fa7d7]" />
//                           Favorites
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="/my/history" className="flex items-center px-3 py-1 hover:bg-[#55616f]"onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faHistory} className="mr-2 text-[#6fa7d7]" />
//                           History
//                         </Link>
//                       </li>
//                       <li className="divider"></li>
//                       <li>
//                         <Link to="/account" className="flex items-center px-3 py-1 hover:bg-[#55616f]"onClick={() => setDropdownVisible(false)} >
//                           <FontAwesomeIcon icon={faCogs} className="mr-2 text-[#6fa7d7]" />
//                           Settings
//                         </Link>
//                       </li>
//                       <li>
//                         <button type="button" onClick={handleLogout} className="flex items-center px-3 py-1 hover:bg-[#55616f]">
//                           <FontAwesomeIcon icon={faSignOut} className="mr-2 text-[#6fa7d7]" />
//                           Log Out
//                         </button>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//                 </>
//               ) : (
//                 <li>
//                   <Link
//                     to="/login"
//                     className="flex items-center mr-4 lg:mr-6 text-[#337AB7] p-4 lg:p-[20px] text-[12px] lg:text-[14px] hover:bg-[#EEEEEE] hover:text-[#23527C]"
//                   >
//                     <FontAwesomeIcon icon={faSignIn} />
//                     <span className="ml-2">Log In</span>
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </div>
  
//           {/* Small Screen */}
         
//         </div>
//       </header>
//     );
//   };
  
//   export default PageHeader;
