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

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await axios.get(`http://api.ru-novel.ru/api/booksss/${fictionId}/chapters/${chapterId}`);
        setChapterData(response.data);
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
            <AuthorProfile authorId={chapterData.authorId} />
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
