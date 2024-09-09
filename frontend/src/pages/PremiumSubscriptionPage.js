import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PremiumSubscriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monthlySubscription = 3.49;
  const yearlySubscription = 34.99;

  // Fetch user details from Redux
 const  user = useSelector((state) => state.userData.user);
const username = user.username;
const email = user.email;
  const handleSubscription = async (plan) => {
    try {
      // Replace with your backend API endpoint to create a payment request
      const response = await axios.post("https://api.ru-novel.ru/api/qiwi/payment", {
        username,
        email,
        plan,
        amount: plan === "monthly" ? monthlySubscription : yearlySubscription,
      });

      // Redirect user to QIWI payment page
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div
      className="w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://cdn.vox-cdn.com/thumbor/kjcG6uGRVOuM9gwUdERF5vGvZdc=/0x0:1920x1080/1820x1213/filters:focal(804x128:1110x434):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg')",
      }}
    >
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-white w-full pb-8">
        <div className="p-6 bg-gray-100">
          <div className="mb-6 text-2xl font-semibold">
            Choose Subscription
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <div className="mb-6 p-4 text-sm text-gray-700 bg-gray-100">
              <p>
                User experience is very important to us. We understand that
                advertisements can be annoying, slow, and overall disturbing to
                you. At the same time, we require money to maintain,
                administrate and develop.
              </p>
              <br />
              <p>
                We've decided on the price for the Reader Premium package so
                it's not overwhelming, but it is still plenty to support the
                website if enough people subscribe. At the same time, we've felt
                that just removing the ads for our supporters is simply not
                enough; we should offer more.
              </p>
              <br />
              <span>
                Hence, we've come up with and developed the features you can see
                below, and we have additional features planned for our
                supporters.
              </span>
            </div>

            <div className="flex flex-wrap -mx-3">
              {/* Monthly Subscription */}
              <div className="w-full md:w-1/2 px-3 mb-6 justify-content items-center">
                <div className="bg-gray-200 text-white rounded overflow-hidden shadow-lg max-w-sm mx-auto">
                  <div className="text-center p-4">
                    <label>
                      <img
                        src="https://www.royalroad.com/dist/img/premium_forest_nochar.jpg"
                        alt="Premium"
                        className="w-full h-50 object-cover"
                      />
                    </label>
                    <h4 className="text-xl text-gray-600 font-bold mt-4 uppercase tracking-widest">
                      Author Premium
                    </h4>
                    <p className="mt-2 text-gray-400 text-sm font-bold">
                      Ad-free browsing experience for readers, with push
                      notifications and visuals to show your support of Royal
                      Road.
                    </p>
                    <div className="mt-8 p-2 bg-gray-500 text-white rounded w-full text-lg tracking-widest text-center">
                      ${monthlySubscription} / month
                    </div>

                    <ul className="mt-6 text-left text-gray-600 px-6">
                      <li className="flex items-center mb-2">
                        <i className="fa fa-address-card mr-2 text-lg"></i>No
                        Advertisements
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="far fa-bell mr-2 text-lg"></i>
                        Push Notifications
                        <i className="fa fa-exclamation-circle font-yellow ml-1"></i>
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-crown mr-2 text-lg"></i>Premium
                        Badge
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fas fa-user-circle mr-2 text-lg"></i>
                        Golden Post Border
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-history mr-2 text-lg"></i>
                        Full Reading History
                        <i className="fa fa-question-circle ml-1"></i>
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-user-circle mr-2 text-lg"></i>
                        Monthly Avatar Borders
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-newspaper mr-2 text-lg"></i>Early
                        Access to New Features
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-id-card-alt mr-2 text-lg"></i>
                        Custom Profile Header
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-heart mr-2 text-lg"></i>Support
                        RU Novel!
                      </li>
                    </ul>
                    <button
                      onClick={() => handleSubscription("monthly")}
                      className="mt-6 mb-4 bg-custom-blue hover:bg-custom-hover-blue text-white py-1 px-2 text-lg tracking-widest"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>
              {/* Yearly Subscription */}
              <div className="w-full md:w-1/2 px-3 mb-6 justify-content items-center">
                <div className="bg-gray-200 text-white rounded overflow-hidden shadow-lg max-w-sm mx-auto">
                  <div className="text-center p-4">
                    <label>
                      <img
                        src="https://www.royalroad.com/dist/img/premium_forest_nochar.jpg"
                        alt="Premium"
                        className="w-full h-50 object-cover"
                      />
                    </label>
                    <h4 className="text-xl text-gray-600 font-bold mt-4 uppercase tracking-widest">
                      Author Premium
                    </h4>
                    <p className="mt-2 text-gray-600 text-sm font-bold">
                      Ad-free browsing experience for readers, with push
                      notifications and visuals to show your support of Royal
                      Road.
                    </p>
                    <div className="mt-8 p-2 bg-gray-500 text-white rounded w-full text-lg tracking-widest text-center">
                      ${yearlySubscription} / year
                    </div>

                    <ul className="mt-6 text-left text-gray-600 px-6">
                      <li className="flex items-center mb-2">
                        <i className="fa fa-address-card mr-2 text-lg"></i>No
                        Advertisements
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="far fa-bell mr-2 text-lg"></i>
                        Push Notifications
                        <i className="fa fa-exclamation-circle font-yellow ml-1"></i>
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-crown mr-2 text-lg"></i>Premium
                        Badge
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fas fa-user-circle mr-2 text-lg"></i>
                        Golden Post Border
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-history mr-2 text-lg"></i>
                        Full Reading History
                        <i className="fa fa-question-circle ml-1"></i>
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-user-circle mr-2 text-lg"></i>
                        Monthly Avatar Borders
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-newspaper mr-2 text-lg"></i>Early
                        Access to New Features
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-id-card-alt mr-2 text-lg"></i>
                        Custom Profile Header
                      </li>
                      <li className="flex items-center mb-2">
                        <i className="fa fa-heart mr-2 text-lg"></i>Support
                        RU Novel!
                      </li>
                    </ul>
                    <button
                      onClick={() => handleSubscription("yearly")}
                      className="mt-6 mb-4 bg-custom-blue hover:bg-custom-hover-blue text-white py-1 px-2 text-lg tracking-widest"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionPage;
