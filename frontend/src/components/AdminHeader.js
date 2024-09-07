import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';
export const AdminHeader = ({ selectedComponent, breadcrumb }) => {
  const dispatch = useDispatch();
  const [readDropdownVisible, setReadDropdownVisible] = useState(false);
  const [supportDropdownVisible, setSupportDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to manage sidebar visibility
  const user = useSelector((state) => state.userData.user);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const menuItems = [
    { icon: "fa-user", label: "My Profile", link: "/profile" },
    { icon: "fa-envelope", label: "My Messages", link: "/messages" },
    { icon: "fa-bookmark", label: "Follows", link: "/my/follows" },
    { icon: "fa-clock", label: "Read Later", link: "/my/readlater" },
    { icon: "fa-star", label: "Favorites", link: "/my/favorites" },
    { icon: "fa-history", label: "History", link: "/my/history" },
    { icon: "fa-cog", label: "Settings", link: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(userActions.setLogout(false));
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminLogin');

    navigate('/');
    window.location.reload(); 
  };
  const profilePictureUrl = user.profilePicture
  // ? `https://api.ru-novel.ru/uploads/${user.profilePicture}`
  // : '/default-avatar.png';


  return (
    <>
      <header className="bg-white shadow-md w-full">

        {/* navbar header */}
        {/* <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-3">
             

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
                to="/memberlist"
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
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-book mr-2"></i> Knowledge Base
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-lightbulb mr-2"></i> Suggestions
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-users mr-2"></i> Community Help
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-ticket-alt mr-2"></i> Support Tickets
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-500 flex items-center"
                  >
                    <i className="fas fa-heartbeat mr-2"></i> Status
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                <i className="fas fa-crown mr-2"></i> Premium
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/notifications"
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-bell"></i>
            </a>
            <a href="/messages" className="text-blue-500 hover:text-blue-700">
              <i className="fas fa-envelope"></i>
            </a>
            <span className="text-gray-700">Hi, {user.username}</span>
            <img
              src={profilePictureUrl}
              alt={user.username}
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={toggleSidebar} // Toggle sidebar visibility on click
            />
          </div>
        </div> */}
        <div className="p-4 flex justify-between items-center">
            <div className="flex items-baseline space-x-2">
                    <h1 className="text-lg text-gray-900 font-semibold">
                    {selectedComponent}
                </h1>
                {breadcrumb.map((item, index) => (
                    <a
                    href="/admin-dashboard"
                    key={index}
                    className="text-sm hover:text-blue-500 text-gray-500"
                    >
                    {index > 0 && " . "}
                    {item}
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-4">
            <a
              href="/notifications"
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-bell"></i>
            </a>
            <a href="/messages" className="text-blue-500 hover:text-blue-700">
              <i className="fas fa-envelope"></i>
            </a>
            <span className="text-gray-700">Hi, {user.username}</span>
            <img
              src={profilePictureUrl}
              alt={user.username}
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={toggleSidebar} // Toggle sidebar visibility on click
            />
          </div>

          
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
          <span className="text-gray-500 text-sm">{user.role ? user.role.type : 'author'}</span>
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
