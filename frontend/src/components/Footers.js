import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-white text-gray-500 p-4 flex justify-between items-center shadow-md">
            <div className="flex space-x-4">
                <a href="/blog" className="hover:text-gray-600">Blog</a>
                <a href="/terms-of-service" className="hover:text-gray-600">Terms of Service</a>
                <a href="/support" className="hover:text-gray-600">Support</a>
                <a href="/status" className="hover:text-gray-600">Status</a>
            </div>
            <span>© 2024 RU Novel</span>
        </footer>
    );
};
