import React, { useState,useEffect } from 'react';
import PostFooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar'; // Ensure correct casing for imports
import Footer from '../components/Footer';
import PrivatePolicy from '../components/PrivatePolicy';


import { useSelector, useDispatch } from 'react-redux';



const PP = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


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


        <PrivatePolicy />
        <Footer/>
        <PostFooter />
      </div>
    
  );
};

export default PP;