import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Rules = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const inputRef=useRef(null)
    
    const navigate=useNavigate()

    const generateSlug = (title) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
          .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
      };
      
    const handleSearch = (e) => {
        e.preventDefault();
        const slug = generateSlug(searchTerm);  // Generate slug when search is submitted
        // console.log("Search Term:", searchTerm);
        navigate(`/support/knowledgebase/${slug}`);

    
    };
  
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
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


      <div className="bg-white text-black rounded-md p-6">
        <div className="portlet light">
          {isSidebarVisible &&<div className=" w-[75%] sm-[50%] p-4 bg-[#FAF9F6] mb-2 ">
              <div className="backdrop">
                <strong>Rules</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <FontAwesomeIcon icon={faCaretRight} className="text-[#000000CC] mr-1"/>
                    <Link
                      to="/support/knowledgebase/rules-about-ratings-and-reviews"
                      className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
                <strong>The Gamification System and Events</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reputation
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Experience
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Achievements
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
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
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      SignUp & Activation
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Security
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/knowledgebase/73"
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
                      to="/support/contact-staff"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Contact the Staff
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/site-loading-slowly"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      The Site is Loading Slowly
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/report-bug"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report a Bug
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/report-ad"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report an Ad
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/report-user-interaction"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Report a User Interaction
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/faq"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Frequently Asked Questions
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/support/copyright-infringement"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Copyright Infringement
                    </Link>
                  </div>
                </div>
              </div>

              <div className="backdrop ">
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
                       
                          <div className="sui-search-box flex items-center border rounded-md p-2">
                            <div className="flex-grow">
                              <input
                                id="downshift-0-input"
                                aria-autocomplete="list"
                                aria-labelledby="downshift-0-label"
                                autoComplete="off"
                                placeholder="Search for support page by writing it name"
                                className="w-full border-none focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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

                    {/* Search results */}
                    <ul className="sui-results-container">
                      {/* Add more search results here */}
                    </ul>
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
                    <FontAwesomeIcon icon={faCaretRight} className="text-[#000000CC] mr-1"/>
                    <Link
                      to="/support/knowledgebase/rules-about-ratings"
                      className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
            </div>

            <div className=" block md:hidden  md:w-[100%]  ">
              <div className="backdrop">
                <strong>In this article</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                
                    <a 
                      href="#review"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reviewing Rules
                    </a ><br></br>
                    <a 
                      href="#justify"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Justify the Rating
                    </a ><br></br>
                    <a 
                      href="#stay"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Stay On Topic
                    </a ><br></br>
                    <a 
                      href="#fair"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Be Fair And Respectful
                    </a ><br></br>
                    <a 
                      href="#language"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Use Appropriate Language
                    </a ><br></br>
                    <a 
                      href="#spoilers"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Spoilers
                    </a ><br></br>
                    <a 
                      href="#general"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      General
                    </a ><br></br>
                    <a 
                      href="#swap"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Review Swap Rules
                    </a ><br></br>
                    <a 
                      href="#reporting"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reporting 
                      Reviews
                    </a ><br></br>
                    <a 
                      href="#fiction"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reporting Fiction
                    </a ><br></br>
                  </div>
                  </div>
                  </div>
                  </div>
            <div className="w-full md:w-1/2 p-4  ">
              <div className="text-[#000000CC]">
                <h1 className="text-4xl " >Rules about Ratings, and Reviews</h1>
                <p className="mt-5">
                  Reviews aim to inform prospective readers if the story is
                  something they will want to read. This can be done by
                  communicating how well a story delivers what was promised in
                  the premise (as outlined in the synopsis and opening
                  chapters), by judging how well the story is written (both in
                  terms of grammar and prose), and by highlighting the highs and
                  lows of a reader’s experience with a story.
                </p>
                <p className="mt-5">
                  You can verify the validity of a review by checking the
                  reading history of the reviewer. When the reviews are sorted
                  by "Top", you will find reviews by people who have similar
                  reading taste. Logged out users will get a random sorting
                  instead due to there being no data to use. Upvotes and
                  downvotes exist, but currently purely as a feedback.
                </p>
                <p className="mt-5">
                  If you read the story, there are three levels of feedback you
                  can leave:
                </p>
                <p className="mt-5">
                  Ratings are plain 0.5-5 star scores. No written feedback or
                  justification for the score is required.
                </p>
                <p className="mt-5">
                  Basic Reviews provide an overall 0.5-5 star score along with a
                  brief overview of your opinion of the story, providing some
                  justification for the score.
                </p>
                <p className="mt-5">
                  Advanced Reviews provide a score for the overall fiction in
                  addition to the following subcategories: Style, Story,
                  Grammar, and Characters.
                </p>

                <ul className="mt-5 ml-8 list-disc">
                  <li className="py-2">
                    Style: The general feeling of the piece as created by the
                    author's word choice, literary devices, and unique way of
                    writing.
                  </li>
                  <li className="py-2">
                    Story: Plot development and pacing (i.e., how well a story
                    is put together).
                  </li>
                  <li className="py-2">
                    Grammar: The technical aspects of the writing, including
                    spelling, grammar, and punctuation.
                  </li>
                  <li className="py-2">
                    Character: The characters in the story, how well they are
                    depicted, how realistic and three-dimensional they are. This
                    applies to both main and side characters.
                  </li>
                </ul>

                <h1 className="text-[#337AB7] text-4xl mt-5 " id="review">
                  Reviewing Rules
                </h1>

                <h1 className="text-[#337AB7] text-2xl mt-5 "id="justify">
                  Justify The Rating
                </h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    The Review needs to justify the rating, regardless of how
                    high or low the score is.
                  </li>
                  <li className="py-2">
                    In an advanced review, you must write a detailed review that
                    covers the subcategories being rated (Style, Story, Grammar,
                    and Characters) and to justify the overall score.
                  </li>
                </ol>

                <h1 className="text-[#337AB7] text-2xl mt-5" id="stay">Stay On Topic</h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    Your review should address the story itself, and only the
                    story.
                  </li>
                  <li className="py-2">
                    Do not write about unrelated content, including comments
                    about the author's activities, other people, other reviews,
                    etc.
                  </li>
                  <li className="py-2">
                    Reviews and ratings may not be based solely on superficial
                    information such as cover, synopsis, tags, title, story’s
                    popularity, its position on the ranking lists, or similar
                    things that have little to do with actual story content. If
                    you wish to review this regardless, especially the genre and
                    tags, it cannot be the main focus. You may say how certain
                    elements of the genre were poorly done or how they take away
                    from the story, but that cannot be the central topic of a
                    review.
                  </li>
                  <li className="py-2">
                    Reviews comparing the story to another according to the
                    following rules will be removed: Accusing an author of
                    plagiarism in reviews is forbidden. Any story violating
                    Royal Road terms of use (such as plagiarism) should be
                    reported directly using the report system via the report
                    button on the violating fiction or chapter. If the story
                    plagiarizes your content, please check out the DMCA takedown
                    link{" "}
                    <a
                      href="https://www.royalroad.com/dmca"
                      className="text-blue-500"
                    >
                      https://www.royalroad.com/dmca
                    </a>
                    .
                  </li>
                  <li className="py-2">
                    Don’t discourage readers from reading a story by comparing
                    it to another similar story.
                  </li>
                </ol>

                <h1 className="text-[#337AB7] text-2xl mt-5" id="fair">
                  Be Fair And Respectful
                </h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    Directly insulting the author or the readers is strictly
                    forbidden. You may criticize the writing in constructive
                    ways if you have a genuine desire to help, but do not direct
                    your feedback at any author specifically, especially if it
                    is a personal attack on their character.
                  </li>
                  <li className="py-2">
                    Discouraging an author from writing is viewed as taboo on
                    Royal Road.
                  </li>
                  <li className="py-2">
                    Note that while the review could generalize the story as a
                    whole, it can’t intentionally depict a story as something
                    entirely different from what it is. Such as stating that a
                    story includes instances of horrific actions when it does
                    not. Examples include pedophilia, incest, necrophilia,
                    racism, etc.
                  </li>
                  <li className="py-2">
                    Do not instigate or incite any harmful acts in the review.
                  </li>
                </ol>

                <h1 className="text-[#337AB7] text-2xl mt-5 "id="language">
                  Use Appropriate Language
                </h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    Reviews can’t contain profanity, vulgarity, sexual content,
                    or descriptions of gore. This includes, but is not limited
                    to; vivid descriptions of sexual acts, torture, violence,
                    and other acts or situations that may be considered “gore.”
                  </li>
                  <li className="py-2">
                    Slander and discrimination is completely forbidden, and
                    violations are viable to get the user banned. This includes
                    but is not limited to attacks on ethnic, religious,
                    political, sexual orientation, gender, or racially
                    discriminatory reviews.
                  </li>
                </ol>

                <h1 className="text-[#337AB7] text-2xl mt-5" id="spoilers">Spoilers</h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    A review may contain spoilers under the appropriate spoiler
                    tag (from the toolbar).
                  </li>
                  <li className="py-2">
                    Spoiler content may not exceed a third of the overall word
                    count.
                  </li>
                  <li className="py-2">
                    Discussing spoilers can’t be the focus of a review.
                  </li>
                  <li className="py-2">
                    Spoilers can’t be the majority of the plotline summarized
                    into points, nor can they mention any major revelations in
                    the story. Examples: a character's death, success or failure
                    in achieving a main goal, among others.
                  </li>
                  <li className="py-2">
                    Quoted content can’t break any of the review rules.
                  </li>
                </ol>
                <h1 className="text-[#337AB7] text-2xl mt-5" id="general">General</h1>
                <ol className="mt-5 ml-8 list-decimal">
                  <li className="py-2">
                    Reviews must not contain meaningless characters and words
                    used with the purpose of inflating the character count and
                    review length.
                  </li>
                  <li className="py-2">Reviews must not contain any spam.</li>
                  <li className="py-2">
                    Reviews must be written in English or in the language the
                    fiction is written in.
                  </li>
                  <li className="py-2">
                    Offering to release chapters based on the scores of reviews
                    and ratings is considered ranking manipulation and is
                    prohibited.
                  </li>
                  <li className="py-2">
                    Rating and reviewing from multiple accounts is prohibited.
                    We have software to catch people who try to manipulate the
                    ratings by doing this.
                  </li>
                  <li className="py-2">
                    Members of the same household or friends may review the
                    story as long as they clearly state their relation to the
                    author.
                  </li>
                  <li className="py-2">
                    Repeated breaking of the rules will result in permanent
                    sanctions or banning of your account.
                  </li>
                  <li className="py-2">
                    Attempts to manipulate the ratings or the review system with
                    the help of a group will result in having all the reviews
                    removed. All participating users will be subjected to
                    scrutiny. Additional disciplinary actions are also a
                    possibility.
                  </li>
                </ol>
                <h1 className="text-[#337AB7] text-2xl mt-5 "id="swap">
                  Review Swap Rules
                </h1>
                <ul className="mt-5 ml-8 list-disc">
                  <li className="py-2">
                    Review swaps are allowed on Royal Road. In fact, you can
                    request them in our Reviews forum. However, rating and
                    review swaps promising high scores is prohibited.
                  </li>
                  <li className="py-2">
                    If you agree to a review swap, we expect you to actually
                    read the other person's fiction and to write a thoughtful
                    review with a rating that matches your opinion of the story.
                  </li>
                  <li className="py-2">
                    The review swap must be an advanced review.
                  </li>
                  <li className="py-2">
                    Both users must read at least 10,000 words (approximately 36
                    pages) of the other person's fiction before writing the
                    review, unless the story in question is a completed short
                    story.
                  </li>
                  <li className="py-2">
                    The review must justify the rating. Agreeing to give high
                    ratings beforehand is considered vote manipulation and is
                    against the rules.
                  </li>
                  <li className="py-2">
                    When participating in a review swap, the reviewer receives a
                    small indicator signifying this. The sign does not affect
                    the score; however, it provides additional details for the
                    reader. Any attempts to conceal the sign will be considered
                    manipulation.
                  </li>
                </ul>
                <h1 className="text-[#337AB7] text-2xl mt-5 "id="reporting">
                  Reporting Reviews
                </h1>
                <p className="mt-4">
                  If you see any reviews that violate the rules above, please
                  report them by clicking the{" "}
                  <span className="text-blue-500 underline">[Report]</span>{" "}
                  button at the bottom of the review you wish to report. Clearly
                  state the reason(s) for reporting the review on the page it
                  takes you to and click{" "}
                  <span className="text-blue-500 underline">[Confirm]</span>.
                  Our staff will review the report and decide what action needs
                  to be taken.
                </p>
                <h1 className="text-[#337AB7] text-2xl mt-5"id="fiction">
                  Reporting Fictions
                </h1>
                <p className="mt-4">
                  If you find that a fiction violates any of our rules, do not
                  leave a review stating as such. Report the fiction in question
                  by clicking the{" "}
                  <span className="text-blue-500 underline">[Report]</span>{" "}
                  button on the top right side of the story’s main page. Clearly
                  state the reason(s) for reporting on the page it takes you to
                  and click{" "}
                  <span className="text-blue-500 underline">[Confirm]</span>.
                  Our staff will review the report and decide what action needs
                  to be taken.
                </p>
              </div>
            </div>
            <div className="hidden md:inline md:w-[24%]  ">
              <div className="backdrop">
                <strong>In this article</strong>
                <div className="ml-5 text-blue-700">
                  <div>
                
                    <a 
                      href="#review"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reviewing Rules
                    </a ><br></br>
                    <a 
                      href="#justify"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Justify the Rating
                    </a ><br></br>
                    <a 
                      href="#stay"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Stay On Topic
                    </a ><br></br>
                    <a 
                      href="#fair"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Be Fair And Respectful
                    </a ><br></br>
                    <a 
                      href="#language"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Use Appropriate Language
                    </a ><br></br>
                    <a 
                      href="#spoilers"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Spoilers
                    </a ><br></br>
                    <a 
                      href="#general"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      General
                    </a ><br></br>
                    <a 
                      href="#swap"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Review Swap Rules
                    </a ><br></br>
                    <a 
                      href="#reporting"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reporting 
                      Reviews
                    </a ><br></br>
                    <a 
                      href="#fiction"
                      className="hover:underline hover:text-blue-900 transition-colors"
                    >
                      Reporting Fiction
                    </a ><br></br>
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

export default Rules;
