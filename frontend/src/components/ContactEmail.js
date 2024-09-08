import React from 'react'
import { Link } from 'react-router-dom'

function ContactEmail() {
  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div className="bg-white p-6 rounded-md">

      <div className="flex flex-wrap items-center">
        {/* Icon Section */}
        <div className="w-full sm:w-1/4 text-center mb-4 sm:mb-0">
          <i className="fas fa-user text-5xl" style={{ lineHeight: '1em' }}></i>
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-3/4">
          <div className="c-content-title-1">
            <h3 className="text-lg font-semibold mb-2">Already have an account?</h3>
            <div className="w-16 h-1 bg-gray-800 mb-4"></div>
            <p className="text-sm lowercase mb-4">
              The fastest way to get answers is by creating a support ticket so our teams can use the internal tracker to help you best.
            </p>
            <Link href="/support/ticket" className="btn btn-primary px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
              Open a support ticket
            </Link>
          </div>
        </div>
      </div>


      </div>

      <div className="bg-white p-6 mt-6 rounded-md shadow-md">
      <div className="flex flex-wrap items-center">
        {/* Icon Section */}
        <div className="w-full sm:w-1/4 text-center mb-4 sm:mb-0">
          <p>
            <i className="fas fa-question-circle text-5xl" style={{ lineHeight: '1em' }}></i>
          </p>
        </div>

        {/* Text and Button Section */}
        <div className="w-full sm:w-3/4">
          <h3 className="text-xl font-semibold mb-2">Have a question?</h3>
          <div className="h-1 w-16 bg-gray-900 mb-4"></div>
          <Link to="/support/knowledgebase" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4">
            Visit our FAQ
          </Link>
          <p className="text-sm">
            Our extensive FAQ might already have the answers you are looking for.
          </p>
        </div>
      </div>
    </div>

      
    </div>
  )
}

export default ContactEmail