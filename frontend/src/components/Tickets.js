import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store';
import { formatDistanceToNow, isValid, format } from "date-fns";

function Tickets() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userData.email);
  const ticketArr = useSelector((state) => state.userData.ticketArr || []); 

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://api.ru-novel.ru/api/find/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Fetched data:", data);
        if (data) {
          dispatch(userActions.setTicketsArr(data));
          // console.log(data); // Save the fetched tickets in Redux state
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
      fetchUserData(); // Fetch tickets when the component mounts or when the email changes
    }
  }, [email]);

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div className="bg-white p-4">
        <div className="flex flex-col md:flex-row justify-start items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className='md:w-1/3 h-full pt-[4%] pl-[10%]'>
            <div className="items-center bg-gray-400 text-white text-4xl font-bold p-4 pl-6 w-full md:w-[25%]" style={{ borderRadius: '50%' }}>
              ?
            </div>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full md:w-2/3">
            <h5 className="text-xl font-semibold mb-2 text-center">Need some help?</h5>
            <p className="mb-4">
              Our team is happy to help or answer any question you may have. All you need to do is to create a support ticket, ask your question, and our team will respond as soon as possible.
            </p>
            <button className="inline-block px-4 py-2 md:ml-[38%] text-white bg-[#337AB7] hover:bg-blue-600 transition duration-300">
              <Link to='/support/new-ticket'>Open a support ticket</Link>
            </button>
          </div>
        </div>
      </div>

      <div className='bg-white p-4 mt-6'>
        <div className='flex justify-between'>
          <p>Your Support Tickets</p>
          <button className='bg-[#337AB7] p-2 text-white rounded-md'>
            <Link to='/support/new-ticket'>Add New+</Link>
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
        {ticketArr.length > 0 ? (
          <table className="min-w-full table-auto text-center" style={{ fontWeight: '200' }}>
            <thead>
              <tr>
                <th className="px-4 py-2 font-normal">Status</th>
                <th className="px-4 py-2 font-normal">Created</th>
                <th className="px-4 py-2 font-normal">Last Reply</th>
                <th className="px-4 py-2 font-normal">Category</th>
              </tr>
            </thead>
            <tbody>
              {ticketArr.map((ticket, index) => {
                  const createdDate = new Date(ticket.createdAt);
                  const lastReplyDate = new Date(ticket.updatedAt);
  
                  const formattedCreatedDate = isValid(createdDate)
                    ? format(createdDate, "yyyy/M/d")  // Format: 2024/3/17
                    : "Invalid date";
  
                  const formattedLastReply = isValid(lastReplyDate)
                    ? `${formatDistanceToNow(lastReplyDate, { addSuffix: true })}`
                    : 'No replies yet';

                return (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-white "> <span className='bg-gray-400 p-2'>{ticket.status}</span></td>
                    <td className="px-4 py-2">{formattedCreatedDate} </td>
                    <td className="px-4 py-2">{formattedLastReply} <span className='ml-2 font-bold'>by {ticket.username}</span></td>
                    <td className="px-4 py-2 text-white"><span className='bg-gray-400 p-2'>{ticket.category}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          ) : (
            <p>No tickets available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tickets;
