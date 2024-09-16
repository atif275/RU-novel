import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";

function ForumsPage() {
  const [popularThreads, setPopularThreads] = useState([]);
  const [communityThreads, setCommunityThreads] = useState([]);
  const [fictionThreads, setFictionThreads] = useState([]);
  const [discussionThreads, setDiscussionThreads] = useState([]);
  const [forumThreads, setForumThreads] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);


  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredResults, setFilteredResults] = useState({}); // State to store filtered results
  const [recommendations, setRecommendations] = useState([]); // State for search recommendations

  const [hoverIndex, setHoverIndex] = useState(null); // State to track hovered item

  // Create a ref object
  const searchInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState({
    popular: true, // Managing visibility for Popular Threads
    community: true, // Managing visibility for Community Threads
    fiction: true, // You can add more tables here
    discussion: true,
    forum: true,
  });
  const refs = {
    popular: useRef(null),
    community: useRef(null),
    fiction: useRef(null),
    discussion: useRef(null),
    forum: useRef(null),
  };

  // Function to handle focus
  const handleFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Sets the focus to the input field
    }
  };
  const toggleOpen = (sectionKey) => {
    const currentStatus = isOpen[sectionKey];
    const section = refs[sectionKey].current;
    if (section) {
      section.style.maxHeight = currentStatus
        ? "0"
        : `${section.scrollHeight}px`;
      setIsOpen((prev) => ({ ...prev, [sectionKey]: !currentStatus }));
    }
  };
  useEffect(() => {
    if (searchQuery === "") {
      // If search is empty, reset filteredResults to show all threads
      setFilteredResults({
        popularThreads,
        communityThreads,
        fictionThreads,
        discussionThreads,
        forumThreads,
      });
    } else {
      // Filter threads based on the search query
      const filterThreads = (threads) =>
        threads.filter((thread) =>
          thread.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      setFilteredResults({
        popularThreads: filterThreads(popularThreads),
        communityThreads: filterThreads(communityThreads),
        fictionThreads: filterThreads(fictionThreads),
        discussionThreads: filterThreads(discussionThreads),
        forumThreads: filterThreads(forumThreads),
      });

      // Generate search recommendations
      const allTitles = [
        ...popularThreads,
        ...communityThreads,
        ...fictionThreads,
        ...discussionThreads,
        ...forumThreads,
      ].map((thread) => thread.title);

      setRecommendations(
        allTitles.filter((title) =>
          title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [
    searchQuery,
    popularThreads,
    communityThreads,
    fictionThreads,
    discussionThreads,
    forumThreads,
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // New function to handle recommendation click
  const handleRecommendationClick = (title) => {
    setSearchQuery(title); // Update search query to the clicked recommendation
  };

 
  useEffect(() => {
    // Fetch Popular Threads
    fetch("https://api.ru-novel.ru/api/popularthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Popular Threads table is empty");
        } else {
          setPopularThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );

    // Fetch Community Threads
    fetch("https://api.ru-novel.ru/api/communitythreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Community Threads table is empty");
        } else {
          setCommunityThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch community threads", error)
      );
    //fiction Thread
    fetch("https://api.ru-novel.ru/api/fictionthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Popular Threads table is empty");
        } else {
          setFictionThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //Discussion Thread
    fetch("https://api.ru-novel.ru/api/discussionthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Popular Threads table is empty");
        } else {
          setDiscussionThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //Forum Thread
    fetch("https://api.ru-novel.ru/api/forumthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Popular Threads table is empty");
        } else {
          setForumThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //recent threads

    fetch("https://api.ru-novel.ru/api/recent-threads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // console.log("Recent Threads table is empty");
        } else {
          setRecentThreads(data);
        }
      })
      .catch((error) => console.error("Failed to fetch recent threads", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // The filtering will already happen via the useEffect based on searchQuery.
  };

  return (
    <div className="w-full mb-4">
      <div className="container mx-auto sm:px-6 sm:pr-4 lg:px-16  bg-white pt-2">
        <div className="w-full mx-4 m-4 bg-gray-500 relative overflow-hidden">
          {" "}
          {/* Set a specific height */}
          {/* Background image with reduced opacity */}
          <div
            style={{
              backgroundImage:
                'url("https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center", // Ensure it covers nicely

              position: "absolute",

              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 0,
            }}
          ></div>
          {/* Content */}
          <div
            className="flex justify-between items-center sm:py-8 lg:py-4 pr-4 relative "
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust the alpha for more or less whiteness
            }}
          >
            {" "}
            {/* Ensure content is above the image */}
            {/* Icon and title container */}
            <div className="flex items-center p-4">
              <div
                className="text-navy mr-4 t"
                style={{ fontSize: "54px", lineHeight: "initial" }}
              >
                <i className="fa fa-globe mid-icon"></i>
              </div>
              <div>
                <p className="text-black text-2xl ">
                  Welcome to RU Novel's Official Forum
                </p>
                <span className="text-black">Feel free to browse around.</span>
                <ul className="breadcrumb text-sm text-white">
                  <li>
                    <a href="/forums" className="text-black underline">
                      Forums
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Search button */}
            <div className="w-8 h-8 bg-custom-blue hover:bg-custom-hover-blue flex p-2 items-center">
              <button
                className=" btn btn-primary btn-sm"
                style={{ background: "transparent", border: "none" }}
                onClick={handleFocus} // Set focus when this button is clicked
              >
                <i className="fa fa-search text-white"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {/* Popular Threads Table */}
          <div className="w-full md:w-3/4 px-4">
            {/* Display Filtered Threads */}
            {Object.values(filteredResults).every(
              (threads) => threads.length === 0
            ) && <p>No results found.</p>}
          {filteredResults.popularThreads &&
              filteredResults.popularThreads.length > 0 && (
             
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Popular Threads
                </h3>
                <div className="bg-custom-black flex justify-center items-center px-2 w-6 h-6 mr-4 text-white text-bold">

                  <button
                    onClick={() => toggleOpen("popular")}
                    className="text-white bg-custom-black"
                  >
                    {isOpen.popular ? "-" : "+"}
                  </button>
                </div>
              </div>
              <div
                ref={refs.popular}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {filteredResults.popularThreads.length > 0 ? (
                  filteredResults.popularThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="`fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white ">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center ">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <p
                             
                            >
                              {topic.title}
                            </p>
                          </h4>
                          <div className="text-xs">
                            by{" "}
                            <p >
                              {topic.author}
                            </p>
                            , <time>{topic.lastPostDate}</time>
                          </div>
                        </div>
                        <div className="lg:px-16 flex items-center">
                          <div className="sm:flex-wrap sm:justify-between text-xs md:text-sm">
                            <div className="flex text-md ">
                              {topic.replies}{" "}
                              <span className="pl-1 text-gray-500">
                                Replies
                              </span>
                            </div>
                            <div className="flex text-xs ">
                              {topic.views}{" "}
                              <span className="pl-1 text-gray-500">Views</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:px-8 hidden md:flex items-center mt-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={topic.avatarUrl}
                            alt={topic.lastPoster}
                          />
                          <div className="ml-4 text-xs">
                            <p >
                              {topic.lastPoster}
                            </p>
                            <br />
                            <time>{topic.lastPostDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No threads to display.</p>
                )}
              </div>
            </div>
            )}
            
            {/* Community Table */}
            {filteredResults.communityThreads &&
              filteredResults.communityThreads.length > 0 && (
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Community
                </h3>
                <div className="bg-custom-black flex justify-center items-center px-2 w-6 h-6 mr-4 text-white text-bold">

                  <button
                    onClick={() => toggleOpen("community")}
                    className="text-white bg-custom-black"
                  >
                    {isOpen.community ? "-" : "+"}
                  </button>
                </div>
              </div>
              <div
                ref={refs.community}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {filteredResults.communityThreads.length > 0 ? (
                  filteredResults.communityThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className=" font-bold text-sm">
                            <p>
                              {topic.title}
                            </p>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <p
                             
                            >
                              {topic.description} {/* Topic Description */}
                            </p>
                          </h4>
                        </div>
                        <div className="lg:px-16 flex items-center">
                          <div className="sm:flex-wrap sm:justify-between text-xs md:text-sm">
                            <div className="flex text-md ">
                              {topic.topics}{" "}
                              <span className="pl-1 text-gray-500">Topics</span>
                            </div>
                            <div className="flex text-xs ">
                              {topic.posts}{" "}
                              <span className="pl-1 text-gray-500">Posts</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:px-8 hidden md:flex items-center mt-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={topic.avatarUrl}
                            alt={topic.lastPoster}
                          />
                          <div className="ml-4 text-xs">
                            <p>
                              {topic.lastPoster}
                            </p>
                            <br />
                            <time>{topic.lastActivityDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No threads to display.</p>
                )}
              </div>
            </div>
             )}
            {/* Fiction Table */}
            {filteredResults.fictionThreads &&
              filteredResults.fictionThreads.length > 0 && (
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Fictions
                </h3>
                <div className="bg-custom-black flex justify-center items-center px-2 w-6 h-6 mr-4 text-white text-bold">

                  <button
                    onClick={() => toggleOpen("fiction")}
                    className="text-white bg-custom-black"
                  >
                    {isOpen.fiction ? "-" : "+"}
                  </button>
                </div>
              </div>

              <div
                ref={refs.fiction}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {filteredResults.fictionThreads.length > 0 ? (
                  filteredResults.fictionThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <p>
                              {topic.title}
                            </p>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <p
                              
                            >
                              {topic.description} {/* Topic Description */}
                            </p>
                          </h4>
                        </div>
                        <div className="lg:px-16 flex items-center">
                          <div className="sm:flex-wrap sm:justify-between text-xs md:text-sm">
                            <div className="flex text-md">
                              {topic.topics}{" "}
                              <span className="pl-1 text-gray-500">Topics</span>
                            </div>
                            <div className="flex text-xs">
                              {topic.posts}{" "}
                              <span className="pl-1 text-gray-500">Posts</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:px-8 hidden md:flex items-center mt-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={topic.avatarUrl}
                            alt={topic.lastPoster}
                          />
                          <div className="ml-4 text-xs">
                            <p>
                              {topic.lastPoster}
                            </p>
                            <br />
                            <time>{topic.lastActivityDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No threads to display.</p>
                )}
              </div>
            </div>
            )}
            {/* Write Tips & Discussions Table */}
            {filteredResults.discussionThreads &&
              filteredResults.discussionThreads.length > 0 && (
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Write Tips & Discussions Table
                </h3>
                <div className="bg-custom-black flex justify-center items-center px-2 w-6 h-6 mr-4 text-white text-bold">

                  <button
                    onClick={() => toggleOpen("discussion")}
                    className="text-white bg-custom-black"
                  >
                    {isOpen.discussion ? "-" : "+"}
                  </button>
                </div>
              </div>

              <div
                ref={refs.discussion}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {filteredResults.discussionThreads.length > 0 ? (
                  filteredResults.discussionThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <p>
                              {topic.title}
                            </p>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <p
                             
                            >
                              {topic.description} {/* Topic Description */}
                            </p>
                          </h4>
                        </div>
                        <div className="lg:px-16 flex items-center">
                          <div className="sm:flex-wrap sm:justify-between text-xs md:text-sm">
                            <div className="flex text-md">
                              {topic.topics}{" "}
                              <span className="pl-1 text-gray-500">Topics</span>
                            </div>
                            <div className="flex text-xs">
                              {topic.posts}{" "}
                              <span className="pl-1 text-gray-500">Posts</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:px-8 hidden md:flex items-center mt-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={topic.avatarUrl}
                            alt={topic.lastPoster}
                          />
                          <div className="ml-4 text-xs">
                            <p>
                              {topic.lastPoster}
                            </p>
                            <br />
                            <time>{topic.lastActivityDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No threads to display.</p>
                )}
              </div>
            </div>
              )}
            {/* Forum Table */}
            {filteredResults.forumThreads &&
              filteredResults.forumThreads.length > 0 && (
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Forums
                </h3>
                <div className="bg-custom-black flex justify-center items-center px-2 w-6 h-6 mr-4 text-white text-bold">

                  <button
                    onClick={() => toggleOpen("forum")}
                    className="text-white bg-custom-black"
                  >
                    {isOpen.forum ? "-" : "+"}
                  </button>
                </div>
              </div>

              <div
                ref={refs.forum}
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.5s ease-in-out",
                }}
              >
                {filteredResults.forumThreads.length > 0 ? (
                  filteredResults.forumThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <p>
                              {topic.title}
                            </p>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <p
                             
                            >
                              {topic.description} {/* Topic Description */}
                            </p>
                          </h4>
                        </div>
                        <div className="lg:px-16 flex items-center">
                          <div className="sm:flex-wrap sm:justify-between text-xs md:text-sm">
                            <div className="flex text-md">
                              {topic.topics}{" "}
                              <span className="pl-1 text-gray-500">Topics</span>
                            </div>
                            <div className="flex text-xs">
                              {topic.posts}{" "}
                              <span className="pl-1 text-gray-500">Posts</span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:px-8 hidden md:flex items-center mt-1">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={topic.avatarUrl}
                            alt={topic.lastPoster}
                          />
                          <div className="ml-4 text-xs">
                            <p>
                              {topic.lastPoster}
                            </p>
                            <br />
                            <time>{topic.lastActivityDate}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No threads to display.</p>
                )}
              </div>
            </div>
              )}
          </div>
              
          {/* Sidebar */}
          <div className="w-full md:w-1/4 pl-4 pb-4 mb-4 md:mb-0">
            <div className="bg-white p-3 shadow border">
              <h5 className="font-bold text-md py-4">Search this forum</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control w-full bg-gray-100 p-1 pl-2"
                    placeholder="Search for..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    ref={searchInputRef}
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    className="px-6 bg-custom-blue hover:bg-custom-hover-blue text-white py-2"
                  >
                    <i className="fa fa-search text-white"></i> Search
                  </button>
                </div>
              </form>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className="recommendations mt-2">
                  <ul>
                    {recommendations.map((title, index) => (
                      <li
                        key={index}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleRecommendationClick(title)} // Handle recommendation click
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
            {/* Advertisement box */}
            <div className="  mt-6 p-3 shadow border h-auto w-full ">
              <div className="text-xs px-6 flex justify-end items-center text-bold uppercase">
                Advertisement
                <div className="flex justify-end items-center ml-4">
                  <button
                    type="submit"
                    className="  text-black  hover:bg-gray-200 "
                  >
                    <i className="fa fa-times text-black"></i> Remove
                  </button>
                </div>
              </div>
            </div>
            {/* Recent Threads box */}
            <div className="  mt-6 p-3 shadow border h-auto w-full  ">
              <div className="text-xs px-4 flex pt-2 items-center text-bold ">
                Recent Threads
              </div>
              <div className="sidebar-body ">
                <div id="sidebar-recent-topics " className="">
                  <div className="sidebar-recent-content text-sm">
                    {recentThreads.map((thread, index) => (
                      <div key={index} className="py-2 flex flex-col">
                        <p
                          className="sidebar-recent-title text-black font-bold hover:text-blue-800 overflow-hidden truncate"
                          style={{ maxWidth: "100%" }}
                        >
                          {thread.title}
                        </p>
                        <div className="text-gray-400">
                          by{" "}
                          <a
                            className="text-gray-700"
                            
                          >
                            {thread.author}
                          </a>
                          <span className="sidebar-recent-category text-gray-400">
                            {" "}in {thread.novelName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Advertisement2 box */}
            <div className="  mt-6 p-3 shadow border h-auto w-full ">
              <div className="text-xs px-6 flex justify-end items-center text-bold uppercase">
                Advertisement
                <div className="flex justify-end items-center ml-4">
                  <button
                    type="submit"
                    className="   text-black hover:bg-gray-200"
                  >
                    <i className="fa fa-times text-black"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumsPage;
