import React, { useState, useEffect } from "react";
import SugContent from "./SuugestionContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { formatDistanceToNow, isValid } from "date-fns";
import { useRef } from "react";



const Reply = () => {
  const dispatch=useDispatch()
  const commentsData=useSelector(state=>state.userData.commentsData)
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const comData=useSelector((state)=>state.userData.comData)
  const comObj=useSelector((state)=>state.userData.comObj)

 const email=useSelector((state)=>state.userData.email)
 const comBox=useSelector((state)=>state.userData.comBox)
 const reply=useSelector((state)=>state.userData.reply)
 const inputRef=useRef(null)




 const profilePictureUrl = comObj.profilePicture
 ? `http://api.ru-novel.ru/uploads/${comObj.profilePicture}`
 : '/default-avatar.png';

 const updatedAtDate = new Date(comObj.updatedAt);
 const formattedTime = isValid(updatedAtDate) 
   ? formatDistanceToNow(updatedAtDate, { addSuffix: true }) 
   : "Unknown time";

//  const fetchUserData = async () => {
//     try {
//       const response = await fetch("http://api.ru-novel.ru/api/comment/box", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id:commentsData._id }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log("Fetched data:", data);
//         if (data) {
//             // console.log(data)
//              dispatch(userActions.setComData(data));
//              dispatch(userActions.setLength(data.length))
//         }
//       } else {
//         console.error("Error fetching user data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };
  const fetchData = async () => {
    try {
      const response = await fetch("http://api.ru-novel.ru/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Fetcho data:", data);
        if (data) {
         
          dispatch(userActions.setReply(data));
          // console.log("reply",reply)
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
    
           

  

  useEffect(() => {
    



         fetchData()
       
    
   }, []);

   const handleSubmision = async (e) => {
    
      e.preventDefault()
   try {
      const response = await fetch("http://api.ru-novel.ru/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
             id:comObj._id,
            reply:{ profilePicture: reply.profilePicture,
         username:reply.username,
             content:inputRef.current.value}

             }),
      });

      if (response.ok) {
        const data = await response.json();
         if (data) {
         // console.log('data',data)
         navigate('/comments')
         }
       } else {
        console.error("Error fetching user data:", response.statusText);
       }
     } catch (error) {
      console.error("Error fetching user data:", error);
   }
   };


  const handleClick = (e) => {
      // console.log(comObj)
  };

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
           <div className="portlet-body p-4 bg-white rounded-md shadow-md">


           <div className="portlet-title p-4 border-b border-gray-200 bg-gray-100">
      <div className="caption flex items-center">
        <i className="fa fa-comment text-red-500 mr-2"></i>
        <span className="caption-subject font-bold uppercase text-red-500">
          Reply to
        </span>
      </div>
    </div>
      <div className="idea-comment mb-4 mt-6 ml-4">
        <a id="comment-81424"></a>
        <div className="comment-header flex items-center justify-between  mb-2"
           
        >
            
          <span className="username flex items-center">
            
            <a href="/profile/245805" className="flex items-center">
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
        <div className="comment-body text-gray-800">{comObj.content}</div>
      </div>

      <form className="form"
      
      >
        <input type="hidden" />
        <div className="form-group mb-4">
          <textarea
            className="form-control w-full p-2 border rounded-md"
            rows="3"
            placeholder="Write a Reply..."
            data-val="true"
            data-val-required="The Comment field is required."
            ref={inputRef}

           
           
          ></textarea>
        </div>

        <div className="form-group flex items-center">
          <button
            onClick={handleSubmision}
            className="btn btn-sm btn-primary bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md mr-2"
          >
            Submit
          </button>
          <a
            className="btn btn-sm btn-default bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded-md"
            href="/ideas/1047"
          >
            Cancel
          </a>
        </div>
       
      </form>
    </div>
    </div>
  );
};

export default Reply;
