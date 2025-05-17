/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import backgroundImage from '../../../../assets/images/logback.png';
import logo from '../../../../assets/images/logo.png';
import { useEffect, useState } from 'react';
import Spinner from '../../../Spinner';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';
import { useFormik, useField } from "formik";
import FirstStage from '../../../cards/onboarding/firstStage';
import SecondStageDeveloper from '../../../cards/onboarding/Developer/secondStage';
import ThirdStageDeveloper from '../../../cards/onboarding/Developer/thirdStage';
import FourthStageDeveloper from '../../../cards/onboarding/Developer/fourthStage';
import SecondStageAgency from '../../../cards/onboarding/Agency/secondStage';
import ThirdStageAgency from '../../../cards/onboarding/Agency/thirdStage';
import SecondStageOwner from '../../../cards/onboarding/Owner/secondStage';
import ThirdStageOwner from '../../../cards/onboarding/Owner/thirdStage';
import SecondStageAgent from '../../../cards/onboarding/Agent/secondStage';
import ThirdStageAgent from '../../../cards/onboarding/Agent/thirdStage';
import FourthStageAgent from '../../../cards/onboarding/Agent/fourthStage';
import { PropertyAgencyLogo, PropertyAgencyScheme, PropertyAgentDirectorScheme, PropertyAgentScheme, PropertyDeveloperDirector, PropertyDeveloperPhotoScheme, PropertyDeveloperScheme, PropertyOwnerScheme, PropertyTypeScheme } from '../../../../lib/scheme';
import { TbBuildingEstate } from "react-icons/tb";
import { fetchOnboarding, updateOwnerType } from '../../../../utils/onboardingQueries';
import { useQuery } from 'react-query';
import ManageBusiness from '../../../cards/onboarding/services/firstStage';
import { switchAccount } from '../../../../utils/accountQueries';

// Yup validation schema
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email address')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

const Onboarding = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.auth.token);
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [step , setStep] = useState(0);
	
	const {data: results,isLoading,status,} = useQuery({queryKey: ['onboarding', { token }],queryFn: () => fetchOnboarding(token),refetchInterval: 1000});

	const result = results?.data

	const onSubmit = async (values) => {
		setLoading(true)
		try {
			const response = await updateOwnerType(values, token);
			if(response?.success === true) {
				setLoading(false)
				navigate('/dashboard');
			}else {
				setLoading(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const cancelOnboarding = async(state) => {
		Swal.fire({
			title: "Are you sure you want to cancel?",
			text: "Canceling will reset your progress, and your membership status will remain as a guest.!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#283890",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, cancel",
			cancelButtonText: "Close"
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const formData = new FormData();
					formData.append("accountType", state);
					const response = switchAccount(formData, token);
					Swal.fire({
						title: "Action cancelled!",
						text: ".",
						icon: "success"
					});
					navigate('/');
				} catch (error) {
					console.log(error)
				}
			}
		});	
	}

	const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues: {
			type: '',
			name: '',
			registration: '',
			mobile: '',
			address: '',
			yearsOfExperience: '',
			development: '',
			photo: '',
			website: '',
			instagram: '',
			facebook: '',
			tiktok: '',
			linkedin: '',
			directorName: '',
			directorMobile: '',
			directorRole: '',
			directorEmail: '',
			directorAddress: '',
			secondDirectorName: '',
			secondDirectorMobile: '',
			secondDirectorRole: '',
			secondDirectorEmail: '',
			secondDirectorAddress: '',
			license: ''
		},
		validationSchema: 
			(result?.onboardingStep === 1 && result?.ownerType === 100) ? PropertyDeveloperScheme : (result?.onboardingStep === 2 && result?.ownerType === 100) ? PropertyDeveloperPhotoScheme : (result?.onboardingStep === 3 && result?.ownerType === 100) ? PropertyDeveloperDirector : 
			(result?.onboardingStep === 1 && result?.ownerType === 200) ? PropertyAgencyScheme : (result?.onboardingStep === 2 && result?.ownerType === 200) ? PropertyAgencyLogo : (result?.onboardingStep === 3 && result?.ownerType === 200) ? PropertyDeveloperDirector :
			(result?.onboardingStep === 1 && result?.ownerType === 300) ? PropertyOwnerScheme : (result?.onboardingStep === 2 && result?.ownerType === 300) ? PropertyAgencyLogo : (result?.onboardingStep === 3 && result?.ownerType === 300) ? PropertyDeveloperDirector :
			(result?.onboardingStep === 1 && result?.ownerType === 400) ? PropertyAgentScheme : (result?.onboardingStep === 2 && result?.ownerType === 400) ? PropertyAgencyLogo : (result?.onboardingStep === 3 && result?.ownerType === 400) ? PropertyAgentDirectorScheme :
			null,
		enableReinitialize: true,
		onSubmit
	})

	return (
		<div className="min-h-screen text-gray-900 flex justify-center rounded-xl">
			<div className="relative top-14 max-w-screen-xl h-5/6 m-0 sm:m-10 shadow-2xl flex justify-center flex-1">
				<div className="absolute -top-12 flex justify-center items-center">
					<div className="rounded-full w-24 h-24 bg-white shadow cursor-pointer">
						<Link to="/"><img src={logo} width="74" height="74" alt="Logo" className="mt-5 ml-3 justify-center items-center" /></Link>
					</div>
				</div>
				<div className="flex-1 text-left hidden lg:flex bg-[#283890] font-josefin-sans tracking-wide">
					<div className="m-12 xl:m-16 w-full"
					style={{ fontStyle: 'normal', lineHeight: '1.25rem' }}
					>
						<div className="authentication-welcome py-4 font-regular tracking-normal">
							<h2 className="text-white font-bold mt-4 text-3xl" style={{ fontSize: '35px' }}>Welcome to OShelter!</h2> 
							<p className="text-white text-lg ">
								<br /><br />
								We’re thrilled to have you on board! OShelter is here to simplify property management and connect you with the right buyers, tenants, and investors—all in one seamless platform.
								<br /><br />
								<h4 className="text-3xl">Here’s how to get started:</h4>
								<br />
								<p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;Set Up Your Profile – Showcase your properties and brand effortlessly.</p>
								<p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;List Your Properties – Upload, manage, and market your real estate with ease.</p>
								<p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;Connect & Grow – Engage with potential clients and expand your business.</p>
								<br />

								Need help? Our support team is ready to assist you. Let’s build something amazing together!

								Start Exploring Now
							</p>
						</div>
					</div>
				</div>
				<div className="lg:w-1/2 xl:w-5/8 w-[95%] p-6 sm:p-12 bg-white rounded-xl">
					<div className="mt-8 flex flex-col ">
						<div className="flex w-full flex-col rounded-2xl bg-white px-2 sm:px-14"> 
							<div className="mx-auto w-full max-w-md pb-20 px-8 sm:px-0"> 
								<div className="relative">
									{
										result?.accountType === "owner" && (
											<>
												<div className={`absolute h-full bg-bg-color ${result?.onboardingStep === 1 ? 'w-1/3' : result?.onboardingStep === 2 ? 'w-2/3' : result?.onboardingStep === 3 ? 'w-full' : ''}`}></div>
												<ul className="relative flex w-full justify-between">
													<li className="text-left">
														<a className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-color text-xs font-semibold text-white ring ring-bg-color ring-offset-2" href="#">1</a>
													</li>
													<li className="text-left">
														<a className={`flex h-5 w-5 items-center justify-center rounded-full  ${result?.onboardingStep > 0 ? 'bg-bg-color ring ring-bg-color ring-offset-2' : 'bg-gray-300'} text-xs font-semibold text-white`} href="#">2</a>
													</li>
													<li className="text-left">
														<a className={`flex h-5 w-5 items-center justify-center rounded-full ${result?.onboardingStep > 1 ? 'bg-bg-color ring ring-bg-color ring-offset-2' : 'bg-gray-300'} text-xs font-semibold text-white`} href="#">3</a>
													</li>
													<li className="text-left">
														<a className={`flex h-5 w-5 items-center justify-center rounded-full ${result?.onboardingStep > 2 ? 'bg-bg-color ring ring-bg-color ring-offset-2' : 'bg-gray-300'} text-xs font-semibold text-white`} href="#">4</a>
													</li>
												</ul>
											</>
										)
									}
								</div>
							</div>
							<div className="row">
								{
									result?.accountType === "serviceprovider" ? (
										<>
											<ManageBusiness token={token} result={result}/>
										</>
									) : (
										
										<>
											<form onSubmit={handleSubmit}>
												{
													(result?.ownerType === 0 && result?.onboardingStep === 0) && <FirstStage values={values} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors}/>
												}
												{
													(result?.onboardingStep === 1 && result?.ownerType === 100) && <SecondStageDeveloper values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors} />
												}
												{
													(result?.onboardingStep === 2 && result?.ownerType === 100) && <ThirdStageDeveloper values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors} setFieldValue={setFieldValue}/>
												}
												{
													(result?.onboardingStep === 3 && result?.ownerType === 100) && <FourthStageDeveloper values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
			
												{
													(result?.onboardingStep === 1 && result?.ownerType === 200) && <SecondStageAgency values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
												{
													(result?.onboardingStep === 2 && result?.ownerType === 200) && <ThirdStageAgency values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors} setFieldValue={setFieldValue}/>
												}
												{
													(result?.onboardingStep === 3 && result?.ownerType === 200) && <FourthStageDeveloper values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
			
												{
													(result?.onboardingStep === 1 && result?.ownerType === 300) && <SecondStageOwner values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
												{
													(result?.onboardingStep === 2 && result?.ownerType === 300) && <ThirdStageOwner values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors} setFieldValue={setFieldValue}/>
												}
			
												{
													(result?.onboardingStep === 1 && result?.ownerType === 400) && <SecondStageAgent values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
			
												{
													(result?.onboardingStep === 2 && result?.ownerType === 400) && <ThirdStageAgent values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors} setFieldValue={setFieldValue}/>
												}
			
												{
													(result?.onboardingStep === 3 && result?.ownerType === 400) && <FourthStageAgent values={values} handleChange={handleChange} handleBlur={handleBlur } errors={errors}/>
												}
			
												<div className="flex justify-end items-end">
													<button
														type="button"
														disabled={isCancelled}
														onClick={() => cancelOnboarding('visitor')}
														className="my-2 -mt-9 flex items-center justify-center rounded-xl bg-red-700 px-6 py-2 font-medium text-white">
														{isCancelled === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Please wait</span></>) : (<><span className="ml-3">Cancel</span></>)}
													</button>
													&nbsp;
													<button
														type="submit"
														disabled={loading}
														className="my-2 -mt-9 flex items-center justify-center rounded-xl bg-bg-color px-6 py-2 font-medium text-white">
														{loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Please wait</span></>) : (<><span className="ml-3">Continue</span></>)}
													</button>
												</div>
											</form>
										</>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
