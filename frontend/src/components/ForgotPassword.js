import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
import { notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.userData.email);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://api.ru-novel.ru/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(userActions.setEmail(values.email));
          // console.log(mail); // Save email to Redux
          navigate("/reset-password");
        } else {
          formik.setErrors({ email: 'No user found with this email address.' });
          notification.error({
            message: 'Error',
            description: 'Email not exists',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        formik.setErrors({ email: 'There was an error processing your request.' });
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen sm:py-8">
      <div className="bg-[#212329] p-8 rounded-xl shadow-lg w-full max-w-lg" id="ahsan">
        <div className="logo-container my-4 pb-8 text-center">
          <Link to="/">
            <img
              src="https://www.royalroad.com/dist/img/logo/rr-logo-gold-white-small-min.png"
              className="mx-auto"
              alt="royal-road-logo"
            />
          </Link>
        </div>

        <h2 className="text-xl mt-2 mb-4 text-blue-500">Forgot Your Password?</h2>

        <p id="external-account" className="mb-4 text-[#888888] mt-8">
          Please enter your account's registered email address and we'll send you a recovery email.
        </p>

        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#888888]" />
            </span>
            <input
              name="email"
              id="email"
              className="w-full pl-10 pr-3 py-2 bg-[#41444f] text-[#888888] outline-none border-none rounded"
              autoComplete="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          
          </div>

          <button type="submit" className="w-[30%] p-2 mt-2 bg-blue-500 text-white rounded">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
