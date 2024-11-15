import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

const Postfooter = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.userData.theme);
  useEffect(() => {
    dispatch(userActions.setBarsClick(false))
   
  }, []);
  

  return (
    <div style={{ width: '100%' }} className={`py-4 text-sm font-light ${theme === 'dark' ? 'bg-[#131313] text-[#A2ABB7]' : 'bg-[#3b434c] text-[#a2abb7]'}`}>
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex-1">
          RU - Novel® © 2024
        </div>
        <div className="flex-1 text-right space-x-2 mr-[3%] text-[#F2F2F2]">
          <Link to="/tos" className="hover:underline">Terms of Service</Link> |
          <Link to="/privacypolicy" title="Privacy Policy" className="hover:underline">Privacy Policy</Link> |
          <Link to="/cookiepolicy" title="Cookie Policy" className="hover:underline">Cookie Policy</Link> |
          <Link to="/dmca" title="DMCA" className="hover:underline">DMCA</Link> |
          <Link to="/blog" className="hover:underline">Blog</Link> |
          <Link to="/support/status" rel="noopener noreferrer" className="hover:underline">Status</Link>
        </div>
      </div>
    </div>
  );
};

export default Postfooter;
