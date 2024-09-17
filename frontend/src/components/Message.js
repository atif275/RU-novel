import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

function Message({ messages, noMessages }) {
  const theme = useSelector((state) => state.userData.theme);
  const [profilePictures, setProfilePictures] = useState({});

  // Fetch profile pictures for each sender
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
      return null;
    }
  };

  // Fetch all profile pictures for the messages
  const fetchAllProfilePictures = async () => {
    const pictures = await Promise.all(
      messages.map((message) =>
        fetchDataForSender(message.sender).then((picture) => ({
          sender: message.sender,
          picture,
        }))
      )
    );

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
      className={`absolute mt-2 p-4 lg:mr-0 text-[#bcc2cb] space-y-2 w-64 max-h-48 overflow-y-auto ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-600'}`}
      style={{ zIndex: 10 }}
    >
      {noMessages ? (
        <p>No message Available</p>
      ) : (
        messages
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort messages by timestamp
          .map((message, index) => {
            const timestamp = new Date(message.createdAt);
            const isValidDate = !isNaN(timestamp.getTime());

            return (
              <div key={index} className="overflow-hidden">
                <div className="pt-2 pb-2 border-b border-gray-500 text-white flex items-start justify-between">
                  {/* Sender and Message */}
                  <div className="flex items-center">
                    <img 
                      src={profilePictures[message.sender] || 'default-profile.png'} 
                      alt={message.sender} 
                      className="w-10 h-10 rounded-full mr-2" 
                    />
                    <div className="flex-grow">
                      <p className="font-bold">{message.sender}</p>
                      {/* Message subject truncated with ellipsis */}
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs" style={{ maxWidth: '120px' }}>
                        {message.subject}
                      </p>
                    </div>
                  </div>

                  {/* Time on top-right */}
                  <p className="text-xs text-white whitespace-nowrap ml-2">
                    {isValidDate ? formatDistanceToNow(timestamp, { addSuffix: true }) : 'Invalid date'}
                  </p>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}

export default Message;
