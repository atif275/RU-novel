import React, { useState, useEffect, useRef } from "react";
import SugContent from "./SuugestionContent";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store";
import { formatDistanceToNow, isValid } from "date-fns";

const Reply = () => {
  const dispatch = useDispatch();
  const commentsData = useSelector((state) => state.userData.commentsData);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const comData = useSelector((state) => state.userData.comData);
  const comObj = useSelector((state) => state.userData.comObj);
  const email = useSelector((state) => state.userData.email);
  const comBox = useSelector((state) => state.userData.comBox);
  const reply = useSelector((state) => state.userData.reply);
  const inputRef = useRef(null);
  const theme = useSelector((state) => state.userData.theme);

  const profilePictureUrl = comObj.profilePicture;

  const updatedAtDate = new Date(comObj.updatedAt);
  const formattedTime = isValid(updatedAtDate)
    ? formatDistanceToNow(updatedAtDate, { addSuffix: true })
    : "Unknown time";

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetcho data:", data);
        if (data) {
          dispatch(userActions.setReply(data));
          console.log("reply", reply);
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.ru-novel.ru/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: comObj._id,
          reply: {
            profilePicture: reply.profilePicture,
            username: reply.username,
            content: inputRef.current.value,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log("data", data);
          navigate('/comments');
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9]'}`}>
      <div className={`portlet-body p-4 rounded-md shadow-md ${theme === 'dark' ? 'bg-[#131313]' : 'bg-white'}`}>
        <div className={`portlet-title p-4 ${theme === 'dark' ? 'bg-[#131313]' : 'bg-gray-100 border-gray-200 border-b'}`}>
          <div className="caption flex items-center">
            <i className={`fa fa-comment mr-2 ${theme === 'dark' ? 'text-yellow-600' : 'text-red-500'}`}></i>
            <span className={`caption-subject font-bold uppercase ${theme === 'dark' ? 'text-yellow-600' : 'text-red-500'}`}>
              Reply to
            </span>
          </div>
        </div>
        <div className="idea-comment mb-4 mt-6 ml-4">
          <a id="comment-81424"></a>
          <div className="comment-header flex items-center justify-between mb-2">
            <span className="username flex items-center">
              <a className={`flex items-center ${theme === 'dark' ? 'text-blue-600' : ''}`}>
                <img
                  className="avatar w-8 h-8 rounded-full mr-2"
                  src={profilePictureUrl}
                  alt="MemeGod"
                  onLoad={(e) => (e.target.dataset.loaded = 1)}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/dist/img/anon.jpg'; }}
                />
                {comObj.username}
              </a>
            </span>
            <span className="date text-gray-500 text-sm">
              <time dateTime={comObj.updatedAt}>
                {formattedTime}
              </time>
            </span>
          </div>
          <div className={`comment-body ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-800'}`}>{comObj.content}</div>
        </div>

        <form className="form">
      
          <div className="form-group mb-4">
            <textarea
              className={`form-control w-full p-2 rounded-md ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] outline-none' : 'border'}`}
              rows="3"
              placeholder="Write a Reply..."
              ref={inputRef}
            ></textarea>
          </div>

          <div className="form-group flex items-center">
            <button
              onClick={handleSubmission}
              className="btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className={`btn btn-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} py-1 px-3 rounded-md`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reply;