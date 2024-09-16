import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { userActions } from "../store";
const Discovery = () => {
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className={` mr-1 ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}
                      />
                      <Link
                        to="/support/knowledgebase/discovery-and-rankings"
                        className={`hover:underline hover:text-blue-900 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#000000CC]'}`} 
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
                        href="#front"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Front Page
                      </a>
                      <br></br>
                      <a
                        href="#best"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Best Rated
                      </a>
                      <br></br>
                      <a
                        href="#trending"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Trending
                      </a>
                      <br></br>
                      <a
                        href="#fiction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Ongoing Fictions
                      </a>
                      <br></br>
                      <a
                        href="#complete"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Complete
                      </a>
                      <br></br>
                      <a
                        href="#popular"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Popular this Week
                      </a>
                      <br></br>
                      <a
                        href="#new"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        New Releases
                      </a>
                      <br></br>
                      <a
                        href="#latest"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Latest Updates
                      </a>
                      <br></br>
                      <a
                        href="#stars"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Rising Stars
                      </a>
                      <br></br>
                      <a
                        href="#recommend"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Recommended for You
                      </a>
                      <br></br>
                      <a
                        href="#others"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Others Also Liked
                      </a>

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className={`${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}>
                  <h1 className="text-4xl ">Discovery & Rankings</h1>
                  <p className="mt-5">
                    On Royal Road, there are many rankings and discovery lists
                    available and multiple ways to see them. Each ranking has a
                    genre filter, and the default is to show all genres at once.
                  </p>
                  <img
                    className="mt-5 h-[10rem]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAA4WOHRE.png.png?time=1645648004"
                  ></img>
                  <p className="mt-5">
                    Aside from the multiple lists and rankings available on
                    Royal Road, we also offer several recommendation engines to
                    find fictions that we think you might like, based on both
                    your own reading history and the reading history of others
                    that read the fictions that you are reading. In order for a
                    fiction to be eligible for listing in a recommendation list,
                    it needs to either be Ongoing or Completed.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="front">
                    Front Page
                  </h1>
                  <p className="py-4">
                    The first encounter with lists on Royal Road will be the
                    front page. Here you can see the: Latest Updates, Rising
                    Stars, Popular This Week, Best Completed, and Best Ongoing
                    lists.
                  </p>
                  <p className="py-4">
                    These front-page lists are identical to the full, separate
                    page lists. Some of the rankings are updated once every 15
                    minutes, while others are updated once a day.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="best">
                    Best Rated
                  </h1>

                  <p className="py-4">
                    Best rated is the list where all fiction on Royal Road are
                    ranked based on their combined rating and review score.
                    There is a weight to the average rating score and the number
                    of ratings. It is possible that a fiction with a lower
                    rating score but more ratings gets a higher position on this
                    list.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="trending">
                    Trending
                  </h1>
                  <p className="py-4">
                    Trending uses complex calculations to try and pick the
                    popular stories that aren't too popular. Stories that end up
                    on Royal Road's front page, for example, will rarely if ever
                    make it onto the list. However, it should show the somewhat
                    popular stories that are a good read. This list is limited
                    to 50 fictions per genre.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="fiction">
                    Ongoing Fictions
                  </h1>
                  <p className="py-4">
                    Ongoing Fictions is similar to the Best Rated list, but only
                    for ongoing stories. It excludes other statuses such as
                    Completed, Dropped, Hiatus, Stub.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="complete">
                    Complete
                  </h1>
                  <p className="py-4">
                    Complete Fictions is like Best Rated, but only for completed
                    fictions. The list excludes fictions that are tagged with
                    any status other than complete, such as Ongoing, Dropped,
                    Hiatus, Stub.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="popular">
                    Popular this Week
                  </h1>
                  <p className="py-4">
                    Popular this Week lists fictions that are popular this week
                    based on how often they are read by other users.
                  </p>
                  <p className="py-4">
                    Note: If you don't have the [Show Stubs] toggle on, it means
                    that you will only see the list of stories that are
                    available on Royal Road in full.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="new">
                    New Releases
                  </h1>
                  <p className="py-4">
                    New Releases shows the newest fictions on the Platform by
                    release date.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="latest">
                    Latest Updates
                  </h1>
                  <p className="py-4">
                    Latest updates shows the latest chapter updates on Royal
                    Road by release date.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="stars">
                    Rising Stars
                  </h1>
                  <p className="py-4">
                    Rising Stars is the list for the newest, hottest fictions on
                    the platform determined by multiple factors and complex
                    calculations. This ranking rotates often and staying for
                    more than a week is hard. Check this list often to find the
                    new rising stars of the platform.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="recommend">
                    Recommended for You
                  </h1>
                  <p className="py-4">
                    Recommended for you looks at what you previously read and
                    tries to find fictions that match the profile. This feature
                    is still in Beta status and can be found on the Front Page
                    of Royal Road.<br></br>
                    <br></br>
                    You can find this list on the home page, but you need to be
                    logged in.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="others">
                    Others Also Liked
                  </h1>
                  <p className="py-4">
                    On the fiction pages, there is the "Other also Liked"
                    recommendation tab. This looks at what other readers of this
                    fiction are reading. The idea behind this list is that
                    tastes overlap and that there is a high chance that you will
                    like what a fellow reader is also reading.
                    <br></br>
                    <br></br>
                    This list can be found on any fiction page under the chapter
                    table of content.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#front"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Front Page
                      </a>
                      <br></br>
                      <a
                        href="#best"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Best Rated
                      </a>
                      <br></br>
                      <a
                        href="#trending"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Trending
                      </a>
                      <br></br>
                      <a
                        href="#fiction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Ongoing Fictions
                      </a>
                      <br></br>
                      <a
                        href="#complete"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Complete
                      </a>
                      <br></br>
                      <a
                        href="#popular"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Popular this Week
                      </a>
                      <br></br>
                      <a
                        href="#new"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        New Releases
                      </a>
                      <br></br>
                      <a
                        href="#latest"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Latest Updates
                      </a>
                      <br></br>
                      <a
                        href="#stars"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Rising Stars
                      </a>
                      <br></br>
                      <a
                        href="#recommend"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Recommended for You
                      </a>
                      <br></br>
                      <a
                        href="#others"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Others Also Liked
                      </a>

                      <br></br>
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

export default Discovery;
