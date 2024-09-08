import React, { useState,useEffect } from 'react';
import PostFooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar'; // Ensure correct casing for imports
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';

import Personalized from '../components/Personalized';

import { useSelector, useDispatch } from 'react-redux';
import Reporting from '../components/Reporting';



const RPage = () => {


  const isNavbarVisible = useSelector((state) => state.userData.barsClick);
  
  

  return (
    <div>
      
      <PageHeader  />
      {isNavbarVisible && (
        <div className="lg:hidden ">
          <Navbar />
        </div>
      )}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <Reporting/>
        <Footer/>
        <PostFooter />
      </div>
    
  );
};

export default RPage;