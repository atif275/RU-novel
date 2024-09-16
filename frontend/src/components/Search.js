import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import FictionListItem from './SearchContent';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../store';
import { useRef } from 'react';


function Search() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.userData.searchQuery);
  const searchResults = useSelector(state => state.userData.searchResults);
  const theme = useSelector(state => state.userData.theme);
  const check=useSelector((state)=> state.userData.booksTouched)
  const fiction=useSelector((state)=> state.userData.booksDes)
  const inputref=useRef()


  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5; 
  const fetchSearchResults = async () => {
    if (searchQuery) {
      try {
        const response = await fetch('https://api.ru-novel.ru/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: searchQuery }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log(data)
        dispatch(userActions.setSearchResults(data)); // Store results in Redux
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };
  const fetchSearchResults2 = async () => {
    if (searchQuery) {
      try {
        const response = await fetch('https://api.ru-novel.ru/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: inputref.current.value }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log(data)
        dispatch(userActions.setSearchResults(data)); // Store results in Redux
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  useEffect(() => {
 
    // console.log(searchQuery);
    // console.log(fiction)
    fetchSearchResults();
  }, [searchQuery, dispatch,fiction]);

  const handleGoogleSignIn = () => {
    window.location.href = 'https://api.ru-novel.ru/auth/google';
  };

  // Pagination calculations
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
      <div className={`flex flex-col md:flex-row items-center px-4 py-8 ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]]' : 'bg-white '}`}>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-[300%] lg:w-[600%]">
          <input
            type="text"
            className={`form-control p-4 w-full  border-0 outline-none mb-4 md:mb-0  ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-[#f3f6f9] text-[#a0a9b4] '}`}
            placeholder={searchQuery}
            name="title"
            ref={inputref}
          />
          <span className="ml-0 md:ml-2 mb-4 md:mb-0 md:mr-5 w-full md:w-auto">
            <button
              className="text-white font-1/2 bg-green-500 uppercase font-bold p-4 w-1/2 md:w-auto"
              onClick={fetchSearchResults2}
              
            >
              Search
            </button>
          </span>
        </div>
        <div className="w-full mt-4 md:mt-0">
        <Link
            to="/fictions/advanced/search"
            className="items-center justify-between btn p-4 bg-custom-blue   lg:block text-white w-full md:w-auto font-blue"
          >
            Advanced Search
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-3 items-start">
        <div className='w-full md:w-2/3 mb-6 md:mb-0 h-[60%]'>

          {currentResults.length > 0 ? (
            currentResults.map((book) => (
              <FictionListItem 
                key={book._id} 
                _id = {book._id}
                title={book.title} 
                tags={book.tags}
                image={book.image} 
                stats={book.stats} 
                rating={book.rating}
                views={book.views}
                chapters={book.chapters}
                time={book.updatedDate}
                pages={book.pages}
              />
            ))
          ) : (
            <p className={`p-8 ${theme === 'dark' ? 'bg-[#181818] text-white' : 'bg-white'}`}>No results found</p>
          )}

          {/* Pagination Controls */}
          {searchResults.length > resultsPerPage && (
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

        {/* Hide this div on medium screens and below */}
        <div className={` w-full md:w-1/3  rounded-md shadow-md mb-6 md:mb-0 hidden md:block ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]' : 'bg-white text-black '}`} id='ahsan'>
          <div className="border-b border-gray-200 px-4 py-3 flex items-center">
            <FontAwesomeIcon icon={faAlignLeft} className={` mr-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-800 '}`} />
            <span className="font-bold uppercase">Fiction Details</span>
          </div>
          <div className="p-4" id="fiction-details">
            <div className="flex items-center">
              <div className="bg-gray-400 w-1 h-8 md:h-12 mr-3"></div>
              <h4 className={`font-bold uppercase text-xs md:text-sm ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900 '}`}>
                Select a fiction on the left to see its information
              </h4>
             
            </div>
            { check && <p className='mt-6 text-lg'>{fiction}</p> 
             }

          </div>
          
         
        </div>
      </div>
    </div>
  );
}

export default Search;
