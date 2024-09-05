import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Activation = () => {
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
                <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                  <div>
                    <Link
                      to="/support/knowledgebase/signup-and-activation"
                      className="hover:underline hover:text-blue-900 text-[#000000CC]  transition-colors"
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
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/signup-and-activation"
                        className="hover:underline hover:text-blue-900 text-[#000000CC]   transition-colors"
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
                        href="#crete"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Creating your account
                      </a>
                      <br />
                      <a
                        href="#social-signup"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Social Signup
                      </a>
                      <br />
                      <a
                        href="#code"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Referral Code
                      </a>
                      <br />
                      <a
                        href="#activation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Activation
                      </a>
                      <br />

                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Sign up & Activation</h1>

                  <p className="py-4">
                    In order to make full use of all the features Royal Road can
                    provide you will need an account. In this section all steps
                    and options to making your account will be explained.
                  </p>
                  <h1
                    className="text-[#337AB7] text-3xl mt-5"
                    id="create"
                  >
                    Creating your account
                  </h1>
                  <p className="py-4">
                    Creating an account on Royal Road can be done from the
                    sign-up page. There, you will be asked for the following
                    details: Username, Email, Password, Gender, and Date of
                    Birth.
                  </p>

                  <p className="py-4">
                    Your username is your display name on the site. Unlike most
                    other platforms, we allow for spaces in your username to
                    give more freedom and allow for pennames if so desired.
                  </p>

                  <p className="py-4">
                    Your email address will be utilized for signing in,
                    communication, and recovery of your account if needed. Make
                    sure you have access to the email used during signup.
                  </p>

                  <p className="py-4">
                    For a password, we recommend using a long and unique
                    password.
                  </p>

                  <p className="py-4">
                    Your gender selection is optional, and you can choose not to
                    display it once you log in.
                  </p>

                  <img
                    className="py-4 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACA6MkhRRE.png.png?time=1648303855"
                  ></img>

                  <p className="py-4">
                    In order to use Royal Road, you will have to accept the
                    Terms and Conditions. While not the most entertaining read
                    on Royal Road, we do ask you to read it before accepting
                    during account signup.
                  </p>

                  <p className="py-4">
                    The Royal Road newsletter is sent periodically and contains
                    updates about new features, book launches, news, and other
                    updates. We will not spam and you can unsubscribe at any
                    point.
                  </p>

                  <p className="py-4">
                    Note that you may create more than one account as long as
                    you don't use them for vote manipulation or for breaking any
                    of our rules and policies. Violating this will result in
                    disciplinary measures against all accounts.
                  </p>

                  <h1
                    className="text-[#337AB7] text-3xl mt-5 "
                    id="social-signup"
                  >
                    Social SignUp
                  </h1>

                  <p className="py-4">
                    We offer the possibility to sign up using your Google,
                    Facebook, or Microsoft account.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADAM9khRRE.png.png?time=1648303871"
                  ></img>

                  <p className="py-4">
                    When using this option, you will be able to use the login
                    details from the service you chose, the only detail that
                    will still need manual entry is your username. If you
                    already have an account and want to link one of these
                    accounts, then you can manage external logins instead.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="code">
                    Referral Code
                  </h1>

                  <p className="py-4">
                    The referral code is there to reward people who invite other
                    users to Royal Road. The referral code can be found at the
                    referral page when signed in on Royal Road.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AADALeIhRRE.png.png?time=1648303880"
                  ></img>

                  <p className="py-4">
                    You can currently receive an EXP bonus for referring a
                    friend, and they will get a bonus for using your link. If a
                    new reward is implemented, it will be implemented
                    retroactively where possible.
                  </p>
                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="activation">
                    Activation
                  </h1>

                  <p className="py-4">
                    In order to access some of the core features of Royal Road,
                    your account will have to be verified. This is done by
                    clicking on the button in the email you will be sent from
                    us. Without verification, you can still use most of the
                    personal features like follows and favorites but you cannot
                    write a fiction.
                  </p>
                  <img
                    className="mt-3 h-[200%]"
                    src="https://www.royalroadcdn.com/public/knowledgeBase/image-AACAXu0hRRE.png.png?time=1648303892"
                  ></img>

                  <p className="py-4">
                    If you did not activate your account during signup, you can
                    open this link to send a new activation email.
                    <br />
                    <br />
                    If this issue persists, please double-check that the email
                    you signed up with is correct, and also check your spam
                    folder in case the activation email has been marked as spam
                    by your email account provider. If the email address you've
                    provided us with is incorrect, follow this URL to change
                    your email address, then use the account resend activation
                    link above again.<br></br>
                    <br></br>
                    If the activation email was not received and retrying does
                    not help, please contact support.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#create"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Creating your account
                      </a>
                      <br />
                      <a
                        href="#social-signup"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Social Signup
                      </a>
                      <br />
                      <a
                        href="#code"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Referral Code
                      </a>
                      <br />
                      <a
                        href="#activation"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Activation
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

export default Activation;
