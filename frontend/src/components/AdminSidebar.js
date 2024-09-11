import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css"
export const AdminSidebar = ({ setSelectedComponent }) => {
    const [collapsed, setCollapsed] = useState(false);
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
    };

    return (
        <div id="sidebar-bg" className={`transition-all duration-300 ${collapsed ? 'w-16 min-w-16 max-w-16' : 'w-64 min-w-64 max-w-64'} min-h-screen bg-black text-white flex flex-col`}>
        <div className="flex items-center p-5 justify-between" id="logo-bg">
            {!collapsed && (
                <div className="logo">
                        <Link to="/admin-dashboard" title="RU Novel">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/border-images%2FRU%20Novel%20%20Logo%20350x51%20.png?alt=media&token=96255b7b-f421-42a1-98e0-2ad265c31738" alt="Logo" className="mt-2" />
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
                {['Admin Dashboard', 'Manage Employees', 'Submissions', 'Transactions', 'Advertising', 'UTM Tags','Borders','Notes'].map((item, index) => (
                    <li key={index} className="menu-item w-full">
                        <button onClick={() => handleMenuItemClick(item)} className={`menu-link p-2 flex ${collapsed ? 'justify-center' : 'justify-start'} items-center`}>
                            <i className={`fas ${['fa-th', 'fa-user-plus', 'fa-plus-square', 'fas fa-file-invoice', 'fa-ad', 'fa-pen-fancy',"fas fa-portrait",'fa-sticky-note'][index]} mr-2 md:mr-4 text-gray-500 hover:text-blue-400 `}></i>
                            {!collapsed && <span>{item}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
// 'Admin Dashboard', 'Manage Employees', 'Submissions', 'Transactions', 'Advertising', 'UTM Tags','Borders','Notes'
// 'fa-th', 'fa-user-plus', 'fa-plus-square', 'fas fa-file-invoice', 'fa-ad', 'fa-pen-fancy',"fas fa-portrait",'fa-sticky-note'