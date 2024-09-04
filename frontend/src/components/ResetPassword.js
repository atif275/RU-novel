import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notification } from 'antd';

const ResetPassword = () => {
  const navigate = useNavigate();
   const email=useSelector((state)=>state.userData.email)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {

        try {
            const response = await fetch(`http://localhost:5001/api/reset-password`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password: values.password }),
            });
    
            if (response.ok) {
                notification.success({
                    message: 'Success',
                    description: 'Password Updated Successfully',
                  })

                  navigate('/login')
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Enter valid credentials',
                  })
            }
          } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request.');
          }
        
    
      }

  });

  return (
    <div className="flex justify-center items-center min-h-screen sm:py-8">
      <div className="bg-[#212329] p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl mt-2 mb-4 text-blue-500">Reset Your Password</h2>

        {formik.errors.general && <p className="text-red-500 mb-4">{formik.errors.general}</p>}

        <form onSubmit={formik.handleSubmit} className="mt-8">
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa fa-lock text-[#888888]"></i>
            </span>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="New password"
              className="w-full pl-10 pr-3 py-2 bg-[#41444f] text-[#888888] outline-none border-none rounded"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa fa-lock text-[#888888]"></i>
            </span>
            <input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="w-full pl-10 pr-3 py-2 bg-[#41444f] text-[#888888] outline-none border-none rounded"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <button type="submit" className="w-[30%] p-2 bg-blue-500 text-white rounded">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
