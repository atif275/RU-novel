import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { userActions } from "../store";
const Advanced = () => {
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className={` mr-1 ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}
                      />
                      <Link
                        to="/support/knowledgebase/advanced-search"
                        className={`hover:underline hover:text-blue-900 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#000000CC]'}`} 
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
                        href="#title"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Search for Title
                      </a>
                      <br></br>
                      <a
                        href="#key"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Keyword
                      </a>
                      <br></br>
                      <a
                        href="#author"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Author Name
                      </a>
                      <br></br>
                      <a
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Genres
                      </a>
                      <br></br>
                      <a
                        href="#tags"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Additional Tags
                      </a>
                      <br></br>
                      <a
                        href="#warning"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Content Warning
                      </a>
                      <br></br>
                      <a
                        href="#filters"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Filters
                      </a>
                      <br></br>
                      <a
                        href="#fiction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Fiction Statuses
                      </a>
                      <br></br>
                      <a
                        href="#order"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Order By
                      </a>
                      <br></br>
                      <a
                        href="#type"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Type
                      </a>
                      <br></br>
                      <a
                        href="#box"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Check Box
                      </a>

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className={` ${theme === 'dark' ? 'text-white' : 'bg-[#00000CC] '}`}>
                  <h1 className="text-4xl ">Advanced Search</h1>
                  <p className="mt-5">
                    We have many lists to help readers find great stories to
                    read, but you can also create your own lists specifically
                    tailored to your taste.
                  </p>

                  <p className="py-4">
                    When looking for a fiction with a specific combination of
                    tags and genres, you can use the Advanced Search which can
                    be found in the top right corner of almost every page. From
                    there it is possible to search for a specific title or
                    Author, as well as specific keywords, genres, tags, length,
                    or rating.
                  </p>

                  <h1 className="text-4xl text-[#337AB7]  " id="title">
                    Search for Title
                  </h1>
                  <p className="py-4">
                    If you know the name of the story you want to search for,
                    you can type the name in the "Search for title" section to
                    find it. Note, this section is limited to the title of the
                    story and does not search the author's username
                  </p>
                  <h1 className="text-4xl text-[#337AB7] " id="key">
                    Keyword
                  </h1>
                  <p className="py-4">
                    This section will give you results based on matches to
                    titles or descriptions. <br></br> <br></br>
                    As an example, you can use this section to search for
                    stories that mention terms that you may enjoy in the
                    description. Or stories that you vaguely remember a unique
                    term from but can't seem to remember the title of.
                  </p>
                  <h1 className="text-4xl text-[#337AB7]  " id="author">
                    Author Name
                  </h1>
                  <p className="py-4">
                    The first results would be based on the closest match to the
                    username (assuming there is an exact match), followed by
                    similar names. You can also use the Member List to find
                    specific users.
                  </p>
                  <h1 className="text-4xl text-[#337AB7]  " id="genres">
                    Genres
                  </h1>
                  <p className="py-4">
                    In order to include a genre in a search, you only need to
                    select it by clicking on the genre. In order to exclude a
                    genre, you will have to click it again. Clicking a third
                    time deselects it.<br></br>
                    <br></br>
                    Genres that are not specifically included or excluded will
                    not influence the final search result.
                  </p>
                  <img
                    className="mt-5 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAbkyXHRE.png.png?time=1645650305"
                  ></img>
                  <h1 className="text-4xl text-[#337AB7]  " id="tags">
                    Additional Tags
                  </h1>
                  <p className="py-4">
                    Tags are presented slightly differently from genres but work
                    the same. Included and excluded tags are separate entry
                    fields. When selecting one of the fields by clicking on it,
                    you will be presented a list of available tags that you can
                    include or exclude, depending on the selected field. When
                    typing in the field, it will narrow down the selectable list
                    if the entered text matches an existing tag.<br></br>
                    <br></br>A full list of tags can be found here.
                  </p>
                  <img
                    className="mt-5 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAxVmXHRE.png.png?time=1645650319"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="warning">
                    Content Warning
                  </h1>

                  <p className="py-4">
                    Filtering by content warning works in the same way as Genres
                    does.
                  </p>
                  <img
                    className="py-4 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-aadacef1crqpng.png?time=1695838975"
                  ></img>

                  <p className="py-2">
                    <strong>Sexual Content: </strong> Explicit sexual content,
                    descriptive sexual scenes.
                  </p>

                  <p className="py-2">
                    <strong>Profanity: </strong> The profanity tag must be used
                    when a fiction contains swearing, cursing, or other
                    vulgarities with a moderate or high frequency, or if the
                    profanities used are generally considered particularly
                    offensive even with a low frequency.
                  </p>

                  <p className="py-2">
                    <strong>Disturbing Content: </strong> Must be used for
                    fictions that contain descriptions of torture, slavery,
                    substance abuse, mental illness, addiction, mentions of
                    rape, self-harm or any other content that may be considered
                    traumatizing or mature that does not fall under the other
                    tags. However, note that you are not allowed to glorify any
                    of this content.
                  </p>

                  <p className="py-2">
                    <strong>Sexual Content: </strong> Any written content that
                    includes detailed descriptions of violent acts, including
                    but not limited to physical harm, bloodshed, mutilation, or
                    any other explicit depictions of violence that may be
                    considered disturbing or excessively graphic.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="filters">
                    Filters
                  </h1>

                  <p className="py-4">
                    In the advanced search, all fiction are included in the
                    results by default, but you can filter the lists based on
                    your preference from 5 available fiction statuses. <br></br>
                    <br></br>
                    Note that having “All” selected overwrites other choices.
                    When making use of this filter, be sure to unselect “All”
                    first.
                  </p>
                  <img
                    className="py-4 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAVmeXHRE.png.png?time=1645650333"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="fiction">
                    Fictions by Statuses
                  </h1>

                  <p className="py-4">
                    In the advanced search, all fiction are included in the
                    results by default, but you can filter the lists based on
                    your preference from 5 available fiction statuses. <br></br>
                    <br></br>
                    Note that having “All” selected overwrites other choices.
                    When making use of this filter, be sure to unselect “All”
                    first.
                  </p>
                  <img
                    className="py-4 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAVmeXHRE.png.png?time=1645650333"
                  ></img>

                  <p className="py-4">These are the Status types:</p>
                  <p className="py-4">
                    <strong> Ongoing</strong> <br></br> <br></br>
                    The Ongoing tag indicates that a fiction is still being
                    actively written and has had a chapter update in the past 35
                    days. This is the default tag on Royal Road and requires no
                    action from the author of a fiction.
                  </p>

                  <p className="py-4">
                    <strong> Hitaus</strong> <br></br> <br></br>
                    Hiatus is for when the author of a fiction is on a break for
                    an undetermined length. Fictions with the Hiatus tag might
                    get another update in the future, but there is also the
                    chance that the fiction is abandoned forever.<br></br>
                    <br></br>
                    This tag gets automatically applied if there are no updates
                    within 35 days. An author can actively add this tag to their
                    fiction as well.
                  </p>
                  <p className="py-4">
                    <strong> Dropped</strong> <br></br> <br></br>
                    Authors can decide to set the fiction status as Dropped,
                    which means that the fiction is incomplete and will not get
                    any more chapters in the future.
                  </p>
                  <p className="py-4">
                    <strong> Completed</strong> <br></br> <br></br>
                    Authors can set their fiction as complete. Complete fictions
                    are not expected to receive more updates in the future and
                    are complete works. If a chapter was added, the complete
                    status would not be changed.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="order">
                    Order By
                  </h1>

                  <p className="py-4">
                    You can finetune your list based on your preference. Do you
                    want to read the longest story first? Or do you want to read
                    the highest-rated one? <br></br>
                    <br></br>
                    We left a few options to choose from.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="type">
                    Type
                  </h1>
                  <p className="py-2">
                    The final filter option has to do with original work or
                    fanfictions. Using the type filter, you can select original
                    or fanfiction works, depending on what you are looking for.
                  </p>
                  <img
                    className="mt-5 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAArW6XHRE.png.png?time=1645650341"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="box">
                    Check Box
                  </h1>
                  <p className="py-4">
                    If you are a logged-in user, you probably have personalized
                    lists such as the follow list or the favorite list. It is
                    possible you also marked some stories as "Not Interested" to
                    be able to filter them out more easily. You can check the
                    boxes to exclude or include those stories before starting
                    your search. <br></br>
                    <br></br>
                    When you have the settings all dialed in, you can press the
                    search button and the results will be listed under it. You
                    can save the URL for your use at a later time
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#title"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Search for Title
                      </a>
                      <br></br>
                      <a
                        href="#key"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Keyword
                      </a>
                      <br></br>
                      <a
                        href="#author"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Author Name
                      </a>
                      <br></br>
                      <a
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Genres
                      </a>
                      <br></br>
                      <a
                        href="#tags"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Additional Tags
                      </a>
                      <br></br>
                      <a
                        href="#warning"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Content Warning
                      </a>
                      <br></br>
                      <a
                        href="#filters"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Filters
                      </a>
                      <br></br>
                      <a
                        href="#fiction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Fiction Statuses
                      </a>
                      <br></br>
                      <a
                        href="#order"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Order By
                      </a>
                      <br></br>
                      <a
                        href="#type"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Type
                      </a>
                      <br></br>
                      <a
                        href="#box"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Check Box
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

export default Advanced;
