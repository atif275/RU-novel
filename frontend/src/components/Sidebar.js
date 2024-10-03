import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

export const Sidebar = ({ setSelectedComponent }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('Author Dashboard');
    const [activeTab2, setActiveTab2] = useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(false); // Track small screen

    // Collapse sidebar if screen is small
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1080) {
                setCollapsed(true);
                setIsSmallScreen(true); // Set small screen state
            } else {
                setCollapsed(false);
                setIsSmallScreen(false); // Set large screen state
            }
        };

        // Set the initial state based on screen size
        handleResize();

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle user clicks for collapsing the sidebar
    const toggleSidebar = () => setCollapsed(!collapsed);

    // Handle tab click and collapse sidebar on small screens
    const handleMenuItemClick = (item) => {
        setSelectedComponent(item);
        setActiveTab(item);
        if (isSmallScreen) {
            setCollapsed(true); // Auto-collapse on small screens after selecting a tab
        }
    };

    return (
        <>
            {/* Top-left toggle button for small screens */}
            {isSmallScreen && collapsed && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-6 left-3 z-50  text-gray-500 hover:text-blue-400 text-md"
                >
                    <i className="fas fa-bars text-[20px] "></i>
                </button>
            )}

            {/* Sidebar */}
            {!collapsed || !isSmallScreen ? (
                <div
                    id="sidebar-bg"
                    className={`transition-all duration-300 
                    ${collapsed ? 'w-16 min-w-16 max-w-16' : 'w-64 min-w-64 max-w-64'}
                    ${isSmallScreen && !collapsed ? 'absolute z-50' : 'relative'} 
                    min-h-screen bg-black text-white flex flex-col`}
                >
                    <div className="flex items-center p-5 justify-between" id="logo-bg">
                        {!collapsed && (
                            <div className="logo">
                                <Link to="/" title="RU - Novel">
                                    <img
                                        src="https://www.royalroad.com/dist/img/logo/rr-logo-smallcaps-flat-white-min.png"
                                        alt="Logo"
                                        className="h-8"
                                    />
                                </Link>
                            </div>
                        )}
                        <div className="toggle-button">
                            <button onClick={toggleSidebar} className="flex items-center">
                                <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-500 hover:text-blue-400 text-md`}></i>
                            </button>
                        </div>
                    </div>
                    <ul className={`menu-nav flex-1 ${collapsed ? 'flex-col justify-center' : 'flex-col items-start'} mt-5 pl-[16px] pr-5`}>
                        {['Author Dashboard', 'Submissions', 'Fictions', 'Notes', 'Writathon', 'Invitations'].map((item, index) => (
                            <li
                                key={index}
                                className={`menu-item w-full ${activeTab === item ? 'bg-[#1f1f27] text-blue-400' : ''} ${activeTab2 === item ? 'bg-[#1f1f27] text-blue-400' : ''}`}
                                onMouseEnter={() => setActiveTab2(item)} // Highlight when hovered
                                onMouseLeave={() => setActiveTab2('')}
                            >
                                <button onClick={() => handleMenuItemClick(item)} className={`menu-link p-2 flex ${collapsed ? 'justify-center' : 'justify-start'} items-center`}>
                                    <i className={`fas ${['fa-th', 'fa-plus-square', 'fa-book-open', 'fa-sticky-note', 'fa-pen-fancy', 'fa-user-plus'][index]} mr-2 md:mr-4 ${activeTab === item ? 'text-blue-400' : 'text-gray-500'} `}></i>
                                    {!collapsed && <span>{item}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </>
    );
};
