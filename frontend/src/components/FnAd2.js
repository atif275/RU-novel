import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get theme

const FnAd2 = () => {
  const [adData, setAdData] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('Ad_4');
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  const fetchAdData = async () => {
    try {
      const response = await fetch('https://api.ru-novel.ru/api/ado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdData(data);
      } else {
        console.error('Failed to fetch advertisement data');
      }
    } catch (error) {
      console.error('Error fetching advertisement data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdData();
  }, []);

  // Conditional styles based on theme
  const containerStyles = theme === 'dark'
    ? 'bg-gray-800 text-white' // Dark mode styles: dark background, white text
    : 'bg-white text-black';    // Light mode styles: white background, black text

  const loadingStyles = theme === 'dark'
    ? 'text-gray-400' // Dark mode: light gray text for loading state
    : 'text-black';   // Light mode: black text for loading state

  const adPlaceholderStyles = theme === 'dark'
    ? 'text-white'  // Dark mode: white text for placeholder
    : 'text-black'; // Light mode: black text for placeholder

  return (
    <div className={`w-full p-4 ${containerStyles} mb-4`}>
      <div className={`flex justify-center items-center w-full min-h-[200px] ${containerStyles}`}>
        {loading ? (
          <div className={`font-bold ${loadingStyles}`}>Loading...</div>
        ) : adData && adData.image ? (
          <a href={adData.link} className="w-full h-full" target="_blank" rel="noopener noreferrer">
            <img
              src={adData.image}
              alt="Advertisement"
              className="w-full h-full object-cover"
            />
          </a>
        ) : (
          <p className={`font-bold ${adPlaceholderStyles}`}>ADVERTISEMENT</p>
        )}
      </div>
    </div>
  );
};

export default FnAd2;