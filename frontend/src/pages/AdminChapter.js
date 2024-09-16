import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FnContainer from '../components/FnContainer';
import ChBanner from '../components/AdminChBanner';
import InnerContainer from '../components/InnerContainer';
import AdminReading from '../components/AdminReading';
import AuthorProfile from '../components/AuthorProfile';
import axios from 'axios';
import ChCommentData from '../components/ChCommentData';

function AdminChapter() {
  const { fictionId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
       // const response = await axios.get(`https://api.ru-novel.ru/api/booksss/${fictionId}/chapters/${chapterId}`);
        // setChapterData(response.data);

        const response = await axios.get(`https://api.ru-novel.ru/api/booksss/${fictionId}`);
        setBookData(response.data);

         // Find the specific chapter within the book's chapters array
         const chapter = response.data.chapters.find(ch => ch._id === chapterId);
         if (chapter) {
           setChapterData(chapter);
         } else {
           console.error('Chapter not found');
         }

         const authorResponse = await axios.get(`https://api.ru-novel.ru/api/userssssss/${response.data.author}`);
        console.log('Author Data:', authorResponse.data);
        setAuthorData(authorResponse.data);

        
      } catch (error) {
        console.error('Error fetching chapter data:', error);
      }
    };

    fetchChapterData();
  }, [fictionId, chapterId]);

  if (!chapterData || !bookData || !authorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="block m-0 p-0">
      <FnContainer>
        <ChBanner
          title={chapterData.title}
          author={chapterData.authorName}
          image={chapterData.bannerImage}
          fictionId={fictionId}
          chapterId={chapterId}
        />
        <InnerContainer>
          <div className='m-0 p-4 bg-white'>
          <AdminReading
            content={chapterData.content}
            currentChapterId={chapterId}
            chapters={chapterData.chapters}  // Ensure this is an array
            fictionId={fictionId}
            bookTitle={chapterData.bookTitle}  // Ensure this is provided by the backend
          />
          </div>
          <div className='m-0 mt-4 p-4 bg-white'>
          <AuthorProfile authorData={authorData} authorName={authorData.username} />
          </div>
          <div>
            {/* <ChCommentData /> */}
          </div>
        </InnerContainer>
      </FnContainer>
    </div>
  );
}

export default AdminChapter;
