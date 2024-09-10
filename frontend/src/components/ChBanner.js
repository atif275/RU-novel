import React, { useEffect, useState } from 'react';
import { FaBook, FaExclamationTriangle, FaStar } from "react-icons/fa";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ChBanner = (bookTitle) => {
  const { fictionId, chapterId } = useParams(); // Get fictionId and chapterId from URL parameters
  const [chapterData, setChapterData] = useState(null);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        // Fetch the book thread document by fictionId
        const response = await axios.get(`https://api.ru-novel.ru/api/books/${fictionId}`);
        const bookData = response.data;

        // Find the specific chapter within the book thread's chapters array
        const chapter = bookData.chapters.find(ch => ch._id === chapterId);

        if (chapter) {
          setChapterData({
            ...chapter,
            fictionTitle: bookData.title,
            authorName: bookData.author,
            authorId: bookData.authorId, // Assuming you have authorId in your book thread schema
            fictionId: bookData._id,
            bannerImage: bookData.image, // Assuming the banner image is the same as the book's image
            characterImage: bookData.image, // You can change this if there's a specific character image
          });
        } else {
          console.error('Chapter not found');
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    };

    fetchChapterData();
  }, [fictionId, chapterId]);

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative flex flex-col md:flex-row bg-black h-auto md:h-[180px] m-0 p-0 z-0'>
      <img
        src={chapterData.bannerImage || 'https://www.royalroadcdn.com/public/topcovers/90655-topcover.png?time=1721748398?v=1721748398'}
        alt='Banner'
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
      />
      <div className='hidden md:flex md:w-1/4 justify-center items-center z-10'>
        <img
          src={chapterData.characterImage || 'https://www.royalroadcdn.com/public/covers-large/90655-worm-mage.jpg?time=1723182191'}
          alt='Character'
          className="h-[150px] w-[100px]"
        />    
      </div>
      <div className='relative w-full md:w-1/2 flex flex-col p-6 gap-2 z-10'>
        <div className='w-full flex flex-col md:flex-row gap-2 text-white justify-center items-center md:justify-start font-light text-[18px] lg:text-[24px]'>
          <a href={`/fiction/${chapterData.fictionId}/${chapterData.fictionTitle}`}>
            {chapterData.fictionTitle || '[Fiction Title]'}
          </a>
          <div className='m-0 p-0 flex gap-1'>
            <p>By</p>
            <a href={`/profile/${chapterData.authorId}`}>{chapterData.authorName || 'Author'}</a>
          </div>
          <p className='text-[20px] flex items-center text-red-500'>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </p>
        </div>
        <div className='w-full flex text-[30px] lg:text-[36px] text-white justify-center md:justify-start'>
          {chapterData.title || 'Chapter Title'}
        </div>
      </div>
      <div className='relative w-full md:w-1/4 flex flex-col gap-2 justify-center px-4 py-2 md:py-8 z-10'>
        <Link 
          to={`/fiction/${fictionId}/${bookTitle}`} // Make sure fictionId and bookTitle are correctly referenced here
        >
          <div className='w-full h-[34px] bg-[#337ab7] flex gap-1 justify-center items-center text-white text-[14px] px-3 py-1 hover:bg-[#2c5f8c]'>
            <FaBook /> Fiction Page
          </div>
        </Link>
        {/* <div className='w-full h-[34px] bg-[#ffffff] flex gap-1 justify-center items-center text-black text-[14px] px-3 py-1'>
          Donate
        </div>
        <div className='w-full h-[34px] bg-[#d91e18] flex gap-1 justify-center items-center text-white text-[14px] px-3 py-1'>
          <FaExclamationTriangle /> Report Chapter
        </div> */}
      </div>
    </div>
  );
};

export default ChBanner;