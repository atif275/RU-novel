import React from 'react'
import { useSelector } from 'react-redux'

function PrivatePolicy() {
  const theme=useSelector((state)=>state.userData.theme)
  return (
    <div className={`lg:w-[90%] lg:ml-20 h-full p-4  ${theme === 'dark' ? 'bg-[#181818]' : 'bg-[#f3f6f9] '}`}>
      <div className={` p-8 rounded-md  ${theme === 'dark' ? 'bg-[#131313] text-[#FFFFFFCC]' : 'bg-white '}`}>
      <h1
          className={`
        text-center
        text-2xl sm:text-2xl md:text-2xl lg:text-2xl
        py-4
        px-2
        md:py-6 md:px-4
         ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}
      
        >
              Privacy Policy
        </h1>
        <p className={`mt-4  font-bold  ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}>
        Privacy Policy 
      </p>
      <p className="mt-4">
        RU-Novelcollects some Personal Data from its Users.
      </p>
      <p className="mt-4">
        This document contains a section dedicated to Users in the United States and their privacy rights.
      </p>
      <p className="mt-4">
        This document can be printed for reference by using the print command in the settings of any browser.
      </p>
        <hr className="bg-gray-800 mt-4" />

      <p className={`mt-4  ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}>
        <strong>Types of Data collected</strong>
      </p>
      <p className="mt-4 ">
        Among the types of Personal Data that RU-Novelcollects, by itself or through third parties, there are: Cookies; Usage Data; email address; username; gender; date of birth; password; website; profile picture; picture; various types of Data; number of Users; city; device information; session statistics; latitude (of city); longitude (of city); browser information; User ID; page views; device logs; operating systems; browsing history; clicks; interaction events; scroll-to-page interactions; scroll position; crash data.
      </p>
      <p className="mt-4">
        Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.
      </p>
      <p className="mt-4">
        Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using RU-Novel.
      </p>
      <p className="mt-4">
        Unless specified otherwise, all Data requested by RU-Novelis mandatory and failure to provide this Data may make it impossible for RU-Novelto provide its services. In cases where RU-Novelspecifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.
      </p>
      <p className="mt-4">
        Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
      </p>
      <p className="mt-4">
        Any use of Cookies – or of other tracking tools — by RU-Novelor by the owners of third-party services used by RU-Novelserves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy.
      </p>
      <p className="mt-4">
        Users are responsible for any third-party Personal Data obtained, published or shared through RU-Novel.
      </p>
      <hr className="bg-gray-800 mt-4" />
      <p className={`mt-4  ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}>
        <strong>Mode and place of processing the Data</strong>
      </p>
      <p className="mt-4">
        <strong>Methods of processing</strong>
      </p>
      <p className="mt-4">
        The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
      </p>
      <p className="mt-4">
        The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of RU-Novel(administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.
      </p>
      <p className="mt-4">
        <strong>Place</strong>
      </p>
      <p className="mt-4">
        The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.
      </p>
      <p className="mt-4">
        Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data.
      </p>
      <p className="mt-4">
        <strong>Retention time</strong>
      </p>
      <p className="mt-4">
        Unless specified otherwise in this document, Personal Data shall be processed and stored for as long as required by the purpose they have been collected for and may be retained for longer due to applicable legal obligation or based on the Users’ consent.
      </p>
<hr className='text-gray-800 mt-4'/>
<p className={`mt-4  ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}>
        <strong>The purposes of processing</strong>
      </p>
      <p className="mt-4">
      The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or third parties), detect any malicious or fraudulent activity, as well as the following: Analytics, Contacting the User, Traffic optimization and distribution, Handling payments, Commercial affiliation, Content commenting, Managing contacts and sending messages, Registration and authentication, SPAM protection, Advertising, Tag Management, Displaying content from external platforms, Social features, Infrastructure monitoring and Content performance and features testing (A/B testing).

For specific information about the Personal Data used for each purpose, the User may refer to the section “Detailed information on the processing of Personal Data”.


      </p>
<hr className='text-gray-800 mt-4'/>

<p className={`mt-4  ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-500 '}`}>
        <strong>Detailed information on the processing of Personal Data</strong>
      </p>
      <p className="mt-4">
   

      Personal Data is collected for the following purposes and using the following services:

      </p>

      <ul className="space-y-4 mt-4">
  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
            <i className="fas fa-ad"></i>
          </span>
          <span>Interest Based Advertising</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>We use third-party advertising companies to serve ads and collect information...</p>
      </div>
    </details>
  </li>

  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full">
            <i className="fas fa-user"></i>
          </span>
          <span>User-Generated Content and Activity</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>By using this service, you may engage in activities such as sharing...</p>
      </div>
    </details>
  </li>

  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full">
            <i className="fas fa-cloud"></i>
          </span>
          <span>Cloud Storage and Syncing</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>We may provide cloud storage and synchronization features to enhance...</p>
      </div>
    </details>
  </li>

  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full">
            <i className="fas fa-lock"></i>
          </span>
          <span>Data Privacy and Protection</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>Your data is important to us. We employ measures to protect it from unauthorized...</p>
      </div>
    </details>
  </li>

  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-yellow-500 text-white rounded-full">
            <i className="fas fa-cogs"></i>
          </span>
          <span>Service Configuration</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#1113] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>Our services come with a wide range of configuration options to tailor...</p>
      </div>
    </details>
  </li>

  <li>
    <details className={`border border-gray-300 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-gray-100'}`}>
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-900'}`}>
          <span className="w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded-full">
            <i className="fas fa-question-circle"></i>
          </span>
          <span>Support and Help</span>
        </h3>
      </summary>
      <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
        <p>We are here to help. Our support team is available for questions and issues...</p>
      </div>
    </details>
  </li>
</ul>

    <hr className='text-gray-800 mt-4'/>

    <p className={`mt-4 ${theme === 'dark' ? ' text-[#C2A970]' : 'text-red-600'}`}>
    Further information about the processing of Personal Data
      </p>
      <ul className="space-y-4 mt-4">
        {/* Interest Based Advertising */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] border-gray-700' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Interest Based Advertising
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                We use third-party advertising companies to serve ads and collect information when users visit our site...
              </p>
            </div>
          </details>
        </li>

        {/* User-Generated Content */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] border-gray-700' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                User-Generated Content and Activity
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                By using this service, you may engage in activities such as sharing personal information in your biography...
              </p>
            </div>
          </details>
        </li>

        {/* Customize the Service */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] border-gray-700 text-[#FFFFFFCC]' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Customize the Service
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                The data collected is used to customize the service for you, providing personalized content and recommendations...
              </p>
            </div>
          </details>
        </li>

        {/* Data Retention */}
        <li>
          <details className={`rounded-lg shadow-md border ${theme === 'dark' ? 'bg-[#181818] border-gray-700 text-[#FFFFFFCC]' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Regarding Data Retention
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                The data will only be retained for as long as needed for the purposes it was collected or permitted by law...
              </p>
            </div>
          </details>
        </li>

        {/* Rights Concerning Personal Data */}
        <li>
          <details className={`rounded-lg  border shadow-md ${theme === 'dark' ? 'bg-[#181818]  text-[#FFFFFFCC] border-gray-700' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Your Rights Concerning Personal Data
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                You can download or request the deletion of the data collected about you from the site using the provided links...
              </p>
            </div>
          </details>
        </li>

        {/* Not Directed to Children */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC] border-gray-700' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                The Service is Not Directed to Children Under 13
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                Users must declare themselves as adults under applicable law. Minors may use the service only with parental guidance...
              </p>
            </div>
          </details>
        </li>

        {/* Selling Goods and Services */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] border-gray-700 text-[#FFFFFFCC]' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Selling Goods and Services Online
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                Personal data collected may be used to sell goods or services, including payment details such as credit card or bank account information...
              </p>
            </div>
          </details>
        </li>

        {/* Push Notifications */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] border-gray-700 text-[#FFFFFFCC]' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                Push Notifications
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                Users can opt-out of push notifications via their device settings. Disabling them may reduce the utility of the service...
              </p>
            </div>
          </details>
        </li>

        {/* localStorage */}
        <li>
          <details className={`rounded-lg border shadow-md ${theme === 'dark' ? 'bg-[#181818] border-gray-700 text-[#FFFFFFCC]' : 'bg-gray-100 text-gray-900'}`}>
            <summary className="p-4 flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold flex items-center">
                <span className="mr-2 text-blue-500">🔗</span>
                localStorage
              </h3>
            </summary>
            <div className={`p-4 ${theme === 'dark' ? 'bg-[#181818] text-[#FFFFFFCC]' : 'bg-white text-gray-700'}`}>
              <p>
                localStorage allows storing preferences like UI state (e.g., dark mode) on the User's device to enhance the experience...
              </p>
            </div>
          </details>
        </li>
      </ul>
<hr className='text-gray-800 mt-4'/>
<section>
<h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>
    Further Information for Users
  </h2>
  <p className="mt-4">
    The Owner may process Personal Data relating to Users if one of the following applies:
  </p>
  <ul className="list-disc list-inside pl-5 mt-4">
    <li>Users have given their consent for one or more specific purposes.</li>
    <li>
      Provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;
    </li>
    <li>Processing is necessary for compliance with a legal obligation to which the Owner is subject;</li>
    <li>
      Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;
    </li>
    <li>
      Processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.
    </li>
  </ul>
  <p className="mt-4">
    In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.
  </p>
</section>

<section>
  <h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>
    Further Information About Retention Time
  </h2>
  <p className="mt-4">
    Unless specified otherwise in this document, Personal Data shall be processed and stored for as long as required by the purpose they have been collected for and may be retained for longer due to applicable legal obligation or based on the Users’ consent.
  </p>
  <p className="mt-4">
    Therefore:
  </p>
  <ul className="list-disc list-inside pl-5 mt-4">
    <li>
      Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.
    </li>
    <li>
      Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within the relevant sections of this document or by contacting the Owner.
    </li>
    <li>
      The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to fulfil a legal obligation or upon order of an authority.
    </li>
  </ul>
  <p className="mt-4">
    Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.
  </p>
</section>

<section>
  <h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>
    The Rights of Users Based on the General Data Protection Regulation (GDPR)
  </h2>
  <p className="mt-4">
    Users may exercise certain rights regarding their Data processed by the Owner. In particular, Users have the right to do the following, to the extent permitted by law:
  </p>
  <ul className="list-disc list-inside pl-5 mt-4">
    <li>Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.</li>
    <li>Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent.</li>
    <li>Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.</li>
    <li>Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.</li>
    <li>Restrict the processing of their Data. Users have the right to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.</li>
    <li>Have their Personal Data deleted or otherwise removed. Users have the right to obtain the erasure of their Data from the Owner.</li>
    <li>Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance.</li>
    <li>Lodge a complaint. Users have the right to bring a claim before their competent data protection authority.</li>
  </ul>
  <p className="mt-4">
    Users are also entitled to learn about the legal basis for Data transfers abroad including to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.
  </p>
</section>

<section>
  <h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>
    Details About the Right to Object to Processing
  </h2>
  <p className="mt-4">
    Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection.
  </p>
  <p className="mt-4">
    Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time, free of charge and without providing any justification. Where the User objects to processing for direct marketing purposes, the Personal Data will no longer be processed for such purposes. To learn whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document.
  </p>
      </section>

      <section>
        <h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>How to Exercise These Rights</h2>
        <p className="mt-4">
          Any requests to exercise User rights can be directed to the Owner through the contact details provided in this
          document. Such requests are free of charge and will be answered by the Owner as early as possible and always
          within one month, providing Users with the information required by law. Any rectification or erasure of Personal
          Data or restriction of processing will be communicated by the Owner to each recipient, if any, to whom the Personal
          Data has been disclosed unless this proves impossible or involves disproportionate effort. At the Users’ request,
          the Owner will inform them about those recipients.
        </p>
      </section>

      <section>
        <h2 className={`font-bold mt-2 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'}`}>Further Information for Users in the United States</h2>
        <p className="mt-4">
          This part of the document integrates with and supplements the information contained in the rest of the privacy
          policy and is provided by the business running RU-Noveland, if the case may be, its parent, subsidiaries and
          affiliates (for the purposes of this section referred to collectively as “we”, “us”, “our”).
        </p>
        <p className="mt-4">
          The information contained in this section applies to all Users (Users are referred to below, simply as “you”,
          “your”, “yours”), who are residents in the following states: California, Virginia, Colorado, Connecticut, Utah,
          Texas, Oregon and Montana.
        </p>
        <p className="mt-4">
          For such Users, this information supersedes any other possibly divergent or conflicting provisions contained in the
          privacy policy.
        </p>
        <p className="mt-4">
          This part of the document uses the term Personal Information (and Sensitive Personal Information).
        </p>
      </section>

      <ul className={`space-y-4 mt-4 ${theme === 'dark' ? 'text-[#FFFFFCC]' : ''}`}>
      {/* Section 1 */}
      <li>
        <details className={`border rounded-lg shadow-md p-4 ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-white border-gray-200'}`}>
          <summary className="flex items-center cursor-pointer">
            <h3 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>
              <span className="w-6 h-6 mr-2 bg-blue-500 rounded-full flex items-center justify-center text-white">i</span>
              Internet or other electronic network activity information
            </h3>
          </summary>
          <div className="mt-4">
            <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Personal Information collected or disclosed:</b> Cookies, Usage Data, various types of Data as specified in the privacy policy of the service, email address, gender, date of birth, website, profile picture, various types of Data, Tracker, Trackers, number of Users, city, device information, session statistics, latitude (of city), longitude (of city), browser information, User ID, page views, device logs, operating systems, browsing history, clicks, interaction events, scroll-to-page interactions, scroll position, crash data
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sensitive Personal Information collected or disclosed ℹ️:</b> username, password
            </p>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Purposes:</p>
              <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
                <li>Analytics</li>
                <li>Traffic optimization and distribution</li>
                <li>Handling payments</li>
                <li>Commercial affiliation</li>
                <li>Further information about Personal Data</li>
                <li>Content commenting</li>
                <li>Registration and authentication</li>
                <li>SPAM protection</li>
                <li>Advertising</li>
                <li>Managing contacts and sending messages</li>
                <li>Tag Management</li>
                <li>Displaying content from external platforms</li>
                <li>Social features</li>
                <li>Content performance and features testing (A/B testing)</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Retention period:</p>
              <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>for the time necessary to fulfill the purpose</p>
            </div>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sold or Shared ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Targeted Advertising: ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Third-parties:</b> Google Inc., Cloudflare, PayPal Inc., Amazon, AppNexus Inc., Google Ireland Limited, PubMatic, Inc., Automattic Inc., Facebook, Inc., Google LLC, 33Across, Sovrn Holdings Inc, OpenX Technologies, Inc., Oath (EMEA) Limited, district m inc., Venatus Media Limited, RU-Novel
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Service providers or contractors:</b> RU-Novel, RU-Novel
            </p>
          </div>
        </details>
      </li>
      {/* Section 2 */}
      <li>
        <details className={`border rounded-lg shadow-md p-4 ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-white border-gray-200'}`}>
          <summary className="flex items-center cursor-pointer">
            <h3 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>
              <span className="w-6 h-6 mr-2 bg-blue-500 rounded-full flex items-center justify-center text-white">i</span>
              Identifiers
            </h3>
          </summary>
          <div className="mt-4">
            <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Personal Information collected or disclosed:</b> email address, Cookies, Usage Data, gender, date of birth, website, profile picture, picture, various types of Data as specified in the privacy policy of the service, Trackers, number of Users, city, device information, session statistics, latitude (of city), longitude (of city), browser information, various types of Data, User ID
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sensitive Personal Information collected or disclosed ℹ️:</b> username, password
            </p>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Purposes:</p>
              <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
                <li>Contacting the User</li>
                <li>Content commenting</li>
                <li>Managing contacts and sending messages</li>
                <li>Registration and authentication</li>
                <li>Social features</li>
                <li>Advertising</li>
                <li>Infrastructure monitoring</li>
                <li>Analytics</li>
                <li>Further information about Personal Data</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Retention period:</p>
              <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>for the time necessary to fulfill the purpose</p>
            </div>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sold or Shared ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Targeted Advertising: ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Third-parties:</b> Sendgrid, Google LLC, Microsoft Corporation
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Service providers or contractors:</b> RU-Novel, RU-Novel, Functional Software, Inc.
            </p>
          </div>
        </details>
      </li>
      {/* Section 3 */}
      <li>
        <details className={`border rounded-lg shadow-md p-4 ${theme === 'dark' ? 'bg-[#181818] border-gray-700' : 'bg-white border-gray-200'}`}>
          <summary className="flex items-center cursor-pointer">
            <h3 className={`text-lg font-semibold flex items-center ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>
              <span className="w-6 h-6 mr-2 bg-blue-500 rounded-full flex items-center justify-center text-white">i</span>
              Biometric information
            </h3>
          </summary>
          <div className="mt-4">
            <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Personal Information collected or disclosed:</b> face data, voice data
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sensitive Personal Information collected or disclosed ℹ️:</b> face data, voice data
            </p>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Purposes:</p>
              <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
                <li>Authentication</li>
                <li>Security</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className={`font-bold ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-900'}`}>Retention period:</p>
              <p className={`text-gray-700 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>for the time necessary to fulfill the purpose</p>
            </div>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Sold or Shared ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Targeted Advertising: ℹ️:</b> Yes
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Third-parties:</b> Google LLC, Microsoft Corporation
            </p>
            <p className={`text-gray-700 mt-2 ${theme === 'dark' ? 'text-[#FFFFFCC]' : 'text-gray-700'}`}>
              <b>Service providers or contractors:</b> RU-Novel, Functional Software, Inc.
            </p>
          </div>
        </details>
      </li>
    </ul>
   <hr className='bg-gray-800 mt-4 '/>

   <div className="space-y-6">
  <p className={`${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'} font-bold mt-4`}>
    ℹ️ You can read the definitions of these concepts inside the “Definitions and legal references section” of the privacy policy.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'} font-bold text-lg`}>
    To know more about your rights in particular to opt out of certain processing activities and to limit the use of your sensitive personal information (“Limit the Use of My Sensitive Personal Information”) you can refer to the “Your privacy rights under US state laws” section of our privacy policy.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'} font-bold text-lg`}>
    For more details on the collection of Personal Information, please read the section “Detailed information on the processing of Personal Data” of our privacy policy.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    We won’t process your Information for unexpected purposes, or for purposes that are not reasonably necessary to and compatible with the purposes originally disclosed, without your consent.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>What are the sources of the Personal Information we collect?</b>
    <br />
    We collect the above-mentioned categories of Personal Information, either directly or indirectly, from you when you use RU-Novel.
    <br />
    For example, you directly provide your Personal Information when you submit requests via any forms on RU-Novel. You also provide Personal Information indirectly when you navigate RU-Novel, as Personal Information about you is automatically observed and collected.
    <br />
    Finally, we may collect your Personal Information from third parties that work with us in connection with the Service or with the functioning of RU-Novel and features thereof.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Your privacy rights under US state laws</b>
    <br />
    You may exercise certain rights regarding your Personal Information. In particular, to the extent permitted by applicable law, you have:
    <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
      <li>The right to access Personal Information: the right to know. You have the right to request that we confirm whether or not we are processing your Personal Information. You also have the right to access such Personal Information;</li>
      <li>The right to correct inaccurate Personal Information. You have the right to request that we correct any inaccurate Personal Information we maintain about you;</li>
      <li>The right to request the deletion of your Personal Information. You have the right to request that we delete any of your Personal Information;</li>
      <li>The right to obtain a copy of your Personal Information. We will provide your Personal Information in a portable and usable format that allows you to transfer data easily to another entity – provided that this is technically feasible;</li>
      <li>The right to opt out from the Sale of your Personal Information; We will not discriminate against you for exercising your privacy rights.</li>
      <li>The right to non-discrimination.</li>
    </ul>
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Additional rights for Users residing in California</b>
    <br />
    In addition to the rights listed above common to all Users in the United States, as a User residing in California, you have:
    <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
      <li>The right to opt out of the Sharing of your Personal Information for cross-context behavioral advertising;</li>
      <li>The right to request to limit our use or disclosure of your Sensitive Personal Information to only that which is necessary to perform the services or provide the goods, as is reasonably expected by an average consumer. Please note that certain exceptions outlined in the law may apply, such as, when the collection and processing of Sensitive Personal Information is necessary to verify or maintain the quality or safety of our service.</li>
    </ul>
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Additional rights for Users residing in Virginia, Colorado, Connecticut, Texas, Oregon and Montana</b>
    <br />
    In addition to the rights listed above common to all Users in the United States, as a User residing in Virginia, Colorado, Connecticut, Texas and Oregon, you have:
    <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
      <li>The right to opt out of the processing of your personal information for Targeted Advertising or profiling in furtherance of decisions that produce legal or similarly significant effects concerning you;</li>
      <li>The right to freely give, deny or withdraw your consent for the processing of your Sensitive Personal Information. Please note that certain exceptions outlined in the law may apply, such as, but not limited to, when the collection and processing of Sensitive Personal Information is necessary for the provision of a product or service specifically requested by the consumer.</li>
    </ul>
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Additional rights for users residing in Utah</b>
    <br />
    In addition to the rights listed above common to all Users in the United States, as a User residing in Utah, you have:
    <ul className={`list-disc list-inside mt-2 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
      <li>The right to opt out of the processing of your Personal Information for Targeted Advertising;</li>
      <li>The right to opt out of the processing of your Sensitive Personal Information. Please note that certain exceptions outlined in the law may apply, such as, but not limited to, when the collection and processing of Sensitive Personal Information is necessary for the provision of a product or service specifically requested by the consumer.</li>
    </ul>
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>How to exercise your privacy rights under US state laws</b>
    <br />
    To exercise the rights described above, you need to submit your request to us by contacting us via the contact details provided in this document.
    <br />
    For us to respond to your request, we must know who you are. We will not respond to any request if we are unable to verify your identity and therefore confirm the Personal Information in our possession relates to you. You are not required to create an account with us to submit your request. We will use any Personal Information collected from you in connection with the verification of your request solely for verification and shall not further disclose the Personal Information, retain it longer than necessary for purposes of verification, or use it for unrelated purposes.
    <br />
    If you are an adult, you can make a request on behalf of a child under your parental authority.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>How to exercise your rights to opt out</b>
    <br />
    In addition to what is stated above, to exercise your right to opt-out of Sale or Sharing and Targeted Advertising you can also use the privacy choices link provided on RU-Novel.
    <br />
    If you want to submit requests to opt out of Sale or Sharing and Targeted Advertising activities via a user-enabled global privacy control, such as for example the Global Privacy Control (“GPC”), you are free to do so and we will abide by such request in a frictionless manner.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>How and when we are expected to handle your request</b>
    <br />
    We will respond to your request without undue delay, but in all cases within the timeframe required by applicable law. Should we need more time, we will explain to you the reasons why, and how much more time we need.
    <br />
    Should we deny your request, we will explain to you the reasons behind our denial (where envisaged by applicable law you may then contact the relevant authority to submit a complaint).
    <br />
    We do not charge a fee to process or respond to your request unless such request is manifestly unfounded or excessive and in all other cases where it is permitted by the applicable law. In such cases, we may charge a reasonable fee or refuse to act on the request. In either case, we will communicate our choices and explain the reasons behind them.
  </p>

  <hr className={`mt-4 mb-4 ${theme === 'dark' ? 'text-[#C2A970]' : 'border-red-600'}`} />

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Additional Information for California Residents</b>
    <br />
    The California Consumer Privacy Act of 2018 (CCPA) grants certain rights to California residents. For more information, please visit the California Privacy Rights Act (CPRA) website.
  </p>

  <p className={`${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-700'}`}>
    <b>Additional Information for Colorado Residents</b>
    <br />
    The Colorado Privacy Act (CPA) provides additional privacy rights to Colorado residents. For more details, please refer to the CPA website.
  </p>
</div>

<hr className='text-gray-800 mt-4 mb-4 dark:text-[#FFFFFFCC]' />

  
<details className={`box_primary box_10 definitions expand mt-4 ${theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-200'} p-4`}>
  <summary className="flex items-center justify-between cursor-pointer">
    <h3 id="definitions_and_legal_references" className={`w_icon_24 icon_ribbon p-4 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'} font-bold text-lg`}>
      Definitions and Legal References
    </h3>
    <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-[#C2A970]' : 'text-red-600'} transition-transform duration-300 transform rotate-90`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div className={`details_body space-y-4 ${theme === 'dark' ? 'text-[#FFFFFFCC]' : 'text-gray-800'}`}>
    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Personal Data (or Data) / Personal Information (or Information)</h4>
    <p>Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Sensitive Personal Information</h4>
    <p>Sensitive Personal Information means any Personal Information that is not publicly available and reveals information considered sensitive according to the applicable privacy law.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Usage Data</h4>
    <p>Information collected automatically through RU-Novel (or third-party services employed in RU-Novel), which can include: the IP addresses or domain names of the computers utilized by the Users who use RU-Novel, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>User</h4>
    <p>The individual using RU-Novel who, unless otherwise specified, coincides with the Data Subject.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Data Subject</h4>
    <p>The natural person to whom the Personal Data refers.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Data Processor (or Processor)</h4>
    <p>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Data Controller (or Owner)</h4>
    <p>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of RU-Novel. The Data Controller, unless otherwise specified, is the Owner of RU-Novel.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>RU-Novel (or this Application)</h4>
    <p>The means by which the Personal Data of the User is collected and processed.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Service</h4>
    <p>The service provided by RU-Novel as described in the relative terms (if available) and on this site/application.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Sale</h4>
    <p>Sale means any exchange of Personal Information by the Owner to <b>a third party, for monetary or other valuable consideration</b>, as defined by the applicable privacy US state law. Please note that the exchange of Personal Information with a service provider pursuant to a written contract that meets the requirements set by the applicable law does not constitute a Sale of your Personal Information.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Sharing</h4>
    <p>Sharing means any sharing, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer's Personal Information by the business to a <b>third party for cross-context behavioral advertising</b>, whether for monetary or other valuable consideration, including transactions between a business and a third party for cross-context behavioral advertising for the benefit of a business in which no money is exchanged, as defined by the California privacy laws. Please note that the exchange of Personal Information with a service provider pursuant to a written contract that meets the requirements set by the California privacy laws does not constitute sharing of your Personal Information.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Targeted Advertising</h4>
    <p>Targeted advertising means displaying advertisements to a consumer where the advertisement is selected based on Personal Information obtained from that consumer’s activities over time and across nonaffiliated websites or online applications to predict such consumer’s preferences or interests, as defined by the applicable privacy US state law.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>European Union (or EU)</h4>
    <p>Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Cookie</h4>
    <p>Cookies are Trackers consisting of small sets of data stored in the User's browser.</p>

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Tracker</h4>
    <p>Tracker indicates any technology - e.g Cookies, unique identifiers, web beacons, embedded scripts, e-tags and fingerprinting - that enables the tracking of Users, for example by accessing or storing information on the User’s device.</p>

    <hr className={`my-4 ${theme === 'dark' ? 'border-[#C2A970]' : 'border-red-600'}`} />

    <h4 className={`text-red-600 font-semibold ${theme === 'dark' ? 'text-[#C2A970]' : ''}`}>Legal Information</h4>
    <p>This privacy statement has been prepared based on provisions of multiple legislations.</p>
    <p>This privacy policy relates solely to RU-Novel, if not stated otherwise within this document.</p>
  </div>
</details>



        </div>
        </div>
  )
}

export default PrivatePolicy