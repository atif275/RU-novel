import React, { useState } from "react";
import { FaPen, FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { MdSend, MdDrafts, MdDelete } from "react-icons/md";
import { Editor } from "@tinymce/tinymce-react";

function AccountOptionsPage() {
  const [activeTab, setActiveTab] = useState("compose");

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
          <div
            className="w-48  shadow-lg rounded-lg h-auto"
            
          >
            {/* <div className="bg-white">
                
            <div className="bg-gray-600 text-white text-md p-2 pl-4">Messages</div>
            <ul className="divide-y divide-gray-200 p-2 text-sm">
              {Object.entries(tabNames).map(([key, name]) => (
                <li
                  key={key}
                  className={`hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center text-sm ${
                    activeTab === key ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {tabIcons[key]}
                  {name}
                </li>
              ))}
            </ul>
            </div> */}

            {/* Message List */}

            <div className="mt-4 bg-white">
            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                Messages
                </div>
                <ul className="divide-y divide-gray-200 p-2 text-sm">
              {messageOptions.map((option, index) => (
                <li
                  key={option.key}
                  className={`hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center ${
                    activeTab === option.key ? "bg-custom-blue text-white" : ""
                  }`}
                  onClick={() => setActiveTab(option.key)}
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2 ${
                    activeTab === option.key ? "bg-custom-blue text-white" : ""
                  }`}></i>
                  <p className="flex-grow">
                    {option.label}
                  </p>
                </li>
              ))}
            </ul>
                
            </div>
            {/* Settings List */}
            <div className="mt-4 bg-white">
            <div className="bg-gray-600 text-white text-md p-2 pl-4">Settings</div>
            <ul className="divide-y divide-gray-200 p-2 text-sm">
              {settingsOptions.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fas ${option.icon} text-black mr-2`}></i>
                  <a href={option.link} className="flex-grow">
                    {option.label}
                  </a>
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
                  className="hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                  <a href={option.link} className="flex-grow">
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
                
            </div>

            {/* Notification List */}

            {/* <div className="mt-4 bg-white">
            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                Notifications
                </div>
                <ul className="divide-y divide-gray-200 p-2 text-sm">
              {notificationOptions.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
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
                  className="hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                  <a href={option.link} className="flex-grow">
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
                
            </div>

            {/* My List */}

            <div className="mt-4 bg-white">
            <div className="bg-gray-600 text-white text-md p-2 pl-4">
                My
                </div>
                <ul className="divide-y divide-gray-200 p-2 text-sm">
              {myOptions.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer p-2 flex items-center"
                >
                  <i className={`fa fa-fw ${option.icon} text-black mr-2`}></i>
                  <a href={option.link} className="flex-grow">
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
                
            </div>


          </div>
          <div className="flex-1 ml-4 ">
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
