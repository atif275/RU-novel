import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StarRating from './StarRating';

import { useNavigate } from 'react-router-dom';

export const AuthorFictions = () => {
    const [fictions, setFictions] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const user = useSelector((state) => state.userData.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFictions = async () => {
            try {
                const response = await axios.get(`http://api.ru-novel.ru/api/fictions/${user.username}`);
                setFictions(response.data);
            } catch (error) {
                // console.error('Error fetching fictions:', error);
            }
        };

        fetchFictions();
    }, [user.username]);

    const toggleDescription = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };
    const handleAddChapters = (fictionId) => {
        navigate(`/submit-chapter/${fictionId}`);
    };
    return (
        <div className="flex-grow p-4 bg-gray-200">
            <div className="bg-white p-4 shadow rounded flex flex-col mt-[5px]">
                <h2 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-4">Active Fictions</h2>
                {fictions.length === 0 ? (
                    <p>No Fictions yet</p>
                ) : (
                    fictions.map((book) => (
                        <div
                            key={book._id}
                            className="fiction-list-item flex flex-col mb-8"
                        >
                            <div className="flex">
                                <figure className="w-auto">
                                    <a href={book.url}>
                                        <img
                                            style={{ height: "160px" }}
                                            className="img-responsive"
                                            src={book.image}
                                            alt={book.title}
                                        />
                                    </a>
                                </figure>
                                <div className="w-4/5 pl-6">
                                    <h2 className="fiction-title text-lg font-bold text-red-500">
                                        <a href={book.url}>{book.title}</a>
                                    </h2>
                                    <div className="tags flex flex-wrap mr-2 gap-2 my-2 text-sm">
                                        {book.tags.slice(0, 4).map(
                                            (tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-custom-tan-blue text-white px-2 py-1 ml-1"
                                                >
                                                    {tag}
                                                </span>
                                            )
                                        )}
                                        {expandedId === book._id &&
                                            book.tags.length > 4 &&
                                            book.tags.slice(4).map((tag, index) => (
                                                <span
                                                    key={index + 4}
                                                    className="bg-custom-tan-blue text-white px-2 py-1 ml-1"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                    <div className="grid grid-cols-2 text-sm font-bold text-custom-dark-tan-blue gap-2">
                                        <div>
                                            <i className="fa fa-users mr-2"></i>
                                            {book.stats && book.stats.followers ? `${book.stats.followers} followers` : 0} Followers
                                        </div>
                                        <div>
                                            {/* Ensure you have imported or defined StarRating */}
                                            <StarRating rating={book.stats && book.stats.rating.overall ? parseFloat(book.stats.rating.overall) : 0} />
                                        </div>
                                        <div>
                                            <i className="fa fa-book mr-2"></i>
                                            {book.stats && book.stats.pages ? `${book.stats.pages}` : 0}
                                            Pages
                                        </div>
                                        <div>
                                            <i className="fa fa-eye mr-2"></i>
                                            {book.stats && book.stats.views ? `${book.stats.views}` : 0} Views
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-list mr-2"></i>
                                            {book.stats && book.stats.chapters ? `${book.stats.chapters}` : 0}
                                            Chapters
                                        </div>
                                        <div>
                                            <i className="fa fa-calendar mr-2"></i>
                                            {book.stats && book.stats.updatedDate ? `${book.stats.updatedDate}` : "OnGoing"}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`self-start text-white px-2 text-bold hover:bg-custom-blue ${
                                        expandedId === book._id
                                            ? "bg-custom-blue"
                                            : "bg-custom-tan-blue"
                                    }`}
                                    onClick={() => toggleDescription(book._id)}
                                >
                                    {expandedId === book._id ? "-" : "+"}
                                </button>
                                <button
                                    className="self-start ml-2 bg-green-500 hover:bg-green-700 text-white px-1 py-1  text-xs rounded"
                                    onClick={() => handleAddChapters(book._id)}
                                >
                                    Add Chapters
                                </button>
                            </div>
                            {expandedId === book._id && (
                                <div className="mt-8 lg:text-sm lg:pl-32 pl-6 text-gray-700 block">
                                    <p>{book.description}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};