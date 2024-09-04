import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  faDollarSign,
  faEye,
  faChartLine,
  faMousePointer,
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const AdminUTMTags = () => {
    const [utmTags, setUtmTags] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTag, setNewTag] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const handleEditTag = (tag) => {
        setNewTag(tag);
        setShowForm(true);
        setIsEditing(true);
    };
    
    const handleUpdateTag = async () => {
        if (!newTag.utm_source || !newTag.utm_medium) {
            toast.error('utm_source and utm_medium are mandatory');
            return;
        }
        try {
            await axios.put(`http://localhost:5001/api/utm-tags/${newTag._id}`, newTag);
            fetchUtmTags(); // Refresh the list of UTM tags
            setShowForm(false);
            setIsEditing(false);
            resetForm();
            toast.success('UTM tag updated successfully');
        } catch (error) {
            console.error('Error updating UTM tag:', error);
            toast.error('Failed to update UTM tag');
        }
    };
    const resetForm = () => {
        setNewTag({
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: ''
        });
        setShowForm(false);
        setIsEditing(false);
    };

    
    // Add a close button in the form
    const closeForm = () => {
        setNewTag({
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: ''
        });
        setShowForm(false);
        setIsEditing(false);
    };

    useEffect(() => {
        fetchUtmTags();
    }, []);

    const fetchUtmTags = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/utm-tags');
            setUtmTags(response.data);
        } catch (error) {
            console.error('Error fetching UTM tags:', error);
            toast.error('Failed to fetch UTM tags');
        }
    };

    const handleAddTag = async () => {
        if (!newTag.utm_source || !newTag.utm_medium) {
            toast.error('utm_source and utm_medium are mandatory');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5001/api/utm-tags', newTag);
            setUtmTags([...utmTags, response.data]);
            setNewTag({
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                utm_term: '',
                utm_content: ''
            });
            setShowForm(false);
            toast.success('UTM tag added successfully');
        } catch (error) {
            console.error('Error adding UTM tag:', error);
            toast.error('Failed to add UTM tag');
        }
    };
    

    const handleDeleteTag = async (id) => {
        if (window.confirm('Are you sure you want to delete this UTM tag?')) {
            try {
                await axios.delete(`http://localhost:5001/api/utm-tags/${id}`); // Corrected URL
                setUtmTags(utmTags.filter(tag => tag._id !== id));
                toast.success('UTM tag deleted successfully');
            } catch (error) {
                console.error('Error deleting UTM tag:', error);
                toast.error('Failed to delete UTM tag');
            }
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTag({ ...newTag, [name]: value });
    };

    return (
        <div className="flex-grow p-4 bg-gray-200">
                 <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            />
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
                    <FontAwesomeIcon icon={faDollarSign} className="text-gray-500 text-xl" />
                    <span className="text-lg">$0.00</span>
                    <span className="text-sm text-gray-500">Total Spent to Date</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
                    <FontAwesomeIcon icon={faEye} className="text-gray-500 text-xl" />
                    <span className="text-lg">0.00</span>
                    <span className="text-sm text-gray-500">Total Views</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
                    <FontAwesomeIcon icon={faChartLine} className="text-gray-500 text-xl" />
                    <span className="text-lg">$0.00</span>
                    <span className="text-sm text-gray-500">Average eCPM</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
                    <FontAwesomeIcon icon={faMousePointer} className="text-gray-500 text-xl" />
                    <span className="text-lg">0.00%</span>
                    <span className="text-sm text-gray-500">Overall CTR</span>
                </div>
            </div>
            <div className="bg-white shadow rounded">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-4 p-4">
                    <h2 className="text-lg font-semibold">Your UTM Tags</h2>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowForm(true)}
                    >
                        + New UTM Tag
                    </button>
                </div>
                <div className="p-4">
                    {utmTags.length === 0 ? (
                        <div className="text-center p-4">
                            <span>You have no tags</span>
                        </div>
                    ) : (
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Source</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Medium</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Campaign</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Term</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Content</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Actions</th>
                                </tr>
                            </thead>
                            <tbody  className="bg-white divide-y divide-gray-200">
                                {utmTags.map(tag => (
                                    <tr key={tag._id}>
                                        <td className="px-6 py-4">{tag.utm_source}</td>
                                        <td className="px-6 py-4">{tag.utm_medium}</td>
                                        <td className="px-6 py-4">{tag.utm_campaign}</td>
                                        <td className="px-6 py-4">{tag.utm_term}</td>
                                        <td className="px-6 py-4">{tag.utm_content}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEditTag(tag)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteTag(tag._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        {/* <h2 className="text-lg font-semibold mb-4">Add New UTM Tag</h2> */}
                        <h2 className="text-lg font-semibold mb-4">
                            {isEditing ? 'Edit UTM Tag' : 'Add New UTM Tag'}
                        </h2>
                        <div className="space-y-4">
                            {/* UTM Source */}
                            <input
                                type="text"
                                name="utm_source"
                                value={newTag.utm_source}
                                onChange={handleInputChange}
                                placeholder="Source"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="utm_medium"
                                value={newTag.utm_medium}
                                onChange={handleInputChange}
                                placeholder="Medium"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="text"
                                name="utm_campaign"
                                value={newTag.utm_campaign}
                                onChange={handleInputChange}
                                placeholder="Campaign"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="utm_term"
                                value={newTag.utm_term}
                                onChange={handleInputChange}
                                placeholder="Term"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="utm_content"
                                value={newTag.utm_content}
                                onChange={handleInputChange}
                                placeholder="Content"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {/* Display UTM Link (read-only) */}
                            {isEditing && (
                                <div>
                                    <label className="block mb-2">Generated UTM Link</label>
                                    <input
                                        type="text"
                                        value={newTag.utm_link}
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                                        readOnly
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closeForm}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={isEditing ? handleUpdateTag : handleAddTag}
                            >
                                {isEditing ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
