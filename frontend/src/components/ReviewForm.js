import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
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

  const email = useSelector((state) => state.userData.email);
  const theme = useSelector((state) => state.userData.theme); // Get the theme

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/userssss/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

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

    if (!email) {
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
      const response = await axios.post('https://api.ru-novel.ru/api/reviews', reviewData);
      setSuccessMessage('Review successfully saved!');

      const ratingUpdateUrl = `https://api.ru-novel.ru/api/book/${encodeURIComponent(bookName)}/update-ratings`;
      const ratingParams = {
        overall: overallScore,
        style: advancedReview ? styleScore : overallScore,
        story: advancedReview ? storyScore : overallScore,
        grammar: advancedReview ? grammarScore : overallScore,
        character: advancedReview ? characterScore : overallScore,
      };

      await axios.get(ratingUpdateUrl, { params: ratingParams });

      setReviewTitle('');
      setContent('');
      setOverallScore(0);
      setStyleScore(0);
      setGrammarScore(0);
      setStoryScore(0);
      setCharacterScore(0);
      setAdvancedReview(false);

      onReviewAdded(response.data);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving review or updating ratings:', error);
    }
  };

  // Define dark mode and light mode styles
  const containerStyles = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const inputStyles = theme === 'dark' ? 'bg-gray-700 border-[#5c5c5c] text-white' : 'bg-[#f7f9fc] text-[#586a84]';
  const labelStyles = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-[#586a84]';
  const borderStyles = theme === 'dark' ? 'border-[#5c5c5c]' : 'border-gray-200';

  return (
    <div className={`p-4 mb-6 ${containerStyles}`}>
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

      <form onSubmit={handleSubmit} className={`border ${borderStyles} text-[14px]`}>
        <div className={`flex items-center mb-0 ${borderStyles}`}>
          <label className={`w-1/4 font-bold p-3 ${labelStyles}`}>REVIEW TITLE</label>
          <div className={`w-px h-full ${borderStyles}`}></div>
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className={`w-3/4 p-3 text-sm border-0 ${inputStyles}`}
          />
        </div>

        <div className={`flex items-center mb-0 ${borderStyles}`}>
          <div className="flex w-1/4">
            <label className={`font-bold p-3 ${labelStyles} w-full`}>OVERALL SCORE</label>
            <div className={`w-px h-full ${borderStyles}`}></div>
          </div>
          <div className="w-1/4 flex justify-center p-3">
            {renderStars(overallScore, setOverallScore)}
          </div>
          <div className={`w-px h-full ${borderStyles}`}></div>
          <div className={`flex w-1/2 items-center p-3 ${inputStyles}`}>
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
            <div className={`flex items-center mb-0 ${borderStyles}`}>
              <label className={`w-1/3 font-bold p-3 ${labelStyles}`}>STYLE SCORE</label>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(styleScore, setStyleScore)}
              </div>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <label className={`w-1/3 font-bold p-3 ${inputStyles}`}>STORY SCORE</label>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(storyScore, setStoryScore)}
              </div>
            </div>
            <div className={`flex items-center mb-0 ${borderStyles}`}>
              <label className={`w-1/3 font-bold p-3 ${labelStyles}`}>GRAMMAR SCORE</label>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(grammarScore, setGrammarScore)}
              </div>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <label className={`w-1/3 font-bold p-3 ${inputStyles}`}>CHARACTER SCORE</label>
              <div className={`w-px h-full ${borderStyles}`}></div>
              <div className="w-1/3 flex justify-center p-3">
                {renderStars(characterScore, setCharacterScore)}
              </div>
            </div>
          </>
        )}

        <div className={`flex items-start mb-0 ${borderStyles}`}>
          <label className={`w-1/4 font-bold p-3 ${labelStyles}`}>REVIEW CONTENT</label>
          <div className={`w-px h-full ${borderStyles}`}></div>
          <div className="w-3/4 p-3">
            <Editor
              key={theme} // Add key prop to force re-render when theme changes
              apiKey="u4cqm7247tzr7b5afm5ue23wx3r8t5p5kvat0uw01v0ntr3h"
              value={content}
              init={{
                height: 200,
                menubar: false,
                skin: theme === 'dark' ? 'oxide-dark' : 'oxide', // Dark mode for TinyMCE
                content_css: theme === 'dark' ? 'dark' : '', // Content style for TinyMCE
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
            <a href="/support/knowledgebase" className="underline text-yellow-600">review rules</a>.
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