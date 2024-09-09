import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ReaderPre = () => {
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
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/reader-premium"
                      className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/reader-premium"
                        className="hover:underline hover:text-blue-900 text-[#000000CC]  transition-colors"
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
                      <div>
                        <a
                          href="#ad-free-reading"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Ad-Free Reading
                        </a>
                        <br />
                        <a
                          href="#push-notification"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Push Notification
                        </a>
                        <br />
                        <a
                          href="#how-to-enable-push-notifications"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          How to enable Push Notifications
                        </a>
                        <br />
                        <a
                          href="#full-reading-history"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Full Reading History
                        </a>
                        <br />
                        <a
                          href="#cosmetics"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Cosmetics
                        </a>
                        <br />
                        <a
                          href="#custom-profile-header"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Custom Profile Header
                        </a>
                        <br />
                        <a
                          href="#unique-borders"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Unique Borders
                        </a>
                        <br />
                        <a
                          href="#early-access"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Early Access
                        </a>
                        <br />
                        <a
                          href="#support-royal-road"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Support RU Novel!
                        </a>
                        <br />
                        <a
                          href="#app-exclusive-features"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          App Exclusive Features
                        </a>
                        <br />
                        <a
                          href="#where-to-subscribe"
                          className="hover:underline hover:text-blue-900 transition-colors"
                        >
                          Where to Subscribe
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Reader Premium</h1>

                  <p className="py-4">
                    Reader premium comes with the following features and perks.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="ad-free-reading"
                  >
                    Ad-Free Reading
                  </h1>
                  <p className="py-4">
                    By having a reader premium active on your account, no
                    advertisements will be shown. This is as much a
                    quality-of-life improvement as it is a cosmetic improvement.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="push-notification"
                  >
                    Push Notification
                  </h1>
                  <p className="py-4">
                    Premium users get access to push notifications, which are
                    sent, for example, when a followed fiction releases a new
                    chapter.
                  </p>
                  <p className="py-4">
                    When enabled in the browser, this will give you the quickest
                    notice available of a new chapter release. For push
                    notifications to work, you do not need to have RU Novel
                    open at all; it will be sent through your browser as a
                    notification.
                  </p>
                  <p className="py-4">
                    Note that push notifications do not work on iPhone.
                  </p>

                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAFedGxBA.png.png?time=1639656541"
                    alt="Edge browser notification example"
                  ></img>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="how-to-enable-push-notifications"
                  >
                    How to enable Push Notifications
                  </h1>
                  <p className="py-4">
                    In order for push notifications to work, a site needs to ask
                    for permission to send you push notifications. When you
                    enable push notification on the site for the first time,
                    your browser will ask for permission. The way this looks is
                    different for every browser, but for the 3 most common
                    browsers, Chrome, Edge, and Firefox, it looks like this:
                  </p>

                  <p className="py-4">Edge:</p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/anms5tbjhzci2jdgtlbjd01saaqzo8awtilafqhi9jp7ujtybdpr6fl64l0ffe58anovjxlondkbgw7qa0ug91f5d3ko8kmk7nbizwem6v3a4288ata4auiqq4radbzfhi8ef1-AACAtVQ5xBA.png.png?time=1639652983"
                    alt="Edge browser notification example"
                  ></img>

                  <p className="py-4">Chrome</p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/rrtbqoxjtswremmnqbc1ucnkdun-efq9r9e1xzoxpk4tclfhhzvoirmmmulg86jvrazxafyynx71rjpd9bnezi7wzxyyptymvtdnlk5rjvrwekiwcqgy2yqpw4eqy8ivdwclj3i-AADA2FQ5xBA.png.png?time=1639652983"
                    alt="Chrome browser notification example"
                  ></img>

                  <p className="py-4">Firefox:</p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/0csebn9nvuqv5gzpd2whqy-voyuzhjl0yvdmgkszn3n9yywulljczudq6xpus27doryqe-ho9ggeln4n3sfkunvfwkghukqqrlicx0jfuqnmk5bpmtfoipg54jxcxzyt5nqtne31-AAAArVQ5xBA.png.png?time=1639652983"
                    alt="Firefox browser notification example"
                  ></img>

                  <p className="py-4">
                    Other browsers will have a similar popup to this. This
                    permission is needed in order to send notifications to your
                    browser. These will only be used for push notifications that
                    you enabled.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="full-reading-history"
                  >
                    Full Reading History
                  </h1>
                  <p className="py-4">
                    While every user has access to their normal reading history
                    consisting of their last read chapter of a fiction, premium
                    users get access to a detailed list of what chapters they
                    read at what time, down to the minute. This is available for
                    chapters accessed in the past 6 months.
                  </p>
                  <p className="py-4">
                    In order to access this list, click this link or go to the
                    history page in the user dropdown, then select Detailed
                    History.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABAhXFz4hA.png.png?time=1641681483"
                    alt="Detailed history example"
                  ></img>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="cosmetics">
                    Cosmetics
                  </h1>
                  <p className="py-4">
                    Other than functional perks, you also get access to some
                    cosmetics to show that you are supporting the site. This
                    includes a badge indicating your premium status, a golden
                    post border on the forums, and unique premium borders that
                    are released monthly.
                  </p>
                  <p className="py-4">
                    The premium badge shows differently depending on the
                    location it is shown. On the forums, it is a golden
                    “premium” under the username as shown below. You can also
                    see the golden border around the post in the forum.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/vmq2oljun3lm37g4uaxt2kyjknx79pj0s1wzjylkgcxa9hizuk6ku380ld5uaz45deave4wfar6gtujh47tas11jpdaxigrec4fy2hnnpuzcfs5s4eeg5j2g5mf2bpduezok3g61-AACAr1Q5xBA.png.png?time=1639652983"
                    alt="Forum premium badge example"
                  ></img>
                  <p className="py-4">
                    In the comments under a chapter, it presents itself in the
                    form of a golden crown.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/3injgqdapi-ttmoj6pch7ft03l9ty415fbhhurwxue5rnxwsiojpajpte99fya1ntukxwphtoejrqayyqnvhcd2eo4tj4fsxsiuctbkz88tt04hn7q7-a0hxhmmagfkrirvt-AACA-lQ5xBA.png.png?time=1639652984"
                    alt="Comment premium badge example"
                  ></img>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="custom-profile-header"
                  >
                    Custom Profile Header
                  </h1>
                  <p className="py-4">
                    Another customization feature is the profile header. When
                    going to a user profile on the site, you see a blurred
                    version of their profile picture as their header by default.
                    With premium, you can change your profile header to any
                    picture that you want.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/tjjieoi6cdyngnaopoi0jneld2a0rwh3kxiqcjttjqykxa6nebv8kgvt0lumkf15ruewwrxbb9y23uznkx1mq0clpqjjqiqosz6diciwwzsho2ceyedbvuoc5huyswiy7tydu-AACAvVQ5xBA.png.png?time=1639652984"
                    alt="Custom profile header example"
                  ></img>
                  <p className="py-4">
                    Here it is changed to a picture of a landscape as a
                    demonstration, but you can upload any picture (that you have
                    the rights to use) to use as your profile banner.
                  </p>
                  <p className="py-4">
                    You can change or delete your profile banner from the
                    settings under profile info. Deleting it resets the banner
                    back to the default blurred profile picture.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="unique-borders"
                  >
                    Unique Borders
                  </h1>
                  <p className="py-4">
                    Normal Borders are available for everyone depending on their
                    level on the site. The unique borders, however, are a
                    premium-only collection.
                  </p>
                  <p className="py-4">
                    To receive a Premium profile border, you must have an active
                    Premium Subscription during the timeframe in which it is
                    available.
                  </p>
                  <p className="py-4">
                    Borders obtained this way are added to your Border Wardrobe
                    automatically, for use at any time while you have an active
                    Premium Subscription.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAXgV04hA.png.png?time=1641681635"
                    alt="Unique border example"
                  ></img>
                  <p className="py-4">
                    Even if you deactivate your premium subscription, the
                    borders will still be saved under your account so that you
                    may use them whenever you are ready to reactivate your
                    premium.
                  </p>
                  <p className="py-4">
                    You can check your available custom borders in the border
                    wardrobe. Note, we won’t provide the same borders again. We
                    instead add a brand new border once every month, sometimes
                    multiple.
                  </p>
                  <p className="py-4">
                    You can look at past borders here
                    https://www.royalroad.com/pages/borders.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="early-access"
                  >
                    Early Access
                  </h1>
                  <p className="py-4">
                    Together with getting access to the normal features, you
                    also get early access to features that are being tested.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/emails/fyajrhjwiwcnaaf8a6x5vw86u5f5tsb2riz-2ohk9qkyu1xq2vasqfwyo5n5d3qmfebwobdaafv57pnxbnw5mp-mkjv9ldo3mptwlwhyugmwfsqa9y8f87qs8szsueuje-pxls-AAAAv1Q5xBA.png.png?time=1639652983"
                    alt="Early access feature example"
                  ></img>
                  <p className="py-4">
                    There are no specifics on this as it is a dynamic process.
                    However, you need to opt-in to this feature, which can be
                    found at the bottom of this page. Be sure to save the
                    changes by pressing the button at the bottom of the page.
                  </p>
                  <img
                    className="mt-5 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA_Rd04hA.png.png?time=1641681654"
                    alt="Early access feature example"
                  ></img>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="support-royal-road"
                  >
                    Support RU Novel!
                  </h1>
                  <p className="py-4">
                    You also support the site with your premium, and we thank
                    you for this.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="app-exclusive-features"
                  >
                    App Exclusive Features
                  </h1>
                  <p className="py-4">
                    The app offers several exclusive features. To download the
                    app, visit www.royalroad.com/app. Since we rely on ads for
                    income, features that disable ads are considered premium.
                    The following are premium features:
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="offline-reading-mode"
                  >
                    1. Offline Reading Mode
                  </h1>
                  <p className="py-4">
                    This feature allows you to download stories and read them
                    offline at your convenience. Note that this feature mirrors
                    the online reading mode. If an author removes their novel,
                    it will also disappear from your downloaded tab within 24
                    hours.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="advanced-chapter-audio-features"
                  >
                    2. Advanced Chapter Audio Features
                  </h1>
                  <p className="py-4">
                    In the app, you can listen to the audio of a chapter. With a
                    premium subscription, you can set an auto next chapter and a
                    sleep timer.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="ad-free-reading-mode"
                  >
                    3. Ad-Free Reading Mode
                  </h1>
                  <p className="py-4">
                    Like the website, the app also provides a premium option to
                    remove all ads.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="where-to-subscribe"
                  >
                    Where to Subscribe

                  </h1>
                  <p className="py-4">
                  We provide subscriptions via the app and via PayPal on the website. Please note that the app pricing relies on Google/Apple's system and is dynamic with price localization. This means that the price varies from location to location due to localization and currency conversion, while it's set as 3.49$ and 5.99$ (+VAT) USD for reader premium and author premium on the website. <br></br><br></br>

Feel free to check out which one is more convenient for you. 
                  </p>
                  
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <div>
                        <div>
                          <a
                            href="#ad-free-reading"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Ad-Free Reading
                          </a>
                          <br />
                          <a
                            href="#push-notification"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Push Notification
                          </a>
                          <br />
                          <a
                            href="#how-to-enable-push-notifications"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            How to enable Push Notifications
                          </a>
                          <br />
                          <a
                            href="#full-reading-history"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Full Reading History
                          </a>
                          <br />
                          <a
                            href="#cosmetics"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Cosmetics
                          </a>
                          <br />
                          <a
                            href="#custom-profile-header"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Custom Profile Header
                          </a>
                          <br />
                          <a
                            href="#unique-borders"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Unique Borders
                          </a>
                          <br />
                          <a
                            href="#early-access"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Early Access
                          </a>
                          <br />
                          <a
                            href="#support-royal-road"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Support RU Novel!
                          </a>
                          <br />
                          <a
                            href="#app-exclusive-features"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            App Exclusive Features
                          </a>
                          <br />
                          <a
                            href="#where-to-subscribe"
                            className="hover:underline hover:text-blue-900 transition-colors"
                          >
                            Where to Subscribe
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
    </div>
  );
};

export default ReaderPre;
