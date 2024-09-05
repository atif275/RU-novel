
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faFileAlt,
  faFileWord, // Correct icon for "Total Words"
  faStar,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

export const AdminDashboard = () => {
    const [counts, setCounts] = useState({
        suggestions: 0,
        tickets: 0,
        fictions: 0,
        users: 0,
        visits: 0  // This will remain static until integrated with analytics
    });
    const [recentSuggestions, setRecentSuggestions] = useState([]);
    const [recentTickets, setRecentTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [selectedIds, setSelectedIds] = useState({});
    const [selectedTicketIds, setSelectedTicketIds] = useState({});

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleTicketCheckboxChange = (id) => {
        setSelectedTicketIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const allChecked = Object.values(selectedIds).filter(Boolean).length > 0;
    const allTicketsChecked = Object.values(selectedTicketIds).filter(Boolean).length > 0;

    const deleteItems = async (ids, type) => {
        const url = type === 'suggestions' ? 'http://api.ru-novel.ru/api/delete/suggestions' : 'http://api.ru-novel.ru/api/delete/tickets';
        const payloadKey = type === 'suggestions' ? 'suggestionIds' : 'ticketIds'; // Determine the correct key
        if (!ids.length) return; // Prevent empty array sending
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [payloadKey]: ids }) // Use dynamic key
        });
        // Refresh data here or handle errors as necessary
    };
    

    const handleDelete = (type) => {
        return async () => {
            const idsCollection = type === 'suggestions' ? selectedIds : selectedTicketIds;
            const idsToDelete = Object.keys(idsCollection).filter(id => idsCollection[id]);
            if (idsToDelete.length > 0 && window.confirm("Are you sure you want to delete selected items?")) {
                await deleteItems(idsToDelete, type);
                const updatedData = type === 'suggestions' ? recentSuggestions : recentTickets;
                const filteredData = updatedData.filter(item => !idsCollection[item._id]);
                if (type === 'suggestions') {
                    setRecentSuggestions(filteredData);
                    setSelectedIds({});
                } else {
                    setRecentTickets(filteredData);
                    setSelectedTicketIds({});
                }
            }
        };
    };
    
    
  


    useEffect(() => {
        fetchCounts();
        fetchRecentData();
    }, []);
    
    const showTicketDetails = (ticket) => {
        setSelectedTicket(ticket);
    };

    const showSuggestionDetails = (suggestion) => {
        setSelectedSuggestion(suggestion);
    };

    const closeDetails = () => {
        setSelectedTicket(null);
    };

    const closeSuggestionDetails = () => {
        setSelectedSuggestion(null);
    };

    const fetchCounts = async () => {
        try {
            const suggestions = await fetch('http://api.ru-novel.ru/api/count/suggestions').then(res => res.json());
            const tickets = await fetch('http://api.ru-novel.ru/api/count/tickets').then(res => res.json());
            const fictions = await fetch('http://api.ru-novel.ru/api/count/fictions').then(res => res.json());
            const users = await fetch('http://api.ru-novel.ru/api/count/users').then(res => res.json());
            
            setCounts({
                suggestions: suggestions.count,
                tickets: tickets.count,
                fictions: fictions.count,
                users: users.count,
                visits: counts.visits  // keep static for now
            });
        } catch (error) {
            // console.error('Error fetching counts:', error);
        }
    };
    const fetchRecentData = async () => {
        try {
            const suggestionsData = await fetch('http://api.ru-novel.ru/api/load/recent/suggestions').then(res => res.json());
            const ticketsData = await fetch('http://api.ru-novel.ru/api/load/recent/tickets').then(res => res.json());
            setRecentSuggestions(suggestionsData);
            setRecentTickets(ticketsData);
        } catch (error) {
            // console.error('Error fetching recent data:', error);
        }
    };

    return (
        <div className="flex-grow p-4  bg-gray-200">
            <div className="grid grid-cols-5 gap-4">
            <div className="bg-white p-4 shadow rounded flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBookOpen} className="text-gray-500" />
                    <span>Suggestions: {counts.suggestions}</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex items-center space-x-3">
                    <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
                    <span>Tickets: {counts.tickets}</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex items-center space-x-3">
                    <FontAwesomeIcon icon={faFileWord} className="text-gray-500" />
                    <span>Total Fictions: {counts.fictions}</span>
                </div>
                <div className="bg-white p-4 shadow rounded flex items-center space-x-3">
                    <FontAwesomeIcon icon={faStar} className="text-gray-500" />
                    <span>Unique Visits: {counts.visits}</span> 
                </div>
                <div className="bg-white p-4 shadow rounded flex items-center space-x-3">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                    <span>Total Users: {counts.users}</span>
                </div>
            </div>
            {/* <div className="bg-white p-4 shadow rounded mt-4 flex justify-between items-center">
                <span>Add New</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add
                </button>
            </div> */}
            <div className="flex mt-4 space-x-4">
                <div className="flex-1">
                <div className="bg-white p-4 shadow rounded">
                        <div className="flex justify-between items-center pb-4">
                            <h2 className="text-lg font-semibold text-center">Recent Suggestions</h2>
                            <button 
    className={`py-2 px-4 rounded ${allChecked ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500'}`}
    onClick={handleDelete("suggestions")} // Corrected here
    disabled={!allChecked}
>
    Delete
</button>
                        </div>
                        <table className="min-w-full">
                            <thead >
                                <tr className="text-left bg-gray-100">
                                    <th className="px-6 py-3"><input type="checkbox" onChange={e => {
                                        const newCheckedStatus = e.target.checked;
                                        const newSelectedIds = {};
                                        recentSuggestions.forEach(s => newSelectedIds[s._id] = newCheckedStatus);
                                        setSelectedIds(newSelectedIds);
                                    }} /></th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">Category</th>
                                    {/* <th className="px-6 py-3">Title</th> */}
                                    <th className="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSuggestions.map(suggestion => (
                                    <tr key={suggestion._id}>
                                        <td className="px-6 py-2">
                                            <input 
                                                type="checkbox" 
                                                checked={!!selectedIds[suggestion._id]} 
                                                onChange={() => handleCheckboxChange(suggestion._id)} 
                                            />
                                        </td>
                                        <td className="px-6 py-2">{suggestion.username}</td>
                                        <td className="px-6 py-2">{suggestion.category}</td>
                                        {/* <td className="px-6 py-2">{suggestion.category}</td> */}
                                        <td className="px-6 py-2">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700" 
                                                onClick={() => showSuggestionDetails(suggestion)}
                                            >
                                                Show Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="flex-1">
                <div className="bg-white p-4 shadow rounded">
                        <div className="flex justify-between items-center pb-4">
                            <h2 className="text-lg font-semibold text-center">Recent Tickets</h2>
                            <button 
    className={`py-2 px-4 rounded ${allTicketsChecked ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500'}`}
    onClick={handleDelete("tickets")} // Corrected here
    disabled={!allTicketsChecked}
>
    Delete
</button>

                        </div>
                        <table className="min-w-full">
                            <thead >
                                <tr className='text-left bg-gray-100' >
                                    <th className="px-6 py-3"><input type="checkbox" onChange={e => {
                                        const newCheckedStatus = e.target.checked;
                                        const newSelectedTicketIds = {};
                                        recentTickets.forEach(t => newSelectedTicketIds[t._id] = newCheckedStatus);
                                        setSelectedTicketIds(newSelectedTicketIds);
                                    }} /></th>
                                    <th className="px-6 py-3">Username</th>
                                    {/* <th className="px-6 py-3">Subject</th> */}
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTickets.map(ticket => (
                                    <tr key={ticket._id}>
                                        <td className="px-6 py-2">
                                            <input 
                                                type="checkbox" 
                                                checked={!!selectedTicketIds[ticket._id]} 
                                                onChange={() => handleTicketCheckboxChange(ticket._id)} 
                                            />
                                        </td>
                                        <td className="px-6 py-2">{ticket.ticket.length > 0 ? ticket.ticket[0].username : 'N/A'}</td>
                                        {/* <td className="px-6 py-2">{ticket.ticket.length > 0 ? ticket.ticket[0].subject : 'N/A'}</td> */}
                                        <td className="px-6 py-2">{ticket.ticket.length > 0 ? ticket.ticket[0].category : 'N/A'}</td>
                                        <td className="px-6 py-2">
                                            <button 
                                                onClick={() => showTicketDetails(ticket.ticket.length > 0 ? ticket : null)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Show Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Details Popup */}
                        {selectedTicket && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-4xl">
                        <h2 className="text-lg font-semibold text-center uppercase mb-4">Subject:{` `}{selectedTicket.ticket[0].subject}</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <p><strong>Username:</strong> {selectedTicket.ticket[0].username}</p>
                            <p><strong>Email:</strong> {selectedTicket.email}</p>
                            <p><strong>Category:</strong> {selectedTicket.ticket[0].category}</p>
                            <p><strong>Browser:</strong> {selectedTicket.ticket[0].browser}</p>
                            <p><strong>Created At:</strong> {new Date(selectedTicket.ticket[0].createdAt).toLocaleString()}</p>
                            <p><strong>Status:</strong> {selectedTicket.ticket[0].status}</p>
                        </div>
                        <div className="mb-4">
                            <textarea readOnly className="w-full h-32 p-2 border border-gray-300 rounded" value={selectedTicket.ticket[0].message}></textarea>
                        </div>
                        <div className="text-right">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeDetails}>Close</button>
                        </div>
                    </div>
                </div>
            )}
                        {selectedSuggestion && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg w-3/4">
                        <h2 className="text-lg font-semibold text-center uppercase mb-4">Title:{` `}{selectedSuggestion.title}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p><strong>Username:</strong> {selectedSuggestion.username}</p>
                            <p><strong>Email:</strong> {selectedSuggestion.email}</p>
            
                            <p><strong>Category:</strong> {selectedSuggestion.category}</p>
                            <p><strong>Created At:</strong> {new Date(selectedSuggestion.createdAt).toLocaleString()}</p>
                            <div className="col-span-2">
                                <textarea readOnly className="w-full h-40 p-2 border border-gray-300 rounded mb-4" value={selectedSuggestion.content}></textarea>
                            </div>
                        </div>
                        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeSuggestionDetails}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
};
