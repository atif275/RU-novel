import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { userActions } from "../store";
const Copy = () => {
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
                      <Link
                        to="/support/knowledgebase/personalized-lists"
                        className="hover:underline hover:text-blue-900 transition-colors "
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className={` mr-1 ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}
                      />
                      <Link
                        to="/support/knowledgebase/copy-infringement"
                        className={`hover:underline hover:text-blue-900 transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#000000CC]'}`} 
                      >
                     Copy Infringement
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
                        href="#regard"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Regarding content on Royal Road that was not published by the original creator: 
                      </a>
                      <br></br>

                      <a
                        href="#permission"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                       f you are a Royal Road author and you found your content on another platform that you didn't give permission to: 
                      </a>
                      <br></br> <a
                        href="#first"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                    1. Find the hosting website’s internet provider

                      </a>
                      <br></br> <a
                        href="#second"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        2. File a DMCA form via Google’s Webmaster Tools

                      </a>
                      <br></br> <a
                        href="#three"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        3. File a DMCA form via other search engines
                        If your content made it to Amazon:
                      </a>
                      <br></br> 

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className={` ${theme === 'dark' ? 'text-white' : 'text-[#000000CC] '}`}>
                  <h1 className="text-4xl ">Copyright Infringement</h1>

                  <p className="mt-5">
                    It is said that "imitation is the sincerest form of
                    flattery." As such, many readers and authors have become
                    indifferent to plagiarism. Even if you truly don’t mind it,
                    you should still take a stand to protect your work if only
                    to tell the industry that plagiarism is not acceptable. We
                    define plagiarism as content that is mainly written by
                    someone but then claimed to be written by a different
                    person, falsely claiming to be the original author. Whether
                    the intent behind that is pure or not, if it is done without
                    the permission of the original author, we won't stand for
                    it.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="regard">
                    Regarding content on Royal Road that was not published by
                    the original creator:
                  </h1>

                  <p className="py-4">
                    Since day one, we, at Royal Road, have expressed how much we
                    take plagiarism seriously. While we cannot combat copyright
                    infringement and plagiarism all over the internet, we can do
                    so on our platform.<br></br>
                    <br></br>
                    Accordingly, all fictions that get submitted to our platform
                    are required to go through a verification process in order
                    to make sure that the authors or the copyright holders are
                    the ones who are publishing their works. In fact, we reject
                    10% of submitted content, with the main cause being
                    plagiarism.<br></br>
                    <br></br>
                    If you are the actual author of a story posted on Royal
                    Road, but you never gave permission to the individual who
                    posted it here, please reach out to us and we will take care
                    of it. You can do so via a Support ticket, or by sending a
                    DMCA notice. <br></br>
                    <br></br>
                    Even if you are not the author or artist in question, if you
                    are aware of something that bypassed our verification
                    process, please either report it by opening a support
                    ticket.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="permission">
                    If you are a Royal Road author and you found your content on
                    another platform that you didn't give permission to:
                  </h1>

                  <p className="py-4">
                    If you find plagiarized content on another platform and have
                    reasonable doubt that it is being plagiarized, please notify
                    us and provide any proof you can. Additionally, you can link
                    an author to this post to know what to do when faced with a
                    similar situation.
                    <br />
                    <br />
                    As an author, it is important to know your rights and the
                    steps you can take in case something happens to your
                    content.
                    <br />
                    <br />
                    Thanks to regulations, most websites provide a way of
                    dealing with copyright-infringing content in a direct manner
                    by simply contacting them or reporting the fiction. We, at
                    Royal Road take action as soon as possible when we are made
                    aware of the violation. However, some of the other platforms
                    do not. In these cases, don’t lose hope as you can request a
                    DMCA (Digital Millennium Copyright Act) takedown notice.
                    <br />
                    <br />
                    The DMCA provides protections for sites regarding content
                    that is posted by their users, especially for sites that do
                    not know about the infringing behavior. However, in return,
                    copyright holders can file a DMCA takedown notice in which
                    they state that there is a copyrighted content of theirs
                    being infringed upon. It puts pressure on the websites to
                    take down the infringing content within a set timeframe when
                    a legitimate DMCA notice has been issued. <br />
                    <br />
                    This is how you can file it:
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="first">
                    1. Find the hosting website’s internet provider
                  </h1>
                  <p className="py-4">
                    If contacting the site directly fails, you can contact the
                    website’s internet provider and report it to them. You can
                    do so by using any “WhoIs” website (Such as
                    <a
                      href="https://hostadvice.com/tools/whois/"
                      className="text-blue-600 hover:underline"
                    >
                      https://hostadvice.com/tools/whois/
                    </a>
                    ). Once you find out who their internet provider is, you can
                    then search in Google for [Internet Provider] DMCA. The
                    results should lead you to the relevant page. However, take
                    note that each provider has its own requirements which you
                    will need to check out and follow. You then need to send a
                    DMCA takedown letter, which should have the noted
                    requirements to be successful. For simplicity and ease, you
                    can use one of the many templates that are available online.
                  </p>

                  <p className="py-4">
                    <strong>
                      Remember to take screenshots of the violations as you
                      might need them as proof later on, especially for steps #2
                      and #3.
                    </strong>
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="second">
                    2. File a DMCA form via Google’s Webmaster Tools
                  </h1>
                  <p className="py-4">
                    This will remove the reported pages from Google’s results.
                    Google will do their own review, so give them as much
                    evidence as you can. If you have notified the website
                    already, show that to Google and include a screenshot of the
                    contents that are in violation of your copyright.
                    <a
                      href="https://www.google.com/webmasters/tools/dmca-dashboard"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.google.com/webmasters/tools/dmca-dashboard
                    </a>
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="three">
                    3. File a DMCA form via other search engines
                  </h1>
                  <p className="py-4">
                    We recommend submitting the DMCA form with Bing
                    <a
                      href="https://www.bing.com/toolbox/webmaster/"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.bing.com/toolbox/webmaster/
                    </a>
                    as well since it is the second most used search engine.
                  </p>

                  <p className="py-4">
                    Please remember to give the hosting website the necessary
                    time to evaluate and act on your claim of plagiarism.
                    However, if that fails, use the tools available to you. Note
                    that filing a DMCA takedown notice is very serious as sites
                    that have been filed against can submit a counter-notice. If
                    you provide falsified information, you can be sued.
                    Therefore, make sure to file a takedown notice only if you
                    truly are the copyright holder or their agent.
                  </p>

                  <p className="text-[#337AB7] text-3xl mt-5" >
                    If your content made it to Amazon:
                  </p>
                  <p className="py-4">
                    In similar cases in the past, it has proven successful for
                    the author to contact Amazon support directly and request
                    the removal of the listing. You can read from Amazon's site
                    about the steps that you can follow in this situation:
                    <a
                      href="https://www.amazon.com/gp/help/customer/display.html?nodeId=G577MV72HLUW97KC"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.amazon.com/gp/help/customer/display.html?nodeId=G577MV72HLUW97KC
                    </a>
                  </p>

                  <p className="py-4">
                    From previous author experiences, both methods seem to have
                    swift responses to them, both by filling this form
                    <a
                      href="https://www.amazon.com/report/infringement"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.amazon.com/report/infringement
                    </a>
                    or by sending an email to
                    <a
                      href="mailto:copyright@amazon.com"
                      className="text-blue-600 hover:underline"
                    >
                      copyright@amazon.com
                    </a>
                    .
                  </p>

                  <p className="text-[#337AB7] text-3xl mt-5" id="front">
                    Email Template:
                  </p>
                  <p className="py-4">
                    Make sure to carefully read Amazon's email to see what they
                    ask for, but usually, this email template when reaching out
                    to them is enough:
                  </p>

                  <p className="py-4">
                    Make sure to substitute the bold and edit your information
                    according to your situation:
                  </p>

                  <p className="py-4">
                    "<br />
                    Hi,
                    <br />
                    <br />I hold all the necessary publishing rights, and I am
                    the author and owner of this book ("
                    <strong>Name of Book</strong>").
                    <br />
                    The content previously made available on Amazon has been
                    stolen from me <strong>"Link to the stolen book"</strong>.
                    <br />
                    <br />
                    To provide clear verification for you: Please note that the
                    story is available online at{" "}
                    <strong>"Royal Road Fiction page link"</strong>.<br />
                    It was published <strong>X years ago</strong>. You can
                    easily confirm the date to verify that it was uploaded there
                    long before
                    <strong>"Name of thief"</strong> stole it. To prove this,
                    you can see that he only published it on Amazon on{" "}
                    <strong>"date X"</strong>.<br />
                    <br />
                    For verification purposes, I added the text "
                    <strong>
                      I am going to publish this story on Amazon under the
                      account [Amazon Author Name]
                    </strong>
                    " at the top of the Royal Road description.
                    <br />
                    <br />
                    I have attached an image of the Royal Road page to show
                    where you can find the verification information I mentioned.
                    <br />"
                  </p>

                 

                  <p className="py-4">
                    Please note that we do not send any notifications to invited
                    users to avoid spamming them, so you will need to notify
                    them yourself. To avoid abuse, collaborator users have to
                    accept your invitation before they gain access or can be
                    added to the credits. You can copy the invitation link from
                    the “Collaborators” page and send it directly to the user in
                    question. The invitation is tied to their account, so other
                    users cannot accept it even if they have the link.
                    Alternatively, the user in question can open this page which
                    lets them see all pending invitations.<br></br>
                    <br></br>
                    We hope that you will make good use of this feature.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-aabaywtngxqpng.png?time=1697043145"
                  ></img>
                  <p className="py-4">Sometimes, however, they require further verification that you are the original author. If you are published on our platform, you can direct an email to admin@royalroad.com for assistance. Please note that if your content on Royal Road was affected, we would appreciate being updated about the situation regarding what steps you followed and how long it took you to resolve the issue. Any new information an author may provide could be beneficial to others to make the whole process easier for them in case they also got affected by plagiarism.<br></br><br></br>




Unfortunately, the internet is filled with pirate sites, and some of them could ignore all the above.  </p>

                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#regard"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Regarding content on Royal Road that was not published by the original creator: 
                      </a>
                      <br></br>

                      <a
                        href="#permission"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                       If you are a Royal Road author and you found your content on another platform that you didn't give permission to: 
                      </a>
                      <br></br> <a
                        href="#first"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                    1. Find the hosting website’s internet provider

                      </a>
                      <br></br> <a
                        href="#second"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        2. File a DMCA form via Google’s Webmaster Tools

                      </a>
                      <br></br> <a
                        href="#three"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        3. File a DMCA form via other search engines
                        If your content made it to Amazon:
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

export default Copy;
