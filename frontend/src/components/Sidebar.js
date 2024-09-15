import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"
export const Sidebar = ({ setSelectedComponent }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('Author Dashboard');
    const [activeTab2, setActiveTab2] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 1180);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleMenuItemClick = (item) => {
        setSelectedComponent(item);
        setActiveTab(item);
    };

    return (
        <div id="sidebar-bg" className={`transition-all duration-300 ${collapsed ? 'w-16 min-w-16 max-w-16' : 'w-64 min-w-64 max-w-64'} min-h-screen bg-black text-white flex flex-col`} 
         onMouseEnter={() => setCollapsed(false)}
        >
        <div className="flex items-center p-5 justify-between" id="logo-bg">
            {!collapsed && (
                <div className="logo">
                        <Link to="/" title="RU - Novel">
                        <img 
                             src="https://www.royalroad.com/dist/img/logo/rr-logo-smallcaps-flat-white-min.png" 
                            // src="https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/border-images%2Flogo3.png?alt=media&token=5992bcd8-4adb-4c8c-89db-9e40ac5b2cef" 
                            alt="Logo" className="h-8" />
                        </Link>
                        
                    </div>
                )}
                <div className="toggle-button">
                    <button onClick={toggleSidebar} className="flex items-center">
                        <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left '} text-gray-500  hover:text-blue-400 text-md`}></i>
                        <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left '} text-gray-400 hover:text-blue-400 text-md`}></i>
                    </button>
                </div>
            </div>
            <ul className={`menu-nav flex-1 ${collapsed ? 'flex-col justify-center' : 'flex-col items-start'} mt-5 pl-[16px] pr-5`}>
                {['Author Dashboard', 'Submissions','Fictions', 'Notes', 'Writathon', 'Invitations'].map((item, index) => (
                    <li key={index} className={`menu-item w-full ${activeTab === item ? 'bg-[#1f1f27] text-blue-400' : ''} ${activeTab2 === item ? 'bg-[#1f1f27] text-blue-400' : ''}`}
                    onMouseEnter={() => setActiveTab2(item)} // This will trigger when mouse enters the button
                    onMouseLeave={() => setActiveTab2('')} 
                    >
                        <button onClick={() => handleMenuItemClick(item)} className={`menu-link p-2 flex ${collapsed ? 'justify-center' : 'justify-start'} items-center`}>
                            <i className={`fas ${['fa-th', 'fa-plus-square','fa-book-open', 'fa-sticky-note', 'fa-pen-fancy', 'fa-user-plus', 'fa-ad'][index]} mr-2 md:mr-4 ${activeTab === item ? 'text-blue-400' : 'text-gray-500'} `}></i>
                            {!collapsed && <span >{item}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};



