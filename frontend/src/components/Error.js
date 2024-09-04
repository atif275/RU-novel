import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faExternalLink } from '@fortawesome/free-solid-svg-icons';


const AccessDenied = () => {
  return (
    <div className='lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]'>
      <div className="bg-white text-black rounded-md p-6">
      <div className="text-center">
        <div className="text-6xl mb-10">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <h3 className="text-2xl font-bold mb-4">Access Denied</h3>
        <p className="mb-4">
          We have received no email address for your account; please try again.
        </p>
        <p className="text-sm mb-4">
          If you are certain you should have access to this content, please{' '}
          <a href="/support" target="_blank" className="text-blue-500 hover:underline">
            <FontAwesomeIcon icon={faExternalLink} className="inline mr-1" /> open a support ticket
          </a>.
        </p>
        <p>
          <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Return home
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default AccessDenied;
