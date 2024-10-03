import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // To access the logged-in user's data
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChCommentData from '../components/ChCommentData2';
import ReviewSection from '../components/ReviewCard2';
import axios from 'axios';
import {
  faBookOpen,
  faFileAlt,
  faFileWord, // Correct icon for "Total Words"
  faStar,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const dashboardItems = [
    { key: 'fictionsCount', title: 'Fictions', icon: faBookOpen },
    { key: 'totalChapters', title: 'Total Chapters', icon: faFileAlt },
    { key: 'totalWords', title: 'Total Words', icon: faFileWord },
    { key: 'reviewsReceived', title: 'Reviews Received', icon: faStar },
    { key: 'uniqueFollowers', title: 'Unique Followers', icon: faUsers }
];

export const AuthorDashboard= ({ onNewFiction }) =>  {
    const [reviews, setReviews] = useState([]);
    const email = useSelector((state) => state.userData.email);
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [replyContent, setReplyContent] = useState(''); // Define state in CommentsList
    const [showReplyEditor, setShowReplyEditor] = useState(false); // Define state in CommentsList
    const [selectedCommentId, setSelectedCommentId] = useState(null);
  
  
    useEffect(() => {
      const fetchUserAndReviews = async () => {
        try {
          // Fetch the username based on the email
          const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
          const { username } = userResponse.data;
          setUsername(username);
  
          // Fetch the reviews by the username
          const reviewsResponse = await axios.get(`https://api.ru-novel.ru/api/reviews/usersss/${username}`);
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error('Error fetching user data and reviews:', error);
        }
      };
      const fetchUserAndComments = async () => {
        try {
          // Fetch the username based on the email
          const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
          const { username } = userResponse.data;
          setUsername(username);
  
          // Fetch the comments by the username
          const commentsResponse = await axios.get(`https://api.ru-novel.ru/api/commentss/usersss/${username}`);
          setComments(commentsResponse.data);
        } catch (error) {
          console.error('Error fetching user data and comments:', error);
        }
      };
  
      if (email) {
        fetchUserAndReviews();
        fetchUserAndComments();
      }
    }, [email]);
  
    const handleReviewDelete = (reviewId) => {
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    };
    const handlePostReply = async (commentId, replyContent) => {
        if (!replyContent.trim()) return; // Check if the reply content is valid
      
        try {
          // Fetch the user data based on the logged-in email
          const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
          const { username, profilePicture } = userResponse.data;
      
          // Construct the reply object with all necessary data
          const reply = {
            author: username,
            pfp: profilePicture,
            text: replyContent,
            datetime: new Date(),
            repcount: 0,
          };
      
          // Post the reply to the server
          const response = await axios.post(`https://api.ru-novel.ru/api/comments/${commentId}/reply`, reply);
      
          // Update the comments state with the new reply
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === commentId
                ? { ...comment, replies: [...comment.replies, response.data] }
                : comment
            )
          );
      
          // Reset the reply editor and close it
          setReplyContent('');
          setShowReplyEditor(false);
          // Optionally, show a success message
          // toast.success('Reply posted successfully!');
        } catch (error) {
          console.error('Error posting reply:', error);
          // Optionally, show an error message
          // toast.error('Failed to post reply.');
        }
      };
      
      // Function to handle adding +Rep to a comment
      const handleAddRepToComment = async (commentId) => {
        try {
          const response = await axios.post(`https://api.ru-novel.ru/api/comments/${commentId}/rep`);
          // Update the rep count of the comment
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === commentId
                ? { ...comment, repcount: response.data.repcount }
                : comment
            )
          );
        } catch (error) {
          console.error('Error adding +Rep to comment:', error);
        }
      };
    
      // Function to handle adding +Rep to a reply
      const handleAddRepToReply = async (commentId, replyId) => {
        try {
          const response = await axios.post(`https://api.ru-novel.ru/api/comments/${commentId}/reply/${replyId}/rep`);
          // Update the rep count of the reply
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply._id === replyId ? { ...reply, repcount: response.data.repcount } : reply
                    ),
                  }
                : comment
            )
          );
        } catch (error) {
          console.error('Error adding +Rep to reply:', error);
        }
      };

    const [dashboardData, setDashboardData] = useState({
        fictionsCount: 0,
        totalChapters: 0,
        totalWords: 0,
        reviewsReceived: 0,
        uniqueFollowers: 0
    });

    const user = useSelector(state => state.userData.user); // Assuming the username is stored here

    useEffect(() => {
        if (user.username) {
            fetchDashboardData(user.username);
        }
    }, [user.username]);

    const fetchDashboardData = async (username) => {
        try {
            const response = await fetch(`https://api.ru-novel.ru/api/author-dashboard/${username}`);
            const data = await response.json();
            if (response.ok) {
                setDashboardData({
                    fictionsCount: data.data.fictionsCount,
                    totalChapters: data.data.totalChapters,
                    totalWords: data.data.totalWords,
                    reviewsReceived: data.data.reviewsCount,
                    uniqueFollowers: data.data.followersCount
                });
            } else {
                // toast.error('No data found dashboard data');

                // throw new Error(data.message || 'Failed to fetch dashboard data');
            }
        } catch (error) {
            // console.error('Error fetching author dashboard data:', error);
            toast.error('Failed to fetch dashboard data');
        }
    };

    return (
      <div className="flex-grow p-4  bg-gray-200 lg:text-[14px] md:text-[13px] sm:text-[12px]">
      <div  className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dashboard Items updated to use state variables */}
          {dashboardItems.map(item => (
              <div key={item.title} className="bg-white p-4 min-w-[200px]  shadow rounded flex items-center space-x-3">
                  <FontAwesomeIcon icon={item.icon} className="text-gray-500" />
                  <span>{item.title}: {dashboardData[item.key]}</span>
              </div>
          ))}
      </div>
      <div className="bg-white p-4 shadow rounded mt-4 flex justify-between items-center">
          <span>Add New</span>
          <button onClick={onNewFiction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
<div className="bg-white shadow rounded h-full">
  {/* <h2 className="text-lg font-semibold">Recent Reviews</h2> */}
  <div>
      {/* Placeholder for dynamic content */}
      <ReviewSection reviews={reviews} onReviewDelete={handleReviewDelete} />
  </div>
</div>
<div className="bg-white shadow rounded h-full">
  {/* <h2 className="text-lg font-semibold">Recent Comments</h2> */}
  <div>
      {/* Placeholder for dynamic content */}
      <ChCommentData
          comments={comments}
          onReply={(commentId, replyContent) => handlePostReply(commentId, replyContent)}
          onRep={(commentId) => handleAddRepToComment(commentId)}
          onReplyRep={(commentId, replyId) => handleAddRepToReply(commentId, replyId)}
      />
  </div>
</div>
</div>

  </div>
    );
};
