import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { notification } from 'antd';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userActions } from '../store'; // Import your Redux actions

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email should be valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must not be less than 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://api.ru-novel.ru/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          //console.log(data);
          localStorage.setItem('authtoken', data.authToken);
          localStorage.setItem('userEmail', data.email);

          dispatch(userActions.setEmail(data.email));
          dispatch(userActions.setUser(data));

          if ((data.role === 'admin' || data.role === 'moderator') && data.status === 'active') {
            localStorage.setItem('adminLogin', true);
            navigate('/admin-dashboard');
          } else {
            navigate('/');
          }
        } else {
          console.error('Login failed');
          notification.error({
            message: 'Error',
            description: 'Enter valid credentials',
          });
        }
      } catch (error) {
        console.error('Error logging in', error);
      }
    },
  });

  const handleGoogleSignIn = () => {
    window.location.href = 'https://api.ru-novel.ru/auth/google/callback';
  };

  const handleFaceBookSignIn = () => {
    window.location.href = 'https://api.ru-novel.ru/auth/facebook/callback';
  };
  const handleSignIn = () => {
     navigate('/error')
  };

  const isFormInvalid = !formik.isValid || !formik.dirty;

  return (
    <div className="flex justify-center items-center min-h-screen sm:py-8">
      <div className="bg-[#212329] p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <div className="logo-container text-center w-full max-w-[100%] mx-auto h-auto">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/border-images%2Flogo1.png?alt=media&token=fa805337-746c-4820-8c12-18dbbd99d05a"
              className="mx-auto h-auto max-h-[100px] w-[90%] object-cover"
              alt="royal-road-logo"
            />
          </Link>
        </div>

        <h2 className="text-2xl mt-8 mb-4 text-blue-500">Sign In</h2>

        <div id="external-account" className="form-social-buttons mb-4">
          <button
            className="text-center w-full py-2 my-1 d-block bg-red-600 text-white rounded"
            onClick={handleGoogleSignIn}
          >
            <i className="fab fa-google mr-2"></i>
            with Google
          </button>
          <button
            className="text-center w-full py-2 my-1 d-block bg-blue-600 text-white rounded"
            type="button"
            onClick={handleFaceBookSignIn}
            title="Log in using your Facebook account"
          >
            <i className="fab fa-facebook mr-2"></i>
            with Facebook
          </button>
          <button
            className="text-center w-full py-2 my-1 d-block bg-blue-900 text-white rounded"
            type="button"
            onClick={handleSignIn}
            title="Log in using your Microsoft account"
          >
            <i className="fab fa-microsoft mr-2"></i>
            with Microsoft
          </button>
          {/* <button
            className="text-center w-full py-2 my-1 d-block bg-black text-white rounded"
            type="button"
            title="Log in using your Apple account"
            onClick={handleSignIn}
          >
            <i className="fab fa-apple mr-2"></i>
            with Apple
          </button> */}
        </div>

        <form onSubmit={formik.handleSubmit} className="form-login-details">
          <div className="login-divider text-center my-4">
            <span className="inline-block px-2 text-white font-bold">--- or ---</span>
          </div>

          <div className="form-group mb-4 relative">
            <label htmlFor="email" className="block mb-2 text-white">
              Email Address:
            </label>
            <input
              name="email"
              id="email"
              className="w-full px-3 py-2 bg-[#41444f] text-white outline-none border-none rounded"
              autoComplete="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="absolute top-full left-0 text-red-500 mt-1 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group mb-4 mt-8 relative">
            <label htmlFor="password" className="block mb-2 text-white ">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 bg-[#41444f] text-white m border-none outline-none rounded"
              autoComplete="current-password"
              maxLength="100"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="absolute top-full left-0 text-red-500 mt-1 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${isFormInvalid ? 'bg-gray-500 cursor-not-allowed mt-6' : 'bg-blue-500 cursor-pointer'}`}
            disabled={isFormInvalid}
          >
            Sign In
          </button>

          <div className="account-links mt-4 text-center">
            <div className="mt-3">
              <Link to="/forgot-password" className="text-blue-500">
                Forgot your password?
              </Link>
            </div>
            <div>
              <Link to="/register" className="text-blue-500">
                Create a new account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { notification } from 'antd';
// import * as Yup from 'yup';
// import { useDispatch,useSelector } from 'react-redux';
// import { userActions } from '../store'; // Import your Redux actions
// import { toast } from 'react-toastify';  // Make sure to import react-toastify
// import { ToastContainer } from 'react-toastify';

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();



//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email('Invalid email format')
//       .matches(/@gmail\.com$/, 'Email should be a Gmail address')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must not less than  8 characters')
//       .required('Password is required'),
//     agree: Yup.boolean()
//       .oneOf([true], 'You must agree to the terms and conditions'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       agree: false,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await fetch('https://api.ru-novel.ru/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
    
//             email: values.email,
//             password: values.password,
//             agree: values.agree
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           //// //console.log(data)
//           localStorage.setItem('authtoken',data.authToken);
//           localStorage.setItem("userEmail",data.email);
       
 
      
//           dispatch(userActions.setEmail(data.email))
//           dispatch(userActions.setUser(data)); 
      
//            if((data.role==="admin" || data.role==="moderator" ) && data.status==='active'){
//                 localStorage.setItem('adminLogin',true)
//                 navigate('/admin-dashboard'); 
//            }else if (data.role ==="author"){
//             navigate('/')
           
//              window.location.reload();
//            }
//            else{
//             toast.error('This User is Blocked by Admin');
//             // window.location.reload(); 
//            }

//         } else {
//           //console.error('Login failed');
//           window.location.reload(); 
//           notification.error({
//             message: 'Error',
//             description:  'Enter valid credentials',
//           })
//         }
//       } catch (error) {
//         //console.error('Error logging in', error);
//       }
//     },
//   });

//   const handleGoogleSignIn = () => {
//     window.location.href = 'https://api.ru-novel.ru/auth/google';
//   };
//   const handleFaceBookSignIn = () => {
//     window.location.href = 'https://api.ru-novel.ru/auth/facebook';
//   };

//   const isFormInvalid = !formik.isValid || !formik.dirty;

//   return (
//     <div className="flex justify-center items-center min-h-screen sm:py-8">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="bg-[#212329] p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <div className="logo-container my-4 pb-8 text-center">
//           <Link to="/">
//             <img
//               src="https://www.royalroad.com/dist/img/logo/rr-logo-gold-white-small-min.png"
//               className="mx-auto"
//               alt="royal-road-logo"
//             />
//           </Link>
//         </div>

//         <h2 className="text-2xl mt-2 mb-4 text-blue-500">Sign In</h2>

//         <div id="external-account" className="form-social-buttons mb-4">
//           <div>
//             <button
//               className="text-center w-full py-2 my-1 d-block bg-red-600 text-white rounded"
//               onClick={handleGoogleSignIn}
//             >
//               <i className="fab fa-google mr-2"></i>
//               with Google
//             </button>
//           </div>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-blue-600 text-white rounded"
//             type="button"
//             onClick={handleFaceBookSignIn}
//             title="Log in using your Facebook account"
//           >
//             <i className="fab fa-facebook mr-2"></i>
//             with Facebook
//           </button>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-gray-800 text-white rounded"
//             type="button"
//             title="Log in using your Microsoft account"
//           >
//             <i className="fab fa-microsoft mr-2"></i>
//             with Microsoft
//           </button>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-black text-white rounded"
//             type="button"
//             title="Log in using your Apple account"
//           >
//             <i className="fab fa-apple mr-2"></i>
//             with Apple
//           </button>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="form-login-details">
//           <div className="login-divider text-center my-4">
//             <span className="inline-block px-2 text-white">--- or ---</span>
//           </div>

//           <div className="text-danger validation-summary-valid" data-valmsg-summary="true">
//             <ul>
//               <li style={{ display: "none" }}></li>
//             </ul>
//           </div>

//           <div className="form-group mb-4">
//             <label htmlFor="email" className="block mb-2 text-[#888888]">
//               Email Address:
//             </label>
//             <input
//               name="email"
//               id="email"
//               className="w-full px-3 py-2 bg-[#41444f] text-[#888888] outline-none border-none rounded"
//               autoComplete="email"
//               type="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="text-red-500">{formik.errors.email}</div>
//             ) : null}
//           </div>

//           <div className="form-group mb-4">
//             <label htmlFor="password" className="block mb-2 text-[#888888]">
//               Password:
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="w-full px-3 py-2 bg-[#41444f] text-[#888888] border-none outline-none rounded"
//               autoComplete="current-password"
//               maxLength="100"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <div className="text-red-500">{formik.errors.password}</div>
//             ) : null}
//           </div>

//           <div className="form-group mb-4 flex items-center">
//             <input
//               type="checkbox"
//               name="agree"
//               id="agree"
//               className="mr-2 bg-[#41444f] text-white form-checkbox"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               checked={formik.values.agree}
//             />
//             <label htmlFor="agree" className="text-white">
//               I agree to the terms and conditions
//             </label>
//             {formik.touched.agree && formik.errors.agree ? (
//               <div className="text-red-500">{formik.errors.agree}</div>
//             ) : null}
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2 rounded text-white ${isFormInvalid ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'}`}
//             disabled={isFormInvalid}
//           >
//             Sign In
//           </button>

//           <div className="account-links mt-4 text-center">
//             <div className="mt-3">
//               <Link to="/forgot-password" className="text-blue-500">
//                 Forgot your password?
//               </Link>
//             </div>
//             <div>
//               <Link to="/register" className="text-blue-500">
//                 Create a new account
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;