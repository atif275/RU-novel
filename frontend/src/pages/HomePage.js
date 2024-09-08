// src/pages/HomePage.js
import React, { useState,useEffect } from 'react';
import PostFooter from '../components/PostFooter';
import PageHeader from '../components/Header';
import Navbar from '../components/navbar'; // Ensure correct casing for imports
import Footer from '../components/Footer';
import HomePageContent from "../components/HomePageContent";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store';





const HomePage = () => {


  const isNavbarVisible = useSelector((state) => state.userData.barsClick);
  
  const getQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    return {
      userEmail: query.get('email'),
    };
  };
  
    const dispatch = useDispatch();
  


    
  
    // useEffect(() => {

    //   const { userEmail } = getQueryParams();
    //   // console.log('Fetched userEmail:', userEmail); // Check if userEmail is correctly fetched
    
    //   if (userEmail) {
    //     const fetchUserData = async () => {
    //       try {
    //         const response = await fetch(`https://api.ru-novel.ru/api/users/${encodeURIComponent(userEmail)}`);
    //         if (response.ok) {
    //           const data = await response.json();
    //           // console.log('Fetched data:', data); // Check the fetched data
    //           if (data) {
    //             dispatch(userActions.setEmail(data.email))
    //             dispatch(userActions.setUser(data));
                
    //           }
    //         } else {
    //           console.error('Response not OK:', response.statusText);
    //         }
    //       } catch (err) {
    //         console.error('Error fetching user data:', err);
    //       }
    //     };
    //     fetchUserData();
    //   }
    // }, [dispatch]);
    useEffect(() => {

      const { userEmail } = getQueryParams();
      // console.log('Fetched userEmail:', userEmail); // Check if userEmail is correctly fetched
      
      if (userEmail) {
        localStorage.setItem('userEmail',userEmail)
        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://api.ru-novel.ru/api/users/${encodeURIComponent(userEmail)}`);
            if (response.ok) {
              const data = await response.json();
              // console.log('Fetched data:', data); // Check the fetched data
              if (data) {
                dispatch(userActions.setEmail(data.email))
                dispatch(userActions.setUser(data));
                
              }
            } else {
              console.error('Response not OK:', response.statusText);
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        };
        fetchUserData();
       
      }
      
    }, []);
  
  
      

  
  
    
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
      {/* <HomePageContent/>
        <Footer />
        <PostFooter /> */}
      </div>
    
  );
};

export default HomePage;
