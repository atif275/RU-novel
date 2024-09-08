import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";

const Reporting = (props) => {
  const inputRef = useRef();
  const titleRef = useRef();
  const email = useSelector((state) => state.userData.email); // User's email
  const userEmail=useSelector((state)=>state.userData.userEmail)
  const [reportType, setReportType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(userEmail)
    try {
      const response = await fetch("https://api.ru-novel.ru/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: userEmail, // Email of the comment being reported
          reporterEmail: email, // The email of the person submitting the report
          reason: inputRef.current.value,
          information: titleRef.current.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        notification.success({
            message: "Report Submitted",
            description: "Your report has been submitted successfully.",
            placement: "topRight",
          });
        console.log("Report submitted successfully", data);
          
      } else {
        console.error("Error submitting report");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="lg:w-[90%] lg:ml-20 h-full p-4 bg-[#f3f6f9]">
      <div className="text-black rounded-md">
        <div className="portlet-body p-4">
          <div className="text-red-600 validation-summary-valid mb-4">
            <ul>
              <li style={{ display: "none" }}></li>
            </ul>
          </div>

          <div id="report-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="id" value="213" />
              <input type="hidden" name="ReportedContentType" value="idea" />

              <div className="form-group">
                <label htmlFor="ReportType" className="block text-lg font-medium">
                  Why are you reporting this idea?
                </label>
                <select
                  name="ReportType"
                  id="ReportType"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  ref={inputRef}
                  required
                >
                  <option disabled value="">
                    Select a reason
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <input type="hidden" name="ReportSubType" value="Other" />

              <div className="form-group">
                <label
                  htmlFor="AdditionalInformation"
                  className="block text-lg font-medium"
                >
                  Additional Information (Maximum 1000 characters){" "}
                  <span className="text-red-600">Required</span>
                </label>
                <textarea
                  name="AdditionalInformation"
                  id="AdditionalInformation"
                  rows="8"
                  maxLength="1000"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  ref={titleRef}
                  required
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;