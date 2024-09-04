import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { ToastContainer } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import  app  from '../firebase'; // Assume firebase.js exports initialized app

export const AdminManageBorders = () => {
    const [activeTab, setActiveTab] = useState('Level');
    const [borders, setBorders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newBorder, setNewBorder] = useState({
        name: '',
        imageUrl: '',
        link: '',
    });
    const [selectedIds, setSelectedIds] = useState({});
    const [imageUploading, setImageUploading] = useState(false);

    useEffect(() => {
        fetchBorders(); 
    }, [activeTab]);

    const fetchBorders = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/borders?tag=${activeTab.toLowerCase()}`);
            setBorders(response.data);
        } catch (error) {
            console.error('Error fetching borders:', error);
        }
    };

    const getTabClass = (tabName) => {
        return `cursor-pointer text-gray-600 hover:text-gray-800 py-2 ${
            activeTab === tabName ? 'border-b-4 border-blue-500 font-bold' : 'hover:border-b-4 hover:border-blue-500'
        }`;
    };

    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (image) {
            try {
                setImageUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, "border-images/" + image.name);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                setNewBorder({ ...newBorder, imageUrl: downloadURL, link: downloadURL });
            } catch (error) {
                console.log(error);
                toast.error('Failed to upload image');
            } finally {
                setImageUploading(false);
            }
        }
    };

    const handleAddBorder = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/add-border', {
                ...newBorder,
                tag: activeTab.toLowerCase(),
            });
            if (response.status === 201) {
                toast.success('Border added successfully');
                fetchBorders(); 
                setShowForm(false);
                setNewBorder({ name: '', imageUrl: '', link: '' });
            }
        } catch (error) {
            console.error('Error adding border:', error);
            toast.error('Failed to add border');
        }
    };

    const handleDelete = async (id = null) => {
        const idsToDelete = id ? [id] : Object.keys(selectedIds).filter(id => selectedIds[id]);
    
        if (idsToDelete.length > 0 && window.confirm("Are you sure you want to delete selected borders?")) {
            try {
                await Promise.all(idsToDelete.map(async (id) => {
                    await axios.delete(`http://localhost:5001/api/delete-border/${id}`);
                }));
    
                toast.success('Selected borders deleted successfully');
                setSelectedIds({});
                fetchBorders(); // Refresh the borders list after deletion
            } catch (error) {
                console.error('Error deleting borders:', error);
                toast.error('Failed to delete borders');
            }
        }
    };
    

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const allChecked = Object.values(selectedIds).filter(Boolean).length > 0;

    return (
        <div className="flex-grow p-4 bg-gray-200">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex space-x-8 mb-6 ml-1">
                <button className={getTabClass('Level')} onClick={() => setActiveTab('Level')}>Level</button>
                <button className={getTabClass('Premium')} onClick={() => setActiveTab('Premium')}>Premium</button>
            </div>

            <div className="bg-white shadow rounded overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{activeTab} Borders</h2>
                    <div>
                    <button
    className={`mr-4 bg-red-500 text-white font-bold py-2 px-4 rounded ${!allChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
    onClick={() => handleDelete()}
    disabled={!allChecked}
>
    Delete
</button>
                        <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowForm(true)}
                            >
                            Add Border
                        </button>
                    </div>
                </div>

                <div className="p-4 flex items-center" style={{ minHeight: '4rem' }}>
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th className="px-6 py-3 text-left font-medium text-gray-500">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        const allChecked = e.target.checked;
                                        const newSelectedIds = {};
                                        borders.forEach(border => newSelectedIds[border._id] = allChecked);
                                        setSelectedIds(newSelectedIds);
                                    }}
                                    checked={Object.values(selectedIds).filter(Boolean).length === borders.length}
                                />
                            </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Border Name</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Image</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Border Link</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Tag</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {borders.map((border) => (
                                <tr key={border._id}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedIds[border._id]}
                                            onChange={() => handleCheckboxChange(border._id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">{border.name}</td>
                                    <td className="px-6 py-4">
                                        <img src={border.imageUrl} alt={border.name} className="h-16 w-22" />
                                    </td>
                                    <td className="px-6 py-4">{border.link}</td>
                                    <td className="px-6 py-4">{border.tag}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="mr-2 text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(border._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Add {activeTab} Border</h2>
                        <label className="block mb-2">Border Name</label>
                        <input
                            type="text"
                            value={newBorder.name}
                            onChange={(e) => setNewBorder({ ...newBorder, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Border Name"
                        />
                        <label className="block mb-2">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <label className="block mb-2">Border Link</label>
                        <input
                            type="text"
                            value={newBorder.link}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowForm(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddBorder}
                                disabled={imageUploading}
                            >
                                {imageUploading ? 'Uploading...' : 'Add Border'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
