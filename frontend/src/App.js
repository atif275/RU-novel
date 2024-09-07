import React, { useState, useEffect } from 'react';

import { useDispatch } from "react-redux";
import { userActions } from "./store";


import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

// ---------------------------------------------------------------------------SABHEEE import  WORKS-----------------------------------------------------
import Followlist from "./pages/FollowsList"
import Favorites from "./pages/Favorites"
import Readlater from "./pages/Readlater";
import History from "./pages/ReadingPage";
import { SubmitChapter } from './components/SubmitChapter';
import Compose from "./pages/Compose";
import Inbox from "./pages/Inbox";
import Sentitems from "./pages/Sentitems";
import Drafts from "./pages/Drafts";
import Trashcan from "./pages/Trashcan";

import Changeemail from "./pages/Changeemail";
import Changepassword from "./pages/Changepassword"
import Twofactorauth from "./pages/Twofactorauth"
import Externallogins from "./pages/Externallogins";
import Downloadaccount from "./pages/Downloadaccount";
import Deleteaccount from "./pages/Deleteaccount";

import Notifications from "./pages/Notifications";
import Threads from "./pages/Threads";
import Notificationlist from "./pages/Notificationlist";

import Usercp from "./pages/Usercp";
import Editsignature from "./pages/Editsignature";
// ---------------------------------------------------------------------------SABHEEE import ends-----------------------------------------------------
// import Borderwardrobe from "./pages/Borderwardrobe";
import HomePage from './pages/HomePage';
import Profile from './pages/Profile'; 
import MemberListPage from "./pages/MemberListPage";

import Chapter from './pages/Chapter';  
import AdminChapter from "./pages/AdminChapter";
import Fiction from "./pages/Fiction";
import AdminFiction from "./pages/AdminFiction";
import BestRatedPage from "./pages/BestRatedPage";
import Messages from "./pages/Messages";
import AuthorDashboardPage from "./pages/AuthorDashboardPage";
import AdminDashboardPage from './pages/AdminDashboardPage';
import ForumsPage from "./pages/ForumPage";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GoogelAccount from "./pages/Google";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FacebookAccount from "./pages/Facebook";
import Error from "./pages/ErrorPage";
import SignUPConPage from "./pages/SigUPConPage";
import KnowledgePage from "./pages/KnowledgeBasePage";
import RulesPage from "./pages/RulesAboutRating";
import ContactPage from "./pages/ContactDetailsPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import AdvancedPage from "./pages/AdvancedSearchPage";
import PremiumSubscriptionPage from "./pages/PremiumSubscriptionPage";
import Achievement from "./pages/Achievement";


import { useSelector } from "react-redux";

import ResetPasswordPage from "./pages/ResetPasswordPage";
import GRulePage from "./pages/GRulePage";
import OptimizePage from "./pages/OptimizePage";
import PersonalizedPage from "./pages/PersonalizedPage";
import NotificationPage from "./pages/Notification";
import Genres from "./pages/GenresPage";
import GenresPage from "./pages/GenresPage";
import AuthPage from "./pages/AuthorPage";
import ChapPage from "./pages/ChaptersPage";
import SubNovelPage from "./pages/SubNovelPage";
import ComPage from "./pages/CommentsPage";
import ReviewsPage from "./pages/ReviewsPage";
import FicPage from "./pages/FictionStatPage";
import DeleteFicPage from "./pages/DeleteFicPage";
import DonPage from "./pages/DonationPage";
import DonationPage from "./pages/DonationPage";
import CreditPage from "./pages/CreditPage";
import ModerationPage from "./pages/ModerationPage";
import RepPage from "./pages/ReputationPage";
import ExpPage from "./pages/ExpPage";
import AchPage from "./pages/AchPage";

import ActPage from "./pages/ActivationPage";
import SecPage from "./pages/SecurityPage";
import NotifyPage from "./pages/NotifyPage";
import ContactStaffPage from "./pages/ContactStaffPage";
import ReportBug from "./components/ReportBug";
import ReportBugPage from "./pages/ReportBugPage";
import SlowLoadPage from "./pages/SlowLoadPage";
import ReportAddPage from "./pages/ReportAddPage";
import RIPage from "./pages/ReportInteractionPage";
import SuggestionsPage from "./pages/SuggestionPage";
import NewIdeaPage from "./pages/NewIdeaPage";
import CommentingPage from "./pages/CommentingPage";
import ReplyPage from "./pages/ReplyPage";

import TrendingPage from "./pages/TrendingPage";
import OnGoingFictionsPage from "./pages/OnGoingFictionsPage";
import CompletePage from "./pages/CompletePage";
import AccountOptionsPage from "./pages/AccountOptionsPage";
import ProfileInfoPage from "./pages/ProfileInfoPage";


import FreqPage from "./pages/FreqAskedPage";
import CopyPage from "./pages/CopyPage";
import PremiumPage from "./pages/PremiumPage";
import AuthorPrePage from "./pages/AuthorPrePage";
import ReaderPrePage from "./pages/ReaderPrePage";
import AddPage from "./pages/AddPage";
import StatusPage from "./pages/StatusPage";
import TicketsPage from "./pages/TicketsPage";
import NewTicketPage from "./pages/newTicketPage";

//components
import HomePageContent from "./components/HomePageContent";
import PostFooter from './components/PostFooter';
import PageHeader from './components/Header';
import Navbar from './components/navbar'; // Ensure correct casing for imports
import Footer from './components/Footer';
import PopularThisWeekPage from "./pages/PopularThisWeekPage";
import LatestUpdatesPage from "./pages/LatestUpdatesPage";
import NewestFictionsPage from "./pages/NewestFictionsPage";
import RisingStarsPage from "./pages/RisingStarsPage";
import WritathonPage from "./pages/WritathonPage";
import { Navigate } from 'react-router-dom';
import SearchPage from "./pages/SearchPage"
function App() {
  // console.log("App component rendered");
  const theme = useSelector(state => state.userData.theme);
  const isAdmin=localStorage.getItem('adminLogin');
  const user = localStorage.getItem('userEmail');
  const dispatch=useDispatch()
  
  const backgroundStyle = theme === 'dark'
    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.vox-cdn.com/thumbor/kjcG6uGRVOuM9gwUdERF5vGvZdc=/0x0:1920x1080/1820x1213/filters:focal(804x128:1110x434):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg')`
    : `url('https://cdn.vox-cdn.com/thumbor/kjcG6uGRVOuM9gwUdERF5vGvZdc=/0x0:1920x1080/1820x1213/filters:focal(804x128:1110x434):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg')`;

    const fetchData = async () => {
      const email = localStorage.getItem('userEmail');
      // console.log('Fetching with email:', email);
    
      try {
        const response = await fetch('https://api.ru-novel.ru/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:email,
          }),
        });
    
        // console.log('Response:', response);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        // console.log('Data:', data);
        // console.log(data.user)
        dispatch(userActions.setEmail(data.user.email));
        dispatch(userActions.setUser(data.user));
       
      } catch (error) {
        console.error('Error logging in', error);
      }
    };
    useEffect(()=>{
       const userEmail = localStorage.getItem("userEmail");
       if(userEmail){
        fetchData()
       }
       
      
    })  

  return (
    <div
      style={{
        backgroundImage: backgroundStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures the background covers the full viewport height
      }}
    >
      <BrowserRouter>
      
        <Routes>
         
          <Route path="/" element={
            <>
            {/* <SignUp /> */}
            {/* <PageHeader  />
            <div className="hidden lg:block">
              <Navbar />
            </div> */}
            <HomePage />
            <HomePageContent/>
            <Footer />
            <PostFooter />
           </> 
          
          
          
          } />
          
        </Routes>
        <Routes>
            
            <Route path="/submit-chapter/:fictionId" element={<SubmitChapter />} />
        </Routes>
        <Routes>
                
                <Route path="/fiction/:id/:title" element={
                  <>
                   <HomePage />
                  <Fiction />
                  {/* <AdminFiction /> */}
                  <Footer />
                  <PostFooter />
                  </>
                  } />
                
              </Routes>

              <Routes>
                
                <Route path="/admin/fiction/:id/:title" element={
                  <>
                   {/* <HomePage /> */}
                  {/* <Fiction /> */}
                  <AdminFiction />
                  {/* <Footer />
                  <PostFooter /> */}
                  </>
                  } />
                
              </Routes>
              <Routes>
                
                <Route path="/submission/fiction/:id/:title" element={
                  <>
                   {/* <HomePage /> */}
                  {/* <Fiction /> */}
                  <AdminFiction />
                  {/* <Footer />
                  <PostFooter /> */}
                  </>
                  } />
                
              </Routes>
              

              

              <Routes>
          <Route
            path="/fiction/:fictionId/:fictionTitle/chapter/:chapterId/:chapterTitle"
            element={
              <>
               <HomePage />
                <Chapter />
                {/* <AdminChapter /> */}
                <Footer />
            <PostFooter />
              </>
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/admin/fiction/:fictionId/:fictionTitle/chapter/:chapterId/:chapterTitle"
            element={
              <>
               {/* <HomePage /> */}
                {/* <Chapter /> */}
                <AdminChapter />
                {/* <Footer /> */}
            {/* <PostFooter /> */}
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/submission/fiction/:fictionId/:fictionTitle/chapter/:chapterId/:chapterTitle"
            element={
              <>
               {/* <HomePage /> */}
                {/* <Chapter /> */}
                <AdminChapter />
                {/* <Footer /> */}
            {/* <PostFooter /> */}
              </>
            }
          />
        </Routes>


        <Routes>
         
         <Route path="/Fiction" element={
           <>
           <HomePage />
           <Fiction />
           <Footer />
           <PostFooter />
          </> 
         
         
         
         } />
         
       </Routes>

       <Routes>
         
         <Route path="/premium" element={
          user ? (
            <>
           <HomePage />
           <PremiumSubscriptionPage />
           <Footer />
           <PostFooter />
          </> 
         
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              You need to be logged in to create a new ticket.
            </div>
          )
           
         
         
         } />
         
       </Routes>
       <Routes>
          <Route path="/user/achievements" element={
            <>
              <HomePage />
              <Achievement />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        
        {/* /memberlist */}
        <Routes>
          <Route path="/user/memberlist" element={
           <>
            <HomePage />
            <MemberListPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>
        {/* /fictions/best-rated */}
        <Routes>
          <Route path="/fictions/best-rated" element={
           <>
            {/* <SignUp /> */}
            <HomePage />
            <BestRatedPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>
        {/* /fictions/trending */}
        <Routes>
          <Route path="/fictions/trending" element={
           <>
            <HomePage />
            <TrendingPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>
        {/* /fictions/active-popular (OnGoingFiction) */}
        <Routes>
          <Route path="/fictions/active-popular" element={
           <>
            <HomePage />
            <OnGoingFictionsPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>
        {/* /fictions/complete */}
        <Routes>
          <Route path="/fictions/complete" element={
           <>
            <HomePage />
            <CompletePage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        {/* /fictions/weekly-popular */}
        <Routes>
          <Route path="/fictions/weekly-popular" element={
           <>
            <HomePage />
            <PopularThisWeekPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        {/* /fictions/latest-updates */}
        <Routes>
          <Route path="/fictions/latest-updates" element={
           <>
            <HomePage />
            <LatestUpdatesPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        {/* /fictions/new */}
        <Routes>
          <Route path="/fictions/new" element={
           <>
            <HomePage />
            <NewestFictionsPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        {/* /fictions/rising-stars */}
        <Routes>
          <Route path="/fictions/rising-stars" element={
           <>
           <HomePage />
            <RisingStarsPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        {/* /fictions/writathon */}
        <Routes>
          <Route path="/fictions/writathon" element={
           <>
           
            <WritathonPage/>
            
           </> 
          } />
          
        </Routes>
        {/* /fictions/search */}
        <Routes>
          <Route path="/fictions/search" element={
           <>
            <HomePage />
            <SearchPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>


        {/* /forums */}
        <Routes>
          <Route path="/forums" element={
           <>
           <HomePage />
            <ForumsPage/>
            <Footer />
            <PostFooter />
           </> 
          } />
          
        </Routes>

        

        
        <Routes>
          <Route path="/messages" element={
           <>
            <HomePage />
            <AccountOptionsPage />
            {/* <Messages /> */}
            <PostFooter />
           </> 
          } />
          
        </Routes>
        <Routes>
          <Route path="/account" element={
           <>
            <HomePage />
            <ProfileInfoPage />
            {/* <Messages /> */}
            <PostFooter />
           </> 
          } />
          
        </Routes>

        
        
        
       <Routes>
          {/* Set up the route for SearchResult */}
          <Route path="/search" element={<SearchResult />} />
          
        </Routes>
        <Routes>
          {/* Set up the route for SearchResult */}
          <Route path="/login" element={<Login />} />
          
        </Routes>
        <Routes>
          
          <Route path="/register" element={<SignUp />} />
          
        </Routes>

        <Routes>
          
          <Route path="/google/account" element={<GoogelAccount />} />
          
        </Routes>
      
        <Routes>
          
          <Route path="/facebook/account" element={<FacebookAccount />} />
          
        </Routes>
        <Routes>
          
          <Route path="/error" element={<Error />} />
          
        </Routes>
        <Routes>
          
          <Route path="/signup/configuration" element={< SignUPConPage/>} />
          
        </Routes> 

        <Routes>
          
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
        </Routes> 
        <Routes>
          
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      

          
        </Routes> 
        <Routes>
          <Route path="/user/borders" element={
            <>
              <HomePage />
              {/* <Borderwardrobe /> */}
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        
  
            
          </Routes> 

          <Routes>
          
          <Route path="/support/knowledgebase" element={<KnowledgePage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/rules-about-ratings-and-reviews" element={<RulesPage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/content-guidelines" element={<ContactPage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/general-rules" element={<GRulePage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/discovery-and-rankings" element={<DiscoveryPage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/advanced-search" element={<AdvancedPage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/optimize-the-reading-experience" element={<OptimizePage />} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/personalized-lists" element={ <PersonalizedPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/notifications" element={ <NotificationPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/genres-and-tags" element={ <GenresPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/author-dashboard" element={ <AuthPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/chapters" element={ <ChapPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/submitting-and-verifying-novels" element={ <SubNovelPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/comments" element={ <ComPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/reviews" element={ <ReviewsPage/>} />
        
  
            
          </Routes> 
          <Routes>
          
          <Route path="/support/knowledgebase/fiction-status" element={ <FicPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/deleting-your-fiction" element={ <DeleteFicPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/donation" element={ <DonationPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/credit-collaborate-and-moderate" element={ <CreditPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/moderation-tools-for-users" element={ <ModerationPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/reputation" element={ <RepPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/experience" element={ <ExpPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/achievments" element={ <AchPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/writathon" element={ <WritathonPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/signup-and-activation" element={ <ActPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/security" element={ <SecPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/notification" element={ <NotifyPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/contact-the-staff" element={ <ContactStaffPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/report-a-bug" element={ <ReportBugPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/site-loading-slowly" element={ <SlowLoadPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/report-an-ad" element={ <ReportAddPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/report-a-user-interaction" element={ <RIPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/suggestions" element={ <SuggestionsPage/>} />
        
  
            
          </Routes>
          <Routes>
        <Route
          path="/create/idea"
          element={
            user ? (
              <NewIdeaPage />
            ) : (
              <div>You need to be logged in to create an idea.</div>
            )
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/comments"
          element={
            user ? (
              <CommentingPage />
            ) : (
              <div>You need to be logged in to view comments.</div>
            )
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/reply"
          element={
            user ? (
              <ReplyPage />
            ) : (
              <div>You need to be logged in to reply.</div>
            )
          }
        />
      </Routes>
          <Routes>
          
          <Route path="support/knowledgebase/fredquently-asked-questions" element={ <FreqPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="support/knowledgebase/copyright-infringement" element={ <CopyPage/>} />
        
  
            
          </Routes>

          <Routes>
          
          <Route path="support/knowledgebase/premium" element={ <PremiumPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="support/knowledgebase/author-premium" element={ <AuthorPrePage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="support/knowledgebase/reader-premium" element={ <ReaderPrePage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/knowledgebase/paid-advertisement-for-my-story" element={ <AddPage/>} />
        
  
            
          </Routes>
          <Routes>
          
          <Route path="/support/status" element={ <StatusPage/>} />
        
  
            
          </Routes>
          {/* <Routes>
          
          <Route path="/support/ticket" element={ <TicketsPage/>} />
        
  
            
          </Routes> */}
          
          <Routes>
          
          <Route
          path="/support/ticket"
          element={
            user ? (
              <TicketsPage />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                You need to be logged in to view this page.
              </div>
            )
          }
        />

  
            
          </Routes>

          <Routes>
        <Route
          path="/support/new-ticket"
          element={
            user ? (
              <NewTicketPage />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                You need to be logged in to create a new ticket.
              </div>
            )
          }
        />
      </Routes>
          {/* // ---------------------------------------------------------------------------SABHEEE Routes Start----------------------------------------------------- */}

        {/* /author-dashboard */}
        <Routes>
          <Route path="/author-dashboard" element={
           
             user ? (
              <AuthorDashboardPage />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                You need to be logged in to create a new ticket.
              </div>
            )
             
             
              
           
          } />

        </Routes>
        

        <Routes>
            <Route
                path="/admin-dashboard"
                element={isAdmin ? <AdminDashboardPage /> : <Navigate to="/login" />}
            />
      
       </Routes>
        {/* Sabhee profile */}

        <Routes>
          <Route path="/profile" element={
            <>
              <HomePage />
              <Profile />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/account" element={
            <>
              <HomePage />
              <ProfileInfoPage />
              {/* <Messages /> */}
              <PostFooter />
            </>
          } />
          {/* sabhee privacy $ security */}
        </Routes>
        <Routes>
          <Route path="/account/changeemail" element={
            <>
              <HomePage />
              <Changeemail />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/account/changepassword" element={
            <>
              <HomePage />
              <Changepassword />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/account/twofactorauthentication" element={
            <>
              <HomePage />
              <Twofactorauth />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/account/externallogins" element={
            <>
              <HomePage />
              <Externallogins />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/account/download" element={
            <>
              <HomePage />
              <Downloadaccount />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>


        <Routes>
          <Route path="/account/delete" element={
            <>
              <HomePage />
              <Deleteaccount />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        {/* notificationOptions */}
        <Routes>
          <Route path="/account/notifications" element={
            <>
              <HomePage />
              <Notifications />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/notifications/threads" element={
            <>
              <HomePage />
              <Threads />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/notifications/list" element={
            <>
              <HomePage />
              <Notificationlist />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/my/usercp" element={
            <>
              <HomePage />
              <Usercp />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/account/signature" element={
            <>
              <HomePage />
              <Editsignature />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        {/*  */}


        {/* messageOptions */}
        <Routes>
          <Route path="/private/send" element={
            <>
              <HomePage />
              <Compose />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        <Routes>
          <Route path="/private/1" element={
            <>
              <HomePage />
              <Inbox />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/private/2" element={
            <>
              <HomePage />
              <Sentitems />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/private/3" element={
            <>
              <HomePage />
              <Drafts />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/private/4" element={
            <>
              <HomePage />
              <Trashcan />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>
        {/* /my/follows */}
        <Routes>
          <Route path="/my/follows" element={
            <>
              <HomePage />
              <Followlist />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/my/favorites" element={
            <>
              <HomePage />
              <Favorites />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/my/readlater" element={
            <>
              <HomePage />
              <Readlater />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>

        <Routes>
          <Route path="/my/history" element={
            <>
              <HomePage />
              <History />
              <Footer />
              <PostFooter />
            </>
          } />
        </Routes>









        {/* // ---------------------------------------------------------------------------SABHEEE Routes ends----------------------------------------------------- */}



      </BrowserRouter>
    </div>
  );
}

export default App;
