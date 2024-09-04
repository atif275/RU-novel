import React, { useState, useEffect } from 'react';

const FnAd1 = () => {
  const [adData, setAdData] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('Ad_3');

  const fetchAdData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ado', {
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

  return (
    <div className='w-full p-4'>
      <div className="flex justify-center items-center w-full h-[200px] bg-white">
        {loading ? (
          <div>Loading...</div>
        ) : adData && adData.image ? (
          <a href={adData.link} className=" w-full h-full bg-white" target="_blank"> <img
          src={adData.image}
          alt="Advertisement"
          className=" w-full h-full bg-white "
        /> </a>
        ) : (
          <p className='font-bold'>ADVERTISEMENT</p>
        )}
      </div>
    </div>
  );
};

export default FnAd1;