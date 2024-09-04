import React, { useState,useEffect } from 'react';
import Status from '../components/Status';
import SlowLoad from '../components/SlowLoading';
import { useSelector, useDispatch } from 'react-redux';



const StatusPage = () => {


  const isNavbarVisible = useSelector((state) => state.userData.barsClick);
  
  

  return (
    <div>
  
     
        <Status/>
    
      </div>
    
  );
};

export default StatusPage;