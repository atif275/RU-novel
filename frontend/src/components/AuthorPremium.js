import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthPre = () => {
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
                      className="hover:underline hover:text-blue-900 transition-colors  "
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
                  <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/author-premium"
                      className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
                        className="hover:underline hover:text-blue-900  transition-colors"
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/author-premium"
                        className="hover:underline hover:text-blue-900 text-[#000000CC]  transition-colors"
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
                          href="#analytics"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Detailed Analytics
                        </a>
                        <br></br>
                        <a
                          href="#distribution"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Rating Distribution
                        </a>
                        <br></br>
                        <a
                          href="#timeline"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Rating Timeline
                        </a>
                        <br></br>
                        <a
                          href="#page-views"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Fiction Pageviews
                        </a>
                        <br></br>
                        <a
                          href="#activity"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Reader Activity
                        </a>
                        <br></br>
                        <a
                          href="#referrers"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Referrers
                        </a>
                        <br></br>
                        <a
                          href="#using"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Using Referrers
                        </a>
                        <br></br>
                        <a
                          href="#user-retention"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          User Retention
                        </a>
                        <br></br>
                        <a
                          href="#chapter"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Pageviews per Chapter
                        </a>
                        <br></br>
                        <a
                          href="#ratings-over-time"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Ratings over time
                        </a>
                        <br></br>
                        <a
                          href="#ratings-per-chapter"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Ratings per Chapter
                        </a>
                        <br></br>
                        <a
                          href="#follower-history"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Follower History
                        </a>
                        <br></br>
                        <a
                          href="#favourites-history"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Favourites History
                        </a>
                        <br></br>
                        <a
                          href="#review-push-notifications"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Review Push Notifications
                        </a>
                        <br></br>
                        <a
                          href="#customizable-fiction-header"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Customizable Fiction Header
                        </a>
                        <br></br>
                        <a
                          href="#custom-line-breaks"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Custom Line Breaks
                        </a>
                        <br></br>
                        <a
                          href="#epub-export"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Epub Export
                        </a>
                        <br></br>
                        <a
                          href="#find-replace"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Find & Replace
                        </a>
                        <br></br>
                        <a
                          href="#automatic-draft-saving"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Automatic Draft Saving
                        </a>
                        <br></br>
                        <a
                          href="#chapter-import"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Chapter Import
                        </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Author Premium</h1>

                  <h1 className="text-3xl text-[#337AB7] mt-5 " id="features">
                    Author Premium Features
                  </h1>
                  <p className="py-4">
                    Author premium has all the benefits from the Reader premium,
                    but also features based on the needs and conveniences of
                    authors.
                  </p>
                  <h1 className="text-3xl text-[#337AB7] mt-5 " id="analytics">
                    Detailed Analytics
                  </h1>
                  <p className="py-4">
                    The biggest selling point of author premium would be the
                    analytics one gains access to. The data is presented via
                    graphs and tables on the author dashboard. The explanation
                    and where to find the graph presented will be separated for
                    every available graph.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="graphs">
                    Where to find these graphs
                  </h1>
                  <p className="py-4">
                    All graphs can be found under the analytics tab in the
                    author dashboard.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAVEp14hA.png.png?time=1641681967"
                  ></img>

                  <p className="py-4">
                    The highest-ranking shown is the highest-ranking any of your
                    fictions have. Total Chapters, Total Words, Reviews
                    Received, and Unique Followers are across all of your
                    fictions as well.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="distribution"
                  >
                    Rating distribution
                  </h1>
                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAlVJ14hA.png.png?time=1641681976"
                  ></img>

                  <p className="py-4">
                    On this graph, the distribution of ratings is shown for your
                    fiction. This graph can be found in the sidebar on the
                    author dashboard under Analytics -- Stats.
                  </p>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAlVJ14hA.png.png?time=1641681976"
                  ></img>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="timeline">
                    Rating timeline
                  </h1>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAG-p14hA.png.png?time=1641682131"
                  ></img>
                  <p className="py-4">
                    The rating timeline is a tool that shows both the average
                    rating over time as well as when reviews have been received.
                    The Horizontal blue line is the average rating, the vertical
                    green lines represent a chapter release. Ratings are not
                    individually shown in this graph.<br></br>
                    <br></br>
                    The scales of both axes can be changed according to your
                    liking. As shown above, it is set to a relatively narrow
                    x-axis as a demonstration. This graph can be found in the
                    sidebar of the author dashboard under Analytics -- Stats.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="page-views">
                    Fiction Pageviews
                  </h1>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAcR524hA.png.png?time=1641682184"
                  ></img>

                  <p className="py-2">
                    The pageviews graph shows the number of views your fiction
                    gets every day with the release of new chapters marked
                    separately in vertical green bars to easily see the impact
                    of a chapter release on the total viewers a day. This graph
                    can be found in the sidebar of the author dashboard under
                    Analytics -- General.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="activity">
                    Reader Activity
                  </h1>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAzS924hA.png.png?time=1641682202"
                  ></img>

                  <p className="py-4">
                    The reader activity graph shows the amount of views and
                    comments per chapter. On the left is the scale for views per
                    chapter, on the right is the scale for comments per chapter.
                    This graph can be found in the sidebar of the author
                    dashboard under Analytics General.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="refrrers">
                    Referrers
                  </h1>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAyEN24hA.png.png?time=1641682223"
                  ></img>

                  <p className="py-4">
                    The referrer shows where your traffic is coming from, both
                    off-site and on-site. This can be helpful in determining if
                    certain promotions are performing as expected, or just
                    seeing what external platform has the most success in
                    getting new readers. This information can be found in the
                    sidebar of the author dashboard under Analytics -- General.
                    Note that author pageviews are excluded from referrer
                    pageview statistics.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="using">
                    Using Referrers
                  </h1>

                  <p className="py-4">
                    Referrer statistics are automatically tracked from on-site
                    links. These can be viewed from the second tab in the
                    referrer list where it says RU Novel.<br></br>
                    <br></br>
                    Using referrers for links on external sites pointing towards
                    RU Novel requires some extra work. For this functionality,
                    Google Analytics Referrers are used. This works by adding a
                    couple flags to the end of an URL pointing at your fiction
                    page or a chapter specifically.<br></br>
                    <br></br>
                    Not all tags are supported, the referrer system tracks the
                    following tags:<br></br>
                    <br></br>· utm_source= <br></br>
                    <br></br>· utm_medium= <br></br>
                    <br></br>· utm_campaign=<br></br>
                    <br></br>
                    These tags get added to the end of a link pointing to your
                    fiction, starting with a question mark (?) and separated by
                    ampersand (&) as follows: <br></br>
                    <br></br>
                    https://www.royalroad.com/fiction/24/admin-test?utm_source=december-campaign-twitter&utm_medium=twitter&utm_campaign=december-campaign
                    .
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="user-retention"
                  >
                    User Retention
                  </h1>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABA73R24hA.png.pngtime=1641682273"
                  ></img>

                  <p className="py-4">
                    This graph shows what number of users read up to what
                    chapter split by all users and users with an account. On
                    this page, there is also an accompanying table with the same
                    data, just a different presentation. This graph and list can
                    be found in the sidebar of the author dashboard under
                    Analytics -- User Retention.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA1pR24hA.png.png?time=1641682306"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="chapter">
                    Pageviews per chapter
                  </h1>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAyZx24hA.png.png?time=1641682314"
                  ></img>
                  <p className="py-4">
                    The pageview graph shows the pageviews per chapter per date.
                    The chapters currently shown are individually selectable and
                    each have their own time range as shown in the screenshot.
                    Deleted chapters can also be selected to see the historical
                    statistics for them. This graph can be found in the sidebar
                    of the author dashboard under Analytics -- Chapter
                    Pageviews.
                  </p>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="ratings-over-time"
                  >
                    Ratings over time
                  </h1>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAXTR64hA.png.png?time=1641683256"
                  ></img>
                  <p className="py-4">
                    The ratings over time feature shows when what rating has
                    been received with the option to show if a rating correlates
                    to a chapter release, indicated by the vertical green line.
                    This graph can be found in the sidebar of the author
                    dashboard under Analytics -- Ratings.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="ratings-per-chapter"
                  >
                    Ratings per Chapter
                  </h1>
                  <p className="py-4">
                    This stacked bar graph shows the number of ratings sorted by
                    stars received every chapter. Due to the nature of this
                    graph, the ratings per chapter will increase with an
                    increase in popularity, but long pauses between releases
                    will also increase the ratings of a chapter. Take this into
                    account when using the graph. This graph can be found in the
                    sidebar of the author dashboard under Analytics -- Ratings.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADArEB64hA.png.png?time=1641683268"
                    alt="Ratings per Chapter Graph"
                  />

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="follower-history"
                  >
                    Follower History
                  </h1>
                  <p className="py-4">
                    This graph shows the progression of your total follower
                    count as well as the impact of chapter releases on the
                    overall count. The chapter releases are marked as vertical
                    green lines. This graph can be found in the sidebar of the
                    author dashboard under Analytics -- Followers.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADA-E164hA.png.png?time=1641683282"
                    alt="Follower History Graph"
                  />

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="favourites-history"
                  >
                    Favourites History
                  </h1>
                  <p className="py-4">
                    This graph shows the progression of your total favorite
                    count as well as the impact of chapter releases on the
                    overall count. The chapter releases are marked as vertical
                    green lines. This graph can be found in the sidebar of the
                    author dashboard under Analytics -- Followers.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAZ1p64hA.png.png?time=1641683294"
                    alt="Favourites History Graph"
                  />

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="review-push-notifications"
                  >
                    Review Push Notifications
                  </h1>
                  <p className="py-4">
                    With author premium, you are able to receive push
                    notifications for new reviews on your fictions. This can be
                    enabled per fiction in the notification settings. This can
                    be found under settings --Notifications -- New Reviews or by
                    clicking the link.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADA3W564hA.png.png?time=1641683315"
                    alt="Review Push Notifications"
                  />

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="customizable-fiction-header"
                  >
                    Customizable Fiction Header
                  </h1>
                  <p className="py-4">
                    Just like with the profile header, it is possible to change
                    the fiction page header.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAfYV64hA.png.png?time=1641683339"
                    alt="Customizable Fiction Header"
                  />

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="custom-line-breaks"
                  >
                    Custom Line Breaks
                  </h1>
                  <p className="py-4">
                    It is possible to edit the line breaks used in the fiction.
                    The example shown is a simple gradient, but more elaborate
                    options are possible using the custom image upload.
                  </p>
                  <p className="py-4">
                    This option is found in the author dashboard under Settings
                    - Customize. There are a couple of preset options available
                    but you also get the freedom of choosing your own, see the
                    example below.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAhph64hA.png.png?time=1641683358"
                    alt="Custom Line Breaks Example"
                  />
                  <p className="py-4">
                    When uploading your own custom line break, the dimension
                    limitations are 1200x50 but the aspect ratio is not fixed,
                    so any image can be used so long as it fits within those
                    dimensions.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="epub-export">
                    Epub Export
                  </h1>
                  <p className="py-4">
                    Another feature of author premium is the ability to export
                    your fiction as an epub. This can be done by selecting
                    chapters or by selecting a volume. Selecting a volume will
                    automatically select the relevant chapters for that volume.
                    Note that drafts and deleted chapters are also able to be
                    exported this way. The fiction title, author, and chapter
                    titles are all editable before exporting but default to the
                    on-site names and titles.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACApbB64hA.png.png?time=1641683383"
                    alt="Epub Export"
                  />
                  <p className="py-4">
                    This feature is found in the author dashboard under
                    ‘advanced’.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="find-and-replace"
                  >
                    Find & Replace
                  </h1>
                  <p className="py-4">
                    Another handy feature would be fiction-wide find and
                    replace. This can also be found under Advanced in the
                    fiction dashboard. This feature first shows a preview before
                    finding and replacing the term you are searching for.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAD7564hA.png.png?time=1641683397"
                    alt="Find & Replace"
                  />
                  <p className="py-4">
                    This feature is found on the author dashboard under
                    Advanced.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="automatic-draft-saving"
                  >
                    Automatic Draft Saving
                  </h1>
                  <p className="py-4">
                    When using the fiction editor on RU Novel when Author
                    premium is active, it will automatically save the text
                    entered every minute so no work gets lost by accident.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="chapter-import"
                  >
                    Chapter Import
                  </h1>
                  <p className="py-4">
                    Many authors write their fiction using external text
                    editors. In order to streamline the process of importing
                    multiple chapters to RU Novel at once, the chapter import
                    feature is created. This feature is found in the Author
                    Dashboard under Advanced. For the following screenshots, a
                    single .docx file will be used, the process differs slightly
                    for every option but it is similar in nature.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAnNN64hA.png.png?time=1641683419"
                    alt="Chapter Import Process"
                  />
                  <p className="py-4">
                    Note: The headings get used as chapter titles. This is
                    important if your chapters are all in a single document. If
                    your chapters are in separate documents, the .zip option is
                    better suited.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABACfd64hA.png.png?time=1641683455"
                    alt="Chapter Titles from Headings"
                  />
                  <p className="py-4">
                    It is possible to publish directly from this page, but for
                    this demonstration, it will be imported as a draft. When
                    importing multiple chapters, it might be the case that you
                    want to stagger releases. This is an option provided during
                    import.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAHAB74hA.png.png?time=1641683464"
                    alt="Staggered Releases"
                  />
                  <p className="py-4">
                    The final imported chapter as a draft, ready for publishing.
                  </p>
                  <p className="py-4">
                    This feature can be found in the author dashboard under
                    Advanced -- Import Chapters.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAjwx74hA.png.png?time=1641683477"
                    alt="Staggered Releases"
                  />
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <div>
                        <a
                          href="#analytics"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Detailed Analytics
                        </a>
                        <br></br>
                        <a
                          href="#distribution"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Rating Distribution
                        </a>
                        <br></br>
                        <a
                          href="#timeline"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Rating Timeline
                        </a>
                        <br></br>
                        <a
                          href="#page-views"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Fiction Pageviews
                        </a>
                        <br></br>
                        <a
                          href="#activity"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Reader Activity
                        </a>
                        <br></br>
                        <a
                          href="#referrers"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Referrers
                        </a>
                        <br></br>
                        <a
                          href="#using"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Using Referrers
                        </a>
                        <br></br>
                        <a
                          href="#user-retention"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          User Retention
                        </a>
                        <br></br>
                        <a
                          href="#chapter"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Pageviews per Chapter
                        </a>
                        <br></br>
                        <a
                          href="#ratings-over-time"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Ratings over time
                        </a>
                        <br></br>
                        <a
                          href="#ratings-per-chapter"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Ratings per Chapter
                        </a>
                        <br></br>
                        <a
                          href="#follower-history"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Follower History
                        </a>
                        <br></br>
                        <a
                          href="#favourites-history"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Favourites History
                        </a>
                        <br></br>
                        <a
                          href="#review-push-notifications"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Review Push Notifications
                        </a>
                        <br></br>
                        <a
                          href="#customizable-fiction-header"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Customizable Fiction Header
                        </a>
                        <br></br>
                        <a
                          href="#custom-line-breaks"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Custom Line Breaks
                        </a>
                        <br></br>
                        <a
                          href="#epub-export"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Epub Export
                        </a>
                        <br></br>
                        <a
                          href="#find-replace"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Find & Replace
                        </a>
                        <br></br>
                        <a
                          href="#automatic-draft-saving"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Automatic Draft Saving
                        </a>
                        <br></br>
                        <a
                          href="#chapter-import"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Chapter Import
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
    </div>
  );
};

export default AuthPre;
