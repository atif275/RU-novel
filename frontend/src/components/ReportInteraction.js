import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const  RI= () => {
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
                      className="hover:underline hover:text-blue-900   transition-colors"
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
                  <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/report-a-user-interaction"
                      className="hover:underline text-[#000000CC] hover:text-blue-900 transition-colors"
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/report-a-user-interaction"
                        className="hover:underline text-[#000000CC] hover:text-blue-900 transition-colors"
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
                    <ul>
  <li>
    <a
      href="#report-a-fiction"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Fiction
    </a>
  </li>
  <li>
    <a
      href="#report-a-chapter"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Chapter
    </a>
  </li>
  <li>
    <a
      href="#report-a-review"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Review
    </a>
  </li>
  <li>
    <a
      href="#report-a-comment"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Comment
    </a>
  </li>
  <li>
    <a
      href="#faq"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      FAQ: Report a User/PM
    </a>
  </li>
  <li>
    <a
      href="#report-forum"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Forum Post/Thread
    </a>
  </li>
</ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Report a user interaction</h1>

                  <p className="py-4">
                    In general, you can report any user interaction on the
                    platform. Here, we explain how to report each type of
                    interaction and user content (Review, Comments, Forum Posts,
                    Fiction, User), as well as what you can report them for.{" "}
                    <br></br>
                    <br></br>
                    If you want to bring the staff's attention to something that
                    doesn't violate any of the report reasons listed, you can
                    select "Others". The staff will evaluate each case
                    individually. Our overall purpose is to retain an upright
                    standard for the content on the platform and to retain a
                    positive environment among the users. <br></br>
                    <br></br>
                    Sometimes, we require further information. Please be as
                    detailed as possible to help speed up any investigation
                    needed.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5" id="report-a-fiction">
                    Report a Fiction
                  </h1>
                  <p className="py-4">
                    To report a cover art, a title, a description, or the
                    fiction content, click the [Report] button on the right menu
                    in the fiction page.
                  </p>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAA0u1NSBE.png.png?time=1648516754"
                  ></img>
                  <ul className="list-disc">
                    <li>Cover:</li>
                    <ul className="ml-5 list-disc">
                      <li>
                        "I believe the cover of this fiction contains mature or
                        discriminatory content"
                      </li>
                      <li>"This cover contains sexual content"</li>
                      <li>"This cover contains profanity"</li>
                      <li>"This cover contains traumatizing content"</li>
                      <li>"Other"</li>
                      <li>
                        "I believe the cover of this fiction is copyrighted and
                        is being used without permission"
                      </li>
                      <li>"Other"</li>
                    </ul>

                    <li>Title:</li>
                    <ul className="ml-5 list-disc">
                      <li>
                        "I believe the title of this fiction contains mature or
                        discriminatory content"
                      </li>
                      <li>"The title contains sexual content"</li>
                      <li>"The title contains profanity"</li>
                      <li>"The title contains traumatizing content"</li>
                      <li>"Other"</li>
                      <li>
                        "I believe the title of this fiction is misleading"
                      </li>
                      <li>"I believe the title of this fiction is spam"</li>
                      <li>
                        "I believe the title of this fiction is in a language
                        different from that of the fiction"
                      </li>
                      <li>"Other"</li>
                    </ul>

                    <li>Synopsis:</li>
                    <ul className="ml-5 list-disc">
                      <li>
                        "I believe the synopsis of this fiction contains mature
                        or discriminatory content"
                      </li>
                      <li>"The synopsis contains sexual content"</li>
                      <li>"The synopsis contains profanity"</li>
                      <li>"The synopsis contains traumatizing content"</li>
                      <li>
                        "The synopsis promotes discrimination towards
                        individuals or groups of people"
                      </li>
                      <li>"Other"</li>
                      <li>
                        "I believe the synopsis of this fiction contains links
                        to other websites"
                      </li>
                      <li>
                        "I believe the synopsis of this fiction is misleading"
                      </li>
                      <li>
                        "I believe the synopsis of this fiction contains spam"
                      </li>
                      <li>"Other"</li>
                    </ul>

                    <li>Fiction Content</li>
                    <ul className="ml-5 list-disc">
                      <li>
                        "I believe this fiction contains untagged inappropriate
                        mature content"
                      </li>
                      <li>
                        "The fiction contains sexual content and is not tagged
                        appropriately"
                      </li>
                      <li>
                        "The fiction contains excessive profanity and is not
                        tagged appropriately"
                      </li>
                      <li>
                        "The fiction contains traumatizing content and is not
                        tagged appropriately"
                      </li>
                      <li>
                        "The fiction contains gore and is not tagged
                        appropriately"
                      </li>
                      <li>"Other"</li>
                      <li>
                        "This fiction contains content that is inappropriate
                        even with the related warning"
                      </li>
                      <li>
                        "The fiction contains videos, images, or other
                        non-textual mature content"
                      </li>
                      <li>
                        "The fiction contains depictions of rape and depicts
                        them in a positive light"
                      </li>
                      <li>
                        "The fiction contains depictions or promotion of
                        pedophilia"
                      </li>
                      <li>
                        "The fiction contains depictions or promotion of
                        necrophilia"
                      </li>
                      <li>
                        "The fiction promotes discrimination towards individuals
                        or groups of people"
                      </li>
                      <li>"Others"</li>
                    </ul>
                  </ul>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="report-a-chapter"
                  >
                    Report a Chapter
                  </h1>

                  <p className="py-4">
                    To report a chapter, click the Red [Report Chapter] button,
                    at the top of the chapter page.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AABA3mBCSBE.png.png?time=1648513725"
                  ></img>
                  <ul className="list-disc ml-5">
                    <li>
                      The following are the options available for reporting a
                      chapter:
                    </li>
                    <ul className="ml-5 list-disc">
                      <li>
                        "I believe the title of this chapter is inappropriate"
                      </li>
                      <li>
                        "I believe the title of this chapter contains mature or
                        discriminatory content"
                      </li>
                      <li>
                        "I believe the title of this chapter is misleading"
                      </li>
                      <li>"I believe the title of this chapter is spam"</li>
                      <li>"Other"</li>
                      <li>
                        "The chapter contains mature content without the
                        appropriate warning"
                      </li>
                      <li>
                        "The chapter contains sexual content and is not tagged
                        appropriately"
                      </li>
                      <li>
                        "The chapter contains excessive profanity and is not
                        tagged appropriately"
                      </li>
                      <li>
                        "The chapter contains traumatizing content and is not
                        tagged appropriately"
                      </li>
                      <li>
                        "The chapter contains gore and is not tagged
                        appropriately"
                      </li>
                      <li>"Other"</li>
                      <li>
                        "The chapter contains mature content that is
                        inappropriate, illegal or extreme"
                      </li>
                      <li>"The chapter contains glorified sexual violence"</li>
                      <li>"The chapter contains depictions of pedophilia"</li>
                      <li>"The chapter contains depictions of necrophilia"</li>
                      <li>
                        "The chapter contains videos, images, or other
                        non-textual mature content"
                      </li>
                      <li>"Other"</li>
                      <li>"I believe this chapter contains plagiarism"</li>
                      <li>"I believe the chapter is spam"</li>
                      <li>"Other"</li>
                    </ul>
                  </ul>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="report-a-review"
                  >
                    Report a Review
                  </h1>
                  <ul className="list-disc ml-5">
                    <li>Read more about the review rules here.</li>
                    <li>
                      To report a review, click the red [Report] button
                      underneath it.
                    </li>
                    <li>
                      You will then have the following reasons to report the
                      review:
                    </li>
                    <ul className="ml-5 list-disc">
                      <li>"This review does not justify the rating"</li>
                      <li>"This basic review does not justify the rating"</li>
                      <li>
                        "This advanced review does not cover the subcategories
                        rated (Style, Story, Grammar, and Characters)"
                      </li>
                      <li>
                        "This review does not discuss the content of the
                        fiction"
                      </li>
                      <li>
                        "This review addresses points outside of the fiction
                        content"
                      </li>
                      <li>
                        "This review discusses unrelated content, such as
                        comments about the author's activities, other people,
                        other reviews..."
                      </li>
                      <li>
                        "This review is based solely on superficial information"
                      </li>
                      <li>"This review accuses the author of plagiarism"</li>
                      <li>
                        "This review discourages readers from reading a story by
                        comparing it to another similar story"
                      </li>
                      <li>"This review is disrespectful or unfair"</li>
                      <li>"This review insults the author or the readers"</li>
                      <li>
                        "This review is directly discouraging an author from
                        writing"
                      </li>
                      <li>
                        "This review intentionally depicts a story as something
                        entirely different from what it is"
                      </li>
                      <li>
                        "This review instigates or incites harmful /
                        rule-breaking acts"
                      </li>
                      <li>"This review does not use appropriate language"</li>
                      <li>
                        "This review contains profanity, vulgarity, sexual
                        content, or descriptions of gore"
                      </li>
                      <li>"This review contains slander and discrimination"</li>
                      <li>"This review breaks the rules about spoilers"</li>
                      <li>
                        "The spoilers are not hidden under the spoiler tag"
                      </li>
                      <li>
                        "The spoiler content exceeds a third of the overall word
                        count, or is the focus of the review"
                      </li>
                      <li>"The spoilers reveal major points of the story"</li>
                      <li>"This review breaks the general rules"</li>
                      <li>
                        "This review contains meaningless characters and words
                        used to inflate the character count and review length"
                      </li>
                      <li>"This is spam"</li>
                      <li>
                        "This review is not written in English or in the
                        language the fiction is written in"
                      </li>
                      <li>
                        "I think there is something suspicious with this
                        account"
                      </li>
                      <li>"Other"</li>
                    </ul>
                  </ul>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="report-a-comment"
                  >
                    Report a Comment
                  </h1>
                  <p className="py-4">
                    To report a comment, click on the [Report] Button next to
                    it.{" "}
                  </p>

                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAOQRBSBE.png.png?time=1648513368"
                  ></img>
                  <ul className="list-disc ml-5">
                    <li>The following are the report options:</li>
                    <ul className="ml-5 list-disc">
                      <li>"I believe this comment contains mature content"</li>
                      <ul className="ml-5 list-disc">
                        <li>"This comment contains sexual content"</li>
                        <li>"This comment contains profanity"</li>
                        <li>"This comment contains traumatizing content"</li>
                        <li>"Other"</li>
                      </ul>
                      <li>
                        "I believe this post contains toxic language used to
                        attack a person or a group of people"
                      </li>
                      <ul className="ml-5 list-disc">
                        <li>
                          "This comment attacks the author of the fiction"
                        </li>
                        <li>"This comment attacks another user"</li>
                        <li>
                          "This post attacks a person or group of people
                          external to the site"
                        </li>
                      </ul>
                      <li>
                        "I believe this comment contains inappropriate links or
                        images"
                      </li>
                      <ul className="ml-5 list-disc">
                        <li>
                          "The comment contains images containing mature
                          content"
                        </li>
                        <li>
                          "The comment contains a link to a website that
                          contains mature content"
                        </li>
                        <li>"The comment contains a shortened link"</li>
                        <li>"Other"</li>
                      </ul>
                      <li>
                        "I believe this comment is discussing off-topic Real
                        World politics or religion"
                      </li>
                      <li>"I believe this comment is spam"</li>
                      <li>"Other"</li>
                    </ul>
                  </ul>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="faq">
                    FAQ:
                  </h1>

                  <p className="py-4">
                    <strong>
                      Q: I see many "First" and "Thanks for the chapter"
                      comments, should I report them as spam?
                    </strong>
                  </p>

                  <p className="py-4">
                    A: These comments indicate how much the readers enjoy the
                    story and how they feel pride in being the first to comment.
                    It is a great compliment to the author, and while they might
                    seem like spam, these comments are not against the rules as
                    long as they aren't posted multiple times in the same
                    chapter by the same user. However, If you are the author of
                    a fiction with these comments, you can freely delete them.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="report-a-user"
                  >
                    Report a User/PM
                  </h1>
                  <p className="py-4">
                    To report a user, go to their profile page and then click on
                    the red button at the top right corner.{" "}
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAjlJPSBE.png.png?time=1648517118"
                  ></img>
                  <p className="py-4">
                    "I believe that the username is derogatory"<br></br>
                    <br></br>
                    "This account seems to be a spam bot" / Use this option if
                    you received a Spamming PM
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="report-forum"
                  >
                    Report a Forum Post/Thread
                  </h1>
                  <p className="py-4">
                    To report a forum post or thread, simply click [Report This
                    post] which can be found underneath the post in question.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AAAAMsxDSBE.png.png?time=1648514097"
                  ></img>

                  <ul className="list-disc ml-5">
                    <li>The following are the report options:</li>
                    <ul className="ml-5 list-disc">
                      <li>"I believe this post contains mature content"</li>
                      <ul className="ml-5 list-disc">
                        <li>"This post contains sexual content"</li>
                        <li>"This post contains profanity"</li>
                        <li>"This post contains traumatizing content"</li>
                      </ul>
                      <li>
                        "I believe this post contains toxic language used to
                        attack a person or a group of people"
                      </li>
                      <ul className="ml-5 list-disc">
                        <li>"This post attacks another user"</li>
                        <li>
                          "This post attacks a person or group of people
                          external to the site"
                        </li>
                      </ul>
                      <li>
                        "I believe this post contains advertisement or spam"
                      </li>
                      <li>
                        "I believe this post is unrelated to the previous posts
                        and the topic of this thread"
                      </li>
                      <li>"Other"</li>
                    </ul>
                  </ul>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                    <ul>
  <li>
    <a
      href="#report-a-fiction"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Fiction
    </a>
  </li>
  <li>
    <a
      href="#report-a-chapter"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Chapter
    </a>
  </li>
  <li>
    <a
      href="#report-a-review"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Review
    </a>
  </li>
  <li>
    <a
      href="#report-a-comment"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Comment
    </a>
  </li>
  <li>
    <a
      href="#faq"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      FAQ: Report a User/PM
    </a>
  </li>
  <li>
    <a
      href="#report-forum"
      className="hover:underline hover:text-blue-900 transition-colors"
    >
      Report a Forum Post/Thread
    </a>
  </li>
</ul>

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

export default RI;
