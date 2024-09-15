import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { DatePicker, notification } from 'antd';
import * as Yup from 'yup';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import AccessDenied from './Error';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, 'Username must not exceed 20 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Email should be valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters required')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation required'),
    gender: Yup.string().required('Gender is required'),
    birthday: Yup.string().required('Date of birth is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
      gender: '',
      birthday: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await fetch("https://api.ru-novel.ru/api/createUser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          gender: values.gender,
          birthday: values.birthday,
        }),
      });

      const json = await response.json();
      if (!json.success) {
        notification.error({
          message: 'Error',
          description: json.message || 'Enter valid credentials',
        });
      } else {
        dispatch(userActions.setEmail(values.email));
        navigate('/signup/configuration');
      }
    },
  });

  const handleDateChange = (date) => {
    formik.setFieldValue('birthday', date ? date.format('YYYY-MM-DD') : '');
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'https://api.ru-novel.ru/auth/google/callback';
  };
  // const handleGoogleSignIn = () => {
  //   // window.location.href = 'https://api.ru-novel.ru/auth/google';
  //   window.open('https://api.ru-novel.ru/auth/google', "_self");

  // };

  const handleFaceBookSignIn = () => {
    window.location.href = 'https://api.ru-novel.ru/auth/facebook/callback';
  };
  const handleMicroSignIn = () => {
    navigate('/error')
  }


  const isFormInvalid = !formik.isValid || !formik.dirty;

  return (
    <div className="flex justify-center items-center min-h-screen sm:py-8">
      <div className="w-full max-w-lg p-8 bg-[#212329] rounded-2xl relative">
        <div className="logo-container text-center w-full max-w-[100%] mx-auto h-auto">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ru-novel-images.appspot.com/o/border-images%2Flogo1.png?alt=media&token=fa805337-746c-4820-8c12-18dbbd99d05a"
              className="mx-auto h-auto max-h-[100px] w-[90%] object-cover"
              alt="royal-road-logo"
            />
          </Link>
        </div>

        <div className="mb-4 flex mt-16 justify-between items-center">
          <h2 className="text-blue-500 text-2xl">Registration</h2>
          <Link to="/login" className="text-blue-500">
            Already have an account? &nbsp; Log in!
          </Link>
        </div>

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
            onClick={handleFaceBookSignIn}
          >
            <i className="fab fa-facebook mr-2"></i>
            with Facebook
          </button>
          <button className="text-center w-full py-2 my-1 d-block bg-blue-900 text-white rounded "onClick={handleMicroSignIn}>
            <i className="fab fa-microsoft mr-2"></i>
            with Microsoft
          </button>
          {/* <button className="text-center w-full py-2 my-1 d-block bg-black text-white rounded"
          onClick={handleMicroSignIn}>
            <i className="fab fa-apple mr-2"></i>
            with Apple
          </button> */}
        </div>

        <form onSubmit={formik.handleSubmit} className="form-login-details">
          <div className="text-center text-white font-bold mb-4">
            <span>--- or ---</span>
          </div>

          <div className="form-group mb-6 relative">
            <label className="block text-white mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="form-group mb-6 relative">
            <label className="block text-white mb-2" htmlFor="email">
              Email address:
            </label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4 relative">
              <label className="block text-white mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4 relative">
              <label className="block text-white mb-2" htmlFor="password2">
                Password again:
              </label>
              <input
                className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
                type="password"
                id="password2"
                name="password2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password2}
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.password2}</div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4 relative">
              <label className="block text-white mb-2" htmlFor="gender">
                Gender:
              </label>
              <select
                className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.gender}</div>
              ) : null}
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4 relative">
              <label className="block text-white mb-2" htmlFor="birthday">
                Date of birth:
              </label>
              <DatePicker
                className="w-full p-2 bg-gray-700 text-white rounded outline-none mt-2"
                onChange={handleDateChange}
                format="YYYY-MM-DD"
              />
              {formik.touched.birthday && formik.errors.birthday ? (
                <div className="absolute text-red-500 min-h-[20px] -bottom-6 left-0 w-full">{formik.errors.birthday}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${isFormInvalid ? 'bg-gray-500 cursor-not-allowed mt-6' : 'bg-blue-500 cursor-pointer'}`}
            disabled={isFormInvalid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;


// import { Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { DatePicker, notification } from 'antd';
// import * as Yup from 'yup';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { userActions } from '../store';



// const SignupPage = () => {
//    const navigate=useNavigate()
//    const dispatch=useDispatch()

//   const validationSchema = Yup.object().shape({
//     username: Yup.string()
//       .max(20, 'Username must not exceed 20 characters')
//       .required('Username is required'),
//     email: Yup.string()
//       .email('Invalid email format')
//       .matches(/@gmail\.com$/, 'Email should be a Gmail address')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must not less than 8 characters')
      
//       .required('Password is required'),
//     password2: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Password confirmation is required'),
//     gender: Yup.string()
//       .required('Gender is required'),
//     birthday: Yup.string()
//       .required('Date of birth is required'),
//     referrer: Yup.string()
//       .matches(/^[A-Z]{2}-[A-Z]\d[A-Z]\d-[A-Z]\d[A-Z]\d$/, 'Referral code should be in the format RR-A1B2-C3D4')
//       .required('Referral code is required'),
//     agree: Yup.boolean()
//       .oneOf([true], 'You must agree to the terms and conditions')
//   });

  
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       email: '',
//       password: '',
//       password2: '',
//       gender: '',
//       birthday: '',
//       referrer: '',
//       agree: false
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
      
//       const response = await fetch("https://api.ru-novel.ru/api/createUser", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: values.username,
//           email: values.email,
//           password: values.password,
//           gender: values.gender,
//           birthday: values.birthday,
//           referrer: values.referrer,
//           agree: values.agree
//         })
//       });

//       const json = await response.json();
//       if (!json.success) {
//         notification.error({
//           message: 'Error',
//           description: json.message || 'Enter valid credentials',
//         })
//       } else {
      
//         dispatch(userActions.setEmail(values.email))
//         // console.log(values.email)
//         navigate('/signup/configuration')
//         // console.log('success')
//       }
     
//     },
    
//   });

//   const handleDateChange = (date) => {
//     formik.setFieldValue('birthday', date ? date.format('YYYY-MM-DD') : '');
//   };

//   const handleGoogleSignIn = () => {
//     window.location.href = 'https://api.ru-novel.ru/auth/google';
//   };
//   const isFormInvalid = !formik.isValid || !formik.dirty;
//   const handleFaceBookSignIn = () => {
//     window.location.href = 'https://api.ru-novel.ru/auth/facebook';
//   };

   

//   return (
//     <div className="flex justify-center items-center min-h-screen sm:py-8">
//       <div className="w-full max-w-lg p-8 bg-[#212329] rounded-2xl">
//         <div className="text-center mb-8">
//           <Link to="/">
//             <img
//               src="https://www.royalroad.com/dist/img/logo/rr-logo-gold-white-small-min.png"
//               alt="royal-road-logo"
//               className="mx-auto"
//             />
//           </Link>
//         </div>
        
//         <div className="mb-4 flex mt-16 justify-between items-center">
//           <h2 className="text-blue-500 text-2xl">Registration</h2>
//           <Link to="/login" className="text-blue-500">
//             Already have an account? &nbsp; Log in!
//           </Link>
//         </div>

//         <div
//           id="external-account"
//           className="form-social-buttons mb-4"
         
//         >
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-red-600 text-white rounded"
          
//              onClick={handleGoogleSignIn}
//           >
//             <i className="fab fa-google mr-2"></i>
//             with Google
//           </button>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-blue-600 text-white rounded"
//             onClick={handleFaceBookSignIn} 
           
//           >
//             <i className="fab fa-facebook mr-2"></i>
//             with Facebook
//           </button>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-gray-800 text-white rounded"
//             type="submit"
//             name="provider"
//             value="Microsoft"
//             title="Log in using your Microsoft account"
//           >
//             <i className="fab fa-microsoft mr-2"></i>
//             with Microsoft
//           </button>
//           <button
//             className="text-center w-full py-2 my-1 d-block bg-black text-white rounded"
//             type="submit"
//             name="provider"
//             value="apple"
//             title="Log in using your Apple account"
//           >
//             <i className="fab fa-apple mr-2"></i>
//             with Apple
//           </button>
         
//         </div>

//         <form onSubmit={formik.handleSubmit} className="form-login-details">
//           <div className="text-center text-gray-700 mb-4">
//             <span>--- or ---</span>
//           </div>
          
//           <div className="form-group mb-4">
//             <label className="block text-white mb-2" htmlFor="username">Username:</label>
//             <input
//               className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//               type="text"
//               id="username"
//               name="username"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.username}
//             />
//             {formik.touched.username && formik.errors.username ? (
//               <div className="text-red-500">{formik.errors.username}</div>
//             ) : null}
//           </div>
          
//           <div className="form-group mb-4">
//             <label className="block text-white mb-2" htmlFor="email">Email address:</label>
//             <input
//               className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//               type="email"
//               id="email"
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="text-red-500">{formik.errors.email}</div>
//             ) : null}
//           </div>

//           <div className="flex flex-wrap -mx-2">
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <label className="block text-white outline-none mb-2" htmlFor="password">Password:</label>
//               <input
//                 className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//                 type="password"
//                 id="password"
//                 name="password"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="text-red-500">{formik.errors.password}</div>
//               ) : null}
//             </div>
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <label className="block text-white outline-none mb-2" htmlFor="password2">Password again:</label>
//               <input
//                 className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//                 type="password"
//                 id="password2"
//                 name="password2"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password2}
//               />
//               {formik.touched.password2 && formik.errors.password2 ? (
//                 <div className="text-red-500">{formik.errors.password2}</div>
//               ) : null}
//             </div>
//           </div>

//           <div className="flex flex-wrap -mx-2">
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <label className="block text-white mb-2" htmlFor="gender">Gender:</label>
//               <select
//                 className="w-full p-2 bg-gray-700 text-white outline-none rounded"
//                 id="gender"
//                 name="gender"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.gender}
//               >
//                 <option disabled value="">Select your gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {formik.touched.gender && formik.errors.gender ? (
//                 <div className="text-red-500">{formik.errors.gender}</div>
//               ) : null}
//             </div>
//             <div className="w-full md:w-1/2 px-2 mb-4">
//               <label className="block text-white mb-2" htmlFor="birthday">Date of birth:</label>
//               <DatePicker
//                 className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//                 id="birthday"
//                 name="birthday"
//                 format="YYYY-MM-DD"
//                 onChange={handleDateChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.birthday ? moment(formik.values.birthday, 'YYYY-MM-DD') : null}
//                 placeholder="DOB"
//               />
//               {formik.touched.birthday && formik.errors.birthday ? (
//                 <div className="text-red-500">{formik.errors.birthday}</div>
//               ) : null}
//             </div>
//           </div>
          
//           <div className="form-group mb-4">
//             <label className="block text-white mb-2" htmlFor="referrer">Referral code:</label>
//             <input
//               className="w-full p-2 bg-gray-700 text-white rounded outline-none"
//               type="text"
//               id="referrer"
//               name="referrer"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.referrer}
//             />
//             {formik.touched.referrer && formik.errors.referrer ? (
//               <div className="text-red-500">{formik.errors.referrer}</div>
//             ) : null}
//           </div>

//           <div className="form-group mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 className="form-checkbox"
//                 type="checkbox"
//                 id="agree"
//                 name="agree"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 checked={formik.values.agree}
//               />
//               <span className="ml-2 text-white">I agree to the terms and conditions</span>
//             </label>
//           </div>

//           <div className="form-group">
//             <button
//               type="submit"
//               className={`w-full p-2 rounded text-white  ${
//                 isFormInvalid ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 cursor-pointer hover:bg-blue-700'
//               }`}
//               disabled={isFormInvalid}
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
