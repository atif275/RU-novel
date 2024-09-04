import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SubmitNovel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const slug = generateSlug(searchTerm); // Generate slug when search is submitted
    console.log("Search Term:", searchTerm);
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
                <ul className="page-breadcrumb breadcrumb mt-2"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black rounded-md p-6">
        <div className="portlet light">
          {isSidebarVisible && (
            <div className=" w-[75%] sm-[50%] p-4 bg-[#FAF9F6] mb-2 ">
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
                      className="hover:underline hover:text-blue-900 transition-colors  "
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
                      to="/support/knowledgebase/73"
                      className="hover:underline hover:text-blue-90 text-[#000000CC] transition-colors"
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
                      className="hover:underline hover:text-blue-900 transition-colors "
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
                  <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                  
                    <Link
                      to="/support/knowledgebase/submitting-and-verifying-novels"
                      className="hover:underline hover:text-blue-900 transition-colors text-[#000000CC]"
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
          )}

          <div className="row">
            <div className="block md:hidden col-xs-12 mb-5">
              <button
                className="btn btn-default toc-toggle"
                onClick={toggleSidebar}
              >
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
                        className="hover:underline hover:text-blue-900 transition-colors "
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/submitting-and-verifying-novels"
                        className="hover:underline text-[#000000CC] hover:text-blue-900 transition-colors"
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
                        href="#approval"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Approval Checks
                      </a>
                      <br />
                      <a
                        href="#verification"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        How to provide verification:
                      </a>
                      <br />
                      <a
                        href="#approved"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Approved
                      </a>
                      <br />
                      <a
                        href="#rejected"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Rejected
                      </a>
                      <br />
                      <a
                        href="#extra"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Possible Extra Information Required
                      </a>
                      <br />
                      <a
                        href="#create"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Creating a Fiction
                      </a>
                      <br />
                      <a
                        href="#cover"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Cover
                      </a>
                      <br />
                      <a
                        href="#title"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Title
                      </a>
                      <br />
                      <a
                        href="#synopsis"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Synopsis
                      </a>
                      <br />
                      <a
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Genres and Tags
                      </a>
                      <br />
                      <a
                        href="#warning"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Content Warnings
                      </a>
                      <br />
                      <a
                        href="#fanfiction"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fanfiction
                      </a> 
                    
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Submitting and verifying novels</h1>

                  <ol className="mt-5 ml-8 list-decimal">
                    <li className="py-2">
                      Register for an account on Royal Road if you have not
                      already. This can be easily done from our Welcome page or
                      by clicking the “Login" button in the top right corner and
                      selecting "Create an account" at the bottom of the login
                      form.
                    </li>
                    <li className="py-2">
                      Once you log in, click Write on the navigation bar, which
                      will take you to the Author Dashboard.
                    </li>
                    <li className="py-2">
                      Click [Add New] or jump to New Fiction Submission.
                    </li>
                    <li className="py-2">
                      <strong>Create a Fiction:</strong>
                      Fill in the Title and Description. Select the genres and
                      additional tags. Fill in your first chapter's title and
                      the content of your first chapter. Expanded detail on this
                      can be read in the next section. Please note that for the
                      submission process, the author tools are limited. You will
                      find more tools after your novel has been verified.
                    </li>
                    <li className="py-2">
                      Upload a cover image that is 400x600 pixels or larger
                      (this is optional).
                    </li>
                    <li className="py-2">Click Submit.</li>
                    <li className="py-2">
                      <strong>Verification Process:</strong>
                      All new submissions are manually checked for appropriate
                      tagging and plagiarism, so expect it to take between 12-24
                      hours for a submission to be approved. Please be patient.
                      Make sure to follow our rules to not get rejected after
                      waiting. For more details on this, continue reading the
                      following section.
                    </li>
                    <li className="py-2">
                      Once your fiction has been approved, you can find it by
                      clicking [Write] on the navigation bar.
                    </li>
                    <li className="py-2">
                      Then click your fiction Cover to get to the [Fiction
                      Dashboard], [page], and [Add Chapter] button.
                    </li>
                  </ol>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="approval">
                    Fiction Approval Checks
                  </h1>
                  <p className="mt-5">
                    Once you submit your novel, you must wait for it to be
                    approved. Around 10% of the submitted novels get rejected on
                    average. Read the following to avoid getting your novel
                    rejected.
                    <br></br>
                    <br></br>
                    Before getting approved on Royal Road, there is a manual
                    check by the staff to make sure the rules are followed. Here
                    the fiction is checked for Plagiarism, Links in the
                    Synopsis, Fanfiction tagging, Sexual content, Political or
                    religious content, and disturbing content. Generally,
                    fictions are processed within 24 hours if no issues are
                    found. If there are issues found, you will be notified and
                    we will try to help solve the issue if possible.
                    <br></br>
                    <br></br>
                    You can read the rules{" "}
                    <Link
                      className="text-blue-900"
                      to="/support/knowledgebase/content-guidelines"
                    >
                      here
                    </Link>
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="verification"
                  >
                    How to provide verification:
                  </h1>
                  <p className="py-4">
                    We check fictions for plagiarism first. If we notice that it
                    is not an original piece of work, it will be rejected with a
                    message that includes steps on how to resolve the issue if
                    you are the original author. Once a fiction is flagged for
                    plagiarism, we do not accept it on the platform before a
                    proof is provided. If a fiction does pass our plagiarism
                    check but is later proven to be plagiarized, it will be
                    removed and action will be taken against the user.
                  </p>
                  <p className="py-4">
                    Proof can be provided in the form of a support ticket.
                  </p>
                  <p className="py-4">
                    To prove your ownership, you can edit the description on the
                    other sites/platforms with a message to the Royal Road
                    staff. It can be a link to your profile page where your
                    fiction will appear once it is approved. Or a message like:
                    "I will be posting this story on RoyalRoad.com," or anything
                    else under the same concept. It does not have to be a link.
                    You can delete the note once we complete the verification
                    process.
                  </p>
                  <p className="py-4">
                    Alternatively, if your email address is public on the other
                    site(s), you can link where it is and we will confirm if it
                    is the same as the email address you've used on Royal Road.
                  </p>
                  <p className="py-4">
                    Once you add the verification note, reply to a support
                    ticket and post a link/URL to where this verification
                    occurs. The staff will then confirm the content.
                  </p>
                  <p className="py-4">
                    Once your fiction is approved, you can delete the proof of
                    ownership.
                  </p>
                  <p className="py-4">
                    Note that we do not accept screenshots or image-based
                    proofs. If you are not the author, please don't resubmit the
                    story out of respect to the person who wrote it.
                  </p>
                  <p className="py-4">
                    <strong>Fanfiction</strong>
                  </p>
                  <p className="py-4">
                    If a submitted fiction is judged to be a fanfiction we check
                    if the correct tag is applied. If the fanfiction tag is not
                    applied, it will be rejected. In the case where it is a
                    possible edge case and we are uncertain, you will be
                    contacted by us for more information.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="approved">
                    Fiction Approved
                  </h1>

                  <p className="py-4">
                    If the rules and guidelines are followed you should go
                    through submissions without problems and be published on the
                    site in, at most, 48 hours after submission. You will get a
                    notification about your fiction being approved, and after
                    that, you can start uploading more chapters.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="rejected">
                    Fiction Rejected
                  </h1>

                  <p className="py-4">
                    If your fiction is rejected, you will get a message attached
                    with the rejection about the problems found during the
                    review. Once these are fixed, you can resubmit your work and
                    it will get checked again. If no problems are found, it will
                    be approved and you can start uploading more chapters.
                  </p>
                

                  <ol className="mt-5 ml-8 list-decimal">
                    <li className="py-2">
                      Please do not include links for donations, Patreon
                      accounts, or shortened links to other sites such as
                      Discord servers in your Description.
                    </li>
                    <li className="py-2">
                      If you do not select fanfiction for stories based on
                      others' work or do not choose the Content Warnings
                      appropriate for your story, the submission will be
                      rejected.
                    </li>
                  </ol>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="extra">
                    Possible Extra Information Required
                  </h1>
                  <p className="py-4">
                    We sometimes need more information before rejecting or
                    approving a fiction. In this case, a ticket will be opened
                    and we will ask what we need to know. After asking these
                    questions, we will decide on what future action might be
                    needed.Royal Road reserves the right to reject anything and
                    everything regardless of the rules stated here, as we look
                    at each story as individually. However, you are more likely
                    to have your fiction approved if you followed all of the
                    listed rules<br></br>
                    <br></br>
                    The rest of the page discusses how to create a fiction in
                    full detail:
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="create">
                    Creating a Fiction
                  </h1>
                  <p className="py-4">
                    When creating a fiction for the first time, the available
                    author tools are limited and there are a few steps to follow
                    before your story becomes available for readers to read and
                    for you to expand on.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="cover">
                    Cover
                  </h1>
                  <p className="py-4">
                    On Royal Road, we allow covers up to a size of 400x600
                    pixels. If you do not have a cover in this exact resolution
                    or aspect ratio, do not worry. There is a cropping tool
                    available after uploading an image, this will make sure a
                    cover will have the correct aspect ratio for a fiction
                    cover.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAkd1gRBE.png.png?time=1648253282"
                  ></img>
                  <p className="py-4">
                    Be sure to follow the cover art copyright rules. In short:
                    make sure you have permission from the artist to use the
                    artwork for this purpose if using a cover not created by you
                    yourself.
                  </p>
                  <p className="py-4">
                    Cover arts are also subject to our mature content rules.
                    Nudity in an erotic form is not allowed in covers together
                    with other explicit scenes. Do not submit cover art that
                    provides a real-world social, religious, or political
                    commentary.
                  </p>
                  <p className="py-4">
                    You are not required to upload cover art. If no cover is
                    uploaded when creating a fiction, the default fiction cover
                    will be used.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="title">
                    Title
                  </h1>
                  <p className="py-4">
                    The Title of your fiction can be whatever you want as long
                    as it does not insult anyone nor includes swear or curse
                    words or otherwise illegal content. But, you must avoid
                    using unique characters that makes it difficult to search
                    for your novel.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="synposis">
                    Synposis
                  </h1>
                  <p className="py-4">
                    The synopsis will serve as a small introduction to the
                    fiction, give some information, and make a potential reader
                    want to read your fiction. We require this part to be at
                    least 50 characters long, and it cannot be added later. We
                    believe that any fiction submitted on the platform should at
                    least have a proper synopsis.<br></br>
                    <br></br>
                    The synopsis may not include swearing, political remarks,
                    sexual content, or illegal content.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="genres">
                    Genres and Tags
                  </h1>
                  <p className="py-4">
                    Tags on Royal Road are there to show potential readers what
                    your fiction contains, or what it does not contain. It helps
                    with searchability and classification for recommendations as
                    well. While you are free to tag your fiction the way you
                    want, we do recommend and expect it to be mostly accurate.{" "}
                    <br></br>
                    <br></br>A fiction will need at least 1 genre in order to be
                    submitted but up to 4 can be selected. The genres will be
                    shown before the more specific tags in listings, rankings,
                    and on the fiction page itself. These give a very general
                    idea of what a reader can expect to find in a fiction. To
                    read the description of every genre and tag, you can check
                    this{" "}
                    <Link
                      to="support/knowledgebase/genres-and-tags"
                      className="text-blue-700"
                    >
                      post{" "}
                    </Link>
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAE5phRBE.png.png?time=1648253475"
                  ></img>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="warning">
                    Content Warning
                  </h1>

                  <p className="py-2">
                    You are required to include a content warning and identify
                    whether Your Content contains Profanity, Sexual Content,
                    Disturbing Content, or Graphic Violence.
                  </p>
                  <p className="py-4">
                    You can check this page for where to tag your story.
                  </p>
                  <p className="py-4">Definitions</p>
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

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="fanfiction">
                    Fanfiction
                  </h1>
                  <p className="py-4">
                    The last option is the Fanfiction tag. If your story uses
                    the world, system, or characters of someone else, it will
                    need to be tagged as fanfiction.<br></br>
                    <br></br>
                    Certain restrictions apply to fanfictions, such as their
                    inability to buy internal advertisement or adding donation
                    requests. The only exception is when you receive the
                    original author’s permission.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#approval"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Approval Checks
                      </a>
                      <br />
                      <a
                        href="#verification"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        How to provide verification:
                      </a>
                      <br />
                      <a
                        href="#approved"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Approved
                      </a>
                      <br />
                      <a
                        href="#rejected"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fiction Rejected
                      </a>
                      <br />
                      <a
                        href="#extra"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Possible Extra Information Required
                      </a>
                      <br />
                      <a
                        href="#create"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Creating a Fiction
                      </a>
                      <br />
                      <a
                        href="#cover"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Cover
                      </a>
                      <br />
                      <a
                        href="#title"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Title
                      </a>
                      <br />
                      <a
                        href="#synopsis"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Synopsis
                      </a>
                      <br />
                      <a
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Genres and Tags
                      </a>
                      <br />
                      <a
                        href="#warning"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Content Warnings
                      </a>
                      <br />
                      <a
                        href="#fanfiction"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Fanfiction
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

export default SubmitNovel;
