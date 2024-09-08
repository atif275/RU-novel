import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faStar as faStarEmpty, faUsers, faStar, faBook, faEye, faList, faCalendar, faCaretRight } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

const FictionListItem = (props) => {
  const dispatch = useDispatch();

  const fetchSearchResults3 = async () => {
    try {
      const response = await fetch('https://api.ru-novel.ru/api/bookOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: props.title }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(userActions.setBooksTouched());
        dispatch(userActions.setBooksDes(data.description));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5; // Check if there's a half star

    return (
      <div className="flex items-center">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={`full-${index}`} icon={faStar} className="text-yellow-500" />
        ))}
        {/* Half star */}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row bg-white p-4 rounded-md shadow-md mb-6">
      <figure className="w-full md:w-1/3 lg:w-1/4 flex justify-center items-center mb-4 md:mb-0">
        <Link to={`/fiction/${(props._id)}/${props.title}`} className="w-[40%] sm:w-[40%] md:w-[80%]">
          <img
            src={props.image}
            alt={props.title}
            className="sm:w-[80%] md:w-full h-auto object-cover rounded"
          />
        </Link>
      </figure>
      <div className="flex-1 md:pl-4">
        <h2 className="text-lg font-bold text-red-600 mb-2">
          {/* <Link to={`/fiction/${generateSlug(props.title)}`}>{props.title}</Link> */}
          <Link to={`/fiction/${(props._id)}/${props.title}`}>{props.title}</Link>
        </h2>
        <div className="mb-4 mt-4">
          <span className="flex flex-wrap">
            {props.tags.map((tag, index) => (
              <Link key={index} className="bg-[#5e738b] text-white text-xs px-2 py-1 rounded-full mr-2 mb-2" to={`/fictions/search?tagsAdd=${tag}`}>
                {tag}
              </Link>
            ))}
          </span>
        </div>
        <div className="sm:flex justify-between gap-4">
          <div>
            <div className="w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              <span onClick={fetchSearchResults3}>{props.stats.followers}</span> <span className="ml-1">FOLLOWERS</span>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center">
              {/* <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" /> */}
              {/* <span className="text-red-600">{props.stats.rating.overall}</span>
              <span className="ml-2">Stars</span> */}
              {/* Render stars based on rating */}
              {renderStars(props.stats.rating.overall)}
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              <span>{props.stats.pages}</span> <span className="ml-1">PAGES</span>
            </div>
          </div>
          <div className="mr-4">
            <div className="w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              <span>{props.stats.views}</span> <span className="ml-1">VIEWS</span>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 text-[#5e738b] font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              <span>{props.stats.chapters}</span> <span className="ml-1">CHAPTERS</span>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-full text-[#5e738b] font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              <time dateTime={props.stats.updatedDate}>{props.stats.updatedDate}</time>
            </div>
          </div>
          <div className="hidden md:block">
            <button onClick={fetchSearchResults3}>
              <FontAwesomeIcon icon={faCaretRight} className="text-gray-500 text-2xl mr-4 mt-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export default FictionListItem;