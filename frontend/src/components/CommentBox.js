import React from 'react';
import ComBox from './ComBox';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../store';
import { Link } from 'react-router-dom';

const CommentBox = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme=useSelector((state)=>state.userData.theme)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(userActions.setComObj(props.obj));
    navigate('/reply');
  };


  const img = props.profilePicture; // This will now correctly reference the passed prop
  const profilePictureUrl = img
  const formattedTime = formatDistanceToNow(new Date(props.time), { addSuffix: true });

  return (
    <div className="flex mt-5 ">
      {/* Vertical Red Line */}
      <div className="w-1 bg-red-500 mr-4"></div>

      <div className="flex-1">
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-[#131313] text-blue-600' : 'bg-white border '}`}  >
          <div className="comment-header flex items-center justify-between mb-2">
            <span className="username flex items-center">
              <a  className="flex items-center">
                <img
                  className="avatar rounded-full w-10 h-10 mr-2"
                  src={profilePictureUrl}
                  alt={props.username}
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
          <div className={`comment-body pre-wrap mb-4 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : ' text-gray-800'}`}>
            {props.content}
          </div>
          <div className="actions flex space-x-4">
            <button
              className="btn btn-sm btn-outline btn-link text-blue-500 hover:underline"
              onClick={handleClick}
            >
              <i className="fas fa-reply mr-1"></i> Reply
            </button>
           
          </div>
        </div>

        {/* Container for replies */}
        {props.replies.length > 0 &&
        <div className="mt-4 pl-8">
        <div className="caption flex items-center">
        <i className={`fa fa-comment mr-2  ${theme === 'dark'
      ? ' text-[#FFFFFFCC]'
      : 'text-red-500'
  }`}></i>
        <span className={`caption-subject    ${
    theme === 'dark'
      ? ' text-[#FFFFFFCC]'
      : 'text-red-500'
  }`}>
          Reply to : <span className='text-blue-500'> {props.username} </span>
        </span>
      </div>
          {props.replies.map((data) => (
  
  

            <ComBox
              obj={data}        
              key={data._id} 
              profilePicture={data.profilePicture}
              content={data.content}
              username={data.username}
              time={data.updatedAt}
            />
          ))}
        </div>}
      </div>
    </div>
  );
};

export default CommentBox;