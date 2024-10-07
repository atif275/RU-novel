import React, { useState, useEffect } from 'react';
import { FaEyeSlash, FaHeart, FaBookmark, FaClock, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SidePanel = ({ authorName, bookName }) => {
  const email = useSelector((state) => state.userData.email); // Get the email of the currently logged-in user
  const theme = useSelector((state) => state.userData.theme); // Get current theme for dark mode

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [toggle, setToggle] = useState(false); // Ensure state is defined if used
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isReadLater, setIsReadLater] = useState(false);
  const [isNotInterested, setIsNotInterested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track whether a rating is being submitted

  const notifySuccess = (message, toastId) => {
    toast.success(message, { toastId });
  };

  const notifyError = (message, toastId) => {
    toast.error(message, { toastId });
  };

  const notifyInfo = (message) => toast.info(message);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setRating(0); // Reset the rating when switching books

        const response = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
        const { favorites, follows, readLater, notInterested } = response.data;

        setIsFavorite(favorites.includes(bookName));
        setIsFollowing(follows.includes(authorName));
        setIsReadLater(readLater.includes(bookName));
        setIsNotInterested(notInterested.includes(bookName));

        const ratingResponse = await axios.get(`https://api.ru-novel.ru/api/book/${bookName}/getrate`, {
          params: { email },
        });
        if (ratingResponse.data.rating !== null) {
          setRating(ratingResponse.data.rating);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email, bookName, authorName]);

  const handleRatingSubmit = async (newRating) => {
    if (!email) {
      notifyInfo('Please log in to submit a rating.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true); // Disable further submissions

    const toastId = 'ratingToast'; // Unique toast ID for rating

    try {
      toast.dismiss(toastId); // Dismiss previous toasts with the same ID

      const response = await axios.post(`https://api.ru-novel.ru/api/book/${bookName}/rate`, {
        rating: newRating,
        email,
      });

      setRating(newRating); // Update the rating state
      notifySuccess('Rating updated successfully!', toastId);
    } catch (error) {
      notifyError('Error submitting rating.', toastId);
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submission after the operation
    }
  };

  const handleFavorite = async () => {
    if (!email) {
      notifyInfo('Please log in to add to favorites.');
      return;
    }
    try {
      const response = await axios.post(`https://api.ru-novel.ru/api/user/favorite`, { bookName, email }, { withCredentials: true });

      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        notifySuccess(`Book ${isFavorite ? 'removed from' : 'added to'} favorites successfully!`);
      } else {
        notifyError('Error updating favorites.');
      }
    } catch (error) {
      notifyError('Error updating favorites.');
      console.error('Error updating favorites:', error);
    }
  };

  const handleFollow = async () => {
    if (!email) {
      notifyInfo('Please log in to follow an author.');
      return;
    }
    try {
      const apiEndpoint = isFollowing ? 'unfollow' : 'follow';
      const response = await axios.post(`https://api.ru-novel.ru/api/user/${apiEndpoint}`, { authorName, email }, { withCredentials: true });

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        notifySuccess(`Author ${isFollowing ? 'unfollowed' : 'followed'} successfully!`);
      } else {
        notifyError('Error updating follow status.');
      }
    } catch (error) {
      notifyError('Error updating follow status.');
      console.error('Error updating follow status:', error);
    }
  };

  const handleReadLater = async () => {
    if (!email) {
      notifyInfo('Please log in to add to Read Later.');
      return;
    }
    try {
      const apiEndpoint = isReadLater ? 'removereader' : 'readlater';
      const response = await axios.post(`https://api.ru-novel.ru/api/user/${apiEndpoint}`, { bookName, email }, { withCredentials: true });

      if (response.status === 200) {
        setIsReadLater(!isReadLater);
        notifySuccess(`Book ${isReadLater ? 'removed from' : 'added to'} Read Later successfully!`);
      } else {
        notifyError('Error updating Read Later.');
      }
    } catch (error) {
      notifyError('Error updating Read Later.');
      console.error('Error updating Read Later:', error);
    }
  };

  const handleNotInterested = async () => {
    if (!email) {
      notifyInfo('Please log in to mark as Not Interested.');
      return;
    }
    try {
      const apiEndpoint = isNotInterested ? 'removeNotInterested' : 'notinterested';
      const response = await axios.post(`https://api.ru-novel.ru/api/user/${apiEndpoint}`, { bookName, email }, { withCredentials: true });

      if (response.status === 200) {
        setIsNotInterested(!isNotInterested);
        notifySuccess(`Book ${isNotInterested ? 'removed from' : 'marked as'} Not Interested successfully!`);
      } else {
        notifyError('Error updating Not Interested.');
      }
    } catch (error) {
      notifyError('Error updating Not Interested.');
      console.error('Error updating Not Interested:', error);
    }
  };

  // Conditional styling for light and dark modes
  const containerStyles = theme === 'dark' ? 'bg-[#000000] text-white' : 'bg-gray-200 text-black';
  const cardStyles = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const buttonActiveStyles = theme === 'dark' ? 'bg-[#334499]' : 'bg-blue-300';
  const iconColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`w-full pt-4 space-y-4 mb-4 ${containerStyles}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {/* Mark as Not Interested */}
      <div
        className={`flex items-center gap-4 p-3 shadow-md cursor-pointer ${isNotInterested ? buttonActiveStyles : cardStyles}`}
        onClick={handleNotInterested}
      >
        <FaEyeSlash className={iconColor} />
        <div className="flex flex-col text-[14px]">
          <div>Mark as</div>
          <div className="font-bold">NOT INTERESTED</div>
        </div>
      </div>

      {/* Rate it */}
      <div className={`${cardStyles} p-3 shadow-md flex flex-col items-center space-y-2`}>
        <span className="font-semibold text-sm">Rate it</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`cursor-pointer text-xl ${index < (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-400'}`}
              onClick={() => {
                setRating(index + 1);
                handleRatingSubmit(index + 1); // Submit the rating when clicked
              }}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>

      {/* Follow, Favorite, Read Later */}
      <div className="flex justify-between text-[11px]">
        <div
          className={`p-2 shadow-md items-center cursor-pointer flex flex-col w-[32%] ${isFollowing ? buttonActiveStyles : cardStyles}`}
          onClick={handleFollow}
        >
          <FaBookmark className={iconColor} />
          <span>Follow</span>
        </div>
        <div
          className={`p-2 shadow-md items-center cursor-pointer flex flex-col w-[32%] ${isFavorite ? buttonActiveStyles : cardStyles}`}
          onClick={handleFavorite}
        >
          <FaHeart className={iconColor} />
          <span>Favorite</span>
        </div>
        <div
          className={`p-2 shadow-md flex flex-col items-center cursor-pointer w-[32%] ${isReadLater ? buttonActiveStyles : cardStyles}`}
          onClick={handleReadLater}
        >
          <FaClock className={iconColor} />
          <span>Read Later</span>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;