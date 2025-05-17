/* eslint-disable no-unused-vars */
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/images/logo.png';
import { FaUserTie, FaHammer, FaUser } from 'react-icons/fa'; // Import icons
import {register as registerUser,login as loginUser, setCurrentUser,} from '../../../redux/slices/authSlice';
import backgroundImage from '../../../assets/images/logback.png';
import signup from '../../../assets/images/signup.png';
import serviceprovider from '../../../assets/images/serviceprovider.png';
import owner from '../../../assets/images/realestate.png';
import Spinner from '../../Spinner';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useFormik, useField } from "formik";
import { RegisterScheme } from '../../../lib/scheme';
import countries from './json/listofcountries.json'
import { htmlConverterReact } from 'html-converter-react';
import { FiEye, FiEyeOff  } from "react-icons/fi"
import { ImSpinner9 } from 'react-icons/im';
import LoadingBar from "react-top-loading-bar";

// Validation Schema using Yup

const RegisterForm = () => {
	const navigate = useNavigate();
	const [accountType, setAccountType] = useState('serviceprovider');
	const [countryCode, setCountryCode] = useState('+233');
	const [loading, setLoading] = useState(false); // Add loading state
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(null)
	const [progress, setProgress] = useState(0);

	let image = "";
	let h1 = "";
	let p = "";
	
	const mutation = useMutation(
		(registerData) => registerUser(registerData),
		{
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

	const revealOrHidePassword = () => {
		if(showPassword === true) {
			setShowPassword(false)
		}else {
			setShowPassword(true)
		}
	}

	const onSubmit = async (values) => {
		try {
			setLoading(true)
			setProgress(100)
			const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/register`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const res = await response.json()
			console.log(res)
            if(res.success === true) {
                dispatch(setCurrentUser(res))
				toast.success('Account created and logged in successfully');
				navigate('/dashboard');
				setLoading(false)
            }else {
				setLoading(false)
				toast.error(res.message)
			}
		} catch (error) {
			console.log(error)
		}
    }

	const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues: {
			accountType: "",
			name: "",
			email: "",
			gender: "",
			country: "Ghana",
			selectedCountry: "",
			password: "",
			phone: "",
			countryCode: "233",
			termsAndConditions: true,
			sendNewsLetter: false, 
		},
		validationSchema: RegisterScheme,
		onSubmit,
	})

	const options = countries.map((country) => ({
		value: country.name,
		label: country.flag +' '+ country.name,
		code: country.code
	}));

	const handleSelect = value => {
        setFieldValue("selectedCountry", value)
		setFieldValue("countryCode", value.code)
		setFieldValue("country", value.value)
    };

	if(values.accountType === "serviceprovider") {
		image = serviceprovider
		h1 = `Earn good cash <br /> providing your services`
		p = `Connecting skilled hands with those in need. <br className="mb-2" /> Artisan services made simple`
	}else if(values.accountType === "owner") {
		image = owner
		h1 = `Sell or rent out your <br /> properties faster`
		p = `Access tools and services to manage your properties <br /> with just a click.`
	}else {
		image = signup
		h1 = `Join OShelter Today`
		p = `Explore properties and services <br /> with ease.`
	} 


	return (
		<div className="min-h-screen h-full text-gray-900 flex justify-center" style={{ fontFamily: '"josephin-sans"' }}>
			<div className="relative top-16 max-w-screen-xl h-5/6 m-0 sm:m-10 shadow-2xl flex justify-center flex-1 mb-5">
				<div className="absolute -top-12 flex justify-center items-center">
					<div className="rounded-full w-24 h-24 z-20 bg-white shadow cursor-pointer">
						<Link to="/">
							<img src={logo} width="74" height="74" alt="Logo" className="mt-5 ml-3 justify-center items-center z-30" />
						</Link>
					</div>
				</div>
				<div className="flex-1 text-left hidden lg:flex bg-cover rounded-md" style={{backgroundImage: `url(${image})`}}>
					<div className="m-12 xl:m-16 w-full font-josefin-sans"
					style={{ fontStyle: 'normal', lineHeight: '1.25rem' }}
					>
						<div className="absolute flex w-[50%] h-[100%] z-10 rounded-md inset-0 bg-opacity-40 bg-black space-y-2">
							<div className="container">
								<div className="flex ml-10">
									<div className="absolute bottom-[60px] font-josefin-sans">
										<h1 className="mb-8 text-white tracking-wide font-bold" style={{ fontSize: '40px', lineHeight: '40px', fontWeight: '700px' }}>
											{ htmlConverterReact(h1) }
										</h1>

										<p className="text-white tracking-wide" style={{ fontSize: '24px', lineHeight: '24px', fontWeight: '400px' }}>
											{ htmlConverterReact(p) }
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="lg:w-1/2 xl:w-5/8 h-full p-6 lg:m-0 xl:m-0 m-4 bg-gray-100 rounded-md items-center font-josefin-sans font-thin">
					<LoadingBar
						color="white"
						progress={progress}
						onLoaderFinished={() => setProgress(0)}
					/>
					<div className="authentication-form-content mt-7">
						<h4 className="font-bold text-2xl text-center">
							Let's Get Started
						</h4>
						<p className="text-gray-400 text-md text-center">Fill in the forms below to join OShelter.</p>
						<div className="mt-4">
							<span>
								<form onSubmit={handleSubmit}>
									<span>
										<select name="accountType" onChange={handleChange} onBlur={handleBlur} className="block w-full mb-5 text-sm border-gray-300 bg-white rounded-md form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple mt-4 placeholder:text-gray-800">
											<option value="">Select Account Type</option>  
											<option value="visitor">Visitor </option>
											<option value="serviceprovider">Service Provider </option>
											<option value="owner">Property Owner | Agent </option>
										</select> 
									</span> 

									<span>
										<input 
											className="block w-full text-sm border-gray-300 bg-white rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
											name="name" 
											onChange={handleChange} 
											onBlur={handleBlur} 
											disabled={loading}
											placeholder="Full name" 
											type="text" 
										/> 
										<p className='text-red-color text-xs md:text-sm'>
											{errors.name}
										</p>
									</span>
									<span>
										<select 
											name="gender" 
											onChange={handleChange} 
											disabled={loading}
											className="block w-full text-sm border-gray-300 bg-white rounded-md form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple mt-4"
										>
											<option value="">--Select--</option>  
											<option value="male">Male </option>
											<option value="female">Female </option>
										</select> 

										<p className='text-red-color text-xs md:text-sm'>
											{errors.gender}
										</p>
									</span> 
									
									 
									<span>
										<input name="email" onChange={handleChange} onBlur={handleBlur} className="block w-full text-sm border-gray-300 bg-white rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input mt-4" placeholder="Email" type="email" /> 
										<p className='text-red-color text-xs md:text-sm'>
											{errors.email}
										</p>
									</span> 

									<div className="flex mt-4">
										<Select
											value={values.selectedCountry}
											name="selectedCountry"
											options={options}
											isSearchable={true}
											onChange={handleSelect}
											disabled={loading}
											placeholder="Select Nationality"
											className="w-full"
										/>

										<p className='text-red-color text-xs md:text-sm'>
											{errors.country}
										</p>
									</div>

									<div className="flex mt-4">
										<p className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
											+{values.countryCode}
										</p>
										<div className="relative w-full">
											<input 
												type="text" 
												name="phone" 
												onChange={handleChange} 
												onBlur={handleBlur} 
												disabled={loading}
												className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Mobile number"  />
											
										</div>
									</div>

									<span>
										<div className="relative text-gray-500 focus-within:text-purple-600">
											<input 
												name="password" 
												onChange={handleChange} 
												onBlur={handleBlur} 
												disabled={loading}
												className="block p-2.5 w-full text-sm border-gray-300 bg-white rounded-md focus:border-bg-color focus:outline-none focus:shadow-outline-bg-color form-input mt-4" 
												placeholder="Enter password"
												type={showPassword === true ? "text" : "password"}
											/>
											<div className="absolute inset-y-0 right-0 flex items-center mr-3 cursor-pointer">
												<span>
													{
														showPassword === true ? <FiEye onClick={revealOrHidePassword} /> : <FiEyeOff onClick={revealOrHidePassword} />
													}
												</span>
											</div>
										</div> 
									</span> 
									<div className="text-left mt-4">
										<input type="checkbox" className="text-bg-color mr-2 h-5 w-5 bg-white rounded-md form-checkbox focus:border-purple-400 focus:outline-none border-gray-300" value="" checked="checked" /> 
										<span className="text-xs xl:text-sm lg:text-sm">By checking this, you have agreed to the 
											<span className="text-oshelter-blue"> terms</span> and 
											<span className="text-oshelter-blue"> conditions</span> of this platform.
										</span>
									</div> 
									<div className="text-left mt-3">
										<input type="checkbox"className="text-bg-color mr-2 h-5 w-5 bg-white rounded-md form-checkbox focus:border-purple-400 focus:outline-none border-gray-300"  />
										<span className="text-xs xl:text-sm lg:text-sm">Sign-Up for Newsletters from OShelter.</span>
									</div> 
									<button
										type="submit"
										disabled={loading}
										className="mt-5 tracking-wide font-semibold bg-bg-color text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
										{loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Processing</span></>) : (<><span className="ml-3">Sign up</span></>)}
									</button>

									<p className="text-sm mt-5 mb-10">Already have an account? &nbsp;
										<Link to="/login" className="text-blue-800 mb-5">Sign In</Link>
									</p>
								</form>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
