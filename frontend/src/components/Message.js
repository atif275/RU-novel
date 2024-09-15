import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

function Message({ messages, noMessages }) {
  const theme = useSelector((state) => state.userData.theme);
  const [profilePictures, setProfilePictures] = useState({}); // Store profile pictures by sender

  const fetchDataForSender = async (sender) => {
    try {
      const response = await fetch('https://api.ru-novel.ru/api/token1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: sender }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.user.profilePicture;
    } catch (error) {
      console.error('Error fetching profile picture for', sender, error);
      return null; // Return null if there's an error
    }
  };

  const fetchAllProfilePictures = async () => {
    const pictures = await Promise.all(
      messages.map((message) =>
        fetchDataForSender(message.sender).then((picture) => ({
          sender: message.sender,
          picture,
        }))
      )
    );

    // Store profile pictures in an object with sender as the key
    const pictureMap = pictures.reduce((acc, curr) => {
      acc[curr.sender] = curr.picture;
      return acc;
    }, {});

    setProfilePictures(pictureMap);
  };

  useEffect(() => {
    if (messages.length > 0) {
      fetchAllProfilePictures();
    }
  }, [messages]);

  return (
    <div
      className={`absolute mt-2 p-4  lg:mr-0 text-[#bcc2cb] space-y-2 w-64 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-600'}`}
      style={{ zIndex: 10 }}
    >
      {noMessages ? (
        <p>No new messages.</p>
      ) : (
        messages
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sorting messages by timestamp
          .map((message, index) => {
            // Check if timestamp is valid
            const timestamp = new Date(message.createdAt);
            const isValidDate = !isNaN(timestamp.getTime());

            return (
              <div key={index} className="p-2 border-b border-gray-500 text-white flex items-center">
                           
                <img 
                  src={profilePictures[message.sender] || 'default-profile.png'} // Use fetched profile picture or a default
                  alt={message.sender} 
                  className="w-10 h-10 rounded-full mr-2" 
                />

                {/* Message content */}
                <div className="flex-grow">

             
                  <p className="font-bold">{message.sender}</p>
                  <p>{message.subject}</p>
                </div>

                {/* Time displayed on the right */}
                <p className="text-xs text-white ml-2 whitespace-nowrap">
                  {isValidDate
                    ? formatDistanceToNow(timestamp, { addSuffix: true })
                    : 'Invalid date'}
                </p>
              </div>
            );
          })
      )}
    </div>
  );
}

export default Message;