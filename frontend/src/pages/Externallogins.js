import React, { useState,useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function Externallogins() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userData.user);
  const [sidebarcollapse, setsidebarcollapse] = useState(false)

  const [activeTab, setActiveTab] = useState("");

  const messageOptions = [
    {
      key: "compose",
      icon: "fa-envelope",
      label: "Compose",
      link: "/private/send",
      isActive: true,
    },
    { key: "inbox", icon: "fa-folder", label: "Inbox", link: "/private/1" },
    {
      key: "sentItems",
      icon: "fa-folder-open",
      label: "Sent Items",
      link: "/private/2",
    },
    {
      key: "drafts",
      icon: "fa-folder-open",
      label: "Drafts",
      link: "/private/3",
    },
    {
      key: "trashCan",
      icon: "fa-trash",
      label: "Trash Can",
      link: "/private/4",
    },
  ];
  const settingsOptions = [
    {
      key: "profileInfo",
      icon: "fa-id-card",
      label: "Profile Info",
      link: "/account",
    },

    {
      key: "achievements",
      icon: "fa-trophy",
      label: "Achievements",
      link: "/user/achievements",
    },
    {
      key: "borderWardrobe",
      icon: "fa-portrait",
      label: "Border Wardrobe",
      link: "/user/borders",
    },
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
    {
      icon: "fa-external-link-square",
      label: "External Logins",
      link: "/account/externallogins",
    },
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
  ];

  // Handle unlink action
  const handleUnlink = async (provider) => {
    try {
      await axios.put(`https://api.ru-novel.ru/api/unlink-${provider}`, {
        userId: currentUser._id,
      });
      toast.success(`${provider} account unlinked successfully.`);

      await dispatch({
        type: "UPDATE_USER",
        payload: {
          ...currentUser,
          [`${provider}Id`]: "", // Remove the ID from the user object
        },
      });

      toast.success(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)
        } account unlinked successfully.`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error unlinking account:", error);
      toast.error(`Failed to unlink ${provider} account.`);
    }
  };

  // When the user clicks the link button for Google
  const handleGoogleSignIn = () => {
    const userId = currentUser._id; // Get the _id from the user
    window.location.href = `https://api.ru-novel.ru/auth/google/link?userId=${userId}`;
  };

  // When the user clicks the link button for Facebook
  const handleFacebookSignIn = () => {
    const userId = currentUser._id; // Get the _id from the user
    window.location.href = `https://api.ru-novel.ru/auth/facebook/link?userId=${userId}`;
  };


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
        {/* Header */}
        <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
          <div className="absolute left-0 ml-10 flex items-center">
            <FaExternalLinkAlt className="text-white text-6xl mr-4" />
            <div>
              <h2 className="text-white text-2xl">External Logins</h2>
              <p className="text-white text-sm">Manage your account</p>
            </div>
          </div>
        </div>

        {/* External Logins Section */}
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


          <div className="flex-1 ml-4 h-[1400px] sm:h-auto">
            <div className="bg-white shadow-lg mt-4 p-6">
              <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6 border-b pb-2">
                <FaExternalLinkAlt className="mr-2" />
                EXTERNAL LOGINS
              </h2>

              <div className="space-y-6">
                {/* Google Section */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">Google</h3>
                    <p className="text-sm text-gray-600">
                      Linked account: {currentUser.googleId || "Not linked"}
                    </p>
                  </div>
                  {currentUser.googleId ? (
                    <button
                      onClick={() => handleUnlink("google")}
                      className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    >
                      Unlink Google Account
                    </button>
                  ) : (
                    <button
                      onClick={handleGoogleSignIn}
                      className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-500"
                    >
                      Link your Google Account
                    </button>
                  )}
                </div>

                {/* Facebook Section */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">
                      Facebook
                    </h3>
                    <p className="text-sm text-gray-600">
                      Linked account: {currentUser.facebookID || "Not linked"}
                    </p>
                  </div>
                  {currentUser.facebookID ? (
                    <button
                      onClick={() => handleUnlink("facebook")}
                      className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    >
                      Unlink Facebook Account
                    </button>
                  ) : (
                    <button
                      onClick={handleFacebookSignIn}
                      className="bg-custom-blue text-white px-4 py-2 hover:bg-blue-500"
                    >
                      Link your Facebook Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Externallogins;

//     return (
//         <div className="w-full bg-cover bg-center bg-fixed">
//             <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-100 w-full pb-8 shadow-lg">
//                 {/* Image Container */}
// <div className="relative flex h-[130px] items-center p-4 bg-opacity-50 bg-[url(https://www.royalroad.com/dist/img/collaborators_header.jpg)] bg-cover ">
//     {/* Icon and Text aligned left */}
//     <div className="absolute left-0 ml-10 flex items-center">
//         <FaExternalLinkAlt className="text-white text-6xl mr-4" />{" "}
//         {/* Ensure you have imported FaEnvelope */}
//         <div>
//             <h2 className="text-white text-2xl">External Logins </h2>
//             <p className="text-white text-sm">
//                 Manage your account
//             </p>

//         </div>
//     </div>
//                 </div>
//                 <div className="flex mt-4">
// <div className="w-48  shadow-lg rounded-lg h-auto">

//     {/* Message List */}

//     <div className="mt-4 bg-white">
//         <div className="bg-gray-600 text-white text-md p-2 pl-4">
//             Messages
//         </div>
//         <ul className="divide-y divide-gray-200 p-2 text-sm">
//             {messageOptions.map((option, index) => (
//                 <li
//                     key={option.key}
//                     className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

//                 >
//                     <i
//                         className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
//                             ? "bg-custom-blue text-white"
//                             : ""
//                             }`}
//                     ></i>
//                     <a href={option.link} className="flex-grow">{option.label}</a>
//                 </li>
//             ))}
//         </ul>
//     </div>
//     {/* Settings List */}
//     <div className="mt-4 bg-white">
//         <div className="bg-gray-600 text-white text-md p-2 pl-4">
//             Settings
//         </div>
//         <ul className="divide-y divide-gray-200 p-2 text-sm">
//             {settingsOptions.map((option, index) => (
//                 <li
//                     key={option.key}
//                     className={`hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center `}

//                 >
//                     <i
//                         className={`fas ${option.icon} text-black mr-2 ${activeTab === option.key
//                             ? "bg-custom-blue text-white"
//                             : ""
//                             }`}
//                     ></i>
//                     <a href={option.link} className="flex-grow">{option.label}</a>
//                 </li>
//             ))}
//         </ul>
//     </div>
//     {/* Security & Privacy List */}

//     <div className="mt-4 bg-white">
//         <div className="bg-gray-600 text-white text-md p-2 pl-4">
//             Security & Privacy
//         </div>
//         <ul className="divide-y divide-gray-200 p-2 text-sm">
//             {securityOptions.map((option, index) => (
//                 <li
//                     key={index}
//                     className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
//                 >
//                     <i
//                         className={`fa fa-fw ${option.icon} text-black mr-2`}
//                     ></i>
//                     <a href={option.link} className="flex-grow">
//                         {option.label}
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     </div>

//     {/* Forum List */}

//     <div className="mt-4 bg-white">
//         <div className="bg-gray-600 text-white text-md p-2 pl-4">
//             Forum
//         </div>
//         <ul className="divide-y divide-gray-200 p-2 text-sm">
//             {forumOptions.map((option, index) => (
//                 <li
//                     key={index}
//                     className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
//                 >
//                     <i
//                         className={`fa fa-fw ${option.icon} text-black mr-2`}
//                     ></i>
//                     <a href={option.link} className="flex-grow">
//                         {option.label}
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     </div>

//     {/* My List */}

//     <div className="mt-4 bg-white">
//         <div className="bg-gray-600 text-white text-md p-2 pl-4">My</div>
//         <ul className="divide-y divide-gray-200 p-2 text-sm">
//             {myOptions.map((option, index) => (
//                 <li
//                     key={index}
//                     className="hover:bg-custom-blue hover:text-white cursor-pointer p-2 flex items-center"
//                 >
//                     <i
//                         className={`fa fa-fw ${option.icon} text-black mr-2`}
//                     ></i>
//                     <a href={option.link} className="flex-grow">
//                         {option.label}
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     </div>
// </div>
//                     <div className="flex-1 ml-4 ">
//                     <div className="bg-white shadow-lg mt-4 p-6">
//             <h2 className="text-2xl font-bold text-red-600 flex items-center mb-6 border-b pb-2">
//                 <FaExternalLinkAlt className="mr-2" />
//                 EXTERNAL LOGINS
//             </h2>

//             <div className="space-y-6">
//                 {/* Google Section */}
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h3 className="text-lg font-bold text-gray-700">Google</h3>
//                         <p className="text-sm text-gray-600">Linked account: 111702103321226099899</p>
//                     </div>
//                     <button className="bg-red-500 text-white px-4 py-2  hover:bg-red-600">
//                         Unlink Account
//                     </button>
//                 </div>

//                 {/* Facebook Section */}
//                 <div className=" ">
//                     <h3 className="text-lg mb-2 font-bold text-gray-700">Facebook</h3>
//                     <Link to="/link-apple"  className="bg-custom-blue text-white px-4 py-2  hover:bg-blue-500">
//                         Link your Facebook Account
//                     </Link>
//                 </div>

//             </div>
//         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Externallogins;
