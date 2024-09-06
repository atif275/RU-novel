import React, { useState, useEffect } from "react";

import { FaArrowLeft, FaHome, FaPaperPlane,FaEnvelope } from "react-icons/fa";
import { MdSend, MdDrafts, MdDelete } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ProfileInfoPage() {
  const [formData, setFormData] = useState({
    username: "",
    title:"",
    gender: "",
    birthday: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    bio: "",
    profilePicture: "",
  });


  const email = useSelector((state) => state.userData.email);
  const user = useSelector((state) => state.userData.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.ru-novel.ru/api/userss/${email}`);
        const userData = await response.json();
        setFormData({
          username: userData.username || "",
          gender: userData.gender || "",
          birthday: userData.birthday || "",
          location: userData.location || "",
          website: userData.website || "",
          twitter: userData.twitter || "",
          facebook: userData.facebook || "",
          bio: userData.bio || "",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.ru-novel.ru/api/users/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // console.log("Profile updated successfully");
        toast.success("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };
  const profilePictureUrl = user.profilePicture;
  // ? `https://api.ru-novel.ru/uploads/${user.profilePicture}`
  // : '/default-avatar.png';


  const [activeTab, setActiveTab] = useState("profileInfo");
  



  const tabNames = {
    compose: "Compose",
    inbox: "Inbox",
    sentItems: "Sent Items",
    drafts: "Drafts",
    trashCan: "Trash Can",
  };
  const messageOptions = [
    { key: 'compose', icon: 'fa-envelope', label: 'Compose', link: '/private/send', isActive: true },
    { key: 'inbox', icon: 'fa-folder', label: 'Inbox', link: '/private/1' },
    { key: 'sentItems', icon: 'fa-folder-open', label: 'Sent Items', link: '/private/2' },
    { key: 'drafts', icon: 'fa-folder-open', label: 'Drafts', link: '/private/3' },
    { key: 'trashCan', icon: 'fa-trash', label: 'Trash Can', link: '/private/4' }
];
const settingsOptions = [
    { key: 'profileInfo', icon: "fa-id-card", label: "Profile Info", link: "/account" },
    // { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
    // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
    { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
    { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
    // {
    //     key: 'referFriend',
    //     icon: "fa-envelope-square",
    //     label: "Refer A Friend",
    //     link: "/account/refer-a-friend",
    // },
];
const securityOptions = [
    { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
    { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
    // { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
    { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
    // { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
    { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' },
];

const notificationOptions = [
    { icon: 'fa-exclamation-circle', label: 'General Settings', link: '/account/notifications' },
    { icon: 'fa-list-alt', label: 'Threads', link: '/notifications/threads' },
    { icon: 'fa-bell', label: 'Notification History', link: '/notifications/list' }
];
const forumOptions = [
    { icon: 'fa-home', label: 'UserCP', link: '/my/usercp' },
    { icon: 'fa-list', label: 'Edit Signature', link: '/account/signature' }
];

const myOptions = [
    { icon: 'fa-book', label: 'Fictions', link: '/author-dashboard' },
    { icon: 'fa-bookmark', label: 'Follow List', link: '/my/follows' },
    { icon: 'fa-star', label: 'Favorites', link: '/my/favorites' },
    { icon: 'fa-clock', label: 'Read Later', link: '/my/readlater' },
    { icon: 'fa-history', label: 'Reading History', link: '/my/history' },
    { icon: 'fa-star-half-alt', label: 'Reviews', link: '/my/reviews' },
    { icon: 'fa-comments', label: 'Comments', link: '/my/comments' },
    // { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
];

  return (
    <div className="w-full bg-cover bg-center bg-fixed">
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
        {/* Image Container */}
        <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
          {/* Icon and Text aligned left */}
          <div className="absolute left-0 ml-10 flex items-center">
            <FaEnvelope className="text-white text-6xl mr-4" />{" "}
            {/* Ensure you have imported FaEnvelope */}
            <div>
              <h2 className="text-white text-2xl">Profile INFO</h2>
              <p className="text-white text-sm">
                All your conversations in one place.
              </p>
              <a href="/inbox" className="text-blue-500 text-sm underline">
                Inbox
              </a>
            </div>
          </div>
        </div>
        <div className="flex mt-4">
        <div className="w-48  shadow-lg rounded-lg h-auto">


{/* Message List */}

<div className="mt-4 bg-white">
    <div className="bg-gray-600 text-white text-md p-2 pl-4">
        Messages
    </div>
    <ul className="divide-y divide-gray-200 p-2 text-sm">
        {messageOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

            >
                <i
                    className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue"
                        : ""
                        }`}
                ></i>
                <a href={option.link} className="flex-grow">{option.label}</a>
            </li>
        ))}
    </ul>
</div>
{/* Settings List */}
<div className="mt-4 bg-white">
                            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                                Settings
                            </div>
                            <ul className="divide-y divide-gray-200 p-2 text-sm">
                                {settingsOptions.map((option, index) => (
                                    <li
                                        key={option.key}
                                        className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

                                    >
                                        <i
                                            className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
                                                ? ""
                                                : ""
                                                }`}
                                        ></i>
                                        <a href={option.link} className="flex-grow">{option.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
{/* Security & Privacy List */}

<div className="mt-4 bg-white">
    <div className="bg-gray-600 text-white text-md p-2 pl-4">
        Security & Privacy
    </div>
    <ul className="divide-y divide-gray-200 p-2 text-sm">
        {securityOptions.map((option, index) => (
            <li
                key={index}
                className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
            >
                <i
                    className={`fa fa-fw ${option.icon} text-black mr-2`}
                ></i>
                <a href={option.link} className="flex-grow">
                    {option.label}
                </a>
            </li>
        ))}
    </ul>
</div>

{/* Notification List */}
{/* 
<div className="mt-4 bg-white">
    <div className="bg-gray-600 text-white text-md p-2 pl-4">
        Notifications
    </div>
    <ul className="divide-y divide-gray-200 p-2 text-sm">
        {notificationOptions.map((option, index) => (
            <li
                key={index}
                className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
            >
                <i
                    className={`fa fa-fw ${option.icon} text-black mr-2`}
                ></i>
                <a href={option.link} className="flex-grow">
                    {option.label}
                </a>
            </li>
        ))}
    </ul>
</div> */}

{/* Forum List */}

<div className="mt-4 bg-white">
    <div className="bg-gray-600 text-white text-md p-2 pl-4">
        Forum
    </div>
    <ul className="divide-y divide-gray-200 p-2 text-sm">
        {forumOptions.map((option, index) => (
            <li
                key={index}
                className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
            >
                <i
                    className={`fa fa-fw ${option.icon} text-black mr-2`}
                ></i>
                <a href={option.link} className="flex-grow">
                    {option.label}
                </a>
            </li>
        ))}
    </ul>
</div>

{/* My List */}

<div className="mt-4 bg-white">
    <div className="bg-gray-600 text-white text-md p-2 pl-4">My</div>
    <ul className="divide-y divide-gray-200 p-2 text-sm">
        {myOptions.map((option, index) => (
            <li
                key={index}
                className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
            >
                <i
                    className={`fa fa-fw ${option.icon} text-black mr-2`}
                ></i>
                <a href={option.link} className="flex-grow">
                    {option.label}
                </a>
            </li>
        ))}
    </ul>
</div>
</div>
{/* mian div  */}
          <div className="flex-1 ml-4 ">
            
              <>
                <div className="bg-white p-6">
                  <div className="profile-content">
                    <div className="portlet light">
                      <div className="portlet-title">
                        <div className="caption pb-4">
                          <span className="uppercase text-red-500 font-bold p-2">
                            <i className="fa-fw  fa fa-id-card"></i> Profile
                            Info
                          </span>
                        </div>
                      </div>
                      <div className="form portlet-body">
                        <form
                         
                          
                        >
                          <div className="">
                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Avatar
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center">
                                  <img
                                    src={profilePictureUrl}
                                    // src="https://www.royalroad.com/dist/img/anon.jpg"
                                    // className="mr-2"
                                    className="w-24 h-24  mr-2"
                                    alt="alttt"
                                  ></img>
                                  
                                  {/* <img
                                    src={`data:image/jpeg;base64,${formData.profilePicture}`}
                                    alt="Profile"
                                  /> */}
                                  <button
                                    className="ml-12 bg-custom-blue p-2 text-white "
                                    // onClick={() => document.getElementById('profilePictureInput').click()}
                                  >
                                    Change Avatar
                                  </button>
                                  <input
                                    type="file"
                                    id="profilePictureInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    // onChange={handleFileChange}
                                  />
                                  {/* <select className=" border border-gray-100 p-2 bg-white w-full" id="PrimaryUserGroup" name="PrimaryUserGroup" required>
                                        <option value="2" selected>Penguin Guild</option>
                                    </select> */}
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Username
                                </p>
                              </div>
                              <div className="flex-grow " style={{ flex: "3" }}>
                                <div className="flex items-center w-full bg-gray-200 ">
                                  <i className="fa fa-user text-gray-500 p-2"></i>
                                  <input
                                    className="w-full "
                                    
                                    id="username"
                                    name="username"
                                    placeholder="Enter desired display name"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                  />
                                  <a
                                    className="flex bg-custom-blue "
                                    target="_blank"
                                    href="/account/changeusername"
                                  >
                                    <div className="flex items-center p-2 text-white">
                                      <i className="fas fa-link pr-2"></i>
                                      <p> Edit</p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Primary User Group
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center">
                                  <i className="fas fa-users text-gray-500 mr-2"></i>
                                  <select
                                    className=" border border-gray-100 p-2 bg-white w-full"
                                    id="PrimaryUserGroup"
                                    name="PrimaryUserGroup"
                                    required
                                  >
                                    <option value="2" selected>
                                      Penguin Guild
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Display Group
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center">
                                  <i className="fas fa-users text-gray-500 mr-2"></i>
                                  <select
                                    className="border border-gray-100 rounded p-2 bg-white w-full"
                                    id="DisplayGroup"
                                    name="DisplayGroup"
                                    required
                                  >
                                    <option value="0" selected>
                                      Use Primary User Group
                                    </option>
                                    <option value="2">Penguin Guild</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  User Title
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center">
                                  <i className="fas fa-user-tie text-gray-500 mr-3"></i>
                                  <input
                                    type="text"
                                    className=" border border-gray-100 rounded p-2 flex-grow w-full"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter desired title"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Birthday
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fa fa-calendar text-gray-500 "></i>
                                  <input
                                    type="text"
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="birthday"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    placeholder="Select a date"
                                    autoComplete="off"
                                    data-date-end-date="0d"
                                    data-date-format="dd/mm/yyyy"
                                    data-default-view-date="-20y"
                                    data-provide="datepicker"
                                    data-val="true"
                                    data-val-regex="Date must be in format dd/MM/yyyy or yyyy-MM-dd"
                                    data-val-regex-pattern="^(?:[0-2]?\d|30|31)\/(?:0?\d|1[0-2])\/(?:19\d{2}|20\d{2})|(\d{4}-\d{2}-\d{2})$"
                                    
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Gender
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center">
                                  <i className="fa fa-neuter text-gray-500 mr-3"></i>
                                  <select
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    defaultValue="Male" // Since 'Male' is pre-selected
                                  >
                                    <option disabled value="">
                                      Select a gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Location
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fa fa-map-marker text-gray-500 "></i>
                                  <input
                                    type="text"
                                    className="form-control border border-gray-300 rounded p-2 flex-grow"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Your location"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Website
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fa fa-globe text-gray-500"></i>
                                  <input
                                    type="text"
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="Website"
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Twitter
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fab fa-twitter text-gray-500"></i>
                                  <input
                                    type="text"
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="twitter"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    placeholder="Twitter username"
                                    autoComplete="off"
                                    maxLength={128}
                                    pattern="(((https?://)?(www\.)?twitter\.com/)|@)?(.*/)?(.*)($|\?.*)"
                                    title="Twitter handle must be a valid Twitter handle or Twitter URL."
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Facebook
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fab fa-facebook text-gray-500"></i>
                                  <input
                                    type="text"
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="facebook"
                                    name="facebook"
                                    placeholder="Facebook profile URL"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    
                                    maxLength={128}
                                    pattern="(((https?://)?(www\.)?facebook\.com/))?(.*/)?([a-zA-Z0-9.]*)($|\?.*)"
                                    title="Facebook handle must be a valid Facebook handle or Facebook URL."
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex border-y p-4">
                              <div
                                className="flex-grow  mr-2 relative "
                                style={{ flex: "2" }}
                              >
                                <p className=" absolute right-0 text-black pr-6  py-2">
                                  Biography
                                </p>
                              </div>
                              <div
                                className="flex-grow  "
                                style={{ flex: "3" }}
                              >
                                <div className=" pl-2 w-full flex items-center space-x-3">
                                  <i className="fa fa-history text-gray-500"></i>
                                  <textarea
                                    className="form-control border border-gray-100 rounded p-2 flex-grow"
                                    id="bio"
                                    name="bio"
                                    placeholder="Tell us about you"
                                    autoComplete="off"
                                    maxLength={3000}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    title="The field Bio must be a string with a maximum length of 3000."
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="items-center text-center mt-6 text-white">
                          <ToastContainer />
                            <button
                              className="bg-custom-light-blue py-1 px-2"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Update profile
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoPage;
