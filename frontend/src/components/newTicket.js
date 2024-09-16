import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faGlobe, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';

const SupportTicketForm = () => {
  const email = useSelector((state) => state.userData.email);
  const ticketData = useSelector((state) => state.userData.tickets);
  const theme = useSelector((state) => state.userData.theme);
  const dispatch = useDispatch();

  const categoryRef = useRef(null);
  const subjectRef = useRef(null);
  const browserRef = useRef(null);
  const extensionsRef = useRef(null);
  const jsDisabledRef = useRef(null);
  const messageRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://api.ru-novel.ru/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          dispatch(userActions.setTickets(data));
        }
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.ru-novel.ru/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ticket: {
            username: ticketData.username,
            category: categoryRef.current.value,
            subject: subjectRef.current.value,
            browser: browserRef.current.value,
            extensions: extensionsRef.current.value,
            javascript: jsDisabledRef.current.querySelector('input[name="js_disabled"]:checked').value,
            message: messageRef.current.value,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          navigate('/support/ticket');
        }
      } else {
        console.error("Error submitting idea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
      <div className={`p-4 shadow-md rounded-lg ${theme === 'dark' ? 'bg-[#131313]' : 'bg-white '}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Category
            </label>
            <select
              id="category"
              name="category"
              ref={categoryRef}
              className={`mt-1 block w-full p-2 sm:text-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] focus:outline-none' : 'border border-gray-300 rounded-md shadow-sm'}`}
              required
            >
              <option value="Account">Account</option>
              <option value="Ads">Ads</option>
              <option value="App">App</option>
              <option value="Community">Community</option>
              <option value="Fiction">Fiction</option>
              <option value="Forum">Forum</option>
              <option value="Payments">Payments</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <div className="relative">
            <label htmlFor="subject" className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Subject
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faTag} className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-500'} mt-6`} />
            </div>
            <input
              type="text"
              id="subject"
              name="title"
              ref={subjectRef}
              className={`mt-1 block w-full pl-10 p-2 sm:text-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] placeholder-gray-500 focus:outline-none' : 'text-black border border-gray-300 rounded-md shadow-sm'}`}
              placeholder="Subject"
              maxLength="128"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="browser" className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Browser
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faGlobe} className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-500'} mt-6`} />
            </div>
            <input
              type="text"
              id="browser"
              name="browser"
              ref={browserRef}
              className={`mt-1 block w-full pl-10 p-2 sm:text-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] placeholder-gray-500 focus:outline-none' : 'text-black border border-gray-300 rounded-md shadow-sm'}`}
              placeholder="Internet Explorer/Firefox/Google Chrome..."
              maxLength="256"
            />
          </div>

          <div className="relative">
            <label htmlFor="extensions" className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Extensions
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faPuzzlePiece} className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-500'} mt-6`} />
            </div>
            <input
              type="text"
              id="extensions"
              name="extensions"
              ref={extensionsRef}
              className={`mt-1 block w-full pl-10 p-2 sm:text-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] placeholder-gray-500 focus:outline-none' : 'text-black border border-gray-300 rounded-md shadow-sm'}`}
              placeholder="Ad Blocker, Password Manager, etc..."
              maxLength="1024"
            />
          </div>

          <div ref={jsDisabledRef}>
            <p className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Is JavaScript <strong>Disabled</strong>?
            </p>
            <div className="mt-2 flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="js_disabled"
                  value="True"
                  className={`form-radio ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'text-indigo-600'}`}
                  defaultChecked
                />
                <span className={`ml-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="js_disabled"
                  value="False"
                  className={`form-radio ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'text-indigo-600'}`}
                />
                <span className={`ml-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>No</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="content" className={`block text-sm font-medium text-[#FFFFFFCC]`}>
              Message
            </label>
            <textarea
              id="content"
              name="content"
              ref={messageRef}
              rows="10"
              className={`mt-1 block w-full p-2 sm:text-sm ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] placeholder-gray-500 focus:outline-none' : 'text-black border border-gray-300 rounded-md shadow-sm'}`}
              placeholder="Describe your issue in detail."
              maxLength="32768"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportTicketForm;