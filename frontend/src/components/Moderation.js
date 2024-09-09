import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Moderation = () => {
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
                <span>All about RU Novel</span>
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
                  <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/moderation-tools-for-users"
                      className="hover:underline hover:text-blue-900 transition-colors text-[#000000CC]"
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/moderation-tools-for-users"
                        className="hover:underline hover:text-blue-900 transition-colors text-[#000000CC]"
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
                        href="#explanation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Explanation
                      </a>
                      <br />
                      <a
                        href="#tools"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        What tools are available?
                      </a>
                      <br />
                      <a
                        href="#blocking-user"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Blocking another user
                      </a>
                      <br />
                      <a
                        href="#block"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Block Private Messages
                      </a>
                      <br />
                      <a
                        href="#hide"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Hide Comments
                      </a>
                      <br />
                      <a
                        href="#block-comments"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Block Comments
                      </a>
                      <br />
                      <a
                        href="#unblock"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Unblocking someone
                      </a>
                      <br />
                      <a
                        href="#edit"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Editing a block
                      </a>
                      <br />
                      <a
                        href="#general"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        General settings
                      </a>
                      <br />
                      <a
                        href="#anonymous"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Becoming anonymous from the ‘Reading this Chapter’ list
                      </a>
                      <br />
                      <a
                        href="#moderating"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Moderating your comment section
                      </a>
                      <br />
                      <a
                        href="#collaborators"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Collaborators
                      </a>
                      <br />
                      <a
                        href="#issues"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Issues not solvable with the normal tools?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Moderation Tools for Users</h1>
                  <p className="mt-5">
                    Users on RU Novel have a number of tools to moderate their
                    experience on the platform.
                  </p>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAmRVYXRE.png.png?time=1649928702"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="explanation">
                    Explanation
                  </h1>

                  <p className="py-4">
                    On RU Novel, we value user experience highly. When
                    thinking about the user experience on a web fiction
                    platform, you might think about just the discovery features
                    or just the reading interface itself, but what about the
                    interaction with other users? We always valued user
                    interaction highly as well and slowly released tools to help
                    curate your experience with other users. This applies to
                    both user-to-user interaction but also author-to-reader
                    interaction, especially in the comment section on a fiction.
                  </p>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="tools-available"
                  >
                    What tools are available?
                  </h1>

                  <p className="py-4">
                    There are two types of moderation tools, some can be used by
                    everyone, while others are limited to the authors for their
                    own comment section. The tools include things such as
                    blocking another user, disabling private messages, hiding
                    comments, hiding from the "reading this chapter list", which
                    are tools available to everyone, as well as more tools that
                    are specific for authors, such as comment moderation,
                    blocking, locking and deleting comments as well as adding
                    collaborators. We will start with the general measures that
                    can be taken by anyone and then move on to the author
                    exclusive options.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="blocking-user">
                    Blocking another user
                  </h1>

                  <p className="py-4">
                    If you no longer wish to interact with another user, but
                    they are not breaking the rules. If for any reason, you just
                    don’t want to see them on your screen or anywhere in the
                    comment section. Then you can block them. These
                    user-specific block functions can be found when clicking on
                    the username of any member on RU Novel.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADA6IKRRBE.png.png?time=1648266034"
                  ></img>

                  <p className="py-4">
                    On said member’s profile page, in the top left (encircled
                    with red in this screenshot), there is a block button. When
                    clicking on this button, you will see the following three
                    options presented.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAA2oaRRBE.png.png?time=1648266039"
                  ></img>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="block"
                  >
                    Block Private Messages
                  </h1>

                  <p className="py-4">
                    The first option, ‘Block Private Messages’, is a
                    user-specific block to private messages. Enabling this will
                    make it impossible for this user to send you any private
                    messages. The example below will illustrate it. Say someone
                    is sending you unsolicited private messages like:
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA44yRRBE.png.png?time=1648266044"
                  ></img>

                  <p className="py-4">
                    The sender will get the following notice and the private
                    message will not end up in your inbox.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAv5ORRBE.png.png?time=1648266051"
                  ></img>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="hide">
                    Hide Comments
                  </h1>
                  <p className="py-4">
                    The second option, ‘Hide Comments’, makes it so that you
                    will not see their comments anymore on any fiction comment
                    section, just the notice that blocked comments have been
                    hidden.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAW5mRRBE.png.png?time=1648266057"
                  ></img>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="block-comments"
                  >
                    Block Comments
                  </h1>
                  <p className="py-4">
                    The third and final option is to block someone from
                    commenting on your own fiction entirely. This option is only
                    effective for authors on their own fiction and prevents
                    blocked members from commenting on your fiction entirely.
                    The commenter that is blocked will not be able to comment
                    and instead see the following instead of the usual editor.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADA4qCRRBE.png.png?time=1648266065"
                  ></img>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="unblock"
                  >
                    UnBlock Comments
                  </h1>
                  <p className="py-4">
                    In case you want to unblock someone, this is possible from
                    the same location that someone was blocked from, the user
                    profile page. Next to the big red block button, there should
                    also be a blue unblock button that you can press to lift all
                    restrictions.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAp6qRRBE.png.png?time=1648266075"
                  ></img>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="edit">
                    Editing a block
                  </h1>
                  <p className="py-4">
                    It is also possible to edit the blocks that you applied to
                    another user. To do this, just click the red block button
                    again and check/uncheck what you want changed and hit save
                    again. The blocks will update accordingly.<br></br>
                    <br></br>
                    In order to see what users you currently have blocked, the
                    following page exists:
                    https://www.royalroad.com/my/blockedusers
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="general">
                    General settings
                  </h1>
                  <p className="py-4">
                    Where the previously described options are all
                    user-specific, the following option will apply globally, so
                    for all users that might interact with you or said feature.
                    These options can be found here. The relevant settings are
                    at the top under ‘general’.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAA2LCRRBE.png.png?time=1648266081"
                  ></img>

                  <p className="py-4">
                    Do not forget to hit save at the bottom of that page after
                    changing these settings.<br></br>
                    <br></br>
                    Blocking private messages <br></br>
                    <br></br>
                    The first option should be checked by default, this allows
                    anyone to send you a private message. Once unchecked you
                    will not be able to receive any private message from anyone
                    but the staff. Thomas Thomerus will be the test subject
                    again.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAATrqRRBE.png.png?time=1648266091"
                  ></img>

                  <p className="py-4">
                    At the top right, you currently see the PM button encased in
                    red, this is to improve visibility.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAtr6RRBE.png.png?time=1648266095"
                  ></img>

                  <p className="py-4">
                    After unchecking the option to allow private messages this
                    option is no longer available.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="anonymous">
                    Becoming anonymous from the ‘Reading this Chapter’ list
                  </h1>

                  <p className="py-4">
                    Perhaps not the most obvious thing to want to hide from, but
                    the option is available. This is possible and will list you
                    as an invisible member instead of a named user. The reading
                    this chapter list can be seen by the author of any given
                    fiction and is updated live.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAADciRRBE.png.png?time=1648266105"
                  ></img>
                  <p className="py-2">To:</p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAssuRRBE.png.png?time=1648266108"
                  ></img>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="moderating">
                    Moderating your comment section.
                  </h1>

                  <p className="py-4">
                    If you are an author looking to moderate your comment
                    section you can read about it here.
                  </p>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="collaborators"
                  >
                    Collaborators
                  </h1>
                  <p className="py-4">
                    Author Premium users are able to add collaborators to their
                    fictions, with both crediting and permission control. This
                    option can be found in the author dashboard.
                  </p>

                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABASzaHRBE.png.png?time=1648263334"
                  ></img>

                  <p className="py-4">
                    You can give access to your editor, moderators, or co-author
                    to your fiction to help edit or manage it, or you can add
                    them just to include them in the credits. Please keep in
                    mind that currently you can only add up to 10 collaborators.
                  </p>

                  <p className="py-4">
                    You have granular control over what each collaborator can
                    access. Additionally, you also have the option to have the
                    collaborators’ names show up on the fiction page under your
                    own with their designated role - even including users who do
                    not have accounts on the website, such as an artist or an
                    agent.
                  </p>

                  <p className="py-4">
                    To avoid abuse, collaborator users have to accept your
                    invitation before they gain access or can be added to the
                    credits. We have added a page that lets you see all pending
                    invitations for you into the author dashboard; or you can
                    simply copy the invitation link from the “Collaborators”
                    page and send it directly to the user in question. The
                    invitation is tied to their account, so other users cannot
                    accept it even if they have the link.
                  </p>

                  <p className="py-4">
                    Please do note that we do not send any notification to
                    invited users to avoid spamming them, so you will need to
                    notify them yourself. Additionally, as we currently do not
                    have a real-time collaboration feature in the editor, please
                    avoid editing the same document at the same time, as it is
                    entirely possible to overwrite your collaborator's work.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="issues">
                    Issues not solvable with the normal tools?
                  </h1>
                  <p className="py-4">
                    While the provided tools should solve most common issues and
                    annoyances on site, it is not an end-all solution. For
                    comments or other content that breaks any of the site Rules,
                    Content Guidelines, or Reviewing rules please use the report
                    button so a member of staff can take a look and deal with it
                    as needed. If you are experiencing a more serious case of
                    harassment that cannot be solved with the tools listed
                    above, please open a ticket so we can take a closer look.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#explanation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Explanation
                      </a>
                      <br />
                      <a
                        href="#tools"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        What tools are available?
                      </a>
                      <br />
                      <a
                        href="#blocking-user"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Blocking another user
                      </a>
                      <br />
                      <a
                        href="#block"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Block Private Messages
                      </a>
                      <br />
                      <a
                        href="#hide"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Hide Comments
                      </a>
                      <br />
                      <a
                        href="#block-comments"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Block Comments
                      </a>
                      <br />
                      <a
                        href="#unblock"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Unblocking someone
                      </a>
                      <br />
                      <a
                        href="#edit"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Editing a block
                      </a>
                      <br />
                      <a
                        href="#general"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        General settings
                      </a>
                      <br />
                      <a
                        href="#anonymous"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Becoming anonymous from the ‘Reading this Chapter’ list
                      </a>
                      <br />
                      <a
                        href="#moderating"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Moderating your comment section
                      </a>
                      <br />
                      <a
                        href="#collaborators"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Collaborators
                      </a>
                      <br />
                      <a
                        href="#issues"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Issues not solvable with the normal tools?
                      </a>
                      <br />
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

export default Moderation;
