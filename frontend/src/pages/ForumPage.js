import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";

function ForumsPage() {
  const [popularThreads, setPopularThreads] = useState([]);
  const [communityThreads, setCommunityThreads] = useState([]);
  const [fictionThreads, setFictionThreads] = useState([]);
  const [discussionThreads, setDiscussionThreads] = useState([]);
  const [forumThreads, setForumThreads] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);

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
    // Initial maxHeight setup
    Object.keys(refs).forEach((key) => {
      const section = refs[key].current;
      if (section) {
        section.style.maxHeight = isOpen[key]
          ? `${section.scrollHeight}px`
          : "0";
      }
    });
  }, [
    communityThreads,
    popularThreads,
    fictionThreads,
    discussionThreads,
    forumThreads,
  ]); // Dependencies should include any state that affects content height

  useEffect(() => {
    // Fetch Popular Threads
    fetch("http://localhost:5001/api/popularthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Popular Threads table is empty");
        } else {
          setPopularThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );

    // Fetch Community Threads
    fetch("http://localhost:5001/api/communitythreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Community Threads table is empty");
        } else {
          setCommunityThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch community threads", error)
      );
    //fiction Thread
    fetch("http://localhost:5001/api/fictionthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Popular Threads table is empty");
        } else {
          setFictionThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //Discussion Thread
    fetch("http://localhost:5001/api/discussionthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Popular Threads table is empty");
        } else {
          setDiscussionThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //Forum Thread
    fetch("http://localhost:5001/api/forumthreads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Popular Threads table is empty");
        } else {
          setForumThreads(data);
        }
      })
      .catch((error) =>
        console.error("Failed to fetch popular threads", error)
      );
    //recent threads

    fetch("http://localhost:5001/api/recent-threads")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log("Recent Threads table is empty");
        } else {
          setRecentThreads(data);
        }
      })
      .catch((error) => console.error("Failed to fetch recent threads", error));
  }, []);

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
                  Welcome to Royal Road's Official Forum
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
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Popular Threads
                </h3>
                <div className="bg-custom-black flex items-center pr-2 px-2 w-6 h-6 mr-4 text-white text-bold ">
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
                {popularThreads.length > 0 ? (
                  popularThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="`fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white ">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center ">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.title}
                            </a>
                          </h4>
                          <div className="text-xs">
                            by{" "}
                            <a href={`/profile/${topic.author}`}>
                              {topic.author}
                            </a>
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
                            <a href={`/profile/${topic.lastPoster}`}>
                              {topic.lastPoster}
                            </a>
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
            {/* Community Table */}
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Community
                </h3>
                <div className="bg-custom-black flex items-center pr-2 p-2 w-6 h-6 mr-4 text-white text-bold ">
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
                {communityThreads.length > 0 ? (
                  communityThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className=" font-bold text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.title} {/* Topic heading */}
                            </a>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.description} {/* Topic Description */}
                            </a>
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
                            <a href={`/profile/${topic.lastPoster}`}>
                              {topic.lastPoster}
                            </a>
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
            {/* Fiction Table */}
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Fictions
                </h3>
                <div className="bg-custom-black flex items-center pr-2 p-2 w-6 h-6 mr-4 text-white text-bold">
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
                {fictionThreads.length > 0 ? (
                  fictionThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.title} {/* Topic heading */}
                            </a>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.description} {/* Topic Description */}
                            </a>
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
                            <a href={`/profile/${topic.lastPoster}`}>
                              {topic.lastPoster}
                            </a>
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
            {/* Write Tips & Discussions Table */}
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Write Tips & Discussions Table
                </h3>
                <div className="bg-custom-black flex items-center pr-2 p-2 w-6 h-6 mr-4 text-white text-bold">
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
                {discussionThreads.length > 0 ? (
                  discussionThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.title} {/* Topic heading */}
                            </a>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.description} {/* Topic Description */}
                            </a>
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
                            <a href={`/profile/${topic.lastPoster}`}>
                              {topic.lastPoster}
                            </a>
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

            {/* Forum Table */}
            <div className="bg-white shadow mb-4">
              <div className="flex justify-between items-center bg-custom-gray">
                <h3 className="font-bold bg-custom-gray pl-4 py-2 text-white text-sm">
                  Forums
                </h3>
                <div className="bg-custom-black flex items-center pr-2 p-2 w-6 h-6 mr-4 text-white text-bold ">
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
                {forumThreads.length > 0 ? (
                  forumThreads.map((topic, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="fora-icon forum_unread w-1/8 md:w-1/12 p-4 text-white bg-white">
                        <div className="lg:w-10 lg:h-10 w-8 h-8 bg-red-600 flex items-center justify-center">
                          <FiMessageCircle className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="sm:flex-1 md:flex p-2 text-black">
                        <div className="lg:w-2/5">
                          <h4 className="font-bold text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.title} {/* Topic heading */}
                            </a>
                          </h4>

                          <h4 className="pt-2 text-sm">
                            <a
                              href={`/forums/thread/${topic.id}`}
                              title="View topic"
                            >
                              {topic.description} {/* Topic Description */}
                            </a>
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
                            <a href={`/profile/${topic.lastPoster}`}>
                              {topic.lastPoster}
                            </a>
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
          </div>
          {/* Sidebar */}
          <div className="w-full md:w-1/4 pl-4 pb-4 mb-4 md:mb-0 ">
            {/* Search box */}
            <div className="bg-white p-3 shadow border ">
              <h5 className="font-bold text-md py-4">Search this forum</h5>
              <form action="/forums/search" method="post">
                <input type="hidden" name="fid" />
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control w-full bg-gray-100 p-1 pl-2"
                    placeholder="Search for..."
                    name="q"
                    ref={searchInputRef} // Applying the ref to the input field
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm pb-2">Search in:</p>
                  <select className="form-control w-full text-sm" name="search">
                    <option value="posts">All Posts</option>
                    <option value="threads">First Posts Only</option>
                  </select>
                </div>
                <div className="flex justify-end items-center ">
                  <button
                    type="submit"
                    className="px-6 bg-custom-blue hover:bg-custom-hover-blue text-white py-2 "
                  >
                    <i className="fa fa-search text-white"></i>
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* Advertisement box */}
            <div className="  mt-6 p-3 shadow border h-1/3 w-full ">
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
                        <a
                          className="sidebar-recent-title text-black font-bold hover:text-blue-800 overflow-hidden truncate"
                          href={`/forums/thread/${thread._id}`}
                          title={thread.title}
                          style={{ maxWidth: "100%" }}
                        >
                          {thread.title}
                        </a>
                        <div className="text-gray-400">
                          by{" "}
                          <a
                            className="text-gray-700"
                            href={thread.profileUrl}
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
