/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, clearError } from '../../../redux/slices/authSlice';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import backgroundImage from '../../../assets/images/logback.png';
import logo from '../../../assets/images/logo.png';
import oshelter from '../../../assets/images/oshelter.png';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Yup validation schema
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email address')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(null)	

	const revealOrHidePassword = () => {
		if(showPassword === true) {
			setShowPassword(false)
		}else {
			setShowPassword(true)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// Clear error when user starts typing
	useEffect(() => {
		if (auth.error && isDirty) {
			dispatch(clearError());
		}
	}, [dispatch, isDirty]);

	const onSubmit = (data) => {
		setLoading(true);
		dispatch(login(data))
			.unwrap()
			.then(() => {
				const redirect = searchParams.get('redirect');
				setLoading(false);
				if (redirect) {
					navigate(redirect);
				} else {
					navigate('/dashboard');
				}
			})
			.catch((error) => {
				setLoading(false);
				//toast.error(error.message || 'Login failed');
			});
	};

	return (
		<div className="min-h-screen text-gray-900 flex justify-center rounded-xl">
			<div className="relative top-36 max-w-screen-xl h-5/6 m-0 sm:m-10 shadow-2xl flex justify-center flex-1">
				<div className="absolute -top-12 flex justify-center items-center">
					<div className="rounded-full w-24 h-24 bg-white shadow cursor-pointer">
						<Link to="/"><img src={logo} width="74" height="74" alt="Logo" className="mt-5 ml-3 justify-center items-center" /></Link>
					</div>
				</div>
				<div className="flex-1 text-left hidden lg:flex bg-[#283890]">
					<div className="m-12 xl:m-16 w-full font-josefin-sans"
					style={{ fontStyle: 'normal', lineHeight: '1.25rem' }}
					>
						<div className="authentication-welcome py-4 font-regular tracking-normal">
							<h2 className="text-white font-bold mt-4 text-3xl" style={{ fontSize: '35px' }}>Welcome to OShelter</h2> 
							<p className="text-xl text-white mt-8">
								We’re so glad you’re here! We appreciate your interest
								in our growing community of Real Estate professionals
								actively finding, collaborating, and connecting property
								owners to prospective home owners and tenants across
								the globe.
							</p> 
							<p className="text-xl text-white mt-8">
								Whether you’ve joined as a property owner to enlist your
								properties and manage your bookings or a visitor to find
								your next dream home, we’ve got something really good
								for you.
							</p> 
							<p className="text-xl text-white mt-8">
								You are at the right place and just a click away, explore
								our myriad options and don’t forget to speak to us
								when you need help.
							</p>
						</div>
					</div>
				</div>
				<div className="lg:w-1/2 xl:w-5/8 p-6 w-[95%] sm:p-12 bg-white rounded-xl">
					<div className="mt-8 flex flex-col items-center ">
						<h4 className="font-bold text-2xl">
							Let's Get Started
						</h4>
						<p className="text-gray-400 text-md">Log in to continue to OShelter.</p>
						<div className="w-full flex-1 mt-6">
							<div className="mx-auto max-w-xs justify-center items-center">
								<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
									<input
										{...register('email')}
										className="block p-2.5 w-full text-sm border-gray-300 bg-white rounded-md focus:border-bg-color focus:outline-none focus:shadow-outline-bg-color form-input mt-4"
										type="email" placeholder="Email" />
									{errors.email && (
										<p className='text-red-color text-sm mt-1'>
											{errors.email.message}
										</p>
									)}
									<span>
										<div className="relative text-gray-500 focus-within:text-purple-600">
											<input 
												name="password" 
												{...register('password')}
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
									<p data-v-3259d43e="" className="text-sm mt-4 text-right"><Link to="/forgot-password" className="text-[#283890]">Forget password?</Link></p>
									<button
										type="submit"
										disabled={loading}
										className="mt-5 tracking-wide font-semibold bg-bg-color text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
										{loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Please wait</span></>) : (<><span className="ml-3">Login</span></>)}
									</button>

									{!errors.email && !errors.password && auth.error && (
										<p className='mt-4 text-sm text-center text-red-color'>
											{auth.error.message || 'An error occurred'}
										</p>
									)}
								</form>

								<div className="mt-4 text-center">
									<span>or Sign-In with</span>
								</div>

								<button
									className="w-full max-w-xs shadow-sm mt-4 rounded-lg py-2 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
									<div className="bg-white p-2 rounded-full">
										<svg className="w-4" viewBox="0 0 533.5 544.3">
											<path
												d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
												fill="#4285f4" />
											<path
												d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
												fill="#34a853" />
											<path
												d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
												fill="#fbbc04" />
											<path
												d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
												fill="#ea4335" />
										</svg>
									</div>
									<span className="ml-2"> Google
									</span>
								</button>

								<p className="text-sm mt-5 text-center">Don't have an account? <Link to="/register" className="text-[#283890]">Sign Up</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
