import React, { useState, useEffect } from "react";

import { FaArrowLeft, FaHome, FaPaperPlane, FaEnvelope } from "react-icons/fa";
import { MdSend, MdDrafts, MdDelete } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase functions
import app from "../firebase"; // Import your Firebase configuration
import { Link } from 'react-router-dom';



function AdminProfileInfoPage() {
  const [sidebarcollapse, setsidebarcollapse] = useState(false)
  const [isEditable, setIsEditable] = useState(false);
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    gender: "",
    birthday: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    bio: "",
    profilePicture: "",
  });

  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const email = useSelector((state) => state.userData.email);
  const user = useSelector((state) => state.userData.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.ru-novel.ru/api/userss/${email}`
        );
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
          profilePicture: userData.profilePicture || "",
        });
        setImageURL(userData.profilePicture || "");
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
      const updatedData = { ...formData, profilePicture: imageURL };
      const response = await fetch(
        `https://api.ru-novel.ru/api/users/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

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
  // Function to handle image upload
  async function handleImageChange(e) {
    // console.log("xxxxxx"+e.target.files[0]);
    const image = e.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, "user-profile-images/" + image.name);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);
        setImageURL(downloadURL);
      } catch (error) {
        // console.log(error);
      } finally {
        setUploading(false);
      }
    }
    // setImage(e.target.files[0]);
  }

  const profilePictureUrl = user.profilePicture;

  const [activeTab, setActiveTab] = useState("profileInfo");

  const tabNames = {
    compose: "Compose",
    inbox: "Inbox",
    sentItems: "Sent Items",
    drafts: "Drafts",
    trashCan: "Trash Can",
  };
  const messageOptions = [
    {
      key: "compose",
      icon: "fa-envelope",
      label: "Compose",
      link: "/admin/messages",
      isActive: true,
    },
    {
      key: "inbox",
      icon: "fa-folder",
      label: "Inbox",
      link: "/admin/private/1",
    },
    {
      key: "sentItems",
      icon: "fa-folder-open",
      label: "Sent Items",
      link: "/admin/private/2",
    },
    {
      key: "drafts",
      icon: "fa-folder-open",
      label: "Drafts",
      link: "/admin/private/3",
    },
    {
      key: "trashCan",
      icon: "fa-trash",
      label: "Trash Can",
      link: "/admin/private/4",
    },
  ];
  const settingsOptions = [
    {
      key: "profileInfo",
      icon: "fa-id-card",
      label: "Profile Info",
      link: "/admin/account",
    },
    // { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
    // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
    // { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
    // { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
    // {
    //     key: 'referFriend',
    //     icon: "fa-envelope-square",
    //     label: "Refer A Friend",
    //     link: "/account/refer-a-friend",
    // },
  ];
  const securityOptions = [
    {
      icon: "fa-envelope",
      label: "Change Email",
      link: "/account/changeemail",
    },
    {
      icon: "fa-lock",
      label: "Change Password",
      link: "/account/changepassword",
    },
    // { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
    {
      icon: "fa-external-link-square",
      label: "External Logins",
      link: "/account/externallogins",
    },
    // { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
    // { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' },
  ];

  const notificationOptions = [
    {
      icon: "fa-exclamation-circle",
      label: "General Settings",
      link: "/account/notifications",
    },
    { icon: "fa-list-alt", label: "Threads", link: "/notifications/threads" },
    {
      icon: "fa-bell",
      label: "Notification History",
      link: "/notifications/list",
    },
  ];
  const forumOptions = [
    { icon: "fa-home", label: "UserCP", link: "/my/usercp" },
    { icon: "fa-list", label: "Edit Signature", link: "/account/signature" },
  ];

  const myOptions = [
    { icon: "fa-book", label: "Fictions", link: "/fictions" },
    { icon: "fa-bookmark", label: "Follow List", link: "/my/follows" },
    { icon: "fa-star", label: "Favorites", link: "/my/favorites" },
    { icon: "fa-clock", label: "Read Later", link: "/my/readlater" },
    { icon: "fa-history", label: "Reading History", link: "/my/history" },
    { icon: "fa-star-half-alt", label: "Reviews", link: "/my/reviews" },
    { icon: "fa-comments", label: "Comments", link: "/my/comments" },
    // { icon: 'fa-ban', label: 'Blocked Users', link: '/my/blockedusers' }
  ];


  const handlecollpase = () => {
    setsidebarcollapse(!sidebarcollapse);
};

const checkScreenSize = () => {
    if (window.innerWidth < 500) {
        // Collapse the sidebar on small screens
    } else {
        setsidebarcollapse(false); // Expand the sidebar on larger screens
    }
};

// Run the check when the component mounts and when window is resized
useEffect(() => {
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Add resize event listener

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
}, []);



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
        <div className={` bg-white   ${sidebarcollapse ? 'w-full absolute z-50' : 'static'} static  w-[50px] sm:w-auto shadow-lg rounded-lg h-auto`}>


<div className="sm:hidden p-2 bg-white ml-[5px] max-w-[10px]">
    <i onClick={handlecollpase} className="fas fa-bars text-2xl cursor-pointer"></i>
</div>

{/* Message List */}

<div className={`mt-4 bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
    <div className={`bg-gray-600 md text-white ${sidebarcollapse ? 'block' : 'hidden'} sm:block  text-md p-2 pl-4`}>
        Messages
    </div>

    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {messageOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
{/* Settings List */}
<div className={`mt-4  bg-white sm:max-w-[100%] ${sidebarcollapse ? 'max-w-[100%]' : 'max-w-[20px]'}`}>
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Settings
    </div>



    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {settingsOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
{/* Security & Privacy List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Security & Privacy
    </div>

    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {securityOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* Notification List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Notifications
    </div>




    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {notificationOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* Forum List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`}>
        Forum
    </div>


    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {forumOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>

{/* My List */}

<div className="mt-4 bg-white">
    <div className={`bg-gray-600 text-white text-md p-2 pl-4  ${sidebarcollapse ? 'block' : 'hidden'} sm:block`} >My</div>



    <hr className="w-[50px] block sm:hidden"></hr>
    <ul className={` ${sidebarcollapse ? 'divide-y' : ''} sm:block  text-md p-2 pl-4} sm:divide-y divide-gray-200   p-2 text-sm `}>
        {myOptions.map((option, index) => (
            <li
                key={option.key}
                className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 pr-[27px] flex items-center `}

            >

                <Link to={option.link} className={`flex-grow `}> <i
                    className={`fas  ${option.icon} text-black mr-2 ${activeTab === option.key
                        ? "bg-custom-blue text-white"
                        : ""
                        }`}
                ></i>  <div className={`flex-grow  ${sidebarcollapse ? 'inline-block' : 'hidden'} sm:inline-block`}>{option.label}</div>   </Link>
            </li>
        ))}
    </ul>

</div>
</div>

h-[1400px] sm:h-auto

          {/* mian div  */}
          <div className="flex-1 ml-4 ">
            <>
              <div className="bg-white p-6">
                <div className="profile-content">
                  <div className="portlet light">
                    <div className="portlet-title">
                      <div className="caption pb-4">
                        <span className="uppercase text-red-500 font-bold p-2">
                          <i className="fa-fw  fa fa-id-card"></i> Profile Info
                        </span>
                      </div>
                    </div>
                    <div className="form portlet-body">
                      <form>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
                              <div className=" pl-2 w-full flex items-center">
                                <img
                                  src={imageURL}
                                  className="w-24 h-24  mr-2"
                                  alt="alttt"
                                ></img>

                                {/* <img
                                    src={`data:image/jpeg;base64,${formData.profilePicture}`}
                                    alt="Profile"
                                  /> */}
                                {/* <button
                                    className="ml-12 bg-custom-blue p-2 text-white "
                                     onClick={() => document.getElementById('profilePictureInput').click()}
                                  >
                                    Change Avatar
                                  </button> */}
                                <input
                                  id="file-input"
                                  className="hidden"
                                  type="file"
                                  accept=".png,.jpg,.jpeg,.bmp"
                                  name="avatar"
                                  onChange={handleImageChange}
                                />

                                <label
                                  htmlFor="file-input"
                                  className={`bg-custom-blue p-2 text-white cursor-pointer`}
                                >
                                  {uploading
                                    ? "Uploading Avatar..."
                                    : "Change Avatar"}
                                </label>
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
                                  className="w-full"
                                  id="username"
                                  name="username"
                                  placeholder="Enter desired display name"
                                  type="text"
                                  value={formData.username}
                                  onChange={handleChange}
                                  readOnly={!isEditable} // Make it read-only if not editable
                                />
                                <button
                                  className="flex bg-custom-blue cursor-pointer"
                                  type="button"
                                  onClick={handleEditClick}
                                >
                                  <div className="flex items-center p-2 text-white">
                                    <i className="fas fa-edit pr-2"></i>
                                    <p>{isEditable ? "Save" : "Edit"}</p>
                                  </div>
                                </button>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
                              <div className=" pl-2 w-full flex items-center space-x-3">
                                <i className="fa fa-calendar text-gray-500 "></i>
                                <input
                                  type="date" // Change type to 'date'
                                  className="form-control border border-gray-100 rounded p-2 flex-grow"
                                  id="birthday"
                                  name="birthday"
                                  value={formData.birthday}
                                  onChange={handleChange}
                                  placeholder="Select a date"
                                  autoComplete="off"
                                  max={new Date().toISOString().split("T")[0]} // Restricts future dates
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            <div className="flex-grow  " style={{ flex: "3" }}>
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
                            disabled={uploading} // Disable button while uploading
                          >
                            {uploading ? "Updating..." : "Update profile"}
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

export default AdminProfileInfoPage;
