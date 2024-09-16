import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../store';





const ComBox = (props) => {
   
   const navigate=useNavigate()
   const dispatch=useDispatch(null)
   const theme=useSelector((state)=>state.userData.theme)

   const handleClick=(e)=>{
               e.preventDefault();
                dispatch(userActions.setComObj(props.obj))
               navigate('/reply')
   }


    const img = props.profilePicture; // This will now correctly reference the passed prop
    const profilePictureUrl = img

    const formattedTime = formatDistanceToNow(new Date(props.time), { addSuffix: true });
  return (



    <div className={`idea-comment p-4  rounded-md  mt-5  flex items-start ${theme === 'dark' ? 'bg-[#131313] text-blue-600 ' : 'bg-gray-200 border '}`}>
      {/* Vertical Red Line */}
      <div className="w-1 h-24 bg-blue-500 mr-4"></div>

      <div className="flex-1">
        <a id="comment-81424"></a>
        <div className="comment-header flex items-center justify-between mb-2">
          <span className="username flex items-center">
            <a  className="flex items-center">
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
        <div className={`comment-body pre-wrap mb-4 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-800 '}`}>
          {props.content}
        </div>
        <div className="actions flex space-x-4">
       
         
        </div>
      </div>
      
    </div>
  );
};

export default ComBox;