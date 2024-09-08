import React, { useState, useEffect, useRef } from "react";
import SugContent from "./SuugestionContent";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { userActions } from "../store";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const commentsArr = useSelector((state) => state.userData.commentsArray);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7; // Number of results per page

  // Fetch comments and handle pagination
  const fetchComments = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/load/comments");
      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setCommentsArray(data));
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchComments3 = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    } 
    try {
      const response = await fetch("https://api.ru-novel.ru/api/top");
      if (response.ok) {
        const data = await response.json();
        
        // Assuming `data` is an array where each item has a `follow` array.
        const processedData = data
          .filter(item => item.follow && item.follow.length > 0) // Filter items with follow array length > 0
          .sort((a, b) => b.length - a.length); // Sort items by length in descending order
  
        // Dispatch the processed data to Redux
        dispatch(userActions.setCommentsArray(processedData));
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    fetchComments();
  }, [location]); // Re-fetch comments when location changes

  const fetchComments2 = async () => {

    try {
      const response = await fetch("https://api.ru-novel.ru/api/load/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputRef.current.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setCommentsArray(data));
      } else {
        console.error("Error submitting idea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/create/idea");
    } else {
      navigate("/login");
    }
  };

  // Pagination calculations
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = commentsArr.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(commentsArr.length / resultsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div
        className="image-header bg-cover bg-center w-[100%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/dist/img/ideas.jpg')`,
        }}
      >
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <i className="fas fa-lightbulb text-white text-3xl ml-5"></i>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-white">Ideas</h2>
              <span className="text-white">
                The top ideas submitted by the users for the website
              </span>
              <span className="text-white">
                Ideas
              </span>
            </div>
          </div>
          <div className="md:flex items-center space-x-2 mr-5">
            <button
              className="btn bg-gray-200 hidden md:block text-gray-800 flex items-center px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={fetchComments3}
            >
              <i className="fas fa-sort-numeric-down-alt mr-2"></i> Top
            </button>
            <button
              className="btn bg-gray-200 hidden md:block text-gray-800 flex items-center px-4 py-2 rounded-md hover:bg-gray-300"
               onClick={fetchComments}
            >
              <i className="fas fa-sort-numeric-down-alt mr-2"></i> Newest
            </button>
            
            <button
              onClick={handleClick}
              className="btn bg-blue-600 text-white flex items-center px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <i className="fas fa-lightbulb mr-2"></i> New Idea
            </button>
          </div>
        </div>
      </div>
      <form className="p-4 bg-white w-full">
        <div className="sui-search-box__wrapper w-full">
          <input
            placeholder="Search"
            className="bg-[#EFF3F8] p-2 w-[92%] rounded-md"
            ref={inputRef}
          />
          <button className="bg-[#5B9BD1] mt-2 lg:mt-0 p-2 text-white" onClick={fetchComments2}>Search</button>
        </div>
      </form>

      {currentResults.map((data) => (
        <SugContent
          arr={data}
          key={data._id}
          title={data.title}
          profilePicture={data.profilePicture}
          category={data.category}
          content={data.content}
          username={data.username}
          time={data.updatedAt}
        />
      ))}

      {/* Pagination Controls */}
      {commentsArr.length > resultsPerPage && (
        <div className="flex justify-between mt-4">
          <button 
            onClick={handlePrevPage} 
            className={`p-2 bg-gray-300 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            onClick={handleNextPage} 
            className={`p-2 bg-gray-300 rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Suggestions;