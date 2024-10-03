import React, { useState ,useEffect} from "react";
import { FaPen, FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { MdSend, MdDrafts, MdDelete } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from 'react-router-dom';



function AccountOptionsPage() {
  const [activeTab, setActiveTab] = useState("compose");
  const [sidebarcollapse, setsidebarcollapse] = useState(false)
  const tabIcons = {
    compose: <FaPen className="inline mr-2 text-xl" />,
    inbox: <FaEnvelope className="inline mr-2 text-xl" />,
    sentItems: <MdSend className="inline mr-2 text-xl" />,
    drafts: <MdDrafts className="inline mr-2 text-xl" />,
    trashCan: <MdDelete className="inline mr-2 text-xl" />,
  };

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
    { key: 'settings', icon: "fa-cogs", label: "Settings", link: "/account/options" },
    // { key: 'premium', icon: "fa-star", label: "Premium", link: "/account/premium" },
    { key: 'achievements', icon: "fa-trophy", label: "Achievements", link: "/user/achievements" },
    { key: 'borderWardrobe', icon: "fa-portrait", label: "Border Wardrobe", link: "/user/borders" },
    // {
    //   key: 'referFriend',
    //   icon: "fa-envelope-square",
    //   label: "Refer A Friend",
    //   link: "/account/refer-a-friend",
    // },
  ];
  const securityOptions = [
    { icon: 'fa-envelope', label: 'Change Email', link: '/account/changeemail' },
    { icon: 'fa-lock', label: 'Change Password', link: '/account/changepassword' },
    // { icon: 'fa-key', label: 'Two Factor Auth', link: '/account/twofactorauthentication' },
    { icon: 'fa-external-link-square', label: 'External Logins', link: '/account/externallogins' },
    // { icon: 'fa-download', label: 'Download Account', link: '/account/download' },
    // { icon: 'fa-user-slash', label: 'Delete Account', link: '/account/delete', specialClass: 'font-red-thunderbird bold' },
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
    { icon: 'fa-book', label: 'Fictions', link: '/fictions' },
    { icon: 'fa-bookmark', label: 'Follow List', link: '/my/follows' },
    { icon: 'fa-star', label: 'Favorites', link: '/my/favorites' },
    { icon: 'fa-clock', label: 'Read Later', link: '/my/readlater' },
    { icon: 'fa-history', label: 'Reading History', link: '/my/history' },
    { icon: 'fa-star-half-alt', label: 'Reviews', link: '/my/reviews' },
    { icon: 'fa-comments', label: 'Comments', link: '/my/comments' },
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
              <h2 className="text-white text-2xl">Private Messages</h2>
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



          <div className="flex-1 ml-4 h-[1400px] sm:h-auto">
            {activeTab === "compose" ? (
              <>
                <div className="flex justify-between ">
                  <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded inline-flex items-center">
                    <FaArrowLeft className="mr-2" /> Back to Inbox
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-flex items-center">
                    <FaPaperPlane className="mr-2" /> Send Reply
                  </button>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="bg-white p-6">
                  <h2 className="text-xl font-bold mb-4">New Message</h2>
                  <hr className="my-4 border-gray-300" />
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="recipients"
                        className="block font-bold mb-2"
                      >
                        Recipients
                      </label>
                      <input
                        type="text"
                        id="recipients"
                        placeholder="Search for a user"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block font-bold mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">Message</label>
                      <Editor
                        initialValue="<p>This is the initial content of the editor</p>"
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Send Message
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      >
                        Preview
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : activeTab === "inbox" ||
              activeTab === "sentItems" ||
              activeTab === "drafts" ||
              activeTab === "trashCan" ? (
              <>
                <div className="bg-white p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {tabNames[activeTab]}
                  </h2>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex items-center mb-4">
                    <input
                      type="search"
                      className="border p-2 w-full"
                      placeholder="Search..."
                      style={{ flex: "auto", marginRight: "8px" }}
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Go
                    </button>
                  </div>
                  <div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th>Message Title</th>
                          <th>Sender</th>
                          <th>Date/Time Sent</th>
                        </tr>
                      </thead>
                      <tbody>{/* Placeholder for messages */}</tbody>
                    </table>
                  </div>
                  <div className="flex mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2">
                      Move to
                    </button>
                    <select className="form-control input-small" name="folder">
                      <option value="1">Inbox</option>
                      <option value="2">Sent Items</option>
                      <option value="3">Drafts</option>
                      <option value="4">Trash Can</option>
                    </select>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-4 bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2">
                  {tabNames[activeTab]}
                </h2>
                <div className="border-t mt-2 pt-2">
                  Content for {tabNames[activeTab]} goes here...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountOptionsPage;
