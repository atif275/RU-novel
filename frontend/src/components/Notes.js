import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { ToastContainer } from 'react-toastify';
import './Notes.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Notes = () => {
    const currentUser = useSelector(state => state.userData.user);
    const [note, setNote] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            if (!currentUser) return;
            try {
                const response = await axios.get(`https://api.ru-novel.ru/get-notes/${currentUser.username}`);
                setNote(response.data.notes);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
                toast.error('Error fetching notes');
            }
        };

        fetchNotes();
    }, [currentUser]);

    const saveNotes = async () => {
        if (!note.trim()) return alert('Please enter some notes before saving.');

        try {
            const response = await axios.post('https://api.ru-novel.ru/save-notes', {
                username: currentUser.username,
                notes: note
            });
            toast.success('Notes saved successfully');
        } catch (error) {
            console.error('Failed to save notes:', error);
            toast.error('Error saving notes');
        }
    };

    return (
        
        <div className=" p-4 bg-gray-200">
     
            <div className="bg-white p-4 shadow rounded  mt-[5px]">
                <h2 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-4">Notes</h2>
                <textarea
                    className="notes-textarea max-h-[300px] h-[300px] w-[100%]"
                    placeholder="Type your notes here..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                ></textarea>
                <div className="border-t border-gray-200 pt-4 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveNotes}>
                        Save Notes
                    </button>
                </div>
            </div>
        </div>
    );
};