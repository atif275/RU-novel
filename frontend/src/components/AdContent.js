import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faEye,
  faChartLine,
  faMousePointer,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";

function AdContent(props) {
  const [showForm, setShowForm] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const LinkRef=useRef()

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs

    try {
      const response = await fetch("https://api.ru-novel.ru/api/update/ads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          title: inputRef.current.value,
          image: imageURL,
          link: LinkRef.current.value
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        closeForm(); // Optionally close the form on success
      } else {
        const errorData = await response.json();
        // console.error("Error submitting form:", errorData.message);
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
    }
  };


  const handleDelete = async (e) => {
    e.preventDefault();

    // Validate inputs

    try {
      const response = await fetch("https://api.ru-novel.ru/api/delete/ads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: props.id,
          title: props.title,
          image: props.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        closeForm(); // Optionally close the form on success
      } else {
        const errorData = await response.json();
        // console.error("Error submitting form:", errorData.message);
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
    }
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, "user-profile-images/" + image.name);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL);
      } catch (error) {
        // console.log(error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <tr key={props.key}>
      <td className="px-4 py-2 w-1/4">{props.id}</td>
      <td className="px-4 py-2 w-1/4">{props.title}</td>
      <td className="px-4 py-2 w-1/4 ">
        <img
          src={props.image}
          alt="Advertisement"
          className="h-16 w-24 object-contain"
        />
      </td>
      <td className="px-4 py-2 w-1/4 flex space-x-2 mt-5">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={handleShowForm}
        >
          <FontAwesomeIcon icon={faEdit} className="text-xl" />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
       
        >
          <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
        </button>
      </td>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Update Advertisement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="font-bold">Title:</label>
              <input
                type="text"
                placeholder = "Title"
                value = {props.title}
                ref={inputRef}
                required
                className="w-full p-2 border mb-2 border-gray-300 rounded"
              />
              <div className="font-bold mt-4">Advertisement Image:</div>
              <input
                className="form-input w-full border border-gray-300 rounded-r-md ml-2"
                type="file"
                accept="image/*"
                id="AvatarUpload"
                
                name="avatar"
                onChange={handleImageChange}
              />
                   <div className="font-bold mt-4">Link:</div>
              <input
                type="text"
                placeholder="link"
                value = {props.link}
                ref={LinkRef}
                required
                className="w-full p-2 border mb-2 border-gray-300 rounded"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </tr>
  );
}

export default AdContent;