import React from 'react';
import './Notes.css';  // Ensure this file is correctly linked

export const Notes = () => {
    return (
        <div className="flex-grow p-4 bg-gray-200">
            <div className="bg-white p-4 shadow rounded flex flex-col mt-[5px]">
                <h2 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-4">Notes</h2>
                <textarea
                    className="notes-textarea"
                    placeholder="Type your notes here..."
                ></textarea>
                <div className="border-t border-gray-200 pt-4 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save Notes
                    </button>
                </div>
            </div>
        </div>
    );
};
