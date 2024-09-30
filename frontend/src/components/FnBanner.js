import React, { useState, useEffect } from 'react';
import { FaBook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

const FnBanner = ({ title, author, image, fictionId, chapterId, chapterTitle }) => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.userData.email); // Get logged-in user's email from Redux store
  const [buttonText, setButtonText] = useState('Start Reading');

  useEffect(() => {
    const checkIfReading = async () => {
      if (email) {
        try {
          const response = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
          const userData = response.data;
          // console.log('User Data:', userData); // Debugging: Log user data

          if (userData.reading && userData.reading.includes(title)) {
            // console.log('Book is already in reading list.'); // Debugging: Confirm book is in reading list
            setButtonText('Continue Reading');
          } else {
            // console.log('Book is not in reading list.'); // Debugging: Confirm book is not in reading list
            setButtonText('Start Reading');
          }
        } catch (error) {
          console.error('Error checking if reading:', error);
        }
      }
    };

    checkIfReading();
  }, [email, title]);

  const handleStartReading = async () => {
    if (email) {
      try {
        const response = await axios.post(`https://api.ru-novel.ru/api/user/reading`, {
          email,
          bookName: title,
        });
        // console.log('Book added to reading list:', response.data); // Debugging: Log response data
        setButtonText('Continue Reading');
      } catch (error) {
        console.error('Error adding book to reading list:', error);
      }
    }

    const chapterUrl = `/fiction/${fictionId}/${title}/chapter/${chapterId}/${chapterTitle}`;
    navigate(chapterUrl);
  };

  return (
    <div className='relative w-full m-0 p-0 h-[170px] lg:h-[200px] bg-slate-950'>
      <img
        // src={image}
        alt='Banner'
        className="m-0 p-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 flex flex-col md:flex-col items-center justify-center ml-28">
        <div className="w-full md:w-1/2 h-1/2 flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-white text-[20px] md:text-[24px]">{title}</h1>
          <button className="text-white text-[16px] md:text-[18px]">By {author}</button>
        </div>
        <button
          onClick={handleStartReading}
          className="md:w-auto mt-4 md:mt-0 md:absolute md:right-24 md:bottom-6 flex justify-center items-center gap-1 bg-blue-500 text-white text-[18px] md:text-[20px] font-normal px-4 py-2 hover:bg-blue-700"
        >
          <FaBook /> {buttonText}
        </button>
      </div>

      {/* Image positioned half in and half out of the Banner component */}
      <img
        src={image}
        alt='Character'
        className="absolute left-[10px] lg:left-4 xl:left-10 bottom-[10px] lg:bottom-[-150px] w-[100px] lg:w-[200px] bg-white h-[150px] lg:h-[300px] object-cover border-4"
      />
    </div>
  );
};

export default FnBanner;
