import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ChComment from "./ChComment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store";

const ChCommentData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const commentsArr = useSelector((state) => state.userData.commentsArray);

  const [editorContent, setEditorContent] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/load/comments");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(userActions.setCommentsArray(data));
      } else {
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    console.log(commentsArr); // Call the fetch function on component load
  }, []);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/create/idea");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="mt-4 pt-6 bg-white">
      <h1 className="text-[16px] text-[#666666] mx-6">Comments(47)</h1>
      <hr className="bg-[#666666] mt-4 mx-6"></hr>

      {/* TinyMCE Editor with 12px margin */}
      <div className="mx-6 mt-4">
        <Editor
          apiKey="u4cqm7247tzr7b5afm5ue23wx3r8t5p5kvat0uw01v0ntr3h" // Replace with your TinyMCE API key
          value={editorContent}
          init={{
            height: 150,  // Set the editor height to 150 pixels
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
              .tox .tox-editor-container { border-radius: 0 !important; } /* Remove rounded corners */
            `,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      <div className="flex items-center justify-end gap-4 pr-6 mt-4">
        <button className="h-[30px] px-3 border border-gray-500 text-[12px]">Preview</button>
        <button className="h-[30px] px-3 bg-[#337ab7] text-white text-[12px]">Post</button>
      </div>

      {commentsArr.map((data) => (
        <ChComment
          arr={data}
          key={data._id}
          title={data.title}
          profilePicture={data.profilePicture} // Correct the prop name here
          category={data.category}
          content={data.content}
          username={data.username}
          time={data.updatedAt}
        />
      ))}
    </div>
  );
};

export default ChCommentData;
