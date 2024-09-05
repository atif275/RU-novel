import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Genres = () => {
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
                      className="hover:underline hover:text-blue-900 transition-colors "
                    >
                      Notifications
                    </Link>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-[#000000CC] mr-1 "
                    />
                    <Link
                      to="/support/knowledgebase/genres-and-tags"
                      className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-[#000000CC] mr-1"
                      />
                      <Link
                        to="/support/knowledgebase/genres-and-tags"
                        className="hover:underline hover:text-blue-900 text-[#000000CC] transition-colors"
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
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Genres
                      </a>
                      <br></br>
                      <a
                        href="#tags"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Tags
                      </a>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4  ">
                <div className="text-[#000000CC]">
                  <h1 className="text-4xl ">Genres</h1>

                  <h1 className="text-[#337AB7] text-3xl mt-5" id="genres">
                    Genres
                  </h1>
                  <p className="mt-3">List of all available genres</p>

                  <p class="py-4">
                    <strong>Drama</strong>
                    <br></br>
                    <br></br> Dramatic stories focus on emotional themes and
                    interpersonal relationships. These stories feature realistic
                    characters and their emotional development.
                  </p>

                  <p class="py-4">
                    <strong>Fantasy</strong>
                    <br></br>
                    <br></br> Fantasy stories involve supernatural elements such
                    as magic and mythological creatures. These imaginative
                    stories can depict the real world with fantasy elements (low
                    fantasy) or take place in a completely reimagined fantasy
                    world (high fantasy).
                  </p>

                  <p class="py-4">
                    <strong>Historical</strong>
                    <br></br>
                    <br></br> Historical stories take place in a setting located
                    in the past. Stories will include accurate details about the
                    manners and socioeconomic conditions of the era.
                  </p>

                  <p class="py-4">
                    <strong>Horror</strong>
                    <br></br>
                    <br></br> Horror stories are intended to inspire feelings of
                    horror or terror in the reader. They often focus on elements
                    of death, afterlife, and evil. They are often supernatural,
                    but do not have to be.
                  </p>

                  <p class="py-4">
                    <strong>Mystery</strong>
                    <br></br>
                    <br></br> Mystery stories revolve around characters
                    attempting to figure out a puzzling crime or perplexing
                    situation.
                  </p>

                  <p class="py-4">
                    <strong>Psychological</strong>
                    <br></br>
                    <br></br> Psychological stories focus on the inner action of
                    the characters, including motives, thoughts, and emotions
                    from which plot events result. Characterization is
                    particularly important to the story. Psychological thriller
                    is a subgenre characterizing unstable psychological states.
                  </p>

                  <p class="py-4">
                    <strong>Romance</strong>
                    <br></br>
                    <br></br> Romance stories focus on the relationship and
                    romantic love between people. Stories will often involve
                    dramatic elements. Pure romance stories will have a
                    satisfying and optimistic ending.
                  </p>

                  <p class="py-4">
                    <strong>Satire</strong>
                    <br></br>
                    <br></br> A genre in which vices, follies, abuses, and
                    shortcomings are held up to ridicule, ideally with the
                    intent of shaming individuals, corporations, government, or
                    society itself into improvement.
                  </p>

                  <p class="py-4">
                    <strong>Sci-fi</strong>
                    <br></br>
                    <br></br> Science fiction stories take place in imaginative,
                    futuristic settings. Common elements include space travel,
                    advanced technology, time travel, parallel universes, and
                    extraterrestrial life.
                  </p>

                  <p class="py-4">
                    <strong>Short Story</strong>
                    <br></br>
                    <br></br> Short stories are pieces intended to be read in
                    one sitting. Because of its condensed form, short stories
                    often have brief or skipped introductions, as well as
                    open-ended or abrupt conclusions. Plot is condensed, and
                    these stories are less complex than full novels.
                  </p>

                  <p class="py-4">
                    <strong>Tragedy</strong>
                    <br></br>
                    <br></br> Tragedy is a form of drama that invokes human
                    suffering. Classic tragic stories are intended to provide
                    catharsis or purging of negative emotion in the audience.
                    Stories involve a noble character brought low by fate or
                    circumstance.
                  </p>

                  <h1 className="text-[#337AB7] text-3xl mt-5 " id="tags">
                    Tags
                  </h1>

                  <p className="py-4">
                    A more fine-grained system of themes and tropes is the
                    Tagging system. Here you can find a wider selection of
                    themes and topics to choose from. Users searching for
                    specific fictions to read will be using a combination of
                    tags to find fictions with themes and topics they find
                    appealing. It is important to have your fiction correctly
                    tagged for this reason. Tagging your fiction as Hard Sci-fi
                    when it also clearly has magic and fantasy elements is
                    incorrect and will mislead potential readers.
                  </p>

                  <p className=" mt-5 " id="change">
                    List of all available tags
                  </p>
                  <p class="py-4">
                    <strong>Anti-Hero Lead</strong>
                    <br></br>
                    <br></br> Anti-Hero Lead stories depict leading characters
                    that lack the usual heroic qualities such as idealism,
                    courage, or morality. Usually, anti-heroes blur the lines
                    between a protagonist and an antagonist, depicting the
                    characteristics of both.
                  </p>

                  <p class="py-4">
                    <strong>Artificial Intelligence</strong>
                    <br></br>
                    <br></br> A subgenre focusing on characters or major actors
                    that are advanced AI.
                  </p>

                  <p class="py-4">
                    <strong>Attractive MC</strong>
                    <br></br>
                    <br></br> The main character of this novel is exceptionally
                    attractive - to the point where it deserves an extra tag on
                    the story due to the sheer significance.
                  </p>

                  <p class="py-4">
                    <strong>Cyberpunk</strong>
                    <br></br>
                    <br></br> Cyberpunk is a subgenre of science fiction that
                    focuses on technological advancements themselves. They
                    usually feature a change of social order because of said
                    advancements.
                  </p>

                  <p class="py-4">
                    <strong>Dungeon</strong>
                    <br></br>
                    <br></br> A type of fiction that takes place or focuses on
                    loot-bearing Dungeons similar to the eponymous RPG. Also
                    includes a theme of the Main Character being the Dungeon
                    itself or controlling it.
                  </p>

                  <p class="py-4">
                    <strong>Dystopia</strong>
                    <br></br>
                    <br></br> A society where the common person's living
                    conditions are undesirable or frightening, often with a
                    totalitarian government/authority.
                  </p>

                  <p class="py-4">
                    <strong>Female Lead</strong>
                    <br></br>
                    <br></br> Female Lead stories have, unsurprisingly, a
                    leading female human character, or of any particular sapient
                    humanoid race.
                  </p>

                  <p class="py-4">
                    <strong>First Contact</strong>
                    <br></br>
                    <br></br> A story focusing on the first meeting between two
                    or more species or societies and the events that occur
                    because.
                  </p>

                  <p class="py-4">
                    <strong>Game Lit</strong>
                    <br></br>
                    <br></br> Novels set in game-like worlds of any game genre.
                    Does not need to heavily focus on visual statistics.
                  </p>

                  <p class="py-4">
                    <strong>Gender Bender</strong>
                    <br></br>
                    <br></br> Gender Bender fictions utilize the theme of gender
                    swapping. The gender swapping can be temporary or permanent,
                    full, or partial, and may or may not be the theme based on
                    which the fiction revolves.
                  </p>

                  <p class="py-4">
                    <strong>Genetically Engineered</strong>
                    <br></br>
                    <br></br> Characters are genetically modified to be superior
                    to their original species.
                  </p>

                  <p class="py-4">
                    <strong>Grimdark</strong>
                    <br></br>
                    <br></br> Grimdark is a subgenre or a way to describe the
                    tone, style or setting of speculative fiction (especially
                    fantasy) that is, depending on the definition used, markedly
                    dystopian or amoral, or particularly violent or realistic.
                  </p>

                  <p class="py-4">
                    <strong>Hard Sci-fi</strong>
                    <br></br>
                    <br></br> Uses theoretically possible science and attempts
                    to explain how the science works; does not include fantasy
                    elements.
                  </p>

                  <p class="py-4">
                    <strong>Harem</strong>
                    <br></br>
                    <br></br> Harem stories depict characters, which may or may
                    not be the main character, in polyamorous and/or polygamous
                    relationships.
                  </p>

                  <p class="py-4">
                    <strong>High Fantasy</strong>
                    <br></br>
                    <br></br> Defined by its epic nature, High Fantasy takes
                    place in an alternate world with its own rules and laws.
                  </p>

                  <p class="py-4">
                    <strong>LitRPG</strong>
                    <br></br>
                    <br></br> Novels where linear progression, such as levels,
                    are main themes of the story. Almost always shows stat
                    boxes, EXP gain, and other notifications.
                  </p>

                  <p class="py-4">
                    <strong>Loop</strong>
                    <br></br>
                    <br></br> Characters relive the same time period through a
                    loop; may or may not involve alternate timelines.
                  </p>

                  <p class="py-4">
                    <strong>Low Fantasy</strong>
                    <br></br>
                    <br></br> A type of fantasy that takes place in the real
                    world, putting fantastical elements in an otherwise natural
                    setting.
                  </p>

                  <p class="py-4">
                    <strong>Magic</strong>
                    <br></br>
                    <br></br> Magic fictions contain the use or means of magic
                    (as charms or spells) that have supernatural power over
                    natural forces. Practitioners are commonly referred to as
                    mages (or magi), witches and warlocks, wizards, and
                    sorcerers. Most commonly used in fantasy fictions.
                  </p>

                  <p class="py-4">
                    <strong>Male Lead</strong>
                    <br></br>
                    <br></br> Male Lead stories have, you guessed it, a leading
                    male human character, or of any particular sapient humanoid
                    race.
                  </p>

                  <p class="py-4">
                    <strong>Martial Arts</strong>
                    <br></br>
                    <br></br> Martial arts stories commonly describe to great
                    detail the intricacies of western or eastern combat.
                  </p>

                  <p class="py-4">
                    <strong>Multiple Lead Characters</strong>
                    <br></br>
                    <br></br> Multiple Lead Characters fictions depict stories
                    said from points of view of a number of characters, the
                    actual number varying between two and too many to count. The
                    characters can be of any gender and race.
                  </p>

                  <p class="py-4">
                    <strong>Mythos</strong>
                    <br></br>
                    <br></br> A type of fiction focusing on mythology, such as
                    deities and elements of the divine, or the occult.
                  </p>

                  <p class="py-4">
                    <strong>Non-Human Lead</strong>
                    <br></br>
                    <br></br> Non-Human Lead stories have main character(s) not
                    be human, whether partially or completely. The term may
                    include or exclude humanoid fantastical races. The main
                    theme of said stories can be the loss or redefinition of the
                    term human or humane.
                  </p>

                  <p class="py-4">
                    <strong>Portal Fantasy / Isekai</strong>
                    <br></br>
                    <br></br> Features a fantastical world that is entered
                    through a portal or some other means and differs from the
                    real world. In Japan, this type of work is known as isekai
                    (different world).
                  </p>

                  <p class="py-4">
                    <strong>Post-Apocalyptic</strong>
                    <br></br>
                    <br></br> The world has been ruined, and this is the story
                    of the survivors.
                  </p>

                  <p class="py-4">
                    <strong>Progression</strong>
                    <br></br>
                    <br></br> Characters work to improve themselves over time
                    rather than acquiring rapid growth, usually through
                    training, grinding, studying, and/or introspection.
                  </p>

                  <p class="py-4">
                    <strong>Reader Interactive</strong>
                    <br></br>
                    <br></br> Reader Interactive uses reader inputs (usually
                    polls) to define the progression of the novel. They can also
                    be “choose your own adventure” stories, told in second
                    person narrative.
                  </p>

                  <p class="py-4">
                    <strong>Reincarnation</strong>
                    <br></br>
                    <br></br> Reincarnation utilizes a common theme of a
                    person's life restarting or beginning anew after their
                    death, not necessarily connected to the teachings of
                    Hinduism and Buddhism.
                  </p>

                  <p class="py-4">
                    <strong>Ruling Class</strong>
                    <br></br>
                    <br></br> Focuses on managing cities, castles, or entire
                    worlds. Usually features nobility.
                  </p>

                  <p class="py-4">
                    <strong>School Life</strong>
                    <br></br>
                    <br></br> School Life stories usually place their characters
                    in a setting regarding education and schooling. The main
                    character(s) are usually students in the institutions.
                    School Life may be a primary theme or can just span a
                    portion of the story.
                  </p>

                  <p class="py-4">
                    <strong>Secret Identity</strong>
                    <br></br>
                    <br></br> Secret Identity fictions use the theme of
                    subterfuge and secrecy employed by one or more characters
                    (main or otherwise) to pose as different personae. The
                    secret identity is usually vital to the story or setting.
                  </p>

                  <p class="py-4">
                    <strong>Slice of Life</strong>
                    <br></br>
                    <br></br> Slice of Life stories usually depict snippets or
                    parts of one or more characters’ life, which may or may not
                    be connected to the main plot themselves. There doesn’t even
                    have to be a main plot in a traditional sense.
                  </p>

                  <p class="py-4">
                    <strong>Soft Sci-fi</strong>
                    <br></br>
                    <br></br> Uses futuristic-type science, but doesn't explain
                    how the technology works and the science isn’t necessarily
                    realistic or feasible.
                  </p>

                  <p class="py-4">
                    <strong>Space Opera</strong>
                    <br></br>
                    <br></br> A subgenre of science fiction that focuses on
                    space warfare, interplanetary battles, futuristic weapons,
                    and is usually set in outer space. May include subthemes of
                    chivalry and romance.
                  </p>

                  <p class="py-4">
                    <strong>Sports</strong>
                    <br></br>
                    <br></br> Sports fictions focus on competitive displays of
                    physical or mental prowess. The sports can be real or
                    imaginary, but usually have to contain a self-explanatory
                    set of rules.
                  </p>

                  <p class="py-4">
                    <strong>Steampunk</strong>
                    <br></br>
                    <br></br> A subgenre of science fiction inspired by and
                    incorporating 19th-century industrial steam-powered
                    machinery and technology, usually set in an alternate
                    Victorian Era or the Wild West.
                  </p>

                  <p class="py-4">
                    <strong>Superhero</strong>
                    <br></br>
                    <br></br> Superhero fictions focus on characters with
                    enhanced abilities, superior to that of normal men and
                    women. These characters can possess superhuman strength,
                    super speed, flying abilities, etc.
                  </p>

                  <p class="py-4">
                    <strong>Time Travel</strong>
                    <br></br>
                    <br></br> Characters travel back in time to relive or fix a
                    moment. May or may not have alternate timelines.
                  </p>

                  <p class="py-4">
                    <strong>Transhumanism</strong>
                    <br></br>
                    <br></br> A futuristic subgenre that features human
                    characters enhanced by science and technology beyond the
                    physical norm, such as cybernetic parts.
                  </p>

                  <p class="py-4">
                    <strong>Virtual Reality</strong>
                    <br></br>
                    <br></br> Virtual Reality fictions involve characters
                    entering or being stuck in simulated realities.
                  </p>

                  <p class="py-4">
                    <strong>Western</strong>
                    <br></br>
                    <br></br> Inspired by the 19th-century American Wild West,
                    westerns feature cowboys, frontiersmen, outlaws, and lawmen
                    with gunfights and horse riding.
                  </p>
                </div>
              </div>
              <div className="hidden md:inline md:w-[24%]  ">
                <div className="backdrop">
                  <strong>In this article</strong>
                  <div className="ml-5 text-blue-700">
                    <div>
                      <a
                        href="#genres"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Genres
                      </a>
                      <br></br>
                      <a
                        href="#tags"
                        className="hover:underline hover:text-blue-900 transition-colors"
                      >
                        Tags
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

export default Genres;
