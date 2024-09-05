import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Chapters = () => {
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
                  <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/chapters text-[#000000CC]"
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
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Author Dashboard
                      </Link>
                    </div>
                    <div>
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/chapters"
                        className="hover:underline hover:text-blue-900 transition-colors text-[#000000CC]"
                      >
                        Chapters
                      </Link>
                    </div>
                    <div>
                    
                      <Link
                        to="/support/knowledgebase/submitting-and-verifying-novels "
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
                        href="#editor"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        The chapter editor
                      </a>
                      <br />
                      <a
                        href="#tab"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        How to use tables
                      </a>
                      <br />
                      <a
                        href="#polls"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Polls
                      </a>
                      <br />
                      <a
                        href="#release"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Releasing a New Chapter
                      </a>
                      <br />
                      <a
                        href="#edit"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Editing a Chapter
                      </a>
                      <br />
                      <a
                        href="#delete"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Deleting a Chapter
                      </a>
                      <br />
                      <a
                        href="#drafts"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Drafts
                      </a><br></br>
                      <a
                        href="#upload"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Upload Recommendations
                      </a>

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Chapters</h1>
                  <p className="mt-5">
                    In order to publish on Royal Road, you need to go through
                    our submission process. Only once the fiction is approved
                    can you see it on your author dashboard.
                  </p>
                  <p className="mt-5">
                    Then, you can start adding more chapters to your story. In
                    this section, we explain the features available to do so.
                    From adding a new chapter, to viewing all your chapters and
                    editing them, viewing and editing drafts, and managing your
                    book volumes.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAedtLRBE.png.png?time=1648247775"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="editor">
                    The chapter editor
                  </h1>

                  <p className="py-4">
                    The chapter editor is the editor presented and used during
                    all on-site operations on new chapters, existing chapters,
                    and drafts.
                  </p>

                  <img
                    className="py-2 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAtOFLRBE.png.png?time=1648247781"
                  ></img>

                  <p className="py-2">
                    The first fields presented are the Title, Author Notes, and
                    the Chapter Content. After this there are some other,
                    specific features that you may or may not want to enable
                    based on the type of chapter or personal preference.
                  </p>
                  <img
                    className="py-2 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACARudLRBE.png.png?time=1648247787"
                  ></img>
                  <p className="py-4">
                    The first option is the scheduled release. If you want your
                    chapter to be published at a certain date and time instead
                    of the moment you press publish, you can use the scheduled
                    release to accomplish this. This option is not available
                    when your story has not been approved yet.
                  </p>
                  <p className="py-4">
                    For people writing in external editors that cause formatting
                    problems upon copy and pasting content, we provide the clean
                    paste option. This option tries to solve the issue that some
                    editors only use line breaks instead of paragraphs for
                    spacing. If you experience problems related to paragraph
                    spacing, please use this option when copying and pasting
                    from an external editor.
                  </p>
                  <p className="py-4">
                    You also have the ability to do a silent release for a
                    chapter. This means your followers will not get an extra
                    notification about the chapter when it releases. The chapter
                    can still be found in the latest updates for your followers.
                  </p>
                  <p className="py-4">
                    The Lock Comments option is used to lock the comment section
                    of the chapter. This option is not permanent and can be
                    changed when editing a chapter in the future.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="tab">
                    How to use tables
                  </h1>

                  <p className="py-4">
                    For the casual use of tables it is recommended to use the
                    visual table editor. It is designed to be simple to use
                    while still providing all the options one might require.
                    While there is a direct HTML code editor available, this is
                    only advised to people that already know what they are doing
                    and might be more comfortable editing the HTML directly.
                  </p>
                  <p className="py-4">
                    This will be a guide on how to use the functions in the
                    visual table editor. It will start with the basics of the
                    visual table editor and move onto the simpler options before
                    finishing with the more advanced options.
                  </p>

                  <p className="py-4">
                    <strong>Basics</strong>
                    <br></br>
                    <br></br>
                    To use the visual table editor, you need to first create the
                    table. This is done by opening up the table menu inside the
                    tools section (located at the top of the editor) and
                    selecting the number of rows and columns you want to use,
                    with each box being a cell.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAA8B0EbBE.png.png?time=1650913323"
                  ></img>

                  <p className="py-4">
                    The visual way to resize a table is by dragging one of the
                    table corners until your table has the intended size. More
                    specific editing options are available under Table
                    Properties, which are explained further below.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAwicEbBE.png.png?time=1650913334"
                  ></img>

                  <p className="py-4">
                    Columns and rows can also be resized this way. Just click
                    and drag the lines to the desired size.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADA-jAEbBE.png.png?time=1650913342"
                  ></img>

                  <p className="py-4">
                    <strong> Common Options</strong> <br></br>
                    <br></br>
                    Once you have a table and you have it selected (left click
                    on the table), you are able to access the table options.
                    These options appear right above the table itself. Hovering
                    over each individual option will give you some info on what
                    they do.<br></br>
                    <br></br>
                    You can also go back to the 'Tables' menu of the tools
                    section and access the other options there as well (they
                    were previously greyed out). These options do the following:
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAWE4EbBE.png.png?time=1650913372"
                  ></img>
                  <p className="py-4">
                    1. **Table Properties**: Contains the advanced options for
                    tables, including a full range of RGB colors. I'll talk more
                    in-depth on these properties later.
                  </p>
                  <p className="py-4">
                    2. **Delete Table**: Completely deletes the created table.
                  </p>
                  <p className="py-4">
                    3. **Insert Row Before**: Inserts a row before (above) the
                    currently selected table row, indicated by the cell you have
                    selected.
                  </p>
                  <p className="py-4">
                    4. **Insert Row After**: Inserts a row after (below) the
                    currently selected table row, indicated by the cell you have
                    selected.
                  </p>
                  <p className="py-4">
                    5. **Delete Row**: Deletes the currently selected table row,
                    indicated by the cell you have selected.
                  </p>
                  <p className="py-4">
                    6. **Insert Column Before**: Inserts a column before (left)
                    the currently selected table row, indicated by the cell you
                    have selected.
                  </p>
                  <p className="py-4">
                    7. **Insert Column After**: Inserts a column after (right)
                    the currently selected table row, indicated by the cell you
                    have selected.
                  </p>
                  <p className="py-4">
                    8. **Delete Column**: Deletes the currently selected table
                    column, indicated by the cell you have selected.
                  </p>
                  <p className="py-4">
                    Text formatting works as usual, you can use all the tools
                    available to normal text for text in a table as well.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACABCEFbBE.png.png?time=1650913588"
                  ></img>

                  <p className="py-4">
                    <strong> Advanced Options </strong> <br></br>
                    <br></br>
                    Now onto the advanced options located in the Table
                    Properties. These options can be found either on the
                    floating table toolbar or the normal toolbar on top of the
                    editor.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA80EFbBE.png.png?time=1650913623"
                  ></img>
                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAhUgFbBE.png.png?time=1650913629"
                  ></img>
                  <p className="py-4">
                    <strong> Table Properties </strong> <br></br>
                    <br></br>
                  </p>
                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAlGYFbBE.png.png?time=1650913659"
                  ></img>

                  <p className="py-4">
                    Separate from the global theme, we also offer multiple local
                    reader themes. These override global defaults but only apply
                    on the chapter pages.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAKkWlHRE.png.png?time=1645653968"
                  ></img>

                  <p className="py-4">
                    The table properties allow for more precise control over the
                    look and function of your created table. Measurements are
                    either in percentages or pixels.<br></br>
                    <br></br>
                    <b>
                      Note, not all the options affect the table currently. Some
                      options are overwritten by site defaults to keep tables
                      looking somewhat consistent across the site.
                    </b>{" "}
                    This currently affects: Cell Spacing, Cell padding and
                    Border.
                  </p>
                  <p className="py-4">
                    <strong>Width:</strong> The horizontal size of the table. If
                    left blank, it automatically defaults to filling up the
                    fiction page width. The percentage corresponds to the
                    percentage of the available page width the table takes.
                  </p>
                  <p className="py-4">
                    <strong>Height:</strong> The vertical size of the table
                    measured in pixels.
                  </p>
                  <p className="py-4">
                    <strong>Cell Spacing:</strong> Determines the spacing
                    between each cell (how close or far apart cells are to each
                    other). This option does not currently affect anything and
                    is overwritten by the default of 2 pixels.
                  </p>
                  <p className="py-4">
                    <strong>Cell Padding:</strong> Specifies the spacing between
                    the contents of a cell and its border (how close or far
                    apart the content inside of a cell is to its edge). This
                    option does not currently affect anything and is overwritten
                    by the default of 1 pixel.
                  </p>
                  <p className="py-4">
                    <strong>Border:</strong> Specifies the border size. If left
                    blank, it automatically defaults to no border.
                  </p>
                  <p className="py-4">
                    <strong>Important!</strong> Royal Road has a built-in
                    border. Because of this, borders currently do not work in
                    the table editor and will automatically default back to the
                    Royal Road border.
                  </p>
                  <p className="py-4">
                    <strong>Caption:</strong> Specifies a table's header. Always
                    sits at the top of the table. You can write anything inside.
                    If un-ticked, it automatically defaults to no caption.
                  </p>
                  <p className="py-4">
                    <strong>Important!</strong> Although captions are possible,
                    they are not integrated into the default table system Royal
                    Road provides. Because of this, they do not look good and
                    have a huge contrast to the table itself. This feature is
                    not recommended for use.
                  </p>
                  <p className="py-4">
                    <strong>Alignment:</strong> Specifies alignment of the table
                    to Left, Right, or Center. If left to 'None', it keeps the
                    default center position on the page. You can select
                    individual cells, or even individual pieces of content
                    inside cells, and align them individually using this.
                  </p>

                  <p className="py-4">
                    <strong> Table Properties (Advanced)</strong> <br></br>
                    <br></br>
                  </p>
                  <p className="py-4">
                    The advanced table properties has some extra options for
                    color and style.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAOBYGbBE.png.png?time=1650913839"
                  ></img>

                  <p className="py-4">
                    <strong>Border style:</strong> Choose the border style of
                    your table.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAjyIGbBE.png.png?time=1650913854"
                  ></img>

                  <p className="py-4">
                    Here are some examples of how these look.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADASTUGbBE.png.png?time=1650913871"
                  ></img>
                  <p className="py-4">
                    <strong>Border Color:</strong> Determines the color of the
                    'border' using the full range of RGB. If left blank,
                    defaults to a Black/Grey hue.
                  </p>
                  <p className="py-4">
                    <strong>Background Color:</strong> Determines the color of
                    the 'background' using the full range of RGB. If left blank,
                    defaults to a dark blue hue.
                  </p>
                  <p className="py-4">
                    To use custom colors: Manually type in the hex color code
                    (#000000 to #FFFFFF) or click on the small box to the right
                    to use the RGB visual chart.
                  </p>
                  <p className="py-4">
                    <strong>Cell Properties</strong>
                    <br></br>
                    <br></br> In addition to general table properties, you can
                    also give properties to individual cells. Cell properties
                    are accessed through the top toolbar when one or more cells
                    are selected.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAF14GbBE.png.png?time=1650913915"
                  ></img>

                  <p className="py-4">
                    Within this option you have 3 options: Cell Properties,
                    merge cells, and Split cells.
                  </p>

                  <p className="py-4">
                    <strong>Merging and Splitting cells:</strong> is pretty
                    self-explanatory. When multiple cells are selected (click
                    and drag), they have the option to be merged together by
                    clicking on merge. This creates 1 large cell from them.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABA6nIGbBE.png.png?time=1650913934"
                  ></img>

                  <p className="py-4">
                    Selecting this large cell (click on it to select it) and
                    then choosing the split cells option makes it fall apart
                    into the original small cells again. <br></br>
                    <br></br>
                    For more options like cell type, text alignment, or color,
                    one will have to go into the Cell properties.
                  </p>
                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAc4AGbBE.png.png?time=1650913948"
                  ></img>
                  <p className="py-4">
                    <strong>Width:</strong> The width of the cell within the
                    table, expressed in % of the total table width or in px.
                  </p>
                  <p className="py-4">
                    <strong>Height:</strong> The height of the cell within the
                    table, expressed in % of the total table height or in px.
                  </p>
                  <p className="py-4">
                    <strong>Cell type:</strong> A cell can be a normal cell or a
                    heading cell. Making a cell a heading cell centers text,
                    gives it a lighter color, and also bolds text by default.
                  </p>
                  <p className="py-4">
                    <strong>Scope:</strong> Not Implemented.
                  </p>
                  <p className="py-4">
                    <strong>H Align:</strong> Horizontal Alignment of the
                    content within the cell.
                  </p>
                  <p className="py-4">
                    <strong>V Align:</strong> Vertical Alignment of the content
                    within the cell.
                  </p>

                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAKbwGbBE.png.png?time=1650914009"
                  ></img>

                  <p className="py-4">
                    Note that sizing of cells is bound by table minimums and
                    will be overwritten by a manual resize. It is not possible
                    to have more than 100% of the width or height be taken by a
                    single cell either. Cell properties are able to be applied
                    to multiple cells at once as well.<br></br>
                    <br></br>
                    When clicking advanced in the Cell Properties windows you
                    will find 4 options: Border Width, Border Style, Border
                    Color and Background Color. Of these, only the Background
                    Color is currently available, other options have no effect.
                  </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAfeEGbBE.png.png?time=1650914047"
                  ></img>
                  <p className="py-4">
                    To use this feature, manually type in the hex color code or
                    click on the small box to the left to use the build in color
                    selector. This will change the cell background color to the
                    specified one.
                  </p>
                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAe-0GbBE.png.png?time=1650914061"
                  ></img>
                  <p className="py-4">
                    <strong>Combining Features</strong>
                    <br></br>
                    <br></br>
                    Here is a simple example that combines some of the things
                    listed above.
                  </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAANyQHbBE.png.png?time=1650914116"
                  ></img>
                  <p className="py-4">
                    Used here are headings and cell merging for the Stats and
                    Elemental Affinities, right align for the elements, left
                    align for the numbers, cell background color, text color to
                    improve contrast. Tables can be larger and more impressive,
                    but this is a basic example showing how it might look.
                  </p>
                  <p className="py-4">
                    <strong>
                      Copy and pasting tables from an external editor
                    </strong>
                  </p>
                  <p className="py-4">
                    Not everyone writes their drafts using the build-in editor.
                    The editor does support the copy and pasting of tables but
                    is has limitations. Certain properties will get lost. See
                    the following example of a table made in Microsoft Word
                    being pasted to the Royal Road editor.{" "}
                  </p>
                  <p className="py-4"> Words Table. </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAnW4HbBE.png.png?time=1650914192"
                  ></img>
                  <p className="py-4"> Paste Result. </p>
                  <img
                    className=" h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAJ3oHbBE.png.png?time=1650914204"
                  ></img>
                  <p className="py-4">
                    Only the most basic of formatting survives this process, use
                    it with caution.<br></br>
                    <br></br>
                  </p>

                  <p>
                    Copy and pasting tables from the Royal Road editor to
                    another instance of the editor does keep the formatting.
                    This will be helpful when transferring tables between
                    chapters.
                  </p>
                  <h1 className="text-[#337AB7] text-2xl mt-5" id="polls">
                    Polls
                  </h1>
                  <p className="py-4">
                    On Royal Road we provide a way for authors to poll their
                    readers on a chapter. When checking the ‘Add a poll to the
                    chapter?’ checkbox while editing or releasing a chapter, you
                    will see the following options appear.
                  </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADANgJMRBE.png.png?time=1648247814"
                  ></img>

                  <p className="py-4">
                    Within these options, you can make your poll. For the poll
                    position, we offer 2 locations, above the chapter or below
                    the chapter. The poll options are the options readers can
                    vote on in the poll itself.
                  </p>
                  <p className="py-4">
                    The number of answers is the number of options a user can
                    select and submit for the poll. The default for this setting
                    is 1 but it can be changed depending on your need.
                  </p>
                  <p className="py-4">
                    If you do not want to make the results of this poll public,
                    you can uncheck the ‘Public poll results?’ checkbox. This
                    makes it so only you are able to see the poll results.
                  </p>
                  <p className="py-4">
                    Note that a user only gets one chance to vote, so they can't
                    switch answers after voting is possible.
                  </p>
                  <p className="py-4">
                    If you want to close a poll you can tick the ‘Poll Closed?’
                    option when editing a chapter. This makes it so no new votes
                    will be accepted on the poll.
                  </p>
                  <p className="py-4">
                    In the author dashboard, under the community tabs, you can
                    find a polls section which aggregates all the polls in your
                    fiction to one central location. Here you can see all polls
                    and past polls that you created for your fiction.
                  </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAcIKARBE.png.png?time=1648261577"
                  ></img>
                  <h1 className="text-[#337AB7] text-2xl mt-5" id="release">
                    Releasing a New Chapter
                  </h1>
                  <p className="py-4">
                    When you want to release a new chapter, you just need to
                    click on New Chapter under the Content tab in the Author
                    Dashboard. This will take you directly to the new chapter
                    page. There, you will be presented with the chapter editor
                    to write your chapter. When writing a chapter you also have
                    the ability to save it as a Draft for future use, like a
                    scheduled release.
                  </p>
                  <h1 className="text-[#337AB7] text-2xl mt-5" id="edit">
                    Editing Chapter
                  </h1>
                  <p className="py-4">
                    There are multiple ways to start editing a chapter. This can
                    be done from the chapter reader or through the Author
                    Dashboard. On the public chapter page, there is a button
                    available to edit or delete a chapter. Clicking the Edit
                    Chapter button brings you to the relevant chapter editor in
                    the author dashboard.
                  </p>
                  <img
                    className=" mt-1"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAdSdMRBE.png.png?time=1648247852"
                  ></img>
                  <p className="py-4">
                    If you are already on the author dashboard, it is possible
                    to reach the chapter editor by navigating to Content then
                    Chapters in the side menu. This brings up a list of chapters
                    for that fiction and the ability to edit and delete a
                    chapter.
                  </p>
                </div>
                <img
                  className=" mt-1"
                  src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAZz1MRBE.png.png?time=1648247875"
                ></img>
                <h1 className="text-[#337AB7] text-2xl mt-5" id="delete">
                  Deleting Chapter
                </h1>
                <p className="py-4">
                  On the public chapter page, there is a button available to
                  edit or delete a chapter. Clicking the Delete button gives you
                  a confirmation page to delete the chapter.
                </p>
                <img
                  className=" mt-1"
                  src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAtEhNRBE.png.png?time=1648248149"
                ></img>
                <p className="py-4">
                  If you are on the author dashboard, it is possible to reach
                  the delete chapter option by navigating to the chapters tab.
                  This brings up a list of chapters for that fiction and the
                  ability to edit and delete a chapter.
                </p>
                <img
                  className="mt-1"
                  src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA9FVNRBE.png.png?time=1648248162"
                ></img>
                <p className="py-4">
                  Clicking the red trashcan button deletes the chapter. Once a
                  chapter is deleted, the red trash can button becomes a restore
                  button. This allows you to restore the chapter the same way
                  you deleted it in the author dashboard.
                </p>
                <h1 className="text-[#337AB7] text-2xl mt-5" id="drafts">
                  Drafts
                </h1>
                <p className="py-4">
                  Drafts are (un)finished chapters that are either being written
                  or waiting on release. Drafts can be accessed via the author
                  panel under Content.
                </p>

                <img
                  className="mt-1"
                  src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAWF5NRBE.png.png?time=1648248171"
                ></img>
                <h1 className="text-[#337AB7] text-2xl mt-5" id="upload">
                  Upload Recommendations
                </h1>
                <p className="py-4">
                  In order to gain as many readers as possible, we recommend
                  publishing chapters at different hours, which will allow you
                  to gain readers from different time zones. Do not publish more
                  than two chapters a day but instead, do so on consecutive
                  days. This will allow you to maximize the exposure your
                  fiction receives from the Latest Update list.
                </p>
                <p className="py-4">
                  The biggest mistake in releasing chapters to gain readership
                  is releasing in bulk. Try to spread out the chapters but stay
                  consistent. Sporadic uploads get less attention than uploading
                  consistently once every 3 days.
                </p>
                <p className="py-4">
                  As for chapter length, our biggest recommendation is to write
                  as much as you’re comfortable doing and to keep a consistent
                  release schedule rather than having the same word count every
                  time.
                </p>
                <p className="py-4">
                  The minimum word count per chapter is currently 500
                  characters. We recommend keeping the chapter length to less
                  than 10,000 words. 2,000 words tend to be a good stopping
                  point as this is not too long, nor is it too short to tell a
                  part of your fiction.
                </p>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#editor"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        The chapter editor
                      </a>
                      <br />
                      <a
                        href="#tab"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        How to use tables
                      </a>
                      <br />
                      <a
                        href="#polls"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Polls
                      </a>
                      <br />
                      <a
                        href="#release"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Releasing a New Chapter
                      </a>
                      <br />
                      <a
                        href="#edit"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Editing a Chapter
                      </a>
                      <br />
                      <a
                        href="#delete"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Deleting a Chapter
                      </a>
                      <br />
                      <a
                        href="#drafts"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Drafts
                      </a><br></br>
                      <a
                        href="#upload"
                        className="hover:underline hover:text-blue-900 transition-colors py-4"
                      >
                        Upload Recommendations
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

export default Chapters;
