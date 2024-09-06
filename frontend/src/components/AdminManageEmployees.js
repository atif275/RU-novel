import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Make sure to import react-toastify
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const AdminManageEmployees = () => {
    const [activeTab, setActiveTab] = useState('Moderator');
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState('');  // For displaying form-level errors
    const [formErrors, setFormErrors] = useState({});  // For tracking individual field errors
    const [selectedIds, setSelectedIds] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false); 
    const [editUser, setEditUser] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);


const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
};

const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '', 
    gender: 'male',
    role: activeTab.toLowerCase(),
});

    useEffect(() => {
        fetchUsers(); // Fetch users when activeTab changes
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`https://api.ru-novel.ru/api/users?role=${activeTab.toLowerCase()}`);
            setUsers(response.data);
        } catch (error) {
            // console.error('Error fetching users:', error);
        }
    };
    
    const getTabClass = (tabName) => {
        return `cursor-pointer text-gray-600 hover:text-gray-800 py-2 ${
            activeTab === tabName ? 'border-b-4 border-blue-500 font-bold' : 'hover:border-b-4 hover:border-blue-500'
        }`;
    };
    const handleBlock = async (user) => {
        try {
            await axios.post(`https://api.ru-novel.ru/api/block-users`, { email: user.email });
            toast.success('User blocked successfully');
            setEditUser((prevUser) => ({ ...prevUser, status: 'blocked' }));
            fetchUsers(); // Refresh the users list after blocking
        } catch (error) {
            // console.error('Error blocking user:', error);
            toast.error('Failed to block user');
        }
    };
    
    const handleUnblock = async (user) => {
        try {
            await axios.post(`https://api.ru-novel.ru/api/unblock-users`, { email: user.email });
            toast.success('User unblocked successfully');
            setEditUser((prevUser) => ({ ...prevUser, status: 'active' }));
            fetchUsers(); // Refresh the users list after unblocking
        } catch (error) {
            // console.error('Error unblocking user:', error);
            toast.error('Failed to unblock user');
        }
    };
    
   
    const handleAddUser = async () => {
        let errors = {};
    
        if (!newUser.username || !/^[a-zA-Z0-9]+$/.test(newUser.username)) {
            errors.username = '* Invalid username format *';
        }
        if (!newUser.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.email)) {
            errors.email = '* Invalid email format *';
        }
        if (!newUser.password || newUser.password.length < 8) {
            errors.password = '* Password must be at least 8 characters *';
        }
    
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setFormError('* Please correct the errors below *');
            return;
        }
        // Determine the profile image URL based on the role and gender
        let profileImageUrl = "";
        if (newUser.role === 'admin') {
            profileImageUrl = newUser.gender === 'male'
                ? "https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/user-profile-images%2Fadmin.png?alt=media&token=765cd03d-0937-45ae-bd77-6cab739a9dbe"
                : "https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/user-profile-images%2FfemaleAdmin.png?alt=media&token=3dded7a5-ac37-439e-9b9c-598b25b7a7d3";
        } else if (newUser.role === 'moderator') {
            profileImageUrl = "https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/user-profile-images%2Fmoderator.jpg?alt=media&token=5395dd43-bf48-485b-b139-068be199046c";
        }

        // Add the profileImage field to newUser
        const userData = {
            ...newUser,
            profilePicture: profileImageUrl,
        };
    
        try {
            const response = await axios.post('https://api.ru-novel.ru/api/add-users', userData);
            if (response.status === 201) {
                toast.success(`${newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} added successfully`);
                fetchUsers(); // Refresh the user list
                setNewUser({
                    username: '',
                    email: '',
                    password: '',  // Reset password field
                    gender: 'male',
                    role: activeTab.toLowerCase(),  // Reset role field
                });
                setShowForm(false);
                setFormErrors({});
            } else if (response.data.message.includes('already exists')) {
                setFormError(response.data.message.includes('Username') ? '* Username is already taken *' : '* Email is already taken *');
                if (response.data.message.includes('Username')) {
                    setFormErrors({ username: true });
                } else if (response.data.message.includes('Email')) {
                    setFormErrors({ email: true });
                }
            } else {
                toast.error('Failed to add user');
            }
        } catch (error) {
            // console.error('Error adding user:', error.response?.data || error.message);
            toast.error(`Failed to add user: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const allChecked = Object.values(selectedIds).filter(Boolean).length > 0;

    const deleteItems = async (ids, type) => {
        const url = 'https://api.ru-novel.ru/api/delete-users';
        const payloadKey = 'userIds'; // Define the key for user IDs
        if (!ids.length) return; 
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [payloadKey]: ids }) 
        });
    };

    const handleDelete = () => {
        return async () => {
            const idsToDelete = Object.keys(selectedIds).filter(id => selectedIds[id]);
            if (idsToDelete.length > 0 && window.confirm("Are you sure you want to delete selected items?")) {
                try {
                    await deleteItems(idsToDelete, activeTab.toLowerCase());
                    toast.success('Selected users deleted successfully');  // Success toast
                    const filteredData = users.filter(user => !selectedIds[user._id]);
                    setUsers(filteredData);
                    setSelectedIds({});
                } catch (error) {
                    // console.error('Error deleting users:', error);
                    toast.error('Failed to delete users');  // Error toast
                }
            }
        };
    };
    const handleClose = () => {
        setShowForm(false);
        setNewUser({
            username: '',
            email: '',
            password: '',  // Reset password field
            gender: 'male',
            role: activeTab.toLowerCase(),  // Reset role field
        });


    }
    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteItems([userId], activeTab.toLowerCase());
                toast.success('User deleted successfully');  // Success toast
                setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the list
                setShowEditForm(false); // Close the popup form
            } catch (error) {
                // console.error('Error deleting user:', error);
                toast.error('Failed to delete user');  // Error toast
            }
        }
    };
    

    const handleUpdateUser = async () => {
        if (!editUser.username || !/^[a-zA-Z0-9]+$/.test(editUser.username)) {
            setFormErrors({ username: '* Invalid username format *' });
            setFormError('* Please correct the errors below *');
            return;
        }
        if (!editUser.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editUser.email)) {
            setFormErrors({ email: '* Invalid email format *' });
            setFormError('* Please correct the errors below *');
            return;
        }
        if (editUser.password && editUser.password.length < 8) {
            setFormErrors({ password: '* Password must be at least 8 characters *' });
            setFormError('* Please correct the errors below *');
            return;
        }
    
        if (window.confirm("Are you sure you want to update this user's details?")) {
            try {
                const response = await axios.put(`https://api.ru-novel.ru/api/update-userinfo/${editUser._id}`, editUser);
                if (response.status === 200) {
                    toast.success('User updated successfully');
                    fetchUsers();
                    setShowEditForm(false);
                } else {
                    toast.error('Failed to update user');
                }
            } catch (error) {
                // console.error('Error updating user:', error);
                toast.error(`Failed to update user: ${error.response?.data?.message || error.message}`);
            }
        }
    };
    
    const openEditForm = (user) => {
        setEditUser(user);
        setShowEditForm(true);
        setFormError('');
        setFormErrors({});
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
            <div className="flex space-x-8 mb-6 ml-1">
                <button className={getTabClass('Moderator')} onClick={() => setActiveTab('Moderator')}>Moderator</button>
                <button className={getTabClass('Admin')} onClick={() => setActiveTab('Admin')}>Admin</button>
                
            </div>
            
            <div className="bg-white shadow rounded overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{activeTab}</h2>
                    <div>
                        <button
                            className={`mr-4 bg-red-500 text-white font-bold py-2 px-4 rounded ${!allChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                            onClick={handleDelete()}
                            disabled={!allChecked}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowForm(true)}
                        >
                            Add {activeTab}
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
                                        onChange={e => {
                                            const allChecked = e.target.checked;
                                            const newSelectedIds = {};
                                            users.forEach(user => newSelectedIds[user._id] = allChecked);
                                            setSelectedIds(newSelectedIds);
                                        }}
                                        checked={Object.values(selectedIds).filter(Boolean).length === users.length}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">ID</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Username</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Email</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Role</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                               
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4">
                                    <input
                                            type="checkbox"
                                            checked={!!selectedIds[user._id]}
                                            onChange={() => handleCheckboxChange(user._id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">{user._id}</td>
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="mr-2 text-blue-600 hover:text-blue-800"
                                            onClick={() => openEditForm(user)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        {user.status === 'active' ? (
                                            <button
                                                className="mr-2 text-red-600 hover:text-red-800"
                                                onClick={() => handleBlock(user)}
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button
                                                className="text-green-600 hover:text-green-800"
                                                onClick={() => handleUnblock(user)}
                                            >
                                                Unblock
                                            </button>
                                        )}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            {showForm && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add {activeTab}</h2>
            
            {/* Error message */}
            {formError && (
                <p className="text-red-500 text-center mb-4">{formError}</p>
            )}

            <label className="block mb-2">Username</label>
            <input
                type="text"
                value={newUser.username}
                onChange={(e) => {
                    setNewUser({ ...newUser, username: e.target.value });
                    setFormError('');
                }}
                className={`w-full p-2 border ${
                    formErrors.username ? 'border-red-500' : 'border-gray-300'
                } rounded mb-4`}
                placeholder="Username"
            />

            <label className="block mb-2">Email</label>
            <input
                type="email"
                value={newUser.email}
                onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                    setFormError('');
                }}
                className={`w-full p-2 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                } rounded mb-4`}
                placeholder="Email"
            />

            <label className="block mb-2">Password</label>
            <div className="relative">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) => {
                        setNewUser({ ...newUser, password: e.target.value });
                        setFormError('');
                    }}
                    className={`w-full p-2 border ${
                        formErrors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded mb-4`}
                    placeholder="Password (min 8 characters)"
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </button>
            </div>


            <label className="block mb-2">Gender</label>
            <select
                value={newUser.gender}
                onChange={(e) => {
                    setNewUser({ ...newUser, gender: e.target.value });
                    setFormError('');
                }}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label className="block mb-2">Role</label>
            <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                {activeTab === 'Moderator' ? (
                    <>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                    </>
                ) : (
                    <>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </>
                )}
            </select>

            <div className="flex justify-end space-x-4">
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => setShowForm(false)}
                    onClick={handleClose}
                >
                    Close
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddUser}
                >
                    Add
                </button>
            </div>
        </div>
    </div>
)}

{showEditForm && editUser && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Edit {editUser.username}</h2>
                        <button 
                            className=" hover:text-red-500"
                            onClick={() => setShowEditForm(false)}
                        >
                            <i className="fa fa-close text-gray-600 hover:text-red-500 text-bold"></i>
                        </button>
                    </div>
                        {formError && (
                            <p className="text-red-500 text-center mb-4">{formError}</p>
                        )}
                        <label className="block mb-2">Username</label>
                        <input
                            type="text"
                            value={editUser.username}
                            onChange={(e) => {
                                setEditUser({ ...editUser, username: e.target.value });
                                setFormError('');
                            }}
                            className={`w-full p-2 border ${
                                formErrors.username ? 'border-red-500' : 'border-gray-300'
                            } rounded mb-4`}
                            placeholder="Username"
                        />
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) => {
                                setEditUser({ ...editUser, email: e.target.value });
                                setFormError('');
                            }}
                            className={`w-full p-2 border ${
                                formErrors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded mb-4`}
                            placeholder="Email"
                        />
                        <label className="block mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={editUser.password}
                                onChange={(e) => {
                                    setEditUser({ ...editUser, password: e.target.value });
                                    setFormError('');
                                    setIsUpdateDisabled(false);
                                }}
                                className={`w-full p-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
                                placeholder="Password (min 8 characters)"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                            </button>
                        </div>

                        <label className="block mb-2">Role</label>
                        <select
                            value={editUser.role}
                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        >
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label className="block mb-2">Status</label>
                        <select
                            value={editUser.status}
                            onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        >
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>
                        <div className="flex justify-between space-x-4">
                        <button
                            className={`py-2 px-4 rounded ${
                                editUser.status === 'active' ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-green-500 hover:bg-green-700 text-white'
                            }`}
                            onClick={() => {
                                if (editUser.status === 'active') {
                                    handleBlock(editUser);
                                } else {
                                    handleUnblock(editUser);
                                }
                            }}
                        >
                            {editUser.status === 'active' ? 'Block' : 'Unblock'}
                        </button>

                            <button
                                className={`py-2 px-4 rounded ${
                                    Object.keys(formErrors).length > 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }`}
                                onClick={handleUpdateUser}
                                disabled={Object.keys(formErrors).length > 0}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDeleteUser(editUser._id)} 
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            )}


            
            
        </div>
    );
};
