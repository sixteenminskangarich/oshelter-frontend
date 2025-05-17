/* eslint-disable react/prop-types */
import { TbWorld } from 'react-icons/tb';
import {
	FaHome,
	FaUser,
	FaBusinessTime,
	FaChevronDown,
	FaChevronUp,
	FaShoppingCart,
	FaMoneyBillWaveAlt,
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowRightCircle } from "react-icons/fi";
import { yearsToQuarters } from 'date-fns';
import { IoAnalyticsSharp } from "react-icons/io5";
import { AiFillEye } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import { FaAccusoft } from "react-icons/fa";
import { FcAdvertising } from "react-icons/fc";

const Sidebar = ({ onSelectSection, screenWidth }) => {
	const user = useSelector((state) => state.auth.user);
	const w = window.innerWidth
	const h = window.innerHeight / 2
	const ref = useRef(null);
	const [isBusinessOpen, setIsBusinessOpen] = useState(false);
	const [isServiceOpen, setIsServiceOpen] = useState(false);
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const [isOrdersOpen, setIsOrdersOpen] = useState(false);
	const [isAgentOpen, setIsAgentOpen] = useState(false);
	const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
	const [isPropertyOpen, setIsPropertyOpen] = useState(false);
	const [isBookingsOpen, setIsBookingsOpen] = useState(false);
	const [isMySpace, setIsMySpace] = useState(false);
	const [hidden, setHidden] = useState(false)

	const [isSideBarOpen, setisSideBarOpen] = useState(false);
	if (w <= 789 || w <= 810) {
		// console.log("Hello World")
	}

	const toggleBusinessDropdown = () => {
		setIsBusinessOpen(!isBusinessOpen);
	};

	const toggleServiceDropdown = () => {
		setIsServiceOpen(!isServiceOpen);
	};

	const toggleAccountDropdown = () => {
		setIsAccountOpen(!isAccountOpen);
	};

	const toggleOrdersDropdown = () => {
		setIsOrdersOpen(!isOrdersOpen);
	};

	const toggleAgentDropdown = () => {
		setIsAgentOpen(!isAgentOpen);
	};

	const togglePropertyDropdown = () => {
		setIsPropertyOpen(!isPropertyOpen);
	};

	const toggleBookingsDropdown = () => {
		setIsBookingsOpen(!isBookingsOpen);
	};

	const togglePaymentsDropdown = () => {
		setIsPaymentsOpen(!isPaymentsOpen);
	};

	const toggleMySpaceDropdown = () => {
		setIsMySpace(!isMySpace);
	};

	const handleSideBar = () => {
		hidden === true ? setHidden(false) : setHidden(true)
	}

	useEffect(() => {
		const handleOutSideClick = (event) => {
			if (!ref.current?.contains(event.target)) {
				setHidden(false)
			}
		};

		window.addEventListener("mousedown", handleOutSideClick);
		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
			window.scrollTo(0, 0);
		};
	}, [ref]);

	return (
		<>
			<button type="button" onClick={handleSideBar} className={`z-50 animate-bounce fixed top-[340px] ${hidden === true ? 'hidden' : 'flex'} shadow-md -left-1 xl:hidden lg:hidden inline-flex items-center p-2 mt-2 text-sm text-bg-color bg-bg-color rounded-lg`}>
				<span className="sr-only">Open sidebar</span>
				<FiArrowRightCircle className="font-bold text-white" size="30" />
			</button>

			<aside ref={ref} className={`fixed z-30 h-full ${hidden === true ? 'flex' : 'hidden'} flex-shrink-0 w-64 overflow-scroll bg-oshelter-blue md:block bg-[#283890] scrollbar`} style={{ marginTop: '-80px' }}>
				<div className="h-full px-3 py-4 overflow-y-auto">
					<ul className="space-y-2 font-medium" style={{ marginTop: '90px', marginBottom: '70px' }}>
						<li className="relative px-6 py-3" >
							<Link
								to='/dashboard'
								className='flex items-center md:flex-row md:items-center p-2'
							>
								<svg className="w-4 h-4 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
								</svg>
								<span className="ms-3 text-white flex-1">Dashboard</span>
							</Link>
						</li>
						{
							user.accountType === "owner" && (
								<li className="relative px-6 py-1">
									<button type="button" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg group text-sm"
										onClick={toggleAgentDropdown}>
										<svg data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-users w-4 h-4"><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" className=""></path></svg>
										<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Agents/Caretakers</span>
										<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
										</svg>
									</button>
									{isAgentOpen && (
										<ul className="py-1 space-y-2">
											<li>
												<Link
													to='/dashboard/agent'
													className='flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm'>
													View All
												</Link>
											</li>
											<li>
												<Link
													to='/dashboard/agent/add'
													className='flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm'>
													<span className='hidden md:inline ml-2'>add new</span>
												</Link>
											</li>
										</ul>
									)}

								</li>
							)
						}

						<li className="relative px-6 py-1">
							<button onClick={toggleAccountDropdown} type="button" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg group text-sm">
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="id-badge" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-id-badge w-4 h-4"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm96 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" className=""></path></svg>
								<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Accounts</span>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
								</svg>
							</button>
							{isAccountOpen && (
								<ul className="py-2 space-y-2">
									<li>
										<Link to='/dashboard/profile' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Update Profile</Link>
									</li>
									<li>
										<Link to='/dashboard/change-password' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Change Password</Link>
									</li>
									<li>
										<Link to="/dashboard/id-card" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Approved ID Card</Link>
									</li>
									{
										user.accountType === "serviceprovider" || user.accountType === "owner" && (
											<>
												<li>
													<Link to="/dashboard/bank" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Bank</Link>
												</li>
											</>
										)
									}
									<li>
										<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Account Logs</a>
									</li>
								</ul>
							)}
						</li>

						{
							user.accountType === "serviceprovider" && (
								<>
									<li className="relative px-6 py-1">
										<button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group text-sm" onClick={toggleBusinessDropdown}>
											<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-building w-4 h-4"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className=""></path></svg>
											<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Business</span>
											<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
												<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
											</svg>
										</button>
										{isBusinessOpen && (
											<ul className="py-2 space-y-2">
												<>
													<li>
														<Link to='/dashboard/business/' className="flex items-center p-1 w-full text-white transition duration-75 rounded-lg pl-11 group text-sm">Manage</Link>
													</li>
													<li>
														<Link to='/dashboard/business/orders' className="flex items-center p-1 w-full text-white transition duration-75 rounded-lg pl-11 group text-sm">Orders</Link>
													</li>
													<li>
														<Link to='/dashboard/business/earnings' className="flex items-center p-1 w-full text-white transition duration-75 rounded-lg pl-11 group text-sm">Earnings</Link>
													</li>
												</>
											</ul>
										)}
									</li>

									<li className="relative px-6 py-1">
										<button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group text-sm" onClick={toggleServiceDropdown}>
											<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-building w-4 h-4"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className=""></path></svg>
											<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Services</span>
											<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
												<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
											</svg>
										</button>
										{isServiceOpen && (
											<ul className="py-2 space-y-2">
												<>
													<li>
														<Link to='/dashboard/services/add' className="flex items-center w-full text-white transition duration-75 rounded-lg pl-11 group text-sm">Add Service</Link>
													</li>
													<li>
														<Link to='/dashboard/services' className="flex items-center w-full text-white transition duration-75 rounded-lg pl-11 group text-sm">Listings</Link>
													</li>
												</>
											</ul>
										)}
									</li>
								</>
							)
						}
						{
							user.accountType === "owner" && (
								<li className="relative px-6 py-1">
									<button type="button" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg group text-sm" onClick={togglePropertyDropdown}>
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-building w-4 h-4"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className=""></path></svg>
										<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Properties</span>
										<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
										</svg>
									</button>
									{isPropertyOpen && (
										<ul className="py-2 space-y-2">
											{/* {
										user.accountType === "owner" && ( */}
											<>
												<li>
													<Link to='/dashboard/properties/add' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Add Listing</Link>
												</li>
												<li>
													<Link to='/dashboard/properties' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">All properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/pending' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Pending properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/approved' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Approved properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/unapproved' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Unapproved properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/rejected' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Rejected properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/sold' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Sold properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/rented' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Rented properties</Link>
												</li>
												<li>
													<Link to='/dashboard/properties/auctioned' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Auctioned properties</Link>
												</li>
											</>
											<li>
												<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">My Spaces</a>
											</li>
										</ul>
									)}
								</li>
							)
						}

						<li className="relative px-6 py-1">
							<Link to='/dashboard/properties/tour' className="flex items-center p-2 text-white rounded-lg dark:text-white group">
								<AiFillEye />
								<span className="flex-1 ms-3 whitespace-nowrap text-sm">{ user.accountType === "visitor" ? 'My ' : '' } Tour Requests</span>
							</Link>
						</li>

						<li className="relative px-6 py-1">
							<button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group" onClick={toggleBookingsDropdown}>
								<BsCalendar2Check />
								<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Bookings</span>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
								</svg>
							</button>
							{isBookingsOpen && (
								<ul className="py-2 space-y-2">
									{
										user.accountType === "owner" ? (
											<>
												<li>
													<Link to='/dashboard/bookings' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Booking Requests</Link>
												</li>
												<li>
													<Link to='/dashboard/bookings/approved' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Approved Bookings</Link>
												</li>
												<li>
													<Link to='/dashboard/bookings/rejected' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Rejected Bookings</Link>
												</li>
											</>
										) : (
											<>
												<li>
													<Link to='/dashboard/myspaces' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Pending Bookings</Link>
												</li>
												<li>
													<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Approved Bookings</a>
												</li>
												<li>
													<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Rejected Bookings</a>
												</li>
											</>
										)
									}
								</ul>
							)}
						</li>

						{
							user.accountType === "owner" && (
								<li className="relative px-6 py-1">
									<button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group" onClick={toggleMySpaceDropdown}>
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-building w-4 h-4"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" className=""></path></svg>
										<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">My Spaces</span>
										<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
										</svg>
									</button>
									{isMySpace && (
										<ul className="py-2 space-y-2">
											{
												<>
													<li>
														<Link to='/dashboard/myspaces' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Pending Bookings</Link>
													</li>
													<li>
														<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Approved Bookings</a>
													</li>
													<li>
														<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Rejected Bookings</a>
													</li>
												</>
											}
										</ul>
									)}
								</li>
							)
						}

						{
							(user.accountType === "owner" || user.accountType === "visitor" || user.accountType === "serviceprovider") && (
								<li className="relative px-6 py-1">
									<button type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group" onClick={toggleOrdersDropdown}>
										<FaAccusoft />
										<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Orders</span>
										<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
										</svg>
									</button>
									{isOrdersOpen && (
										<ul className="py-2 space-y-2">
											<li>
												<Link to='/dashboard/orders' className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Requested Orders</Link>
											</li>
											<li>
												<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Active Orders</a>
											</li>
											<li>
												<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Completed Orders</a>
											</li>
										</ul>
									)}
								</li>
							)
						}



						<li className="relative px-6 py-1">
							<button type="button" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg group text-sm" onClick={togglePaymentsDropdown}>
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="credit-card" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-credit-card h-4 w-4"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" className=""></path></svg>
								<span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white">Payments</span>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 4 4 4-4" />
								</svg>
							</button>
							{isPaymentsOpen && (
								<ul className="py-2 space-y-2">
									<li>
										<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Your Payments</a>
									</li>
									<li>
										<a href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group text-sm">Pending Cash Payments</a>
									</li>
								</ul>
							)}
						</li>

						<li className="relative px-6 py-1">
							<Link to="/dashboard/wishlists" className="flex items-center p-2 text-white rounded-lg dark:text-white group">
								<svg data-v-50608ccc="" data-v-5db5ce26="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-heart w-4 h-4"><path data-v-50608ccc="" fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" className=""></path></svg>
								<span className="flex-1 ms-3 whitespace-nowrap text-sm">Wishlists</span>
							</Link>
						</li>

						<li className="relative px-6 py-1">
							<a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white group">
								<FcAdvertising />
								<span className="flex-1 ms-3 whitespace-nowrap text-sm">Advertie with us</span>
							</a>
						</li>

						<li className="relative px-6 py-1">
							<a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white group">
								<IoAnalyticsSharp />
								<span className="flex-1 ms-3 whitespace-nowrap text-sm">Analytics</span>
							</a>
						</li>

						<li className="relative px-6 py-1">
							<a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white group">
								<svg data-v-50608ccc="" data-v-5db5ce26="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headset" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-headset w-4 h-4"><path data-v-50608ccc="" fill="currentColor" d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z" className=""></path></svg>
								<span className="flex-1 ms-3 whitespace-nowrap text-sm">Support</span>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;