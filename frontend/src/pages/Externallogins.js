import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Externallogins() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userData.user);
    const [activeTab, setActiveTab] = useState("");

    // Handle unlink action
    const handleUnlink = async (provider) => {
        try {
            await axios.put(`https://api.ru-novel.ru/api/unlink-${provider}`, { userId: currentUser._id });
            toast.success(`${provider} account unlinked successfully.`);
            
            await dispatch({
                type: 'UPDATE_USER',
                payload: {
                    ...currentUser,
                    [`${provider}Id`]: '' // Remove the ID from the user object
                }
            });
            
            toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} account unlinked successfully.`);
            window.location.reload();
        } catch (error) {
            console.error('Error unlinking account:', error);
            toast.error(`Failed to unlink ${provider} account.`);
        }
    };

    // When the user clicks the link button for Google
const handleGoogleSignIn = () => {
    const userId = currentUser._id;  // Get the _id from the user
    window.location.href = `https://api.ru-novel.ru/auth/google/link?userId=${userId}`;
};

// When the user clicks the link button for Facebook
const handleFacebookSignIn = () => {
    const userId = currentUser._id;  // Get the _id from the user
    window.location.href = `https://api.ru-novel.ru/auth/facebook/link?userId=${userId}`;
};


    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
                {/* Header */}
                <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
                    <div className="absolute left-0 ml-10 flex items-center">
                        <FaExternalLinkAlt className="text-white text-6xl mr-4" />
                        <div>
                            <h2 className="text-white text-2xl">External Logins</h2>
                            <p className="text-white text-sm">Manage your account</p>
                        </div>
                    </div>
                </div>

                {/* External Logins Section */}
                <div className="flex mt-4">
                    <div className="flex-1 ml-4">
                        <div className="bg-white shadow-lg mt-4 p-6">
                            <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6 border-b pb-2">
                                <FaExternalLinkAlt className="mr-2" />
                                EXTERNAL LOGINS
                            </h2>

                            <div className="space-y-6">
                                {/* Google Section */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-700">Google</h3>
                                        <p className="text-sm text-gray-600">
                                            Linked account: {currentUser.googleId || 'Not linked'}
                                        </p>
                                    </div>
                                    {currentUser.googleId ? (
                                        <button
                                            onClick={() => handleUnlink('google')}
                                            className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                                        >
                                            Unlink Google Account
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleGoogleSignIn}
                                            className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-500"
                                        >
                                            Link your Google Account
                                        </button>
                                    )}
                                </div>

                                {/* Facebook Section */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-700">Facebook</h3>
                                        <p className="text-sm text-gray-600">
                                            Linked account: {currentUser.facebookID || 'Not linked'}
                                        </p>
                                    </div>
                                    {currentUser.facebookID ? (
                                        <button
                                            onClick={() => handleUnlink('facebook')}
                                            className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                                        >
                                            Unlink Facebook Account
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFacebookSignIn}
                                            className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-500"
                                        >
                                            Link your Facebook Account
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Externallogins;
