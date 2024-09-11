import React, { useState } from "react";
import { FaReply, FaPlusSquare } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { Editor } from "@tinymce/tinymce-react";
import { FaStar, FaThumbsUp, FaThumbsDown, FaQuoteLeft, FaTrashAlt } from 'react-icons/fa';
const ChCommentData = ({ comments, onReply, onRep, onReplyRep }) => {
  const [replyContent, setReplyContent] = useState(''); // Manage reply content state
  const [showReplyEditor, setShowReplyEditor] = useState(false); // Manage reply editor visibility state
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleReplyClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReplyEditor(!showReplyEditor); // Toggle reply editor
  };

  const handleReplyPost = (commentId) => {
    if (replyContent.trim()) {
      onReply(commentId, replyContent);
      setReplyContent('');
      setShowReplyEditor(false);
    }
  };

  // Function to handle adding +Rep to comments
  const handleRepClick = (commentId) => {
    onRep(commentId); // Call parent function to handle comment rep
  };

  // Function to handle adding +Rep to replies
  const handleReplyRepClick = (commentId, replyId) => {
    onReplyRep(commentId, replyId); // Call parent function to handle reply rep
  };

  return (
    <div className="bg-white p-2 lg:p-10 md:p-10 ">
      <h3 className="text-[16px] font-bold text-red-600 flex items-center">
          <FaQuoteLeft className='mr-2 text-gray-500 text-[16px]' />
          My Comments
        </h3>
      <hr className="bg-[#666666] mt-4 mx-6"></hr>

      {/* Display Comments */}
      <div className="bg-white p-2 md:p-8 mt-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="details w-full">
              <div className="idea-header flex justify-between items-center space-x-4">
                <a className="username flex items-center" href={`/profile/${comment.author}`}>
                  <img
                    className="avatar rounded-full w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover"
                    src={comment.pfp || '/dist/img/anon.jpg'}
                    alt={comment.author}
                  />
                  <div className="flex flex-col gap-1 ml-4 md:ml-8">
                    <span className="font-bold text-[14px] text-[#337AB7] hover:underline">{comment.author}</span>
                    <div className="idea-description text-black">
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }} />
                    </div>
                  </div>
                </a>
                <span className="date text-gray-500 text-[13px] ml-auto">
                  <time dateTime={comment.datetime}>
                    {new Date(comment.datetime).toLocaleString()}
                  </time>
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 md:gap-4 mt-4">
                <button
                  className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4"
                  onClick={() => handleReplyClick(comment._id)}
                >
                  <FaReply /> reply
                </button>
                <button
                  className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4"
                  onClick={() => handleRepClick(comment._id)}
                >
                  <FaPlusSquare /> +Rep ({comment.repcount})
                </button>
              </div>

              {/* Display reply editor if reply button is clicked */}
              {showReplyEditor && selectedCommentId === comment._id && (
                <div className="mt-4 ml-8">
                  <Editor
                    apiKey="u4cqm7247tzr7b5afm5ue23wx3r8t5p5kvat0uw01v0ntr3h"
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
                    }}
                    onEditorChange={(newContent) => setReplyContent(newContent)}
                  />
                  <div className="flex items-center justify-end gap-4 mt-2">
                    <button className="h-[30px] px-3 border border-gray-500 text-[12px]" onClick={() => setShowReplyEditor(false)}>Cancel</button>
                    <button
                      className="h-[30px] px-3 bg-[#337ab7] text-white text-[12px]"
                      onClick={() => handleReplyPost(comment._id)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}

              {/* Display Replies */}
              {comment.replies.map((reply) => (
                <div key={reply._id} className="ml-8 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        className="avatar rounded-full w-[30px] h-[30px] object-cover"
                        src={reply.pfp || '/dist/img/anon.jpg'}
                        alt={reply.author}
                      />
                      <div className="ml-4">
                        <span className="font-bold text-[14px] text-[#337AB7] hover:underline">{reply.author}</span>
                        <div className="text-black">
                          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.text) }} />
                        </div>
                      </div>
                    </div>
                    <span className="date text-gray-500 text-[13px] ml-auto">
                      <time dateTime={reply.datetime}>
                        {new Date(reply.datetime).toLocaleString()}
                      </time>
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 md:gap-4 mt-2">
                    <button
                      className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4"
                      onClick={() => handleReplyRepClick(comment._id, reply._id)}
                    >
                      <FaPlusSquare /> +Rep ({reply.repcount})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChCommentData;