// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchHelloWorld } from '../services/apiService';

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getHelloWorld = async () => {
      try {
        const msg = await fetchHelloWorld();
        setMessage(msg);
      } catch (error) {
        console.error('Failed to fetch hello world message:', error);
      }
    };

    getHelloWorld();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-4">{message}</h1>
    </div>
  );
};

export default HomePage;
