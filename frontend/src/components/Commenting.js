import React, { useState, useEffect } from "react";
import SugContent from "./SuugestionContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { formatDistanceToNow, isValid } from "date-fns";
import { useRef } from "react";

import CommentBox from "./CommentBox";

const Commenting = () => {
  const dispatch=useDispatch()
  const commentsData=useSelector(state=>state.userData.commentsData)
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const comData=useSelector((state)=>state.userData.comData)
  const theme=useSelector((state)=>state.userData.theme)

 const email=useSelector((state)=>state.userData.email)
 const comBox=useSelector((state)=>state.userData.comBox)
 const inputRef=useRef(null)




 const profilePictureUrl = commentsData.profilePicture

 const updatedAtDate = new Date(commentsData.updatedAt);
 const formattedTime = isValid(updatedAtDate) 
   ? formatDistanceToNow(updatedAtDate, { addSuffix: true }) 
   : "Unknown time";

  

 const fetchUserData = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/comment/box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:commentsData._id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data) {
            console.log('c',data)
             dispatch(userActions.setComData(data));
             dispatch(userActions.setLength(data.length))
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetcho data:", data);
        if (data) {
          
          dispatch(userActions.setCommentBox(data));
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
    
           

  

  useEffect(() => {
    
      fetchUserData();
      console.log(comData)

      if(email){
        fetchData()
      }
    
  }, [comData] );

  const handleSubmision = async (e) => {
    
      e.preventDefault()
    try {
      const response = await fetch("https://api.ru-novel.ru/api/comment/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
             id:commentsData._id,
             profilePicture:comBox.profilePicture,
             username:comBox.username,
             content:inputRef.current.value

             }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log('data',data)
          inputRef.current.value = ''; 
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleReport=(e)=>{
    e.preventDefault()
    navigate('/report/comment')
  }


  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/create/idea");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
      <div
        className="image-header bg-cover bg-center w-[100%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/dist/img/ideas.jpg')`,
        }}
      >
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <i className={`fas fa-lightbulb text-3xl ml-5 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-white '}`}></i>
            <div className="flex flex-col">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#FFFFFFCC]' : ' text-white '}`}></h2>
              <span className={` text-2xl ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-white '}`}>
                  {commentsData.title}
              </span>
              <a  className= {`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-white '}`}>
                Ideas . {commentsData.title}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mr-5">
           
            <button
              onClick={handleClick}
              className="btn bg-blue-600 text-white flex items-center px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <i className="fas fa-lightbulb mr-2"></i> New Idea
            </button>
          </div>
        </div>
      </div>
      <div className={`portlet-body idea-body p-4 mt-4 shadow-md rounded-lg ${theme === 'dark' ? 'bg-[#131313]' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Vote Section */}
        <div className="votes">
          <form method="post" action="/ideas/vote/1047">
            <button className="btn  px-4 py-2 rounded-md hover:bg-gray-300">
            
            </button>
            <input
              name="__RequestVerificationToken"
              type="hidden"
              value="CfDJ8HorrGbAz6pBn1r2BTZi4Or1e5m1eYqN7ZObF-mq8-il17DlP2GLcQqFEyWfKHLW2pceTm1aYzzsjUPCjjEc-L0HAUVGardh8PbjoBdBYPtEtmT6kJOhcQDf0atOPMLtO5jSODe1vEYpboMp-HJ6Ncs"
            />
          </form>
        </div>

        {/* Details Section */}
        <div className="details flex-1">
          <div className="idea-header flex items-center space-x-4">
            {/* Avatar */}
            <a className="username flex items-center" >
              <img
                className="avatar rounded-full w-10 h-10 object-cover"
                src={profilePictureUrl}
                alt={commentsData.username}
                onError={(e) =>
                  (e.target.src = "/dist/img/anon.jpg")
                }
              />
              <span className="ml-2 font-semibold text-[#337AB7]">{commentsData.username}</span>
            </a>

            {/* Date */}
            <span className="date text-gray-500 text-sm">
             
            <time dateTime={commentsData.updatedAt}>
            {formattedTime}
              </time>
            </span>
          </div>

          {/* Title */}
          <h3 className="idea-title text-xl font-bold text-[#337AB7] mt-2 hover:text-blue-600">
            <a >
              {commentsData.title}
            </a>
          </h3>

          {/* Description */}
          <div className={`idea-description mt-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700 '}`}>
             {commentsData.content}
          </div>

          {/* Tags */}
          <div className="tags flex space-x-2 mt-4">
            <span className="status badge bg-blue-500 text-white px-2 py-1 rounded-full">Open</span>
            <span className={`category badge  px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-[#242424] text-white' : ' bg-gray-300 text-gray-700 '}`}>{commentsData.category}</span>
          </div>

          {/* Footer */}
          <div className="idea-footer flex space-x-4 mt-4">
            {/* Vote Button */}
          

            {/* Comment Button */}
            <a
  className={`btn btn-sm px-4 py-2 rounded-md ${
    theme === 'dark'
      ? 'bg-[#242424] text-white hover:bg-[#181818]'
      : 'bg-gray-200 text-black hover:bg-gray-300'
  }`}
>
  <i className="fas fa-comment mr-2"></i> {comData.length} Comments
</a>

            {/* Follow Button */}
          
          

            {/* Report Button */}
            <a
  className={`btn btn-sm px-4 py-2 rounded-md ${
    theme === 'dark'
      ? 'bg-[#242424] text-white hover:bg-[#181818]'
      : 'bg-gray-200 text-black hover:bg-gray-300'
  }`}
  onClick={handleReport}
>
  <i className="fas fa-flag mr-2"></i> Report
</a>
          </div>
        </div>
      </div>
    </div>
    <form
      className={`w-full p-4 mt-5  rounded-lg shadow-md ${theme === 'dark' ? 'bg-[#131313]' : 'bg-white '}`}
      
    >
      <div className="form-group mb-4">
        <textarea
          className={`form-control w-full p-3   ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC] border border-[#181818] outline-none' : 'bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border border-gray-300'}`}
          rows="3"
          name="Comment"
          placeholder="Write a comment..."
          ref={inputRef}
          
        />
      </div>

      <div className="form-group flex space-x-2">
        <button
          className="btn btn-sm bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleSubmision}
        >
          Submit
        </button>
        <button
          type="reset"
          className={`btn btn-sm px-4 py-2 rounded-md ${
            theme === 'dark'
              ? 'bg-[#242424] text-white hover:bg-[#181818]'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
          
        >
          Cancel
        </button>
      </div>
    </form>

    <div className={`m-4 ${theme === 'dark' ? 'text-white' : ' '}`}>{comData.length} &nbsp;comments</div>

       
    {
           comData.map((data) => (
         
          
            <CommentBox


   obj={data}        
  key={data._id} 
  replies={data.replies}
  
  profilePicture={data.profilePicture} // Correct the prop name here
  content={data.content}
  username={data.username}
  time={data.updatedAt}
/>

          ))
       }

    </div>
  );
};

export default Commenting;