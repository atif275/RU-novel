import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FaReply, FaPlusSquare } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DOMPurify from 'dompurify';

const ChCommentData = ({ bookName, chapterName }) => {
  const [editorContent, setEditorContent] = useState('');
  const [comments, setComments] = useState([]);
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const email = useSelector((state) => state.userData.email);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/commentssss?book=${bookName}&chapter=${chapterName}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [bookName, chapterName]);

  const handleCancel = () => {
    setEditorContent('');
  };

  const handlePost = async () => {
    try {
      const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
      const { username, profilePicture } = userResponse.data;

      const newComment = {
        author: username,
        pfp: profilePicture,
        text: editorContent,
        book: bookName,
        chapter: chapterName,
        datetime: new Date(),
        repcount: 0,
        replies: [],
      };

      const response = await axios.post('https://api.ru-novel.ru/api/commentsss', newComment);

      setComments((prevComments) => [...prevComments, response.data]);
      setEditorContent('');
      toast.success('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment.');
    }
  };

  const handleReplyClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReplyEditor(!showReplyEditor);
  };

  const handleReplyPost = async () => {
    if (!replyContent.trim()) return;

    try {
      const userResponse = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
      const { username, profilePicture } = userResponse.data;

      const reply = {
        author: username,
        pfp: profilePicture,
        text: replyContent,
        datetime: new Date(),
        repcount: 0,
      };

      const response = await axios.post(`https://api.ru-novel.ru/api/comments/${selectedCommentId}/reply`, reply);

      setComments((prevComments) =>
        prevComments.map(comment =>
          comment._id === selectedCommentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        )
      );

      setReplyContent('');
      setShowReplyEditor(false);
      // toast.success('Reply posted successfully!');
    } catch (error) {
      console.error('Error posting reply:', error);
      // toast.error('Failed to post reply.');
    }
  };

  const handleCommentRepClick = async (commentId) => {
    try {
      const response = await axios.post(`https://api.ru-novel.ru/api/comments/${commentId}/rep`);
      setComments((prevComments) =>
        prevComments.map(comment =>
          comment._id === commentId ? { ...comment, repcount: response.data.repcount } : comment
        )
      );
      // toast.success('+Rep added successfully!');
    } catch (error) {
      console.error('Error adding +Rep:', error);
      // toast.error('Failed to add +Rep.');
    }
  };

  const handleReplyRepClick = async (commentId, replyId) => {
    try {
      const response = await axios.post(`https://api.ru-novel.ru/api/comments/${commentId}/reply/${replyId}/rep`);
      setComments((prevComments) =>
        prevComments.map(comment =>
          comment._id === commentId
            ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply._id === replyId ? { ...reply, repcount: response.data.repcount } : reply
              ),
            }
            : comment
        )
      );
      // toast.success('+Rep added to reply successfully!');
    } catch (error) {
      console.error('Error adding +Rep to reply:', error);
      // toast.err  or('Failed to add +Rep to reply.');
    }
  };

  return (
    <div className="bg-white p-2 md:p-8 mt-4">
  <ToastContainer />
  <h1 className="text-[16px] text-[#666666] mx-6">Comments</h1>
  <hr className="bg-[#666666] mt-4 mx-6"></hr>

  {/* TinyMCE Editor for Adding New Comment */}
  <div className="mx-6 mt-4">
    <Editor
      apiKey="u4cqm7247tzr7b5afm5ue23wx3r8t5p5kvat0uw01v0ntr3h"
      value={editorContent}
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
      onEditorChange={(newContent) => setEditorContent(newContent)}
    />
  </div>

  <div className="flex items-center justify-end gap-4 pr-6 mt-4">
    <button className="h-[30px] px-3 border border-gray-500 text-[12px]" onClick={handleCancel}>Cancel</button>
    <button className="h-[30px] px-3 bg-[#337ab7] text-white text-[12px]" onClick={handlePost}>Post</button>
  </div>

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
              onClick={() => handleCommentRepClick(comment._id)}
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
                  onClick={() => handleReplyRepClick(comment._id, reply._id)}
                >
                  <FaPlusSquare /> +Rep ({reply.repcount})
                </button>
              </div>
            </div>
          ))}

          {/* Reply Editor */}
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
                <button className="h-[30px] px-3 bg-[#337ab7] text-white text-[12px]" onClick={handleReplyPost}>Post</button>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ChCommentData;