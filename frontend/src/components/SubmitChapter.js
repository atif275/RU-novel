import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

export const SubmitChapter = () => {
  const navigate = useNavigate();
  const { fictionId } = useParams(); // Fetch the fictionId from the URL params

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // Retrieve the username from the Redux store
  const user = useSelector(state => state.userData.user);
  const username = user.username

  const handleChapterChange = (content, editor) => {
    setFormData(prevState => ({
      ...prevState,
      content,
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Please log in to submit a chapter.");
      return;
    }

    const chapterData = {
      title: formData.title,
      content: formData.content,
      author: username,
      requestType: 'New Chapter',  // Setting the request type
      fictionId: fictionId  // Sending the fiction ID along with the submission
    };

    try {
      const response = await fetch('https://api.ru-novel.ru/api/chapters/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chapterData)
      });

      if (response.ok) {
        toast.success('Chapter submitted successfully!');
        navigate('/');
        window.location.reload();
      } else {
        toast.error('Failed to submit chapter. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while submitting the chapter. Please try again.');
    }
  };

  return (
    <div className="flex-grow p-4 bg-gray-200">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          Submit your chapter
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Chapter Title
          </label>
          <div className="md:ml-16">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title of Chapter"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Chapter Content
          </label>
          <div className="md:ml-16">
            <Editor
              apiKey="cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3"
              initialValue="<p>Chapter content here...</p>"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleChapterChange}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
