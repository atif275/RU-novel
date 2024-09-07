import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // To access the logged-in user's data
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faFileAlt,
  faFileWord, // Correct icon for "Total Words"
  faStar,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const dashboardItems = [
    { key: 'fictionsCount', title: 'Fictions', icon: faBookOpen },
    { key: 'totalChapters', title: 'Total Chapters', icon: faFileAlt },
    { key: 'totalWords', title: 'Total Words', icon: faFileWord },
    { key: 'reviewsReceived', title: 'Reviews Received', icon: faStar },
    { key: 'uniqueFollowers', title: 'Unique Followers', icon: faUsers }
];

export const AuthorDashboard= ({ onNewFiction }) =>  {

    const [dashboardData, setDashboardData] = useState({
        fictionsCount: 0,
        totalChapters: 0,
        totalWords: 0,
        reviewsReceived: 0,
        uniqueFollowers: 0
    });

    const user = useSelector(state => state.userData.user); // Assuming the username is stored here

    useEffect(() => {
        if (user.username) {
            fetchDashboardData(user.username);
        }
    }, [user.username]);

    const fetchDashboardData = async (username) => {
        try {
            const response = await fetch(`https://api.ru-novel.ru/api/author-dashboard/${username}`);
            const data = await response.json();
            if (response.ok) {
                setDashboardData({
                    fictionsCount: data.data.fictionsCount,
                    totalChapters: data.data.totalChapters,
                    totalWords: data.data.totalWords,
                    reviewsReceived: data.data.reviewsCount,
                    uniqueFollowers: data.data.followersCount
                });
            } else {
                // toast.error('No data found dashboard data');

                // throw new Error(data.message || 'Failed to fetch dashboard data');
            }
        } catch (error) {
            // console.error('Error fetching author dashboard data:', error);
            toast.error('Failed to fetch dashboard data');
        }
    };

    return (
        <div className="flex-grow p-4  bg-gray-200">
            <div className="grid grid-cols-5 gap-4">
                {/* Dashboard Items updated to use state variables */}
                {dashboardItems.map(item => (
                    <div key={item.title} className="bg-white p-4 shadow rounded flex items-center space-x-3">
                        <FontAwesomeIcon icon={item.icon} className="text-gray-500" />
                        <span>{item.title}: {dashboardData[item.key]}</span>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 shadow rounded mt-4 flex justify-between items-center">
                <span>Add New</span>
                <button onClick={onNewFiction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add
                </button>
            </div>
            <div className="flex mt-4 space-x-4">
                <div className="flex-1">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold">Recent Reviews</h2>
                        <div className="mt-2 border-t border-gray-200 p-4">
                            {/* Placeholder for dynamic content */}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-semibold">Recent Comments</h2>
                        <div className="mt-2 border-t border-gray-200 p-4">
                            {/* Placeholder for dynamic content */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
