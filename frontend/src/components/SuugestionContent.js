import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
import { Link } from "react-router-dom";

const SugContent = (props) => {
  const img = props.profilePicture; // This will now correctly reference the passed prop
  const profilePictureUrl = img;
  const theme = useSelector((state) => state.userData.theme);

  const formattedTime = formatDistanceToNow(new Date(props.time), {
    addSuffix: true,
  });
  const isAuth = useSelector((state) => state.userData.isAuthenticated);
  const email = useSelector((state) => state.userData.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for tracking if the item is followed
  const [isFollowed, setIsFollowed] = useState(false);

  const checkFollowStatus = async () => {
    try {
      const response = await fetch(
        "https://api.ru-novel.ru/api/comments/followlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: email,
            email: props.arr.email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFollowed(data.isFollowing);
      } else {
        console.error("Error following/unfollowing comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [email]);

  const handleClick = () => {
    if (isAuth) {
      dispatch(userActions.setCommentsData(props.arr));
      //console.log(props.arr);
      //console.log(isAuth);
      dispatch(userActions.setUserEmail(props.arr.email));
      navigate("/comments");
    } else {
      navigate("/login");
    }
  };

  const handleReport = (e) => {
    e.preventDefault();
    //console.log(props.arr.email);
    dispatch(userActions.setUserEmail(props.arr.email));
    navigate("/report/comment");
  };

  const handleFollowClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.ru-novel.ru/api/comments/follow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: email,
            email: props.arr.email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFollowed(data.isFollowing);
      } else {
        console.error("Error following/unfollowing comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`portlet-body idea-body  p-4 mt-4 shadow-md rounded-lg ${
        theme === "dark" ? "bg-[#131313]" : "bg-white "
      }`}
    >
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Vote Section */}
        <div className="votes">
          <form method="post" action="/ideas/vote/1047">
            <button className="btn px-4 py-2 rounded-md hover:bg-gray-300"></button>
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
            <a className="username flex items-center">
              <img
                className="avatar rounded-full w-10 h-10 object-cover"
                src={profilePictureUrl}
                alt={props.username}
                onError={(e) => (e.target.src = "/dist/img/anon.jpg")}
              />
              <span className="ml-2 font-semibold text-[#337AB7]">
                {props.username}
              </span>
            </a>

            {/* Date */}
            <span className="date text-gray-500 text-sm">
              <time dateTime={props.time}>{formattedTime}</time>
            </span>
          </div>

          {/* Title */}
          <h3 className="idea-title text-xl font-bold text-[#337AB7] mt-2 hover:text-blue-600">
            <a >{props.title}</a>
          </h3>

          {/* Description */}
          <div
            className={`idea-description  mt-2 ${
              theme === "dark" ? "text-[#FFFFFFCC]" : "text-gray-700"
            }`}
          >
            {props.content}
          </div>

          {/* Tags */}
          <div className="tags flex space-x-2 mt-4">
            <span className="status badge bg-blue-500 text-white px-2 py-1 rounded-full">
              Open
            </span>
            <span
              className={`category badge  px-2 py-1 rounded-full ${
                theme === "dark"
                  ? " bg-[#242424] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {props.category}
            </span>
          </div>

          {/* Footer */}
          <div className="idea-footer flex space-x-4 mt-4">
            {/* Comment Button */}
            <a
              className={`btn btn-sm px-2 py-2 sm:px-4 sm:py-2 rounded-md ${
                theme === "dark"
                  ? "bg-[#242424] text-white hover:bg-[#181818]"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={handleClick}
            >
              <i className="fas fa-comment mr-2"></i> Comments
            </a>

            {/* Follow Button */}
            <button
              className={`btn btn-sm px-2 py-2 sm:px-4 sm:py-2 rounded-md ${
                theme === "dark"
                  ? "bg-[#242424] text-white hover:bg-[#181818]"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              } ${isFollowed ? "text-yellow-500" : "text-gray-500"}`}
              onClick={handleFollowClick}
            >
              <i
                className={`fas fa-star mr-2 ${isFollowed ? "fas" : "fal"}`}
              ></i>{" "}
              Follow
            </button>

            {/* Report Button */}
            <button
              className={`btn btn-sm px-2 py-2 sm:px-4 sm:py-2 rounded-md ${
                theme === "dark"
                  ? "bg-[#242424] text-white hover:bg-[#181818]"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={handleReport}
            >
              <i className="fas fa-flag mr-2"></i> Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SugContent;