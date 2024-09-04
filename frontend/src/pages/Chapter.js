import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FnContainer from '../components/FnContainer';
import ChBanner from '../components/ChBanner';
import InnerContainer from '../components/InnerContainer';
import Reading from '../components/Reading';
import AuthorProfile from '../components/AuthorProfile';
import axios from 'axios';
import ChCommentData from '../components/ChCommentData';

function Chapter() {
  const { fictionId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        console.log(`Fetching chapter data for fictionId: ${fictionId}, chapterId: ${chapterId}`);
        const response = await axios.get(`http://localhost:5001/api/books/${fictionId}`);
        console.log('Book Data:', response.data);
        setBookData(response.data);

        // Find the specific chapter within the book's chapters array
        const chapter = response.data.chapters.find(ch => ch._id === chapterId);
        if (chapter) {
          setChapterData(chapter);
        } else {
          console.error('Chapter not found');
        }

        // Fetch author data based on authorName
        console.log(`Fetching author data for authorName: ${response.data.author}`);
        const authorResponse = await axios.get(`http://localhost:5001/api/userssssss/${response.data.author}`);
        console.log('Author Data:', authorResponse.data);
        setAuthorData(authorResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          author={bookData.author}
          image={bookData.image}
          fictionId={fictionId}
          chapterId={chapterId}
        />
        <InnerContainer>
          <div className='m-0 p-4 bg-white'>
            <Reading
              content={chapterData.content}
              currentChapterId={chapterId}
              chapters={bookData.chapters} // Pass chapters array from the book data
              fictionId={fictionId}
              bookTitle={bookData.title}
            />
          </div>
          <div className='m-0 mt-4 p-4 bg-white'>
            <AuthorProfile authorData={authorData} authorName={authorData.username} />
          </div>
          <div>
          {/* <ChCommentData book="a" chapter="b" /> */}
          </div>
        </InnerContainer>
      </FnContainer>
    </div>
  );
}

export default Chapter;
