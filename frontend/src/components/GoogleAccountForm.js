import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../firebase";


const GoogleAccountForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(''); 
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      email: params.get('email') || ''
    };
  };

  useEffect(() => {
    const { email } = getQueryParams();
    localStorage.setItem('userEmail',email)
    setEmail(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    // formData.append('avatar', avatar);
    formData.append('avatar', imageURL);

    try {
      const response = await fetch('https://api.ru-novel.ru/account/externalloginconfirmation', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setUser(data.user));
        dispatch(userActions.setEmail(data.user.email))
        // console.log(data.user)
        localStorage.setItem('authtoken',data.user.authToken)
        localStorage.setItem('userEmail',data.user.email)
       
        navigate('/'); // Redirect upon success
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
    async function handleImageChange(e) {
      // console.log("xxxxxx"+e.target.files[0]);
      const image = e.target.files[0];
      if(image){
        try {
          setUploading(true);
          const storage = getStorage(app);
          const storageRef = ref(storage, "user-profile-images/" +image.name);
          await uploadBytes(storageRef,image);
          const downloadURL = await getDownloadURL(storageRef);
          // console.log(downloadURL);
          setImageURL(downloadURL);
          
          
        } catch (error) {
          // console.log(error);
          
        }finally{
          setUploading(false);
        }
  
      }
      // setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  return (
    <div className='lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]'>
      <div className="bg-white text-black rounded-md p-6">
        <div className="mb-4">
          <div className="text-lg font-bold text-red-600 flex items-center">
            <i className="fab fa-google mr-2"></i>
            Associate your Google account.
          </div>
        </div>
        <form
          encType="multipart/form-data"
          method="post"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <p className="text-center">
            You've successfully authenticated with <strong>Google</strong>. Please
            enter a user name for this site below and click the Register button to
            finish logging in.
          </p>
          <div className="bg-yellow-100 text-gray-700 p-4 rounded-md flex items-start">
            <i className="fa fa-2x fa-info-circle mr-2"></i>
            <div>
              If you wish to associate your <strong>Google</strong> account with
              an existing RU Novel account instead, please log in with your
              RU Novel account, then proceed to the settings page{" "}
              <a href="/account/externallogins" className="text-blue-600">
                here
              </a>
              .
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="UserName">
              UserName
            </label>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md">
                <i className="fa fa-pencil p-1"></i>
              </span>
              <input
                className="form-input w-full border border-gray-300 rounded-r-md ml-1"
                type="text"
                id="UserName"
                name="username"
                required
                minLength="3"
                maxLength="30"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="bg-red-100 text-red-700 p-2 rounded-md mt-2">
              <i className="fa fa-info-circle"></i> This will be your{" "}
              <strong>public username</strong> on the site; you can change it by
              typing into the field above.
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="Email">
              Email
            </label>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md">
                <i className="fa fa-lock p-1"></i>
              </span>
              <input
                className="form-input w-full border border-gray-300 rounded-r-md ml-2"
                type="email"
                id="Email"
                name="email"
                readOnly
                value={email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="AvatarUpload">
              Avatar Upload
            </label>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md">
                <i className="fas fa-user-circle p-1"></i>
              </span>
              <input
                className="form-input w-full border border-gray-300 rounded-r-md ml-2"
                type="file"
                accept=".png,.jpg,.jpeg,.bmp"
                id="AvatarUpload"
                name="avatar"
                onChange={handleImageChange} 
              />
            </div>
            <div className="bg-gray-100 text-gray-700 p-2 rounded-md mt-2">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  width="100"
                  height="100"
                  className="mt-2"
                />
              ) : (
                <img
                  src="/default-avatar.png" // Replace with actual path to default image
                  alt="Avatar"
                  width="100"
                  height="100"
                  className="mt-2"
                />
              )}
            </div>
            <div className="bg-gray-100 text-gray-700 p-2 rounded-md mt-2">
              <i className="fa fa-info-circle"></i> Minimum size 100x100
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="CaptchaResponse">
              Captcha
            </label>
            <div>
              <script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha"
                async
                defer
              ></script>
              <div className="turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY"></div>
            </div>
          </div>

          <input type="hidden" value="0" id="timezone" name="timezone" />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoogleAccountForm;
