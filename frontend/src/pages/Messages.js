import React, { useState } from 'react';
import { FaPen, FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { MdSend, MdDrafts, MdDelete } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';

function Messages() {
    const [activeTab, setActiveTab] = useState('compose');

    const tabIcons = {
        compose: <FaPen className="inline mr-2 text-xl" />,
        inbox: <FaEnvelope className="inline mr-2 text-xl" />,
        sentItems: <MdSend className="inline mr-2 text-xl" />,
        drafts: <MdDrafts className="inline mr-2 text-xl" />,
        trashCan: <MdDelete className="inline mr-2 text-xl" />,
    };

    const tabNames = {
        compose: "Compose",
        inbox: "Inbox",
        sentItems: "Sent Items",
        drafts: "Drafts",
        trashCan: "Trash Can",
    };

    return (
        <div className="w-full bg-cover bg-center bg-fixed">
            <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
                {/* Image Container */}
                <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover " >
                    {/* Icon and Text aligned left */}
                    <div className="absolute left-0 ml-10 flex items-center">
                        <FaEnvelope className="text-white text-6xl mr-4" /> {/* Ensure you have imported FaEnvelope */}
                        <div>
                            <h2 className="text-white text-2xl">Private Messages</h2>
                            <p className="text-white text-sm">All your conversations in one place.</p>
                            <a href="/inbox" className="text-blue-500 text-sm underline">Inbox</a>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="w-48 bg-white shadow-lg rounded-lg" style={{ maxHeight: '244px', overflowY: 'auto' }}>
                        <div className="bg-gray-600 text-white p-2">Messages</div>
                        <ul className="divide-y divide-gray-200">
                            {Object.entries(tabNames).map(([key, name]) => (
                                <li
                                    key={key}
                                    className={`hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center ${activeTab === key ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {tabIcons[key]}
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 ml-4 ">
                        {activeTab === 'compose' ? (
                            <>
                                <div className="flex justify-between ">
                                    <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded inline-flex items-center">
                                        <FaArrowLeft className="mr-2" /> Back to Inbox
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center">
                                        <FaPaperPlane className="mr-2" /> Send Reply
                                    </button>
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <div className='bg-white p-6'>
                                    <h2 className="text-xl font-bold mb-4">New Message</h2>
                                    <hr className="my-4 border-gray-300" />
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="recipients" className="block font-bold mb-2">Recipients</label>
                                            <input type="text" id="recipients" placeholder="Search for a user" className="w-full p-2 border border-gray-300 rounded" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="subject" className="block font-bold mb-2">Subject</label>
                                            <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block font-bold mb-2">Message</label>
                                            <Editor
                                                initialValue="<p>This is the initial content of the editor</p>"
                                                init={{
                                                    height: 300,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar: 'undo redo | formatselect | ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat | help'
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Send Message</button>
                                            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">Save as Draft</button>
                                            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Preview</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        ) : (activeTab === 'inbox' || activeTab === 'sentItems'|| activeTab === 'drafts'|| activeTab === 'trashCan') ? (
                            <>
                                <div className='bg-white p-6'>
                                    <h2 className="text-xl font-bold mb-4">{tabNames[activeTab]}</h2>
                                    <hr className="my-4 border-gray-300" />
                                    <div className="flex items-center mb-4">
                                        <input type="search" className="border p-2 w-full" placeholder="Search..." style={{ flex: 'auto', marginRight: '8px' }} />
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Go</button>
                                    </div>
                                    <div>
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th>Message Title</th>
                                                    <th>Sender</th>
                                                    <th>Date/Time Sent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Placeholder for messages */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex mt-4">
                                        <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2">Move to</button>
                                        <select className="form-control input-small" name="folder">
                                            <option value="1">Inbox</option>
                                            <option value="2">Sent Items</option>
                                            <option value="3">Drafts</option>
                                            <option value="4">Trash Can</option>
                                        </select>
                                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">Delete</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='mb-4 bg-white shadow-lg rounded-lg p-4'>
                                <h2 className="text-xl font-bold mb-2">{tabNames[activeTab]}</h2>
                                <div className="border-t mt-2 pt-2">
                                    Content for {tabNames[activeTab]} goes here...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
