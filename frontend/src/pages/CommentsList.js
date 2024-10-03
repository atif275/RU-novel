import React, { useState, useEffect } from 'react';
import ChCommentData from '../components/ChCommentData2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



function ReviewsList() {
  const email = useSelector((state) => state.userData.email);
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState([]);
  const [replyContent, setReplyContent] = useState(''); // Define state in CommentsList
  const [showReplyEditor, setShowReplyEditor] = useState(false); // Define state in CommentsList
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [sidebarcollapse, setsidebarcollapse] = useState(false)
const [activeTab, setActiveTab] = useState("compose");

  useEffect(() => {
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
      fetchUserAndComments();
    }
  }, [email]);

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

  // const handleReviewDelete = (reviewId) => {
  //   setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
  // };

  const messageOptions = [
    { key: 'compose', icon: 'fa-envelope', label: 'Compose', link: '/private/send', isActive: true },
    { key: 'inbox', icon: 'fa-folder', label: 'Inbox', link: '/private/1' },
    { key: 'sentItems', icon: 'fa-folder-open', label: 'Sent Items', link: '/private/2' },
    { key: 'drafts', icon: 'fa-folder-open', label: 'Drafts', link: '/private/3' },
    { key: 'trashCan', icon: 'fa-trash', label: 'Trash Can', link: '/private/4' }
  ];

  const settingsOptions = [
    { key: 'profileInfo', icon: "fa-id-card", label: "Profile Info", link: "/account" },
    // { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
    // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
    { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
    { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
    // { key: 'referFriend', icon: "fa-envelope-square", label: "Refer A Friend", link: "/account/refer-a-friend" }
  ];

  const securityOptions = [
    { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
    { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
    // { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
    { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
    // { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
    // { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' }
  ];

  const notificationOptions = [
    { icon: 'fa-exclamation-circle', label: 'General Settings', link: '/account/notifications' },
    { icon: 'fa-list-alt', label: 'Threads', link: '/notifications/threads' },
    { icon: 'fa-bell', label: 'Notification History', link: '/notifications/list' }
  ];

  const forumOptions = [
    { icon: 'fa-home', label: 'UserCP', link: '/my/usercp' },
    { icon: 'fa-list', label: 'Edit Signature', link: '/account/signature' }
  ];

  const myOptions = [
    { icon: 'fa-book', label: 'Fictions', link: '/author-dashboard' },
    { icon: 'fa-bookmark', label: 'Follow List', link: '/my/follows' },
    { icon: 'fa-star', label: 'Favorites', link: '/my/favorites' },
    { icon: 'fa-clock', label: 'Read Later', link: '/my/readlater' },
    { icon: 'fa-history', label: 'Reading History', link: '/my/history' },
    { icon: 'fa-star-half-alt', label: 'Reviews', link: '/my/reviews' },
    { icon: 'fa-comments', label: 'Comments', link: '/my/comments' },
    // { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
  ];

  const handlecollpase = () => {
    setsidebarcollapse(!sidebarcollapse);
};

const checkScreenSize = () => {
    if (window.innerWidth < 500) {
        // Collapse the sidebar on small screens
    } else {
        setsidebarcollapse(false); // Expand the sidebar on larger screens
    }
};

// Run the check when the component mounts and when window is resized
useEffect(() => {
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Add resize event listener

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
}, []);



  return (
    <div className="w-full bg-cover bg-center bg-fixed">
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
        <div className="flex mt-4">
          {/* Sidebar */}
          <div className={` bg-white   ${sidebarcollapse ? 'w-full absolute z-50' : 'static'} static  w-[50px] sm:w-auto shadow-lg rounded-lg h-auto`}>


<div className="sm:hidden p-2 bg-white ml-[5px] max-w-[10px]">
    <i onClick={handlecollpase} className="fas fa-bars text-2xl cursor-pointer"></i>
</div>

{/* Message List */}

<div className={`mt-4 bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
    <div className={`bg-gray-600 md text-white ${sidebarcollapse ? 'block' : 'hidden'} sm:block  text-md p-2 pl-4`}>
        Messages
    </div>

    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {messageOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
{/* Settings List */}
<div className={`mt-4  bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Settings
    </div>



    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {settingsOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
{/* Security & Privacy List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Security & Privacy
    </div>

    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {securityOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* Notification List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Notifications
    </div>




    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {notificationOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* Forum List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Forum
    </div>


    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {forumOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* My List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`} >My</div>



    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {myOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
</div>



        {/* Main Content */}
        <div className="flex-1 ml-4 mt-4 h-[1400px] sm:h-auto">
        <div className="lg:flex  lg:space-x-8 lg:mb-6 md:ml-1   grid sm:grid-cols-5  md:grid-cols-7   grid-cols-4 gap-4 mb-6 ml-1">
        <Link to="/my/follows" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Follows</Link>
                            <Link to="/my/favorites" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Favorites</Link>
                            <Link to="/my/readlater" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Readlater</Link>
                            <Link to="/my/history" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">History</Link>
                            <Link to="/my/reviews" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Reviews</Link>
                            <Link to="/my/comments" className="text-gray-900 font-bold border-b-4 border-blue-500">Comments</Link>
                            <Link to="/fictions" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Fictions</Link>
                            <Link to="/bookshelf" className="text-gray-600 hover:text-gray-800 hover:border-b-4 hover:border-blue-500">Bookshelf</Link>
            </div>
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
}

export default ReviewsList;