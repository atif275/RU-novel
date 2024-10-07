import React, { useState, useEffect, useRef } from "react";
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
import AdContent from "./AdContent";

export const  AdminTransaction = () => {
  const [showForm, setShowForm] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ads, setAds] = useState([]); // State for advertisements
  const inputRef = useRef();

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.ru-novel.ru/api/advertisment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputRef.current.value,
          image: imageURL,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // //console.log(data);
        fetchAds(); // Refresh the advertisements list
      } else {
        const errorData = await response.json();
        // console.error('Error submitting form:', errorData.message);
      }
    } catch (error) {
      // console.error('Error submitting form:', error);
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
        // //console.log(error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Fetch advertisements from the server
  const fetchAds = async () => {
    try {
      const response = await fetch('https://api.ru-novel.ru/api/ads');
      if (response.ok) {
        const data = await response.json();
        setAds(data.ads); // Assuming the response has an 'ads' key
      } else {
        // console.error('Error fetching ads');
      }
    } catch (error) {
      // console.error('Error fetching ads', error);
    }
  };

  // Fetch advertisements on component mount
  useEffect(() => {
    fetchAds();
  }, [ads]);

  return (
    <div className="flex-grow p-4 bg-gray-200">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-gray-500 text-xl"
          />
          <span className="text-lg">$0.00</span>
          <span className="text-sm text-gray-500">Total Spent to Date</span>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
          <FontAwesomeIcon icon={faEye} className="text-gray-500 text-xl" />
          <span className="text-lg">0.00</span>
          <span className="text-sm text-gray-500">Total Views</span>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
          <FontAwesomeIcon
            icon={faChartLine}
            className="text-gray-500 text-xl"
          />
          <span className="text-lg">$0.00</span>
          <span className="text-sm text-gray-500">Average eCPM</span>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col items-center justify-center space-y-2">
          <FontAwesomeIcon
            icon={faMousePointer}
            className="text-gray-500 text-xl"
          />
          <span className="text-lg">0.00%</span>
          <span className="text-sm text-gray-500">Overall CTR</span>
        </div>
      </div>
      <div className="bg-white shadow rounded">
        <div className="p-4">
                
                    
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Name</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Email</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium ">Started at</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium  ">Ending at</th>
                                    <th className="bg-gray-50 px-6 py-3 text-left font-medium  ">Plan</th>
                                </tr>
                            </thead>
                            <tbody  className="bg-white divide-y divide-gray-200">
                            <tr>
                                    <td className=" px-6 py-3 text-left  ">Ahsan</td>
                                    <td className=" px-6 py-3 text-left  ">mohammadahsan1965@gmail.com</td>
                                    <td className=" px-6 py-3 text-left  ">19/9/24</td>
                                    <td className=" px-6 py-3 text-left ">19/9/20</td>
                                    <td className=" px-6 py-3 text-left   ">Full Year</td>
                                    <td className=" px-6 py-3 text-left text-blue-600 hover:underline hover:cursor-pointer  ">Show Details</td>
                                </tr>
                            </tbody>
                        </table>
                
                </div>  
        
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Advertisement</h2>
            <div className="space-y-4">
              <label className="font-bold">Title:</label>
              <input
                type="text"
                placeholder="title"
                ref={inputRef}
                className="w-full p-2 border mb-2 border-gray-300 rounded"
              />
              <div className="font-bold mt-4">Advertisement:</div>
              <input
                className="form-input w-full border border-gray-300 rounded-r-md ml-2"
                type="file"
                accept=".png,.jpg,.jpeg,.bmp"
                id="AvatarUpload"
                name="avatar"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeForm}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};