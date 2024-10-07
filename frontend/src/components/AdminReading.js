import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaStickyNote,
  FaRss,
  FaPaypal,
  FaPatreon,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ChAd1 from "./FnAd1";

const AdminReading = ({ chapters = [], bookTitle }) => {
  const { fictionId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        // //console.log("Fetching chapter data for chapter ID:", chapterId);
        const response = await axios.get(
          `https://api.ru-novel.ru/api/booksss/${fictionId}/chapters/${chapterId}`
        );
        const fetchedChapterData = response.data;

        // //console.log("Fetched Chapter Data:", fetchedChapterData);

        setChapterData(fetchedChapterData);

        if (!chapters || chapters.length === 0) {
          // console.error("Chapters array is empty or not loaded yet");
          return;
        }

        const currentChapterIndex = chapters.findIndex(
          (chapter) => chapter._id === chapterId
        );

        // //console.log("Current Chapter Index:", currentChapterIndex);
        // //console.log("Chapters Array:", chapters);
        // //console.log("Chapter ID from URL:", chapterId);

        if (currentChapterIndex !== -1) {
          setPrevChapter(
            currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null
          );
          setNextChapter(
            currentChapterIndex < chapters.length - 1
              ? chapters[currentChapterIndex + 1]
              : null
          );
        } else {
          // console.error("Current chapter ID not found in chapters array");
        }
      } catch (error) {
        // console.error("Error fetching chapter data:", error);
      }
    };

    fetchChapterData();
  }, [fictionId, chapterId, chapters]);

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  const handleNextChapter = () => {
    if (nextChapter) {
      // //console.log("Navigating to the next chapter:", nextChapter);
      navigate(
        `/fiction/${fictionId}/${bookTitle}/chapter/${nextChapter._id}/${nextChapter.title}`
      );
    }
  };

  const handlePreviousChapter = () => {
    if (prevChapter) {
      // //console.log("Navigating to the previous chapter:", prevChapter);
      navigate(
        `/fiction/${fictionId}/${bookTitle}/chapter/${prevChapter._id}/${prevChapter.title}`
      );
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* <div className="w-full h-[50px] border-b border-gray-300 p-4 flex justify-center md:justify-end items-center">
        <button className='px-3 py-[6px] bg-[#e7505a] rounded-full text-white text-[13px] flex gap-1 items-center mb-3'>
          <FaGear /> Reader Preferences
        </button>
      </div> */}
      <div className="w-full h-[50px] border-b border-gray-300 px-4 py-8 flex justify-between items-center gap-2">
        <button
          onClick={handlePreviousChapter}
          className={`px-2 md:px-12 py-[6px] ${
            prevChapter ? "bg-[#337ab7]" : "bg-gray-400 cursor-not-allowed"
          } text-white text-[14px] flex gap-1 items-center`}
          disabled={!prevChapter}
        >
          <FaAngleLeft /> Prev Chapter
        </button>
        <button
          onClick={handleNextChapter}
          className={`px-2 md:px-12 py-[6px] ${
            nextChapter ? "bg-[#337ab7]" : "bg-gray-400 cursor-not-allowed"
          } text-white text-[14px] flex gap-1 items-center`}
          disabled={!nextChapter}
        >
          Next Chapter <FaAngleRight />
        </button>
      </div>
      {/* <ChAd1 /> */}
      <div className="p-4 text-[14px]">
        <div dangerouslySetInnerHTML={{ __html: chapterData.content }} />
      </div>
      {/* <ChAd1 /> */}
      {/* <div className="bg-[#f2f2f2] text-[#000c] p-[10px]">
        <h1 className="text-[18px] font-bold font-[Open Sans, sans-serif] flex gap-2 items-center mb-4">
          <FaStickyNote />A NOTE FROM {chapterData.authorName?.toUpperCase()}
        </h1>
        <p className="text-[14px] font-[Ubuntu, sans-serif] mt-2 mx-2">
          {chapterData.note || "Author note will appear here."}
        </p>
        <hr
          className="my-4 border-t-0"
          style={{
            backgroundImage:
              "url(https://www.royalroad.com/dist/img/ornaments/23.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "40px",
          }}
        />
        <p className="text-[14px] font-[Ubuntu, sans-serif] mx-2 mb-2">
          Welcome! Enjoy this chapter and stay tuned for more updates.
        </p>
      </div> */}

      <hr className="mt-6 bg-gray-200 h-[2px]"></hr>

      {/* <div className="w-full py-4">
        <h5 className="font-[Open Sans, sans-serif] text-[14px] font-bold uppercase mb-6">
          Support "{chapterData.fictionTitle}"
        </h5>
        <div className="flex justify-between items-center mt-2">
          <button
            className="bg-[#e87e0490] text-white px-[12px] py-[6px] h-[34px] text-[14px] font-[Open Sans, sans-serif] flex items-center justify-center w-full mr-2"
            disabled
          >
            <FaPaypal className="mr-1" /> PayPal
          </button>
          <a
            href="https://www.patreon.com/Maradina808"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e87e04] text-white px-[12px] py-[6px] h-[34px] text-[14px] font-[Open Sans, sans-serif] flex items-center justify-center w-full"
          >
            <FaPatreon className="mr-1" /> Patreon
          </a>
        </div>
        <hr className="my-6 " />
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousChapter}
            className={`bg-[#3379b790] text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 ${
              !prevChapter && "cursor-not-allowed"
            }`}
            disabled={!prevChapter}
          >
            Prev Chapter
          </button>
          <button
            onClick={() => navigate(`/fiction/${fictionId}`)}
            className="bg-[#337ab7] text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 text-center border-x border-black"
          >
            Fiction Index
          </button>
          <button
            onClick={handleNextChapter}
            className={`bg-[#337ab7] text-white px-[12px] py-[6px] text-[14px] font-[Open Sans, sans-serif] w-1/3 text-center ${
              !nextChapter && "cursor-not-allowed"
            }`}
            disabled={!nextChapter}
          >
            Next Chapter
          </button>
        </div>
        <div className="w-full flex justify-end mt-6">
          <button
            href="#"
            className="bg-[#e87e04] text-white px-[10px] py-[5px] h-[30px] text-[12px] font-[Open Sans, sans-serif] rounded flex gap-2 items-center"
          >
            <FaRss /> RSS
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AdminReading;
