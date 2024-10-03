import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faBook, faChevronDown, faTrophy, faCaretSquareRight, faFlagCheckered, faMagnifyingGlass,
  faChartBar, faChartLine, faClock, faSync, faStar, faRandom, faPencil, faComments, faUsers,
  faLifeRing, faQuestionCircle, faLightbulb, faCheckCircle, faHeadset,
  faList
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';



const Navbar = () => {

  const auth = useSelector((state) => state.userData.isAuthenticated)

  const [checkClick, setClick] = useState(false);
  const [ReviwClick, setReviewClick] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownRefReview = useRef(null);
  const theme = useSelector(state => state.userData.theme);
  const user = useSelector(state => state.userData.user); // Access the entire user object
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(false);
  const handleClickRead = () => {
    if (checkClick == true) {
      setClick(false);
    } else {
      setClick(true);
    }

  };

  console.log(checkClick)
  const handleClickReview = () => {
    setReviewClick(!ReviwClick);
  };
  const handle = (e) => {
    e.preventDefault()
    if (auth) {
      navigate('/support/ticket')
    }
    else {
      navigate('/login')
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.setSearchQuery(inputRef.current.value))
    navigate('/search');
  };



  const handleAuthorDashboardClick = () => {
    if (user.username) { // Check if user and username exist
      if (user.role == "author") {
        navigate('/author-dashboard');
      }
      else {
        navigate('/admin-dashboard');

      }

    } else {
      navigate('/login');
    }
  };

  const handlePremiumPageClick = () => {
    if (user.username) { // Check if user and username exist
      navigate('/premium');

    } else {
      navigate('/login');
    }
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClick(false); // Close the dropdown
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the dropdown
      if (dropdownRefReview.current && !dropdownRefReview.current.contains(event.target)) {
        setReviewClick(false); // Close the dropdown
      }
    };//

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRefReview]);




  useEffect(() => {
    // Function to check if the screen size is for desktop
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px is a common desktop breakpoint
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Run the check on initial load
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`w-full text-[#bcc2cb] ${theme === 'dark' ? 'bg-[#181818]' : 'bg-navbar-bg'}`}>
      <div className="container  mx-auto px-4 flex  flex-col lg:flex-row items-center justify-between">
        {/* Navbar Items */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-auto lg:space-x-4 space-y-4 lg:space-y-0">
          <ul className="flex flex-col lg:ml-20 lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 w-full lg:w-auto">
            <li ref={dropdownRef} className="relative group">
              <button className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm" style={{ height: '100%' }} onClick={handleClickRead} onMouseEnter={() =>isDesktop &&  setClick(true)}
      onMouseLeave={() => isDesktop && setClick(false)}>
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                Read
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              <ul style={{ zIndex: 10 }} className={`absolute    ${checkClick ? 'group-hover:block' : 'hidden'}  text-[#bcc2cb] space-y-2 w-48 text-sm ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-600'}`}>
                <li>
                  <Link to="/fictions/best-rated" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faTrophy} className="mr-2 text-[#6fa7d7]" />
                    Best Rated
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/trending" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faChartBar} className="mr-2 text-[#6fa7d7]" />
                    Trending
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/active-popular" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faCaretSquareRight} className="mr-2 text-[#6fa7d7]" />
                    Ongoing Fictions
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/complete" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faFlagCheckered} className="mr-2 text-[#6fa7d7]" />
                    Complete
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/weekly-popular" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faChartLine} className="mr-2 text-[#6fa7d7]" />
                    Popular this week
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/latest-updates" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-[#6fa7d7]" />
                    Latest Updates
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/new" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faSync} className="mr-2 text-[#6fa7d7]" />
                    Newest Fictions
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/rising-stars" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faStar} className="mr-2 rotate-180 text-[#6fa7d7]" />
                    Rising Stars
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/writathon" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faFlagCheckered} className="mr-2 text-[#6fa7d7]" />
                    Writathon
                  </Link>
                </li>
                <li>
                  <Link to="/fictions/search" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2 text-[#6fa7d7]" />
                    Search
                  </Link>
                </li>
                <li>
                  {/* <Link to="/fiction/random" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faRandom} className="mr-2 text-[#6fa7d7]" /> 
                    Surprise me!
                  </Link> */}
                </li>
              </ul>
            </li>
            <li>
              {/* <Link to="/author-dashboard"  style={{height: '100%'}} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faPencil} className="mr-2" /> 
                Write
              </Link> */}
              <button onClick={handleAuthorDashboardClick} style={{ height: '100%' }} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faPencil} className="mr-2" />
                Write
              </button>
            </li>
            <li>
              <Link to="/forums" style={{ height: '100%' }} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Forums
              </Link>
            </li>
            <li>
              <Link to="/user/memberlist" style={{ height: '100%' }} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Member List
              </Link>
            </li>
            <li ref={dropdownRefReview} className="relative group">
              <button className={`flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm ${theme === 'dark'}`} style={{ height: '100%' }} onClick={handleClickReview} onMouseEnter={() =>isDesktop &&  setReviewClick(true)}
      onMouseLeave={() => isDesktop && setReviewClick(false)}>
                <FontAwesomeIcon icon={faLifeRing} className="mr-2" />
                Support
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              <ul style={{ zIndex: 10 }} className={`absolute ${ReviwClick ? 'group-hover:block' : 'hidden'}  text-[#bcc2cb] space-y-2 w-48 text-sm ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-600'}`} >
                <li>
                  <Link to="/support/knowledgebase" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-[#6fa7d7]" />
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/support/suggestions" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-[#6fa7d7]" />
                    Suggestions
                  </Link>
                </li>
                <li>
                  <Link to="/forums" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faUsers} className="mr-2 text-[#6fa7d7]" />
                    Community Help
                  </Link>
                </li>
                <li>
                  <button className="flex items-center px-3 py-1 hover:bg-[#55616f] " onClick={handle}>
                    <FontAwesomeIcon icon={faHeadset} className="mr-2 text-[#6fa7d7]" />
                    Support Tickets
                  </button>
                </li>
                <li>
                  <Link to="/support/status" className="flex items-center px-3 py-1 hover:bg-[#55616f]">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-[#6fa7d7]" />
                    Status
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              {/* <Link to="/premium" style={{height: '100%'}} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faStar} className="mr-2" /> 
                Premium
              </Link> */}
              <button onClick={handlePremiumPageClick} style={{ height: '100%' }} className="flex items-center px-2 py-3 hover:bg-[#55616f] hover:text-white text-sm">
                <FontAwesomeIcon icon={faStar} className="mr-2" />
                Premium
              </button>
            </li>
          </ul>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="my-2 text-sm relative flex items-center lg:ml-auto lg:w-auto w-full">
          <div className="relative border border-[#38414c] flex-grow bg-[#38414c]    ">
            <input
              type="text"
              placeholder="Search title..."
              name="title"
              className="p-2 bg-[#38414c] pr-10 border-0 outline-none transition-transform duration-300 w-full"
              aria-label="Fiction search"

              ref={inputRef}


            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </button>
          </div>
          <div className="xs:block">
            <Link
              className="btn btn-icon-only p-2 mr-2 btn-primary popovers adv-search rounded-lg shadow  transition-all duration-200"

              to="/fictions/advanced/search"
            >
              <FontAwesomeIcon icon={faList} className='hover:bg-[#28587a] text-white text-lg p-2 bg-[#337ab7]' />
            </Link>
          </div>


        </form>
      </div>
    </div>
  );
};

export default Navbar;
