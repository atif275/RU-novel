import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faPinterest, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';

const flipCardStyle = {
  perspective: '1000px',
};

const flipCardInnerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
};

const flipCardFrontBackStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
};

const flipCardBackStyle = {
  ...flipCardFrontBackStyle,
  transform: 'rotateX(180deg)',
};



const Footer = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.userData.theme);
  const isAuthenticated=useSelector((state)=>state.userData.isAuthenticated)
   const navigate=useNavigate()
  const handleThemeChange = (e) => {
    dispatch(userActions.setTheme(e.target.value));
    localStorage.setItem("theme",e.target.value);
  };

  useEffect(()=>{
    const theme1=localStorage.getItem('theme')
     if(theme1==='dark'){
       dispatch(userActions.setTheme("dark"));
     }
     else if(theme1==='light'){
       dispatch(userActions.setTheme("light"));
     }
 },[theme])
  

  return (
    <div className={`py-8 ${theme === 'dark' ? 'bg-[#131313] text-[#A2ABB7]' : 'bg-gray-600 text-gray-400'}`} style={{ width: '100%' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* About Section */}
          <div className="w-full md:w-1/4 sm:w-1/2 px-4 mb-8">
            <h2 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>About</h2>
            <p>
              RU Novel®️ is the home of web novels and fan fictions! In our amazing community, you can find various talented individuals who write as a hobby or even professionally, artists who create art for them, and many, many readers who provide valuable feedback and encouragement.
            </p>
          </div>

          {/* Amazon Affiliate Section */}
          <div className="w-full md:w-1/4 sm:w-1/2 px-4 mb-8">
            <h2 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>Amazon Affiliate</h2>
            <div className="text-sm">
              RU Novel®️ as an Amazon Associate earns from qualifying purchases.
            </div>
          </div>

          {/* Theme Select and Social Media Section */}
          <div className="w-full md:w-1/4 sm:w-1/2 px-4 mb-8">
            <h2 className={`text-lg mb-2 font-bold ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>
              <label htmlFor="style" className="font-bold">Theme Select</label>
            </h2>
            <div className="mb-4">
              <select
                name="style"
                id="style"
                value={theme}
                onChange={handleThemeChange}
                className="bg-gray-800 text-gray-300 border border-gray-600 p-2 rounded w-full border-0 outline-none"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <h2 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>Follow Us On</h2>
            <ul className="flex space-x-2 mt-4">
              {[
                { icon: faFacebookF, link: 'https://facebook.com/royalroadl', aria: 'Our Facebook Page' },
                { icon: faTwitter, link: 'https://twitter.com/royalroadl', aria: 'Our Twitter Page' },
                { icon: faPinterest, link: 'https://www.pinterest.co.uk/royalroadofficial/', aria: 'Our Pinterest Page' },
                { icon: faInstagram, link: 'https://www.instagram.com/royalroad.official', aria: 'Our Instagram Page' },
                { icon: faTiktok, link: 'https://www.tiktok.com/@royalroadofficial', aria: 'Our Tiktok Page' },
              ].map((social, index) => (
                <li key={index} className="w-10 h-10" style={flipCardStyle}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.aria}
                    className="block w-full h-full"
                  >
                    <div
                      className="flip-card-inner"
                      style={flipCardInnerStyle}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateX(180deg)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateX(0deg)'}
                    >
                      <div className="flip-card-front flex items-center justify-center bg-gray-500 text-gray-700 p-2" style={flipCardFrontBackStyle}>
                        <FontAwesomeIcon icon={social.icon} />
                      </div>
                      <div className="flip-card-back flex items-center justify-center bg-blue-500 text-white p-2" style={flipCardBackStyle}>
                        <FontAwesomeIcon icon={social.icon} />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support, Contact, and Advertising Section */}
          <div className="w-full md:w-1/4 sm:w-1/2 px-4 mb-8">
            <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>Need some help?</h2>
            <div className="mb-2">
              <Link to="/support/ticket" className="text-[#32C5D2] hover:underline">Create a support ticket</Link>
            </div>
            <div className="mb-4">
              <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>Contact</h2>
              <Link to="/contact/email" className="text-[#32C5D2] hover:underline">Contact Us by Email</Link>
            </div>
            <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-[#c2a970]' : 'text-[#32C5D2]'}`}>Advertising</h2>
            <div>
              <Link to="/ads/author" className="text-[#32C5D2] hover:underline">Ads for Authors</Link>
              <br />
              <a href="mailto:sales@ggsoftware.io" className="text-[#32C5D2] hover:underline">Programmatic Advertising</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;