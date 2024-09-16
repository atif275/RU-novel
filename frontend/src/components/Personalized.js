  
  import React, { useState,useEffect } from "react";
  import { Link } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
  import { useRef } from "react";
  import { useNavigate } from "react-router-dom";
  import { useDispatch,useSelector } from "react-redux";
  import { userActions } from "../store";
  const Personalized = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [isSidebarVisible, setIsSidebarVisible] = useState(false);
      const [suggestions, setSuggestions] = useState([]);
      const theme=useSelector((state)=>state.userData.theme)
      const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        if (value) {
          // Filter suggestions based on input
          const matchingSuggestions = Object.keys(pageMapping).filter(keyword =>
            keyword.includes(value.toLowerCase())
          );
          setSuggestions(matchingSuggestions);
        } else {
          setSuggestions([]);
        }
      };
    
      const inputRef=useRef(null)
  
      const dispatch=useDispatch()
      
      const navigate=useNavigate()
      useEffect(() => {
        dispatch(userActions.setBarsClick(false));
        inputRef.current?.focus(); // Auto focus on search input
    }, [dispatch]);
      const generateSlug = (title) => {
          return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
        };
        
        const handleSuggestionClick = (suggestion) => {
          const destination = pageMapping[suggestion];
          navigate(destination);
        };
  
      const pageMapping = {
        "rules about rating and reviews": "/support/knowledgebase/rules-about-ratings-and-reviews",
        "content guidelines": "/support/knowledgebase/content-guidelines",
      
        "general rules": "/support/knowledgebase/general-rules",
        "discovery & rankings": "/support/knowledgebase/discovery-and-rankings",
        "advanced search": "/support/knowledgebase/advanced-search",
          "optimize the reading experience":"/support/knowledgebase/optimize-the-reading-experience",
          "personalized lists":"/support/knowledgebase/personalized-lists",
          "notifications":"/support/knowledgebase/notifications",
          "genres and tags":"/support/knowledgebase/genres-and-tags",
          "author dashboard":"/support/knowledgebase/author-dashboard",
          "chapters":"/support/knowledgebase/chapters",
          "submitting and verifying novels":"/support/knowledgebase/submitting-and-verifying-novels",
          "chapters":"/support/knowledgebase/chapters",
          "comments":"/support/knowledgebase/comments",
          "reviews":"/support/knowledgebase/reviews",
          "fiction status":"/support/knowledgebase/fiction-status",
          "deleting your fiction":"/support/knowledgebase/deleting-your-fiction",
          "donation":"/support/knowledgebase/donation",
          "credit collaborate and moderate":"/support/knowledgebase/credit-collaborate-and-moderate",
          "moderation tools for users":"/support/knowledgebase/moderation-tools-for-users",
          "reputation":"/support/knowledgebase/reputation",
          "experience":"/support/knowledgebase/experience",
          "achievments":"/support/knowledgebase/achievments",
          "writathon":"/support/knowledgebase/writathon",
          "signup and activation":"/support/knowledgebase/signup-and-activation",
          "security":"/support/knowledgebase/security",
          "notification":"/support/knowledgebase/notification",
          "contact the staff":"/support/knowledgebase/contact-the-staff",
          "the site is loading slowly":"/support/knowledgebase/site-loading-slowly",
          "report a bug":"/support/knowledgebase/report-a-bug",
          "report an ad":"/support/knowledgebase/report-an-ad",
          "report a user interaction":"/support/knowledgebase/report-a-user-interaction",
          "frequently asked questions":"/support/knowledgebase/fredquently-asked-questions",
          "copyright infringement":"/support/knowledgebase/copyright-infringement",
          "premium":"/support/knowledgebase/premium",
          "reader premium":"/support/knowledgebase/reader-premium",
          "author premium":"/support/knowledgebase/author-premium",
          "paid advertisement for my story":"/support/knowledgebase/paid-advertisement-for-my-story",
      };
  
      const handleSearch = (e) => {
        e.preventDefault();
        // Generate slug from the search term
        const slug = generateSlug(searchTerm);
    
        // Check if the slug matches any key in the pageMapping
        const destination = pageMapping[slug] || "/support/knowledgebase";
        
        // Navigate to the matched URL or fallback URL
        navigate(destination);
      };
    
      const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };
    
  
    return (
      <div className={`lg:w-[90%] lg:ml-20 h-full p-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
       <div className="text-white rounded-md">
    <div className="col-xs-12 text-white">
      <div
        className="portlet light mb-2 page-header"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("/dist/img/pmheader.jpg") no-repeat center',
          padding: "15px 20px",
        }}
      >
        <div className="p-2 flex items-center">
          <div className="mr-4">
            <i
              className="fa fa-fw fa-book-open text-navy text-4xl"
              style={{ lineHeight: "initial" }}
            ></i>
          </div>
          <div>
            <h2 className="text-lg font-bold">Knowledge Base</h2>
            <span>All about Royal Road</span>
            <ul className="page-breadcrumb breadcrumb mt-2">
             
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  
    <div className={` ${theme === 'dark' ? 'bg-[#131313] text-white' : 'bg-white text-black '} rounded-md p-6`}>
          <div className="portlet light">
            {isSidebarVisible &&<div className={` w-[75%] sm-[50%] p-4 mb-2 ${theme === 'dark' ? 'bg-[#131313] text-white' : 'bg-[#FAF9F6]   '}` }>
                <div className="backdrop">
                  <strong>Rules</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                    
                      <Link
                        to="/support/knowledgebase/rules-about-ratings-and-reviews"
                        className="hover:underline hover:text-blue-900  transition-colors"
                      >
                        Rules about Ratings and Reviews
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/content-guidelines"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Content Guidelines
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/general-rules"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        General Rules
                      </Link>
                    </div>
                  </div>
                </div>
  
                <div className="backdrop">
                  <strong>Reading</strong>
                  <div className="ml-5 text-blue-700">
                  <div>
                        <Link
                          to="/support/knowledgebase/discovery-and-rankings"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Discovery & Ranking
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/support/knowledgebase/advanced-search"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Advanced Search
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/support/knowledgebase/optimize-the-reading-experience"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Optimize the Reading Experience
                        </Link>
                      </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/personalized-lists"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Personalized Lists
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/notifications"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Notifications
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/genres-and-tags"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Genres and Tags
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="backdrop">
                  <strong>Writing</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/author-dashboard"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Author Dashboard
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/chapters"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Chapters
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/submitting-and-verifying-novels"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Submitting and Verifying Novels
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/comments"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Comments
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/reviews"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Reviews
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/fiction-status"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Fiction Status
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/deleting-your-fiction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Deleting Your Fiction
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/donation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Donation
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/credit-collaborate-and-moderate"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Credit, Collaborate, and Moderate
                      </Link>
                    </div>
                  </div>
                </div>
  
                <div className="backdrop">
                  <strong>Modertaion Tools For Users</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/moderation-tools-for-users"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Modertaion Tools For Users
                      </Link>
                    </div>
                  </div>
                </div>
  
                <div className="backdrop">
                  <strong>The Gamification System and Events</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/reputation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Reputation
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/experience"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Experience
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/achievments"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Achievements
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/writathon"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Writathon
                      </Link>
                    </div>
                  </div>
                </div>
  
                <div className="backdrop">
                  <strong>Account</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/signup-and-activation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        SignUp & Activation
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/security"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Security
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/notification"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Notification
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="backdrop">
                  <strong>Support</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/contact-the-staff"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Contact the Staff
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/site-loading-slowly"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        The Site is Loading Slowly
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/report-a-bug"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Report a Bug
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/report-an-ad"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Report an Ad
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/report-a-user-interaction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Report a User Interaction
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/fredquently-asked-questions"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Frequently Asked Questions
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/copyright-infringement"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Copyright Infringement
                      </Link>
                    </div>
                  </div>
                </div>
  
                <div className="backdrop ">
                  <strong>Subscriptions and Payments</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/premium"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Premium
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/reader-premium"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Reader Premium
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/author-premium"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Author Premium
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/paid-advertisement-for-my-story"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Paid Advertisement for My Story
                      </Link>
                    </div>
                  </div>
                </div>
              </div> }
            
            <div className="row">
              <div className="block md:hidden col-xs-12 mb-5">
                <button className="btn btn-default toc-toggle" onClick={toggleSidebar}>
                  <i className="fas fa-bars"></i> Table of Contents
                </button>
              </div>
  
            <div className="row mb-4">
              <div className="col-md-12">
                <form onSubmit={handleSearch}>
                  <div className="form-group">
                    <div
                      id="knowledge-base-search-container"
                      className="relative"
                    >
                      <div className="searchbox">
                        <div className="searchbox-container">
                          
                        <div className={`sui-search-box flex items-center border rounded-md p-2  ${theme === 'dark' ? 'bg-[#131313]' : ' '}`}>
                            
                              <div className="flex-grow">
                                <input
                                  id="downshift-0-input"
                                  aria-autocomplete="list"
                                  aria-labelledby="downshift-0-label"
                                  autoComplete="off"
                               
                                  className={`w-full border-none focus:outline-none  ${theme === 'dark' ? 'bg-[#131313]' : ' '}`}
                                  ref={inputRef}
                                  value={searchTerm}
                                   onChange={handleInputChange}
                                    placeholder="Search..."
  
                                  
                                  
                                />
                              </div>
                              <input
                                data-transaction-name="search submit"
                                type="submit"
                                className="ml-2 button sui-search-box__submit"
                                value="Search"
                              />
                            </div>
                      
                        </div>
                      </div>
  
                      {suggestions.length > 0 && (
              <ul className={`absolute mt-1 border w-full border-gray-300  rounded shadow-lg ${theme === 'dark' ? 'bg-[#131313] text-white' : ' bg-white '}`}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer w-full font-bold    ${theme === 'dark' ? 'hover:bg-gray-800' : ' hover:bg-gray-200 '}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                  
                    {suggestion}
                  </li>
                  
                ))}
              </ul>
            )}
                    
                    </div>
                  </div>
                </form>
              </div>
            </div>
  
  

            {/* Layout for Sidebar and Content */}
            <div className="flex flex-wrap">
              {/* Sidebar for larger screens */}
              <div className="hidden md:block md:w-[26%]  ">
                <div className="backdrop">
                  <strong>Rules</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/rules-about-ratings-and-reviews"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Rules about Ratings and Reviews
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/content-guidelines"
                        className="hover:underline hover:text-blue-900   transition-colors"
                      >
                        Content Guidelines
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/general-rules"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        General Rules
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="backdrop">
                  <strong>Reading</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <Link
                        to="/support/knowledgebase/discovery-and-rankings"
                        className="hover:underline hover:text-blue-900 transition-colors "
                      >
                        Discovery & Ranking
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/support/knowledgebase/advanced-search "
                        className="hover:underline hover:text-blue-900  transition-colors"
                      >
                        Advanced Search
                      </Link>
                    </div>
                    <div>
                     
                      <Link
                        to="/support/knowledgebase/optimize-the-reading-experience"
                        className="hover:underline hover:text-blue-900 transition-colors "
                      >
                        Optimize the Reading Experience
                      </Link>
                    </div>
                    <div>
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className={` mr-1 ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}
                      />
                      <Link
                        to="/support/knowledgebase/personalized-lists"
                        className={`hover:underline hover:text-blue-900 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#000000CC]'}`} 
                      >
                        Personalized Lists
                      </Link>   
                 
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/notifications"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Notifications
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/genres-and-tags"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Genres and Tags
                    </Link>
                  </div>
                  </div>
                </div>
                <div className="backdrop">
                  <strong>Writing</strong>
                  <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/author-dashboard"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Author Dashboard
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/chapters"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Chapters
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/submitting-and-verifying-novels"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Submitting and Verifying Novels
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/comments"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Comments
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/reviews"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reviews
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/fiction-status"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Fiction Status
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/deleting-your-fiction"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Deleting Your Fiction
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/donation"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Donation
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/credit-collaborate-and-moderate"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Credit, Collaborate, and Moderate
                    </Link>
                  </div>
                  </div>
                </div>

                <div className="backdrop">
                <strong>Moderation Tools For Users</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/moderation-tools-for-users"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Modertaion Tools For Users
                    </Link>
                  </div>
                </div>
              </div>

              <div className="backdrop">
                <strong>The Gamification System and Events</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/reputation"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reputation
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/experience"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Experience
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/achievments"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Achievements
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/writathon"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Writathon
                    </Link>
                  </div>
                </div>
              </div>

              <div className="backdrop">
                <strong>Account</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/signup-and-activation"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      SignUp & Activation
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/security"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Security
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/notification"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Notification
                    </Link>
                  </div>
                </div>
              </div>
              <div className="backdrop">
                <strong>Support</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/contact-the-staff"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Contact the Staff
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/site-loading-slowly"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      The Site is Loading Slowly
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/report-a-bug"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report a Bug
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/report-an-ad"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report an Ad
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/report-a-user-interaction"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report a User Interaction
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/fredquently-asked-questions"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Frequently Asked Questions
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/copyright-infringement"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Copyright Infringement
                    </Link>
                  </div>
                </div>
              </div>

              <div className="backdrop ">
                <strong>Subscriptions and Payments</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/premium"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Premium
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/reader-premium"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reader Premium
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/author-premium"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Author Premium
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/paid-advertisement-for-my-story"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Paid Advertisement for My Story
                    </Link>
                  </div>
                  </div>
                </div>
              </div>

              <div className=" block md:hidden  md:w-[100%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                    <a
                        href="#follow"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Follow List
                      </a>
                      <br></br>
                      <a
                        href="#later"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Read Later
                      </a>
                      <br></br>
                      <a
                        href="#favorites"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Favorites
                      </a>
                      <br></br>
                      <a
                        href="#history"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        History
                      </a>

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
              <div className= {` ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}>
                  <h1 className="text-4xl ">Personalized Lists</h1>
                  <p className="mt-5">
                    In order to help keep track of any fiction you are reading,
                    favorited, or want to read later we provide different lists
                    that are personal to you. These lists can be found via the
                    account dropdown on the site.<br></br>
                    <br></br>
                    Simply login, then go to the top right corner and click on
                    your username, then select which list you want to open.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAYwZIHhE.png.png?time=1645696633"
                  ></img>

                  <p className="py-4">
                    In order to add a fiction to either of these lists, you need
                    to head over to the main page of any fiction you want to add
                    to a list.<br></br>
                    <br></br>
                    There, on the right widget, you can find 3 options to
                    Follow, Favorite and Read Later.
                  </p>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAmRVYXRE.png.png?time=1649928702"
                  ></img>

                  <p className="py-4">
                    Simply click the box you want, and the story will be added
                    to the list it corresponds to.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="follow">
                    Follow List
                  </h1>

                  <p className="py-4">
                    The first and most used list is the Follow List. This list
                    aggregates all your followed fiction updates into one
                    central place, sorted by latest release.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAA0w1IHhE.png.png?time=1645696641"
                  ></img>

                  <p className="py-4">
                    There are a couple of features you can enable or change
                    within this list itself. Starting from the top there are 3
                    tabs for how to view the list. The default is the V2 tab,
                    which presents information such as the Last update and
                    informs you which chapter you read last.<br></br>
                    <br></br>
                    There is also the List tab, will show you the latest chapter
                    released from any of the stories that you are following, as
                    well as the grouping tab that expands on the list tab but
                    provides a little bit more information, such as the cover
                    art and number of pages <br></br>
                    <br></br>
                    In the V2 tab, there is a red dot indicating unread
                    chapters. This is decided based on the chapter reading
                    tracker, which tracks which chapter you last read to give
                    you a quick option to jump to the next chapter and notifies
                    you if there is something that you are not up to date with.{" "}
                    <br></br>
                    <br></br>
                    It is also possible to change your per-fiction notification
                    settings from this page. You can be notified by Email
                    regarding the latest releases, as well as a push
                    notification if you have premium. More on this in the
                    Notifications section.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="later">
                    Read Later
                  </h1>

                  <p className="py-4">
                    If a story caught your attention but you don't want to start
                    reading it right away, you can put it in the Read Later
                    list. There you will find all the stories sorted
                    alphabetically, by date added, or by length. You can easily
                    remove stories or start following them from there.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="favorites">
                    Favorites
                  </h1>

                  <p className="py-4">
                    For the best stories that you read and wish to recommend to
                    the world, we have the Favorites list. This list is also
                    public and is visible in your "Favorites" tab on your
                    profile page (The profile page can be found by clicking "My
                    Profile" in your username menu at the top right corner or by
                    clicking a username from anywhere it is displayed on the
                    site).
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAkBVIHhE.png.png?time=1645696649"
                  ></img>

                  <p className="py-4">
                    Theme default uses either White or Royal Road Dark depending
                    on if you use the global Light or Dark theme. The OLED Black
                    option is added as an option to offer true black backgrounds
                    for the reader to avoid burn-in on OLED screens. The
                    remaining options are up to personal preference.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="history">
                    History
                  </h1>

                  <p className="py-4">
                    You can find a list of the latest chapters that you read
                    regardless of whether or not you followed the story.
                    <br></br>
                    In the History list, you can see the last chapter you've
                    read for every story. If you have a premium account, you can
                    also see a detailed History which is a list of every chapter
                    you opened in the last six months, instead of just the last
                    one.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#follow"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Follow List
                      </a>
                      <br></br>
                      <a
                        href="#later"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Read Later
                      </a>
                      <br></br>
                      <a
                        href="#favorites"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Favorites
                      </a>
                      <br></br>
                      <a
                        href="#history"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        History
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalized;
