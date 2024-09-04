import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaStickyNote } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useParams, useNavigate, Link } from 'react-router-dom';
import ChAd1 from './FnAd1';

const Reading = ({ chapters = [], bookTitle }) => {
  const { fictionId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chapters.length === 0) {
      console.error('Chapters array is empty or not loaded yet');
      return;
    }

    const currentChapterIndex = chapters.findIndex(chapter => chapter._id === chapterId);

    if (currentChapterIndex !== -1) {
      setChapterData(chapters[currentChapterIndex]);
      setPrevChapter(currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null);
      setNextChapter(currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null);
    } else {
      console.error('Current chapter ID not found in chapters array');
    }
  }, [chapters, chapterId]);

  useLayoutEffect(() => {
    // Scroll to the top of the page when chapterId changes
    window.scrollTo(0, 0);
  }, [chapterId]);

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  const handleNextChapter = () => {
    if (nextChapter) {
      navigateToChapter(nextChapter);
    }
  };

  const handlePreviousChapter = () => {
    if (prevChapter) {
      navigateToChapter(prevChapter);
    }
  };

  const navigateToChapter = (chapter) => {
    console.log("Navigating to chapter:", chapter);
    navigate(`/fiction/${fictionId}/${bookTitle}/chapter/${chapter._id}/${chapter.title}`);
  };

  return (
    <div className='w-full flex flex-col'>
      {/* <div className='w-full h-[50px] border-b border-gray-300 p-4 flex justify-center md:justify-end items-center'>
        <button className='px-3 py-[6px] bg-[#e7505a] rounded-full text-white text-[13px] flex gap-1 items-center mb-3'>
          <FaGear /> Reader Preferences
        </button>
      </div> */}
      <div className='w-full h-[50px] border-b border-gray-300 px-4 py-8 flex justify-between items-center gap-2'>
        <button
          onClick={handlePreviousChapter}
          className={`px-2 md:px-12 py-[6px] ${prevChapter ? 'bg-[#337ab7]' : 'bg-gray-400 cursor-not-allowed'} text-white text-[14px] flex gap-1 items-center`}
          disabled={!prevChapter}
        >
          <FaAngleLeft /> Prev Chapter
        </button>
        <button
          onClick={handleNextChapter}
          className={`px-2 md:px-12 py-[6px] ${nextChapter ? 'bg-[#337ab7]' : 'bg-gray-400 cursor-not-allowed'} text-white text-[14px] flex gap-1 items-center`}
          disabled={!nextChapter}
        >
          Next Chapter <FaAngleRight />
        </button>
      </div>
      <ChAd1 />
      <div className='p-4 text-[14px]'>
        <div dangerouslySetInnerHTML={{ __html: chapterData.content }} />
      </div>
      <ChAd1 />
      <div className='bg-[#f2f2f2] text-[#000c] p-[10px]'>
        <h1 className='text-[18px] font-bold font-[Open Sans, sans-serif] flex gap-2 items-center mb-4'>
          <FaStickyNote />
          A NOTE FROM {chapterData.authorName?.toUpperCase()}
        </h1>
        <p className='text-[14px] font-[Ubuntu, sans-serif] mt-2 mx-2'>
          {chapterData.note || 'Author note will appear here.'}
        </p>
        <hr className='my-4 border-t-0' style={{ 
          backgroundImage: 'url(https://www.royalroad.com/dist/img/ornaments/23.png)', 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center',
          height: '40px'
        }} />
        <p className='text-[14px] font-[Ubuntu, sans-serif] mx-2 mb-2'>
          Welcome! Enjoy this chapter and stay tuned for more updates.
        </p>
      </div>

      <hr className='mt-6 bg-gray-200 h-[2px]'></hr>

      <div className='w-full py-4'>
        <div className='flex justify-between items-center'>
          <button
            onClick={handlePreviousChapter}
            className={`text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 ${prevChapter ? 'bg-[#337ab7]' : 'bg-[#3379b790] cursor-not-allowed'}`}
            disabled={!prevChapter}
          >
            Prev Chapter
          </button>
          <Link 
            to={`/fiction/${fictionId}/${bookTitle}`} // Make sure fictionId and bookTitle are correctly referenced here
            className='bg-[#337ab7] text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 text-center border-x border-black'
          >
            Fiction Page
          </Link>
          <button
            onClick={handleNextChapter}
            className={`text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 text-center ${nextChapter ? 'bg-[#337ab7]' : 'bg-[#3379b790] cursor-not-allowed'}`}
            disabled={!nextChapter}
          >
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reading;
