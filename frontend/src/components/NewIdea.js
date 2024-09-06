import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store";

const NewIdea = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.userData.comments);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.userData.isAuthenticated);
  const email = useSelector((state) => state.userData.email);

  // Create refs for form inputs
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Fetched data:", data);
        if (data) {
          dispatch(userActions.setComments(data));
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( titleRef.current.value,
    //    descriptionRef.current.value,
    //    categoryRef.current.value,
    //    suggestions.username,
    //   suggestions.email,
    //   suggestions.profilePicture,)
  
    if (isAuthenticated) {
      try {
        const response = await fetch("https://api.ru-novel.ru/api/newIdea", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleRef.current.value,
            content: descriptionRef.current.value,
            category: categoryRef.current.value,
            username: suggestions.username,
            email: suggestions.email,
            profilePicture: suggestions.profilePicture,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched data:", data);
          if (data) {
            // console.log(data.comment);
            navigate('/support/suggestions')
          }
        } else {
          console.error("Error submitting idea");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div
        className="image-header bg-cover bg-center w-full  rounded-md"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/dist/img/ideas.jpg')`,
        }}
      >
        <div className="flex justify-between items-center py-6 px-4">
          <div className="flex items-center space-x-4">
            <i className="fas fa-lightbulb text-white text-3xl"></i>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-white">New Idea</h2>
              <span className="text-white">
                Do you have an idea of what's missing? Submit it now so the users can discuss it!
              </span>
            </div>
          </div>
        </div>
      </div>

      <form
        className="p-6 bg-white rounded-md shadow-md mt-6"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={titleRef} // Using ref instead of e.target
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description (optional)"
            ref={descriptionRef} // Using ref instead of e.target
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            ref={categoryRef} // Using ref instead of e.target
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="General">General</option>
            <option value="Fictions">Fictions</option>
            <option value="Accounts">Accounts</option>
            <option value="Premium">Premium</option>
            <option value="Forums">Forums</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Idea
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewIdea;
