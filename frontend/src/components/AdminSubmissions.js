import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

import axios from 'axios';
import { toast } from 'react-toastify';  // Make sure to import react-toastify
import { ToastContainer } from 'react-toastify';

export const AdminSubmissions = () => {
    
    const navigate = useNavigate(); // Replace useHistory with useNavigate

const handleViewDetails = (id,title) => {
    navigate(`/admin/fiction/${id}/${title}`); // Replace history.push with navigate
};
    const [activeTab, setActiveTab] = useState('Pending');
    const [note, setNote] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, [activeTab]); // Fetch submissions when activeTab changes

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('https://api.ru-novel.ru/api/submissions');
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            // console.error('Error fetching submissions:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            // First, approve the submission
            const approveResponse = await fetch(`https://api.ru-novel.ru/api/submissions/approve/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Approved', note: '' })
            });
    
            if (approveResponse.ok) {
                setSelectedSubmission(null);
                setNote('');
                fetchSubmissions();
                toast.success('Submission Approved Successfully');
    
                // Find the submission in the local state to get its data
                const submission = submissions.find(sub => sub._id === id);
                if (submission) {
                    if (submission.requestType === 'New Fiction') {
                        // Prepare the data for the BookThread collection
                        const bookThreadData = {
                            title: submission.title,
                            author: submission.author,
                            synopsis: submission.synopsis,
                            url: submission.url,
                            image: submission.image,
                            genres: JSON.stringify(submission.genres),
                            tags: JSON.stringify(submission.tags),
                            warnings: JSON.stringify(submission.warnings),
                            ownershipProof: submission.ownershipProof,
                            manualRelease: submission.manualRelease,
                            chapters: JSON.stringify(submission.chapters)  // Assuming chapters is an array of objects
                        };
    
                        // Post the data to the BookThread collection
                        const bookThreadResponse = await fetch('https://api.ru-novel.ru/api/submit-fiction', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(bookThreadData)
                        });
    
                        if (bookThreadResponse.ok) {
                            toast.success('Book Thread Created Successfully');
                            const updateUserResponse = await fetch(`https://api.ru-novel.ru/api/usersssss/update-fictions`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ username: submission.author, title: submission.title })
                            });
    
                            if (updateUserResponse.ok) {
                                toast.success('User\'s fiction list updated successfully');
                            } else {
                                throw new Error('Failed to update user\'s fiction list');
                            }
                        } else {
                            throw new Error('Failed to create book thread');
                        }
                    } else if (submission.requestType === 'New Chapter') {
                        // Find the existing book in the BookThread collection
                        const updateResponse = await fetch('https://api.ru-novel.ru/api/bookthreads/update-chapter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: submission.title,
                                author: submission.author, 
                                chapter: submission.chapters[0]  // Assuming only one chapter is being submitted at a time
                            })
                        });
    
                        if (updateResponse.ok) {
                            toast.success('Chapter added successfully to the existing fiction');
                        } else {
                            throw new Error('Failed to add chapter to the existing fiction');
                        }
                    }
                }
            } else {
                throw new Error('Failed to approve submission');
            }
        } catch (error) {
            // console.error('Error approving submission:', error);
            toast.error('Error approving submission');
        }
    };
    
    const handleNoteSaveAndReject = async () => {
        if (selectedSubmission && note.trim()) {
            try {
                const response = await fetch(`https://api.ru-novel.ru/api/submissions/reject/${selectedSubmission._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'Rejected', note: note })
                });
                if (response.ok) {
                    setSelectedSubmission(null);
                    setNote('');
                    fetchSubmissions(); // Refresh the list after rejection
                    toast.success('Submission Rejected Successfully');
                } else {
                    throw new Error('Failed to reject submission');
                }
            } catch (error) {
                // console.error('Error rejecting submission:', error);
                toast.error('Error rejecting submission');
            }
        }
    };

    const handleReject = (submission) => {
        setSelectedSubmission(submission);
        setNote(submission.note || '');
    };

    
    const handleViewNote = (submission) => {
        setSelectedSubmission(submission);
        setNote(submission.note || '');
    };

    const filteredSubmissions = submissions.filter(submission => submission.status === activeTab);

    const getTabClass = (tabName) => {
        return `cursor-pointer text-gray-600 hover:text-gray-800 py-2 ${
            activeTab === tabName ? 'border-b-4 border-blue-500 font-bold' : 'hover:border-b-4 hover:border-blue-500'
        }`;
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
                <button className={getTabClass('Pending')} onClick={() => setActiveTab('Pending')}>Pending</button>
                <button className={getTabClass('Approved')} onClick={() => setActiveTab('Approved')}>Approved</button>
                <button className={getTabClass('Rejected')} onClick={() => setActiveTab('Rejected')}>Rejected</button>
            </div>
            
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">{activeTab} {` `} Submissions</h2>
                </div>
                <div className="p-4 flex items-center" style={{ minHeight: '4rem' }}>
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* <th className="px-6 py-3 text-left font-medium text-gray-500">ID</th> */}
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Request Type</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Author</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Title</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Submitted Date</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Details</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                                {activeTab === 'Pending' ? (
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                                ) : (
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">Note</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubmissions.map((submission) => (
                                <tr key={submission._id}>
                                    {/* <td className="px-6 py-4">{submission._id}</td> */}
                                    <td className="px-6 py-4">{submission.requestType}</td>
                                    <td className="px-6 py-4">{submission.author}</td>
                                    <td className="px-6 py-4">{submission.title}</td>
                                    <td className="px-6 py-4">{submission.submittedDate}</td>
                                    <td className="px-6 py-4"><button onClick={() => handleViewDetails(submission._id, submission.title)} className="text-blue-600 hover:text-blue-800">Show Details</button></td>
                                    <td className="px-6 py-4">{submission.status}</td>
                                    <td className="px-6 py-4">
                                        {activeTab === 'Pending' ? (
                                            <>
                                                 <button className="mr-2 text-green-600 hover:text-green-800" onClick={() => handleApprove(submission._id)}>Approve</button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => handleReject(submission)}>Reject</button>
                                         </>
                                        ) : (
                                            <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewNote(submission)}>View Note</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            
            {/* Notepad Popup */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h3 className="text-lg font-semibold mb-4">{activeTab === 'Pending' ? 'Add a Note for Rejection' : 'View Note'}</h3>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
                            readOnly={activeTab !== 'Pending'}
                        />
                        <div className="flex justify-end">
                            {activeTab === 'Pending' && (
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                                    onClick={handleNoteSaveAndReject}
                                    disabled={!note.trim()} // Disable save button if note is empty
                                >
                                    SaveNote and Reject
                                </button>
                            )}
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={() => setSelectedSubmission(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
