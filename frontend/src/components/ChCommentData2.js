import React from "react";
import { FaReply, FaPlusSquare } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const ChCommentData = ({ comments }) => {
  return (
    <div className="bg-white p-2 md:p-8 mt-4">
      <h1 className="text-[16px] text-[#666666] mx-6">Comments</h1>
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
                >
                  <FaReply /> reply
                </button>
                <button 
                  className="flex gap-2 items-center rounded-full h-7 border border-gray-500 text-[11px] px-2 md:px-4"
                >
                  <FaPlusSquare /> +Rep ({comment.repcount})
                </button>
              </div>

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