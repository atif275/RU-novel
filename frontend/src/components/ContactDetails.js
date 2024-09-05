import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1"
                    />
                    <Link
                      to="/support/knowledgebase/content-guidelines"
                      className="hover:underline hover:text-blue-900 transition-colors  text-[#000000CC]"
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
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/content-guidelines"
                        className="hover:underline hover:text-blue-900 text-[#000000CC]  transition-colors"
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
                        href="#originality"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Originality
                      </a>
                      <br></br>
                      <a
                        href="#content"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Mature Content
                      </a>
                      <br></br>
                      <a
                        href="#language"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Language
                      </a>
                      <br></br>
                      <a
                        href="#art"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Artwork
                      </a>
                      <br></br>
                      <a
                        href="#restriction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Restriction on Non-Fictional World Content
                      </a>
                      <br></br>
                      <a
                        href="#prohibited"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Prohibited
                      </a>
                      <br></br>
                      <a
                        href="#ai"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        AI Content
                      </a>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Content Guidelines</h1>
                  <p className="mt-5">
                    Royal Road allows creative freedom and tries not to censor
                    content when possible. However, we have certain standards
                    and limitations that must be met in order to publish or
                    interact with the community.
                  </p>
                  <p className="mt-5">
                    We wish to see our community thriving, interacting, and
                    sharing their work and opinions in a comfortable and safe
                    environment. In order to ensure that, please follow these
                    content guidelines for the things that you may or may not
                    post here.
                  </p>
                  <p className="mt-5">
                    Per our terms, by submitting a story to Royal Road, you
                    represent that you have all necessary rights and that you
                    are not infringing or violating any third party’s rights by
                    posting it. If Your Content infringes another person’s
                    intellectual property, we will remove it. If your content
                    has been infringed upon, please send a DMCA takedown
                    request. If you are aware of an infringement done for
                    someone else’s content, please submit it via our report
                    system: Knowledge Base | Royal Road.
                  </p>
                  <p className="mt-5">
                    Note that Fictions that are submitted to our platform are
                    checked for breaking any of the content guidelines. If
                    something later proves to break the guidelines, the novel
                    could be deleted and the account could be banned. These
                    guidelines also double for general posts on the site.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="originality">
                    Origniality
                  </h1>

                  <ul className="mt-5 ml-8 list-disc ">
                    <li className="py-2">
                      The Content must be submitted by either the author or
                      someone with permission from the author. Any content that
                      is available on other sites must be verified upon
                      submission.
                    </li>
                    <li className="py-2">
                      In case of a translation, you must have the original
                      author’s permission, the copyright holder’s permission,
                      and the translator’s permission to publish it here.
                    </li>
                    <li className="py-2">
                      If your content is based on another author’s setting,
                      characters, or terminology, it must be tagged as
                      fanfiction with the appropriate credit added in the
                      description, unless the following applies:
                      <div className="ml-3">
                        <p>
                          1. terminology is not specific to a certain fiction
                          and is widely used
                        </p>
                        <p>
                          2. and/or the characters are mythical or historical
                          creatures (i.e., out of copyright)
                        </p>
                        <p>
                          3. or you have the IP holder’s permission to not list
                          as a fanfiction.
                        </p>
                      </div>
                    </li>
                    <li className="py-2">
                      Fanfiction can't add donation links or buy internal
                      advertisements.
                    </li>
                  </ul>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="content">
                    Mature Content
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

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="language">
                    Language
                  </h1>
                  <p className="py-2">
                    We accept all languages. However, based on our users'
                    geographical locations, Royal Road predominantly has novels
                    in English. Accordingly, if the story is not in English, we
                    highly recommend adding what language the fiction is written
                    into its title.
                  </p>
                  <p className="py-2">
                    Examples: Fiction Title [French], Fiction Title
                    [Portuguese], Fiction Title [German], etc.
                  </p>
                  <ul className="mt-5 ml-8 list-disc">
                    <li className="py-2">
                      Reviews for stories can only be written in English or the
                      language of the novel.
                    </li>
                    <li className="py-2">
                      No derogatory Language. This is a website dedicated to
                      writing, and as such, we want to uphold our users to a
                      certain quality and allow them to improve. Accordingly,
                      when someone uses derogatory English [writ lik dis] they
                      are purposely trying to worsen the quality which is the
                      opposite of what we wish (which is for our users to
                      improve). Therefore if anyone uses derogatory language,
                      their posts will be considered as spam/trolling and will
                      be addressed accordingly. The only exception is when this
                      is used in a creative freedom for a character within a
                      story.
                    </li>
                  </ul>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="art">
                    ArtWork
                  </h1>
                  <p className="py-2">
                    Users are free to upload artwork as covers for their
                    fictions (or banners with Author Premium) or as their user
                    profile, and are welcome to share artwork in other parts of
                    the site including within their fictions. However, all
                    artwork posted to the site regardless of location must abide
                    by the same rules.
                  </p>
                  <ul className="mt-5 ml-8 list-disc">
                    <li className="py-2">
                      You must have permission or an appropriate license to use
                      the artwork.
                    </li>
                    <li className="py-2">
                      Mature artwork is prohibited and could result in an
                      immediate ban.
                    </li>
                    <li className="py-2">
                      Do not upload any artwork that breaks any of our
                      prohibited or restricted content policies.
                    </li>
                    <li className="py-2">
                      The Cover Art must be relevant to the story.
                    </li>
                  </ul>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="restriction">
                    Restriction on non-fictional world content
                  </h1>
                  <p className="py-2">
                    Royal Road is a platform dedicated to fictional content,
                    offering users an escape into a world of imagination. While
                    real-life people, current events, and real-world religions
                    can be incorporated into fictional stories with certain
                    limitations, they are strictly prohibited in other areas of
                    the site. The following guidelines aim to explain those
                    limitations. In general, we hope to avoid any sensitive
                    topics that could lead to conflicts and we wish to foster an
                    environment that prevents the generation of ill will among
                    users due to real-world content on an escapist plat
                  </p>
                  <p className="py-2">Rules</p>
                  <ul className="mt-5 ml-8 list-disc">
                    <li className="py-2">
                      In fictional stories, Real-Life People, Current Events,
                      Real-World Religions, and Real-World Politics can be used
                      within the narrative but must be approached with
                      discretion and respect.
                    </li>
                    <li className="py-2">
                      The written content should not be gratuitous or used to
                      incite conflicts or a heated reaction from readers due to
                      its real-world nature.
                    </li>
                    <li className="py-2">
                      Targeting of specific real-world races, cultures,
                      governments, corporations, or entities is not allowed.
                    </li>
                    <li className="py-2">
                      While you can draw inspiration from real-life situations,
                      avoid directly linking heavy topics to their real-world
                      counterparts or glorifying them. Examples of this include
                      sexual assault, self-harm, domestic violence, or child
                      abuse.
                    </li>
                    <li className="py-2">
                      These heavy topics can't be the story's focus.
                    </li>
                    <li className="py-2">
                      The only links allowed in the synopsis are other places
                      that are relevant to the fiction in question. Those links
                      must be at the bottom of the description and not at the
                      top. The links can’t be shortened links.
                    </li>
                    <li className="py-2">
                      Harmful Concepts and Mean-Spirited Content: Written
                      content intended to disgust, in poor taste, or with creepy
                      undertones must be handled sensitively and be used within
                      reason and with a purpose in the story.
                    </li>
                  </ul>

                  <p className="py-4">
                    Even with the relevant tags applied, avoid any extreme or
                    inappropriate content for the platform.
                  </p>
                  <p className="py-2">
                    {" "}
                    <strong>
                      While Royal Road tolerates a certain level of mature
                      content to allow authors their creative freedom, we still
                      have some prohibited content.
                    </strong>
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="prohibited">
                    prohibited
                  </h1>
                  <ul className="mt-5 ml-8 list-disc">
                    <li className="py-2">
                      Excessive sexual content is prohibited. The Sexual Content
                      tag does not enable a fiction to have eroticism or sexual
                      content as its primary focus. Erotic fictions are banned
                      from the site. In general, while a fiction may include
                      Sexual Content, it is prohibited from being the core
                      element or a centralized driving point of a story; you
                      must keep the Sexual Content to a minimum.
                    </li>
                    <li className="py-2">
                      Mature Content (see above) is only allowed within chapters
                      in fiction that are tagged as mature. It is prohibited to
                      use any Mature Content in the description or title of a
                      fiction, or anywhere else on the platform.
                    </li>
                    <li className="py-2">
                      For example, while you can include profanity in the novel
                      when it has the associated warning tag, you cannot include
                      profanity in anything that would show on the fiction page:
                      this includes the fiction's name, its chapter titles, and
                      its description. This rule also extends to censored
                      profanity.
                    </li>
                    <li className="py-2">
                      Sexual exploitation and abuse are prohibited:
                      <ul>
                        <li className="py-2">
                          Pedophilia, or stories involving sexual activities
                          with underage characters or individuals under the age
                          of 18, are prohibited. When there is Sexual Content
                          involving characters, there can be NO indication or
                          implication that the characters are, or appear to be,
                          under the age of 18. Situations in which this may be
                          ambiguous (differing speeds of maturity, altered flows
                          of time, mismatch between age and appearance, etc.)
                          must not include Sexual Content in any form. Even
                          fictional species need to be mature both by the
                          standards of their species AND in human terms.
                        </li>
                        <li className="py-2">
                          Normalizing, glorifying, or encouraging sexual
                          violence is prohibited.
                        </li>
                        <li className="py-2">
                          Glorified incest (sexual relations between parent,
                          child, sibling, or grandchild) is prohibited; the
                          inclusion of such content is only permitted when
                          there's a legitimate cause to include it in the story
                          (like "House Targaryen"). You may not include it
                          simply for the shock value or as a driving point.
                          Necrophilia and bestiality are also prohibited.
                        </li>
                      </ul>
                    </li>
                    <li className="py-2">
                      Glorifying egregious illegal acts is prohibited; this must
                      be grounded in reality:
                      <ul>
                        <li className="py-2">
                          Glorifying self-harm is prohibited. For example, it is
                          prohibited to glorify a suicidal character cutting
                          themselves, or otherwise harming themselves, on
                          purpose. A character repeatedly hitting a wall to
                          injure their fist in order to gain the fantasy skill
                          "Wall Fist", or a cultivator damaging their whole body
                          for Body Cultivation in a Wuxia theme, are NOT
                          prohibited. If the written content glorifies something
                          that a reader could repeat in the real world in the
                          event they found the material influential, its
                          depiction is prohibited.
                        </li>
                        <li className="py-2">
                          Do not glorify or encourage egregious real-world
                          illegal activities: to clarify matters regarding the
                          encouragement of illegal activities, if the content
                          resembles a recruitment pamphlet or manifesto
                          promoting illegal activities in the real world and has
                          the potential to influence, incite, or prompt a reader
                          to engage in such acts, then its portrayal is
                          prohibited. Examples of such prohibited activities
                          include glorifying domestic violence or animal
                          cruelty.
                        </li>
                        <li className="py-2">
                          Do not glorify or encourage the use of real-world
                          illegal drugs: concerning illegal drugs, the depiction
                          of fictional addictive substances, or substances that
                          alter a character's physical or mental states, that do
                          not bear a resemblance to the real world (potions,
                          invented substances, invented medicines, etc.) is not
                          prohibited so long as the material is more than
                          superficially distinct (e.g. glorifying "Kokaine" use,
                          such that readers might seek out actual cocaine, is
                          not permissible).
                        </li>
                      </ul>
                    </li>
                    <li className="py-2">
                      Offensive or Hate Speech is prohibited: avoid hate speech,
                      politically divisive content, or any insults directed
                      towards real-world religions. This category includes
                      content that promotes or glorifies harmful real-world
                      ideology, symbols, or related narratives (such as Nazi
                      ideologies).
                    </li>
                    <li className="py-2">
                      Titles can’t be offensive, vulgar, or infringing on
                      someone’s intellectual property rights.
                    </li>
                    <li className="py-2">
                      This is an escapist platform, do not include content about
                      recent or current events such as violent conflicts,
                      terrorist attacks, or epidemics (as non-fictional
                      content).
                    </li>
                  </ul>
                  <h1 className="text-[#337AB7] text-2xl mt-5" id="ai">
                    A.I. Content
                  </h1>
                  <p className="py-2">
                    You should tag your AI-Assisted or AI-Generated content with
                    the appropriate tag.
                  </p>
                  <p className="py-2">
                    <strong> AI-Assisted: </strong> The author has used an AI
                    tool for editing or proofreading. The story thus reflects
                    the author’s creativity and structure, but it may use the
                    AI’s voice and tone. There may be some negligible amount of
                    snippets generated by AI.
                  </p>
                  <p className="py-2">
                    <strong> AI-Genrated: </strong> The story was generated
                    using an AI tool; the author prompted and directed the
                    process, and edited the result.
                  </p>
                  <p className="py-2">
                    For a full explanation and breakdown please read the blog
                    post about our AI Text Policy.
                  </p>
                  <p className="py-2">
                    {" "}
                    <strong> Rules </strong>
                  </p>
                  <p className="py-2">
                    AI-assisted, or AI-generated content is only for authors
                    within their chapter pages. We simply wish to provide the
                    choice, but we do not want user interactions such as
                    comments, reviews, forum posts, or private messages to lose
                    the human voice.
                  </p>
                  <p className="py-2">
                    For novels that contain a negligible amount of AI-generated
                    snippets, you may tag them "AI-assisted" rather than
                    AI-generated content. But, please add a warning in the
                    author notes on the chapter with the AI-generated content.
                  </p>
                  <p className="py-2">If you use AI-generated content:</p>
                  <ul className="py-2 list-decimal">
                    <li className="py-2">
                      A high quality must be retained. AI-generated content must
                      be moderated and refined by the author to ensure quality,
                      continuity, and readability. You must avoid any low-effort
                      text generation.
                    </li>
                    <li className="py-2">
                      Reviews, comments, forum posts, or any type of user
                      interaction in general cannot include AI-generated content
                      unless it’s a quote.
                    </li>
                    <li className="py-2">
                      The AI-generated content cannot violate any laws and
                      cannot violate our rules and guidelines. As this is a new
                      topic, the laws might change in the future—any use of
                      AI-generated content is at your own risk.
                    </li>
                    <li className="py-2">
                      You must tag your story as “AI-Generated”. But, for now,
                      even if the story is not tagged as one, readers may say it
                      is one in their reviews.
                    </li>
                  </ul>
                  <p className="py-2">
                    <strong>Translations:</strong>
                  </p>
                  <p className="py-2">
                    We believe that in the future, the new standard for
                    translations will include AI translations as the basis,
                    followed by a human translator to guarantee accuracy and
                    intent.
                  </p>
                  <p className="py-2">
                    Accordingly, if you use AI to translate your content, and a
                    human who is knowledgeable of the original language and the
                    target language goes over the translation, there is no need
                    to tag the translation with AI-Assisted.
                  </p>
                  <p className="py-2">
                    If no human who is knowledgeable of the original language
                    and the target language goes over the translation to
                    guarantee accuracy and intent, then the translation must be
                    tagged as "AI-generated".
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#originality"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Originality
                      </a>
                      <br></br>
                      <a
                        href="#content"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Mature Content
                      </a>
                      <br></br>
                      <a
                        href="#language"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Language
                      </a>
                      <br></br>
                      <a
                        href="#art"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Artwork
                      </a>
                      <br></br>
                      <a
                        href="#restriction"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Restriction on Non-Fictional World Content
                      </a>
                      <br></br>
                      <a
                        href="#prohibited"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Prohibited
                      </a>
                      <br></br>
                      <a
                        href="#ai"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        AI Content
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

export default Contact;
