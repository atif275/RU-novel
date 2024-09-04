// src/pages/HomePageContent.js
import React from 'react';
import HpContainer from '../components/HpContainer';
import RecommendedSection from '../components/RecommendedSection';
import PopularThisWeek from '../components/PopularThisWeek';
import RisingStars from '../components/RisingStars';
import LatestUpdates from '../components/LatestUpdates';
import HpAd1 from '../components/HpAd1';
import HpAd2 from '../components/HpAd2';
import BestOngoing from '../components/BestOngoing';
import BestCompleted from '../components/BestCompleted';
import HpBanner from '../components/HpBanner';

const HomePageContent = () => {
  return (
    <div className="HomePage">
        <HpContainer>
          <HpBanner />
          <HpAd1 />
          <RecommendedSection />
          <div className='flex flex-col md:flex-row mb-4'>
            <LatestUpdates className="w-full md:w-1/2 mb-4 md:mb-0" />
            <div className='flex flex-col w-full md:w-1/2'>
              <RisingStars className="w-full mb-4 md:mb-0" />
              <HpAd2 className="w-full" />
            </div>
          </div>
          <PopularThisWeek />
          <div className='flex flex-col md:flex-row mb-4'>
            <BestCompleted />
            <BestOngoing />
          </div>
        </HpContainer>
      </div>
  );
};

export default HomePageContent;
