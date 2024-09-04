// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Postfooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import { fetchHelloWorld } from '../services/apiService';
import { useSelector,useDispatch } from 'react-redux';



const SearchResult = () => {
  const isNavbarVisible = useSelector((state) => state.userData.barsClick);
  



 
   
    return ( 
      <div >
      
      <PageHeader />

      
      {isNavbarVisible && (
        <div className="lg:hidden ">
          <Navbar />
        </div>
      )}
      <div className="hidden lg:block">
        <Navbar />
      </div>
     
     <Search/>
      <Footer/>
      <Postfooter/>
    
      </div>
    
      
   
    
  );
};

export default SearchResult;

