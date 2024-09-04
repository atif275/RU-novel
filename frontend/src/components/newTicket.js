import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faGlobe, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';
const SupportTicketForm = () => {
  const email = useSelector((state) => state.userData.email);
  const ticketData = useSelector((state) => state.userData.tickets);
  const dispatch = useDispatch();

  const categoryRef = useRef(null);
  const subjectRef = useRef(null);
  const browserRef = useRef(null);
  const extensionsRef = useRef(null);
  const jsDisabledRef = useRef(null);
  const messageRef = useRef(null);
  const navigate=useNavigate()

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
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
    console.log(email);
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://localhost:5001/api/ticket", {
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
        console.log("Fetched data:", data);
        if (data) {
          console.log(data.comment);
        
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
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              ref={categoryRef}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
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
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faTag} className="text-gray-500 mt-6" />
            </div>
            <input
              type="text"
              id="subject"
              name="title"
              ref={subjectRef}
              className="mt-1 block w-full pl-10 outline-none p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Subject"
              maxLength="128"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="browser" className="block text-sm font-medium text-gray-700">Browser</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faGlobe} className="text-gray-500 mt-6" />
            </div>
            <input
              type="text"
              id="browser"
              name="browser"
              ref={browserRef}
              className="mt-1 block w-full pl-10 p-2 outline-none border border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Internet Explorer/Firefox/Google Chrome..."
              maxLength="256"
            />
          </div>

          <div className="relative">
            <label htmlFor="extensions" className="block text-sm font-medium text-gray-700">Extensions</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faPuzzlePiece} className="text-gray-500 mt-6" />
            </div>
            <input
              type="text"
              id="extensions"
              name="extensions"
              ref={extensionsRef}
              className="mt-1 block w-full outline-none pl-10 p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              placeholder="Ad Blocker, Password Manager, etc..."
              maxLength="1024"
            />
          </div>

          <div ref={jsDisabledRef}>
            <p className="block text-sm font-medium text-gray-700">Is JavaScript <strong>Disabled</strong>?</p>
            <div className="mt-2 flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="js_disabled"
                  value="True"
                  className="form-radio text-indigo-600"
                  defaultChecked
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="js_disabled"
                  value="False"
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="content"
              name="content"
              ref={messageRef}
              rows="10"
              className="mt-1 block w-full outline-none p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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


