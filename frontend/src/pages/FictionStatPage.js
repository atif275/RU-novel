import React, { useState,useEffect } from 'react';
import PostFooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar'; // Ensure correct casing for imports
import Footer from '../components/Footer';
import Chapters from '../components/Chapters';
import Fictionstat from '../components/FictionStat';

import { useSelector, useDispatch } from 'react-redux';



const FicPage = () => {


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

       <Fictionstat></Fictionstat>
        
        <Footer/>
        <PostFooter />
      </div>
    
  );
};

export default FicPage;