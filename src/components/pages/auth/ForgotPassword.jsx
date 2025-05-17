/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, clearError } from '../../../redux/slices/authSlice';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import backgroundImage from '../../../assets/images/logback.png';
import logo from '../../../assets/images/logo.png';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';
import { toast } from 'react-toastify';
import { useFormik, useField } from "formik";
import { useMutation } from 'react-query';
import { checkEmail, forgotPassword, resetPassword, sendOtp, verifyOtpForgotPassword } from '../../../utils/request';
import { ImSpinner9 } from "react-icons/im";

// Yup validation schema
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email address')
		.required('Email is required'),
});

const ForgotPassword = () => {
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(100);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(['', '', '', '']);

	const handleOtp = (value, index) => {
		const newOtp = [...otp];

		if (/^\d$/.test(value) || value === '') {
			// Allow only digits or empty string (for deletion)
			newOtp[index] = value;
			setOtp(newOtp);

			// Automatically move to the next input if a digit is entered
			if (index < otp.length - 1 && value) {
				document.getElementById(`otp-input-${index + 1}`).focus()
			} else if (value === '' && index > 0) {
				// Move to the previous input if the current input is cleared
				document.getElementById(`otp-input-${index - 1}`).focus();
			}
		}
	};

	const mutateCheckEmail = useMutation(
		(email) => checkEmail(email),
		{
			onSuccess: (data) => {
				if(data?.success === true) {
					setLoading(200)
					setIsLoading(false)
				}else{
					setError(data?.message)
					setIsLoading(false)
				}
				// Handle success here
			},
			onError: (error) => {
				setIsLoading(false)
				console.error(error);
			},
		}
	);

	const mutation = useMutation(
		(values) => forgotPassword(values),
		{
			onSuccess: (data) => {
				if(data?.success === true) {
					setLoading(300)
					setIsLoading(false)
				}else{
					setError(data?.message)
					setIsLoading(false)
				}
			},
			onError: (error) => {
				setIsLoading(false)
				console.error(error);
			},
		}
	);

	const resetPasswordMutation = useMutation(
		(values) => resetPassword(values),
		{
			onSuccess: (data) => {
				if(data?.success === true) {
					setLoading(500)
					setIsLoading(false)
				}else{
					setError(data?.message)
					setIsLoading(false)
				}
			},
			onError: (error) => {
				setIsLoading(false)
				console.error(error);
			},
		}
	);

	const sendOptMutation = useMutation(
		(values) => sendOtp(values),
		{
			onSuccess: (data) => {
				console.log(data)
				if(data?.success === true) {
					setSuccess(data?.message)
				}else{
					setError(data?.message)
				}
			},
			onError: (error) => {
				setIsLoading(false)
				console.error(error);
			},
		}
	);

	const onSubmit = async (values, actions) => {
		setError(null)
		setIsLoading(true)
        if(values.email && loading === 100) {
			mutateCheckEmail.mutate(values.email)
		}else if(values.email && values.phoneNumber && loading === 200) {
			mutation.mutate(values)
		}else if(values.email && values.phoneNumber && loading === 300) {
			const code = otp.join('');
			setSuccess(null)
			if(code.length === 4) {
				const response = await verifyOtpForgotPassword(code, values.phoneNumber)
				if(response?.success === true){
					setLoading(400)
					setIsLoading(false)
				}else{
					setIsLoading(false)
					setError(response?.message)
				}
			}else{
				setIsLoading(false)
				setError("Otp must be 4 digits")
			}
		}else if(values.email && values.phoneNumber && values.password && loading === 400){
			resetPasswordMutation.mutate(values)
		}
    }

	const handleSendOtp = async() => {
		setError(null)
		setSuccess(null)
		if(values.phoneNumber) {
			sendOptMutation.mutate(values)
		}
	}

	const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues: {
			email: "",
			phoneNumber: "",
			password: ""
		},
		validationSchema: schema,
		onSubmit,
	})

	return (
		<div className="min-h-screen text-gray-900 flex justify-center rounded-xl">
			<div className="relative top-56 max-w-screen-xl h-5/6 m-0 sm:m-10 shadow-2xl flex justify-center flex-1">
                <div className="absolute -top-8 xl:-top-12 flex justify-center">
					<div className="rounded-full w-24 h-24 bg-white shadow cursor-pointer">
					<Link to="/"><img src={logo} width="74" height="74" alt="Logo" className="mt-5 ml-3 justify-center items-center" /></Link>
					</div>
				</div>
                <div className="authentication">
                    <div className="sm:p-12 bg-gray-50 rounded-xl">
                        <div className="mt-8 flex flex-col items-center ">
                            <h4 className="font-bold xl:px-40 px-28 mt-5 relative top-7 xl:-top-3 text-xl">
                                Reset Password
                            </h4>
                            <div className="w-full flex-1 mt-1 py-8 lg:py-1">
                                <div className="mx-auto max-w-xs justify-center items-center">
									{
										loading === 500 ? (
											<>
												<div className="container">
													<p className='mb-4 text-sm'>
														Please type the verification code sent to your phone number *****
														{(values.phoneNumber).toString().slice(-4)}
													</p>

													<NavLink to="/login" className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none bg-blue-800">Login</NavLink>
												</div>
											</>
										): (
											<form className='space-y-6' onSubmit={handleSubmit}>
												{
													loading === 400 ? (
														<>
															<div className="container">
																<p className='mb-4 text-sm'>
																	Please reset your your password : {values.email}
																</p>

																<div className='flex justify-center mb-4'>
																	<input 
																		className="block w-full text-sm rounded border border-gray-400 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input mt-6" 
																		placeholder="new password" 
																		name="password"
																		onChange={handleChange}
																		onBlur={handleBlur}
																		type="password"
																		disabled={isLoading}
																	/> 
																</div>
															</div>
														</>
													) : (
														loading === 300 ? (
															<>
																<div className="container">
																	<p className='mb-4 text-sm'>
																		Please type the verification code sent to your phone number *****
																		{(values.phoneNumber).toString().slice(-4)}
																	</p>
																</div>
																<div className='flex justify-center mb-4'>
																	{otp.map((digit, index) => (
																		<input
																			key={index}
																			id={`otp-input-${index}`}
																			type='text'
																			className='w-12 h-12 mr-2 text-2xl text-center font-extrabold text-slate-900 bg-slate-100 border hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
																			maxLength='1'
																			value={digit}
																			onChange={(e) => handleOtp(e.target.value, index)}
																			disabled={isLoading}
																		/>
																	))}
																</div>
			
																<p className='mt-2 text-sm'>
																	Didn't receive OTP?{' '}
																	<button type="button" onClick={handleSendOtp} className='text-blue-500'>
																		Resend
																	</button>
																</p>
															</>
														) : (
															<>
																<input 
																className="block w-full text-sm rounded border border-gray-400 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input mt-6" 
																placeholder="Enter your email address" 
																name="email"
																onChange={handleChange}
																onBlur={handleBlur}
																type="email" 
																disabled={isLoading}
															/> 
															{
																loading === 200 && (
																	<input 
																		className="block w-full text-sm rounded border border-gray-400 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input mt-6" 
																		placeholder="Enter mobile number associated with the email" 
																		name="phoneNumber"
																		onChange={handleChange}
																		onBlur={handleBlur}
																		type="text"
																		
																	/> 
																)
															}
															</>
														)
													)
												}
												<button
													type="submit"
													disabled={isLoading}
													className={`mt-5 tracking-wide font-semibold text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${isLoading === true ? 'bg-gray-500' : 'bg-gray-900'}`}>
													{isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-1 animate-bounce"></span><span className="ml-3 animate-bounce">processing</span></>) : (<><span className="ml-3">{ loading === 300 ? 'Verify Otp' : 'Reset Password' }</span></>)}
												</button>
											</form>
										)
									}
                                </div>

								{error != null && (
									<p className='mt-4 text-sm text-center text-red-color'>
										{error}
									</p>
								)}

								{success != null && (
									<p className='mt-4 text-sm text-center text-green-700'>
										{success}
									</p>
								)}
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default ForgotPassword;
