import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';





const ComBox = (props) => {
   
   const navigate=useNavigate()
   const dispatch=useDispatch(null)

   const handleClick=(e)=>{
               e.preventDefault();
                dispatch(userActions.setComObj(props.obj))
               navigate('/reply')
   }


    const img = props.profilePicture; // This will now correctly reference the passed prop
    const profilePictureUrl = img
      // ? `https://api.ru-novel.ru/uploads/${img}`
      // : '/default-avatar.png'; 
    const formattedTime = formatDistanceToNow(new Date(props.time), { addSuffix: true });
  return (



    <div className="idea-comment p-4 border bg-gray-200 rounded-lg mt-5 shadow-md flex items-start">
      {/* Vertical Red Line */}
      <div className="w-1 h-24 bg-blue-500 mr-4"></div>

      <div className="flex-1">
        <a id="comment-81424"></a>
        <div className="comment-header flex items-center justify-between mb-2">
          <span className="username flex items-center">
            <a href="/profile/245805" className="flex items-center">
              <img
                className="avatar rounded-full w-10 h-10 mr-2"
                src={profilePictureUrl}
                alt="MemeGod"
                onError={(e) => { e.target.onerror = null; e.target.src = '/dist/img/anon.jpg'; }}
              />
            {props.username}
            </a>
          </span>
          <span className="date text-sm text-gray-500">
          <time dateTime={props.time}>
            {formattedTime}
              </time>
          </span>
        </div>
        <div className="comment-body pre-wrap mb-4 text-gray-800">
          {props.content}
        </div>
        <div className="actions flex space-x-4">
          <a
            className="btn btn-sm btn-outline btn-link text-blue-500 hover:underline"
            onClick={handleClick}
          >
            {/* <i className="fas fa-reply mr-1"></i> Reply */}
          </a>
          <a
            className="btn btn-sm btn-outline text-red-500 hover:underline"
            href="/report/ideacomment/81424"
          >
            {/* <i className="fas fa-flag mr-1"></i> Report */}
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default ComBox;
