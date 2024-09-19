import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PremiumSubscriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const monthlySubscription = 3.49;
  const yearlySubscription = 34.99;
  
  // Fetch user details from Redux
const  user = useSelector((state) => state.userData.user);
const premium = user.premium;
const username = user.username;
const email = user.email;
const  userID = useSelector((state) => state.userData.user._id);
const [currentPlan, setCurrentPlan] = useState(null); // Tracks the current plan
const [loading, setLoading] = useState(false); // Handles loading state for button


const getQueryParams = (param) => {
  return new URLSearchParams(location.search).get(param);
};

// Check if payment was successful (from the query params)
const isPaymentSuccess = getQueryParams("success");

useEffect(() => {
  if (isPaymentSuccess) {
    
    // If payment success, fetch the subscription details
    fetchSubscriptionDetails();
  }
}, [isPaymentSuccess]);

useEffect(() => {
  
  fetchSubscriptionDetails();
}, []);

const fetchSubscriptionDetails = async () => {
  try {
    console.log("user id = "+user._id);
    const response = await axios.post('https://api.ru-novel.ru/api/subscriptionn', {
      username: username,
    });

    const { paymentId, subscriptionType, status } = response.data;
    console.log("paymentId"+paymentId);

    if (paymentId && status==='pending') {
      // Handle payment success
      handlePaymentSuccess(paymentId);
    }
    else if (status === 'active') {
      // If the subscription is active, update the current plan
      setCurrentPlan(subscriptionType);
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    toast.error("Error fetching subscription details");
  }
};


const handlePaymentSuccess = async (paymentId) => {
  try {
    setLoading(true);
    console.log("enetered handlePaymentSuccess");
    // Call backend to update the user's subscription
    await axios.post('https://api.ru-novel.ru/api/payment-success', { paymentId });
    toast.success("Payment successful! Subscription activated.");
    setCurrentPlan(null); // Clear the plan until it's fetched again
    fetchSubscriptionDetails(); // Fetch subscription details after successful payment
    setLoading(false);
  } catch (error) {
    console.error("Error updating subscription:", error);
    toast.error("Error updating subscription.");
    setLoading(false);
  }
};

const handleSubscription = async (plan) => {
  try {
    setLoading(true);
    const amount = plan === "monthly" ? monthlySubscription : yearlySubscription;
    const planType = plan === "monthly" ? 'Monthly' : 'Yearly';

    // Make API call to backend to create payment
    const response = await axios.post('https://api.ru-novel.ru/api/create-payment', {
      amount:amount,
      plan: planType,
      email:email,
      username:username,
      userId:user._id,
    });

    // Redirect to YooMoney payment page
    console.log("response.data = "+response.data);
    const { paymentUrl } = response.data;  // Assuming backend returns this URL
    console.log("paymentUrl = "+paymentUrl);
    window.location.href = paymentUrl;  // Redirect to payment page
  } catch (error) {
    console.error("Error creating payment:", error);
    toast.error("Payment initiation failed. Please try again.");
  }
};


const handleManagePlan = () => {
  navigate("/manage-subscription"); // Navigate to manage subscription page
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
                      onClick={() => currentPlan === "monthly" ? handleManagePlan() : handleSubscription("monthly")}
                      className={`mt-6 mb-4 ${loading ? 'bg-gray-400' : 'bg-custom-blue hover:bg-custom-hover-blue'} text-white py-1 px-2 text-lg`}
                      disabled={loading}
                    >
                      {currentPlan === "monthly" ? "Manage Plan" : "Select Plan"}
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
                      onClick={() => currentPlan === "yearly" ? handleManagePlan() : handleSubscription("yearly")}
                      className={`mt-6 mb-4 ${loading ? 'bg-gray-400' : 'bg-custom-blue hover:bg-custom-hover-blue'} text-white py-1 px-2 text-lg`}
                      disabled={loading}
                    >
                      {currentPlan === "yearly" ? "Manage Plan" : "Select Plan"}
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
