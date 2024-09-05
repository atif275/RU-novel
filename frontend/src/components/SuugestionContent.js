import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userActions } from "../store";


const SugContent = (props) => {
  const img = props.profilePicture; // This will now correctly reference the passed prop
  const profilePictureUrl = img
    // ? `http://api.ru-novel.ru/uploads/${img}`
    // : '/default-avatar.png'; 
const formattedTime = formatDistanceToNow(new Date(props.time), { addSuffix: true });
const  isAuth= useSelector((state)=>state.userData. isAuthenticated)
const length=useSelector((state)=>state.userData.length)
const dispatch=useDispatch()
const navigate=useNavigate()

  const handleClick=()=>{
       if(isAuth){
          dispatch(userActions.setCommentsData(props.arr))
           // console.log(props.arr)
           // console.log(isAuth)
           
           navigate('/comments')
       }
       else{
        navigate('/login')
       }
  }

 
  return (
    <div className="portlet-body idea-body bg-white p-4 mt-4 shadow-md rounded-lg">
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
            <a className="username flex items-center" href="/profile/68759">
              <img
                className="avatar rounded-full w-10 h-10 object-cover"
                src={profilePictureUrl}
                alt={props.username}
                onError={(e) =>
                  (e.target.src = "/dist/img/anon.jpg")
                }
              />
              <span className="ml-2 font-semibold text-[#337AB7]">{props.username}</span>
            </a>

            {/* Date */}
            <span className="date text-gray-500 text-sm">
             
            <time dateTime={props.time}>
            {formattedTime}
              </time>
            </span>
          </div>

          {/* Title */}
          <h3 className="idea-title text-xl font-bold text-[#337AB7] mt-2 hover:text-blue-600">
            <a href="/ideas/1047">
              {props.title}
            </a>
          </h3>

          {/* Description */}
          <div className="idea-description text-gray-700 mt-2">
             {props.content}
          </div>

          {/* Tags */}
          <div className="tags flex space-x-2 mt-4">
            <span className="status badge bg-blue-500 text-white px-2 py-1 rounded-full">Open</span>
            <span className="category badge bg-gray-300 text-gray-700 px-2 py-1 rounded-full">{props.category}</span>
          </div>

          {/* Footer */}
          <div className="idea-footer flex space-x-4 mt-4">
            {/* Vote Button */}
          

            {/* Comment Button */}
            <a
              className="btn btn-sm bg-gray-200 px-2 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-300"
              onClick={handleClick}

            >
              <i className="fas fa-comment mr-2"></i>  Comments
            </a>

            {/* Follow Button */}
      
              <p className="btn btn-sm  bg-gray-200 px-2 py-2  sm:px-4 sm:py-2 rounded-md hover:bg-gray-300">
                <i className="fal fa-star mr-2"></i> Follow
              </p>
          
       

            {/* Report Button */}
            <a
              className="btn btn-sm bg-gray-200 px-2 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-300"
          
            >
              <i className="fas fa-flag mr-2"></i> Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SugContent;
