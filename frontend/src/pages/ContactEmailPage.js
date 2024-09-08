import React, { useState,useEffect } from 'react';
import PostFooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar'; // Ensure correct casing for imports
import Footer from '../components/Footer';
import ContactStaff from '../components/ContactStaff';
import ContactEmail from '../components/ContactEmail';


import { useSelector, useDispatch } from 'react-redux';



const ContactEmailPage = () => {


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
         <ContactEmail/>
        
        <Footer/>
        <PostFooter />
      </div>
    
  );
};

export default ContactEmailPage;