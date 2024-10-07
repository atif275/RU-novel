import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get theme
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FnContainer from '../components/FnContainer';
import FnBanner from '../components/FnBanner';
import InnerContainer from '../components/InnerContainer';
import Info from '../components/Info';
import Statistics from '../components/Statistics';
import FnAd1 from '../components/FnAd1';
import SidePanel from '../components/SidePanel';
import FnAd2 from '../components/FnAd2';
import AuthorInfo from '../components/AuthorInfo';
import OthersAlsoLiked from '../components/OtherAlsoLiked';
import ReviewCard from '../components/ReviewCard';
import ChaptersPagination from '../components/ChaptersPagination';
import ReviewForm from '../components/ReviewForm';

function Fiction() {
  const theme = useSelector((state) => state.userData.theme);
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [reviews, setReviews] = useState([]); // State to manage reviews

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/books/${id}`);
        setBookData(response.data);

        // Fetch author data based on authorName
        console.log(`Fetching author data for authorName: ${response.data.author}`);
        const authorResponse = await axios.get(`https://api.ru-novel.ru/api/userssssss/${response.data.author}`);
        console.log('Author Data:', authorResponse.data);
        setAuthorData(authorResponse.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [id]);

  // Function to handle when a review is added
  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  if (!bookData) {
    return <div>Loading...</div>;
  }

  // Assuming you want to navigate to the first chapter
  const firstChapter = bookData.chapters[0];


  return (
    <div className="block m-0 p-0">
      <FnContainer>
        <FnBanner
          title={bookData.title}
          author={bookData.author}
          image={bookData.image}
          fictionId={id}
          chapterId={firstChapter._id}
          chapterTitle={firstChapter.title}
        />
        <InnerContainer>
          <div className='w-full flex flex-col lg:flex-row m-0 p-0 h-auto'>
            <div className={`w-full lg:w-[70%] m-0 p-0 flex flex-col ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'}`}>
              <Info bookData={bookData} />
              <Statistics stats={bookData.stats} />
              <FnAd1 />
              <div className={`w-full m-0 p-0 h-auto flex flex-col ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'}`}>
                <OthersAlsoLiked bookId={id} />
                <ChaptersPagination bookId={id} />
                <ReviewForm bookName={bookData.title} onReviewAdded={handleReviewAdded} />
                <ReviewCard bookName={bookData.title} reviews={reviews} />
              </div>
            </div>
            <div className={`w-full lg:w-[30%] m-0 p-0 flex flex-col lg:ml-4 ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'} h-auto`}>
              <SidePanel authorName={bookData.author} bookName={bookData.title} />
              <FnAd2 />
              <AuthorInfo authorData={authorData} authorName={bookData.author} />
              <FnAd2 />
            </div>
          </div>
        </InnerContainer>
      </FnContainer>
    </div>
  );
}

export default Fiction;