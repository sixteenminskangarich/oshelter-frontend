/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SidebarPage from '../../layouts/SideBar';
import Verify from '../../bussiness/VerifyOtp';
import { fetchDashboardItems } from '../../../utils/dashboardQueries';
import { useQuery } from 'react-query';
import VerifyUser from '../../VerifyUserRoute';


const Dashboard = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [selectedSection, setSelectedSection] = useState('');
	const [currentStep, setCurrentStep] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [results, setResults] = useState(null)

	const response = fetchDashboardItems(token)
	response.then((result) => {
		setResults(result?.data?.original?.data)
	})

	return (
		<VerifyUser>
			<div className='flex font-josefin-sans'>
				<SidebarPage />
				{
					user.smsVerified === false ? (
						<div className='p-4 sm:ml-64 flex-1 mt-16'>
							<div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
							</div>
						</div>
					) : (
						user.accountType === "visitor" ? (
							<>
								<div className='p-4 sm:ml-64 flex-1 mt-16'>
									<div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
										<h3 className="text-2xl font-medium text-gray-900 dark:text-white">My Dashboard</h3>
										<main className="h-full overflow-y-auto overflow-x-hidden -mt-10">
											<div className="container grid px-6 mx-auto mt-2">
												<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-16">
													<div className="shadow-xl border border-1">
														<div className="flex items-center p-4  rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Number of booked request
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalBooking}
																</p>
															</div>
														</div>
													</div>
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Number of requested services
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalOrder}
																</p>
															</div>
														</div>
													</div>

													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Number of requested tour(s)
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalTourRequested}
																</p>
															</div>
														</div>
													</div>

													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Number of properties added to wishlist
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.numberOfWishList}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</main>
									</div>
								</div>
							</>
						) : user.accountType === "serviceprovider" ?
						(
							<>
								<div className='p-4 sm:ml-64 flex-1 h-screen relative top-10'>
									<div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
										<h3 className="text-2xl font-medium text-gray-900 dark:text-white">My Dashboard</h3>
										<main className="h-full overflow-y-auto overflow-x-hidden">
											<div className="container grid px-6 mx-auto mt-2">
												<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-16">
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4  rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Total Services
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalServices}
																</p>
															</div>
														</div>
													</div>
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Total Orders
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalOrder}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.totalPendingOrder}
																</p>
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Pending Orders
																</p>
															</div>
														</div>
													</div>
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-orange-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path></svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.totalOrdersInProgress}
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Orders in progress
																</p>
															</div>
														</div>
													</div> 
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-green-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.totalCompletedOrders}
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Completed Orders
																</p>
															</div>
														</div>
													</div> 
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-indigo-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.myOders}
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	My Orders
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</main>
									</div>
								</div>
							</>
						)
						:
						(
							<>
								<div className='p-4 sm:ml-64 flex-1 h-screen relative top-10'>
									<div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
										<h3 className="text-2xl font-medium text-gray-900 dark:text-white">My Dashboard</h3>
										<main className="h-full overflow-y-auto overflow-x-hidden">
											<div className="container grid px-6 mx-auto mt-2">
												<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-16">
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4  rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Total Properties
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalProperty}
																</p>
															</div>
														</div>
													</div>
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full dark:text-orange-100 dark:bg-orange-500">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-white svg-inline--fa fa-house">
																		<path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
																	Total Approved Properties
																</p> 
																<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
																	{results?.totalPropertyApproved}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-blue-600 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.propertyForSale}
																</p>
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Property For Sale
																</p>
															</div>
														</div>
													</div>
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-orange-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path></svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.propertyForRent}
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Property For Rent
																</p>
															</div>
														</div>
													</div> 
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-green-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div>
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	4
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Property For Auction
																</p>
															</div>
														</div>
													</div> 
													<div className="shadow-xl border border-1 rounded-xl">
														<div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
															<div className="p-3 mr-4 text-orange-500 bg-indigo-800 rounded-full">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 text-white svg-inline--fa fa-building">
																		<path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className="shadow-xl border border-1"></path>
																	</svg>
																</span>
															</div> 
															<div>
																<p className="text-lg font-semibold text-gray-700">
																	{results?.propertyForShortStay}
																</p> 
																<p className="mb-2 text-sm font-medium text-gray-600">
																	Property For Short Stay
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</main>
									</div>
								</div>
							</>
						)
					)
				}
			</div>
		</VerifyUser>
	);
};

export default Dashboard;
