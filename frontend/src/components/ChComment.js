import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
import { FaReply, FaPlusSquare, FaExclamationTriangle } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";

const ChComment = (props) => {
  const img = props.profilePicture; // This will now correctly reference the passed prop
  const profilePictureUrl = img
    // ? `http://api.ru-novel.ru/uploads/${img}`
    // : '/default-avatar.png'; 

  const formattedTime = formatDistanceToNow(new Date(props.time), { addSuffix: true });
  const isAuth = useSelector((state) => state.userData.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleClick = () => {
    if (isAuth) {
      dispatch(userActions.setCommentsData(props.arr));
      // console.log(props.arr);
      // console.log(isAuth);
      navigate('/comments');
    } else {
      navigate('/login');
    }
  };

  const handleReplyClick = () => {
    if (isAuth) {
      setShowReplyEditor(!showReplyEditor);
    } else {
      navigate('/login');
    }
  };

  const handleEditorChange = (content) => {
    setReplyContent(content);
  };

  return (
    <div className="bg-white p-2 md:p-8 mt-4">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Details Section */}
        <div className="details w-full">
          <div className="idea-header flex justify-between items-center space-x-4">
            {/* Avatar */}
            <a className="username flex items-center" href="/profile/68759">
              <img
                className="avatar rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover"
                src={profilePictureUrl}
                alt={props.username}
                onError={(e) =>
                  (e.target.src = "/dist/img/anon.jpg")
                }
              />
              <div className="flex flex-col gap-1 ml-4 md:ml-8">
                <span className="font-bold text-[14px] text-[#337AB7] hover:underline">{props.username}</span>

                {/* Description */}
                <div className="idea-description text-black">
                  {props.content}
                </div>
              </div>
            </a>

            {/* Date */}
            <span className="date text-gray-500 text-[13px]">
              <time dateTime={props.time}>
                {formattedTime}
              </time>
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 md:gap-4 mt-4">
            <button 
              className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4"
              onClick={handleReplyClick}
            >
              <FaReply /> reply
            </button>
            <button className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4">
              <FaPlusSquare /> +Rep (7)
            </button>
            <button className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4">
              <FaExclamationTriangle /> Report
            </button>
          </div>

          {/* Reply Editor */}
          {showReplyEditor && (
            <div className="mt-4">
              <Editor
                apiKey="u4cqm7247tzr7b5afm5ue23wx3r8t5p5kvat0uw01v0ntr3h" // Replace with your TinyMCE API key
                value={replyContent}
                init={{
                  height: 150,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic underline strikethrough | \
                    alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | \
                    link image | removeformat | preview code',
                  content_style: `
                    body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
                    .tox .tox-editor-container { border-radius: 0 !important; }
                  `,
                }}
                onEditorChange={handleEditorChange}
              />
              <div className="flex items-center justify-end gap-4 mt-2">
                <button className="h-[30px] px-3 border border-gray-500 text-[12px]">Preview</button>
                <button className="h-[30px] px-3 bg-[#337ab7] text-white text-[12px]">Post</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ChComment;
