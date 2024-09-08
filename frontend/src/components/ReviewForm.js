import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewForm = ({ bookName, onReviewAdded }) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [content, setContent] = useState('');
  const [advancedReview, setAdvancedReview] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [styleScore, setStyleScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);
  const [storyScore, setStoryScore] = useState(0);
  const [characterScore, setCharacterScore] = useState(0);
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.ru-novel.ru/api/current-user', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const renderStars = (score, setScore) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`cursor-pointer text-xl ${index < score ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => setScore(index + 1)}
      />
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      setLoginMessage('You need to log in to submit a review.');
      setTimeout(() => setLoginMessage(''), 3000);
      return;
    }

    const reviewData = {
      title: reviewTitle || '',
      text: content || '',
      rating: {
        overall: overallScore || '',
        style: advancedReview ? styleScore : '',
        story: advancedReview ? storyScore : '',
        grammar: advancedReview ? grammarScore : '',
        character: advancedReview ? characterScore : ''
      },
      datetime: new Date().toISOString(),
      user: userData.username || 'Anonymous',
      profilepic: userData.profilePicture || '/default-avatar.png',
      bookName: bookName,
      upvotes: 0,
      downvotes: 0
    };

    try {
      // First, save the review
      const response = await axios.post('https://api.ru-novel.ru/api/reviews', reviewData);
      setSuccessMessage('Review successfully saved!');

      // Now, update the book's ratings
      const ratingUpdateUrl = `https://api.ru-novel.ru/api/book/${encodeURIComponent(bookName)}/update-ratings`;
      const ratingParams = {
        overall: overallScore,
        style: advancedReview ? styleScore : overallScore,
        story: advancedReview ? storyScore : overallScore,
        grammar: advancedReview ? grammarScore : overallScore,
        character: advancedReview ? characterScore : overallScore,
      };

      await axios.get(ratingUpdateUrl, { params: ratingParams });

      // Clear form fields after successful submission
      setReviewTitle('');
      setContent('');
      setOverallScore(0);
      setStyleScore(0);
      setGrammarScore(0);
      setStoryScore(0);
      setCharacterScore(0);
      setAdvancedReview(false);

      // Trigger rerender by calling the parent function
      onReviewAdded(response.data);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving review or updating ratings:', error);
    }
  };

  return (
    <div className="p-4 bg-white mb-6">
      <h2 className="text-[#e26a6a] text-[18px] font-bold mb-6 pb-4 border-b border-gray-200">LEAVE A REVIEW</h2>
      
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          {successMessage}
        </div>
      )}

      {loginMessage && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
          {loginMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border border-gray-200 text-[14px]">
        <div className="flex items-center mb-0 border-b border-gray-200">
          <label className="w-1/4 font-bold p-3 bg-gray-50 text-[#586a84]">REVIEW TITLE</label>
          <div className="w-px h-full bg-gray-200"></div>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="w-3/4 p-3 text-sm border-0 bg-[#f7f9fc] text-[#586a84]"
          />
        </div>

        <div className="flex items-center mb-0 border-b border-gray-200">
          <div className="flex w-1/4">
            <label className="font-bold p-3 bg-gray-50 text-[#586a84] w-full">OVERALL SCORE</label>
            <div className="w-px h-full bg-gray-200"></div>
          </div>
          <div className="w-1/4 flex justify-center p-3">
            {renderStars(overallScore, setOverallScore)}
          </div>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="flex w-1/2 items-center p-3 bg-[#f7f9fc]">
            <label className="font-bold text-[#586a84] mr-2">ADVANCED REVIEW</label>
            <input
              type="checkbox"
              checked={advancedReview}
              onChange={() => setAdvancedReview(!advancedReview)}
              className="ml-2"
            />
          </div>
        </div>

        {advancedReview && (
          <>
            <div className="flex items-center mb-0 border-b border-gray-200">
              <label className="w-1/3 font-bold p-3 bg-gray-50 text-[#586a84]">STYLE SCORE</label>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(styleScore, setStyleScore)}
              </div>
              <div className="w-px h-full bg-gray-200"></div>
              <label className="w-1/3 font-bold p-3 bg-[#f7f9fc] text-[#586a84]">STORY SCORE</label>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(storyScore, setStoryScore)}
              </div>
            </div>
            <div className="flex items-center mb-0 border-b border-gray-200">
              <label className="w-1/3 font-bold p-3 bg-gray-50 text-[#586a84]">GRAMMAR SCORE</label>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(grammarScore, setGrammarScore)}
              </div>
              <div className="w-px h-full bg-gray-200"></div>
              <label className="w-1/3 font-bold p-3 bg-[#f7f9fc] text-[#586a84]">CHARACTER SCORE</label>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(characterScore, setCharacterScore)}
              </div>
            </div>
          </>
        )}

        <div className="flex items-start mb-0 border-b border-gray-200">
          <label className="w-1/4 font-bold p-3 bg-gray-50 text-[#586a84]">REVIEW CONTENT</label>
          <div className="w-px h-full bg-gray-200"></div>
          <div className="w-3/4 p-3">
            <Editor
              apiKey="cezgao67zddrqy0u741tep7k5b5az37uqjv1zvg3uslu7xj3"
              value={content}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | undo redo | link image | preview code | removeformat fullscreen',
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 mt-4 mb-0 mx-4">
          <span className="text-red-600 text-lg font-bold mr-2">!</span>
          <p className="text-sm font-bold">
            BE NICE! Fair critique is fair, but be respectful & follow the{' '}
            <button href="#" className="underline text-yellow-600">review rules</button>.
          </p>
        </div>

        <div className="flex justify-end space-x-4 px-4 py-4">
          <button type="submit" className="bg-red-500 text-white px-4 py-2">
            Submit
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2" onClick={() => {
            setReviewTitle('');
            setContent('');
            setOverallScore(0);
            setStyleScore(0);
            setGrammarScore(0);
            setStoryScore(0);
            setCharacterScore(0);
            setAdvancedReview(false);
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
