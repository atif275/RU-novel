import React, { useState, useEffect } from "react";
import StarRating from "../components/StarRating";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBook, faChevronDown, faTrophy, faCaretSquareRight, faFlagCheckered, faMagnifyingGlass,
    faChartBar, faChartLine, faClock, faSync, faStar, faRandom, faPencil, faComments, faUsers, 
    faLifeRing, faQuestionCircle, faLightbulb, faCheckCircle, faHeadset,
    faList
} from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
    const [bookThreads, setBookThreads] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 3;
    const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredBooks.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.ru-novel.ru/api/bookthreads');
            const result = await response.json();
            if (response.ok) {
                setBookThreads(result.data);
                setFilteredBooks(result.data); // Initialize filteredBooks with all books
            } else {
                console.error('Failed to fetch data:', result.error);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        // Filter books based on search term
        const filtered = bookThreads.filter(book => 
            book.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredBooks(filtered);
        setCurrentPage(0); // Reset to the first page
    };

    const toggleDescription = (id) => {
        if (expandedId === id) {
            setExpandedId(null); // Close if the same button is clicked again
        } else {
            setExpandedId(id); // Open this and close others
        }
    };

    return (
        <div className="page-content bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="page-content-inner flex">
                    <div className="w-full lg:w-3/4">
                        {bookThreads.length > 0 ? (
                            <div className="portlet light bg-white p-6 shadow-md rounded-lg">
                                <div className="portlet-title mb-4">
                                    {/* Search box */}
                                    <div className="flex justify-between items-center h-16">
                                        <input 
                                            type="text" 
                                            placeholder="Search by title..." 
                                            value={searchTerm} 
                                            onChange={handleSearchChange} 
                                            className="p-2 border rounded w-full"
                                        />
                                    </div>
                                    {/* Horizontal Line */}
                                    <div className="w-full border-t border-gray-200 mt-6" style={{ borderWidth: "0.5px" }}></div>
                                </div>

                                <div className="portlet-body pt-8">
                                    <div className="fiction-list" id="result">
                                        {currentPageData.map((book) => (
                                            <div key={book._id} className="fiction-list-item flex flex-col mb-8">
                                                <div className="flex">
                                                    <figure className="w-auto">
                                                        <Link to={`/fiction/${book._id}/${book.title}`}>
                                                            <img
                                                                style={{ height: "160px", width:"110px" }}
                                                                className="img-responsive"
                                                                src={book.image}
                                                                alt={book.title}
                                                            />
                                                        </Link>
                                                    </figure>
                                                    <div className="w-4/5 pl-6">
                                                        <h2 className="fiction-title text-lg font-bold text-red-500">
                                                            <Link to={`/fiction/${book._id}/${book.title}`}>
                                                                {book.title}
                                                            </Link>
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
                                                </div>
                                                {expandedId === book._id && (
                                                    <div className="mt-8 lg:text-sm lg:pl-32 pl-6 text-gray-700 block">
                                                        <p>{book.description}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <ReactPaginate
                                        previousLabel={"← Previous"}
                                        nextLabel={"Next →"}
                                        breakLabel={"..."}
                                        breakClassName={"page-item"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={(event) => setCurrentPage(event.selected)}
                                        containerClassName={"inline-flex list-none pagination"}
                                        pageClassName={"inline mx-1"}
                                        pageLinkClassName={
                                            "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
                                        }
                                        previousClassName={"inline mx-1"}
                                        previousLinkClassName={
                                            "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
                                        }
                                        nextClassName={"inline mx-1"}
                                        nextLinkClassName={
                                            "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
                                        }
                                        activeClassName={"bg-custom-blue text-white"}
                                        forcePage={currentPage}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-lg text-gray-600">No books found.</p>
                            </div>
                        )}
                    </div>
          {/* Side bar */}
          <div className="profile-sidebar w-full lg:w-1/4 lg:block hidden pl-6">
            <div className="mb-6 ">
            <Link
                to="/fictions/best-rated"
                className="block px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <i className="fa fa-trophy"></i>
                <span className="ml-2">Best Rated</span>
              </Link>
              <Link
                to="/fictions/trending"
                className="block px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
               <FontAwesomeIcon icon={faChartBar}/>
                <span className="ml-2">Trending</span>
              </Link>
              <Link
                to="/fictions/active-popular"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <i className="fa fa-caret-square-right"></i>
                <span className="ml-2">Ongoing Fictions</span>
              </Link>
              <Link
                to="/fictions/complete"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <i className="fa fa-flag-checkered"></i>
                <span className="ml-2">Complete</span>
              </Link>
              <Link
                to="/fictions/weekly-popular"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <FontAwesomeIcon icon={faChartLine}  /> 
                <span className="ml-2">Popular This Week</span>
              </Link>
              <Link
                to="/fictions/latest-updates"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <FontAwesomeIcon icon={faClock}/>
                <span className="ml-2">Latest Updates</span>
              </Link>
              <Link
                to="/fictions/new"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <FontAwesomeIcon icon={faSync}/>
                <span className="ml-2">Newest Fictions</span>
              </Link>
              <Link
                to="/fictions/rising-stars"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <FontAwesomeIcon icon={faStar}/>
                <span className="ml-2">Rising Stars</span>
              </Link>
              <Link
                to="/fictions/writathon"
                className="block  px-4 py-3 bg-custom-tan-blue text-white  mb-2 uppercase"
              >
                <FontAwesomeIcon icon={faFlagCheckered}/>
                <span className="ml-2">writathon</span>
              </Link>
              {/* Add more sidebar links as needed */}
            </div>
            {/*Advertisement Box */}
            <div className="mb-6 bg-white p-4 rounded shadow-md">
              <div className="text-center uppercase text-xs mb-2">
                Advertisement
              </div>
              <div className="text-center">
                <iframe
                  width="300"
                  height="250"
                  scrolling="no"
                  marginWidth="0"
                  marginHeight="0"
                  frameBorder="0"
                  title="advertisement"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-forms"
                  className="w-full"
                ></iframe>
              </div>
            </div>
            {/* Additional sidebar content */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
