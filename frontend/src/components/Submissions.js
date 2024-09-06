import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';


export const Submissions = ({ onNewFiction }) => {
    const navigate = useNavigate(); // Replace useHistory with useNavigate

const handleViewDetails = (id,title) => {
    navigate(`/submission/fiction/${id}/${title}`); // Replace history.push with navigate
};
    
    const [activeTab, setActiveTab] = useState('Pending');
    const [note, setNote] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    const user = useSelector((state) => state.userData.user);
    const username = user.username;

    useEffect(() => {
        fetchSubmissions();
    }, [activeTab, username]); // Fetch submissions when activeTab or username changes

    const fetchSubmissions = async () => {
        try {
            const response = await fetch(`https://api.ru-novel.ru/api/submissions/author/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                if(data.message != 'No submissions found for this author.'){
                     // Filter submissions based on activeTab status right after fetching them
                const filteredData = data.filter(sub => sub.status === activeTab);
                setSubmissions(filteredData);

                }
               
            } else {
                // throw new Error('Failed to fetch submissions');
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast.error('Failed to fetch submissions');
        }
    };

    const handleViewNote = (submission) => {
        setSelectedSubmission(submission);
        setNote(submission.note || '');
    };

    const getTabClass = (tabName) => {
        return `cursor-pointer text-gray-600 hover:text-gray-800 py-2 ${
            activeTab === tabName ? 'border-b-4 border-blue-500 font-bold' : 'hover:border-b-4 hover:border-blue-500'
        }`;
    };


    return (
        <div className="flex-grow p-4 bg-gray-200">
            <div className="bg-blue-50 p-4 shadow rounded mb-4 text-gray-700 text-sm">
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                It can take up to 48 hours for a submission to be approved. If issues are found within the submission, it will be rejected and corrections will have to be made before re-submission.
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <div className="flex space-x-8 mb-6 ml-1">
                <button className={getTabClass('Pending')} onClick={() => setActiveTab('Pending')}>Pending</button>
                <button className={getTabClass('Approved')} onClick={() => setActiveTab('Approved')}>Approved</button>
                <button className={getTabClass('Rejected')} onClick={() => setActiveTab('Rejected')}>Rejected</button>
            </div>
            
            

            <div className="bg-white shadow rounded overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">{activeTab} Submissions</h2>
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
                                <th className="px-6 py-3 text-left font-medium text-gray-500">Note</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {submissions.map((submission) => (
                                <tr key={submission._id}>
                                    {/* <td className="px-6 py-4">{submission._id}</td> */}
                                    <td className="px-6 py-4">{submission.requestType}</td>
                                    <td className="px-6 py-4">{submission.author}</td>
                                    <td className="px-6 py-4">{submission.title}</td>
                                    <td className="px-6 py-4">{submission.submittedDate}</td>
                                    <td className="px-6 py-4"><button onClick={() => handleViewDetails(submission._id, submission.title)} className="text-blue-600 hover:text-blue-800">Show Details</button></td>
                                    <td className="px-6 py-4">{submission.status}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewNote(submission)}>View Note</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 border-t border-gray-200 flex justify-end items-center" style={{ minHeight: '4rem' }}>
                    <button  onClick={onNewFiction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <i className="fas fa-plus mr-2"></i>Submit a new Fiction
                    </button>
                </div>
            </div>
            {/* Notepad Popup for viewing notes only */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <h3 className="text-lg font-semibold mb-4">View Note</h3>
                        <textarea
                            value={note}
                            readOnly={true}
                            className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end">
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




