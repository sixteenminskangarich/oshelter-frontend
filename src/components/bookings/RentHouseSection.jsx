/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { bookShortStay, saveBookTour } from '../../utils/request';
import { useSelector } from 'react-redux';
import { useFormik, useField } from "formik";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RentScheme } from '../../lib/scheme';
import { Modal } from "flowbite-react";
import { ImSpinner9 } from 'react-icons/im';
import showCustomAlert from '../cards/Alert';

const RentHouseSection = ({ id, property }) => {
	const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('xl');
	const [open, setOpen] = useState(false)
	const [alert, setAlert] = useState(false)
	const [tour, setTour] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	console.log(user)

	// Local state for showing either contact details or message form
	const [showContact, setShowContact] = useState(false);
	const [showMessageForm, setShowMessageForm] = useState(false);

	// Mutation to save the booking data
	const mutation = useMutation(
		(bookingData) => bookShortStay(bookingData, token, id),
		{
			onSuccess: (data) => {
				if(data.success === true) {
					setAlert(true)
					setOpen(false)
					showCustomAlert({
                        title: 'Booking Successful',
                        message: ` Your service booking was successful! We’ve sent your request to the service provider,and you’ll be notified as 
                        soon as they accept it. <br /><br />
                        Thank you for using OShelter — we’ll keep you updated`,
                        confirmText: 'Yes, Confirm',
                        onConfirm: () => {
                            toast.success('Service booked successfully');
                            navigate('/dashboard/myspaces');
                        },
                    });
					navigate(`/dashboard/myspaces`);
				}else {
					toast.error(data.message);
				}
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

	const mutateBookTour = useMutation(
		(bookingData) => saveBookTour(bookingData, token, id),
		{
			onSuccess: (data) => {
				if(data.success === true) {
                    toast.success('Booking Successful');
					setTour(false)
					navigate(`/dashboard/properties/tour`);
                }else {
					console.log("")
				}
				// Handle success here
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = () => {
        if (user && token) {
           setOpen(true)
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

	const handleSubmitRent = async() => {
		setIsLoading(true)
		if (user && token) {
			const response = await bookShortStay(values, token, id)
			if(response.success === true) {
				setAlert(true)
				setOpen(false)
			}else {
				setIsLoading(false)
				setOpen(false)
				toast.error('You have already booked this property');
			}
		} else {
			// User is not logged in, append the current page URL to the login route
			const currentUrl = window.location.pathname + window.location.search;
			navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
		}
	}

	const BookTourSubmit = (e) => {
		setTour(true)
		e.preventDefault();
        if (user && token) {
            mutateBookTour.mutate(bookTour.values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            duration: "",
            numberOfAdult: 0,
            numberOfChildren: 0
        },
        validationSchema: RentScheme,
        onSubmit,
    })

	const bookTour = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
			message: ""
        }
    })

	// Function to handle the "Call Owner" button click
	const handleCallOwner = () => {
		setShowContact(true);
		setShowMessageForm(false); // Hide message form if it's open
	};

	// Function to handle the "Message Owner" button click
	const handleMessageOwner = () => {
		setShowMessageForm(true);
		setShowContact(false); // Hide contact info if it's open
	};

	// Function to handle message form submission
	const handleSubmitMessage = (event) => {
		event.preventDefault();
		toast.success('Message Sent!');
		setShowMessageForm(false); // Close the form after submission
	};

	const subNumberOfAdult = () => {
        if(values.numberOfAdult >= 1) {
            setFieldValue("numberOfAdult", (parseInt(values.numberOfAdult) - 1))
        }
	}

    const addNumberOfAdult = () => {
        setFieldValue("numberOfAdult", (parseInt(values.numberOfAdult) + 1))
	}

    const subNumberOfChildren = () => {
        if(values.numberOfChildren >= 1) {
            setFieldValue("numberOfChildren", (parseInt(values.numberOfChildren) - 1))
        }
	}

	const addNumberOfChildren = () => {
        setFieldValue("numberOfChildren", (parseInt(values.numberOfChildren) + 1))
	}

	const totalAmount = values.duration * property?.amount;

	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div className='space-y-4 bg-sigin-color roboto-font josefin-sans'>
					<div className='flex'>
						<div className="flex-1">
							<label
								htmlFor='stayDuration'
								className='block text-sm font-medium text-gray-700 mb-2'>
								How long will you stay?
							</label>
							<select id="countries" name="duration" value={values.duration} onChange={handleChange} onBlur={handleBlur} style={{ width:'100%', height: '45px' }} className="border border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400">
								<option value=''>Select duration</option>
								<option value='6'>6 months</option>
								<option value='12'>1 year</option>
								<option value='24'>2 years</option>
								<option value='36'>3 years</option>
								<option value='48'>4 years</option>
								<option value='60'>5 years</option>
							</select>
							{errors.duration && <p className="text-red-500 text-sm">{ errors.duration }</p>}
						</div>

						{
							totalAmount != 0 && (
								<div className="flex-1 text-center text-black">
									<label
										htmlFor='stayDuration'
										className='block text-lg font-bold text-black mb-2'>
										You will be paying
									</label>
									<span className="text-xl font-bold">
										GHc{ totalAmount }
									</span>
								</div>
							)
						}
					</div>

					<div className='flex space-x-1'>
						<div className='flex-1'>
							<label
								htmlFor='numberOfAdult'
								className='block text-sm text-gray-600'>
								Adults
							</label>
							<div className="relative flex items-center">
								<button type="button" onClick={subNumberOfAdult} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-50 border-r-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
									<svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
									</svg>
								</button>
								<input type="text" id="quantity-input" 
									data-input-counter aria-describedby="helper-text-explanation" 
									className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
									placeholder="0" 
									required 
									value={values.numberOfAdult}
									onChange={handleChange}
									name="numberOfAdult"
								/>
								<button type="button" onClick={addNumberOfAdult} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-50 border-l-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
									<svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
									</svg>
								</button>
							</div>
							{errors.numberOfAdult && <p className="text-red-500 text-sm">{ errors.numberOfAdult }</p>}
						</div>
						<div className='flex-1'>
							<label
								htmlFor='numberOfChildren'
								className='block text-sm text-gray-600'>
								Children
							</label>
							<div className="relative flex items-center">
								<button type="button" id="decrement-button" onClick={subNumberOfChildren} data-input-counter-decrement="quantity-input" className="bg-gray-50 border-r-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
									<svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
									</svg>
								</button>
								<input type="text" id="quantity-input" 
									data-input-counter aria-describedby="helper-text-explanation" 
									className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
									placeholder="0" 
									required 
									value={values.numberOfChildren}
									onChange={handleChange}
									name="numberOfChildren"
								/>
								<button type="button" id="increment-button" onClick={addNumberOfChildren} data-input-counter-increment="quantity-input" className="bg-gray-50 border-l-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
									<svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
									</svg>
								</button>
							</div>
							{errors.numberOfChildren && <p className="text-red-500 text-sm">{ errors.numberOfChildren }</p>}
						</div>
					</div>

					<div className="row flex">
						<button
							className="rounded-md w-full rounded-r-none bg-bg-color py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="submit">
								Rent House
						</button>
						<button
							onClick={() => setOpenModal(true)}
							className="rounded-md w-full rounded-l-none border border-bg-color py-2 px-4 text-center text-sm text-bg-color transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">
							Take a tour
						</button>
					</div>
				</div>
			</form>
			<Modal className="bg-bg-color" show={openModal} size={modalSize} onClose={() => setOpenModal(false)}>
				<form className="rounded-xl border-1 border-green-800" onSubmit={BookTourSubmit} style={{ height: 'auto', backgroundColor: 'white'}}>
					<Modal.Header className='items-center'>Request a tour</Modal.Header>
						<Modal.Body className='scrollable h-[750px]'>
							<div className="mb-5">
								<label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">First & last name</label>
								<input type="text" disabled={tour} id="name" name="name" value={bookTour.values.name} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="First & last name" required />
							</div>
							<div className="mb-5">
								<label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Phone number</label>
								<input type="text" disabled={tour} id="mobile" name="phone" value={bookTour.values.phone} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Phone number" required />
							</div>
							<div className="mb-5">
								<label htmlFor="repeat-password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email address</label>
								<input type="email" disabled={tour} name="email" value={bookTour.values.email} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email address" required />
							</div>
							<label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Message</label>
							<textarea id="message" disabled={tour} rows="4" name="message" value={bookTour.values.message} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I would like to schedule a tour"></textarea>
											
							<br />
							<label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Will be sent to</label>
							<div className="flow-root border">
								<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 josefin-sans">
									<li className="py-3 sm:py-4">
										<div className="flex items-center ml-4">
											<div className="flex">
												<img className="w-16 h-16 rounded-full" src="https://api.oshelter.com/files/property/66d1ac6714f02.jpg" alt="Neil image" />
											</div>
											<div className="flex-1 ms-4">
												<p className="text-xl font-thin text-gray-900 truncate dark:text-white">
													
												</p>
												<p className="text-md text-gray-500 truncate dark:text-gray-400">
													
												</p>
	
												<p className="text-md text-gray-500 truncate dark:text-gray-400">
													
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
	
							<button 
								type="submit"
								disabled={tour}
								className={`text-white flex mt-6 ${tour === true ? 'bg-blue-500' : 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
								{tour === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Requesting for tour</span></>) : (<><span className="ml-3">Request a tour</span></>)}
							</button>
					</Modal.Body>
				</form>
            </Modal>

			{
				user && (
					<>
						<Modal className="bg-bg-color" show={open} size={modalSize} onClose={() => setOpen(false)}>
							<form className="rounded-xl border-1  border-green-800" onSubmit={handleSubmitRent} style={{ height: 'auto', backgroundColor: 'white'}}>
								<Modal.Header className='items-center'>Confirm rent booking</Modal.Header>
								<Modal.Body className='overflow-scroll h-auto -mt-5'>
									<hr className="py-[1px] mb-3 rounded-full bg-blue-800 w-[80px] overflow-y-auto"/>
									<div className="-mt-3">
										<div className="flow-root w-full">
											<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 josefin-sans">
												<li className="py-3 sm:py-4">
													<div className="flex items-center ml-4">
														<div className="flex">
															<img className="w-16 h-16 rounded-full" src="https://api.oshelter.com/files/property/66d1ac6714f02.jpg" alt="Neil image" />
														</div>
														<div className="flex-1 ms-4 text-semibold">
															<p className="text-xl font-thin text-gray-900 truncate dark:text-white">
																{user?.profile.name}
															</p>
															<p className="text-md text-dark truncate dark:text-gray-400">
																{user?.profile.email}
															</p>
															<p className="text-md text-gray-500 truncate dark:text-gray-400">
																{user?.profile.phone}
															</p>
														</div>
													</div>
												</li>
												<li className="py-3 sm:py-4">
													<div className="flex items-center ml-4">
														<div className="flex-1 ms-4 text-semibold">
															<p className="text-md xl:text-xl lg:text-xl font-thin text-dark truncate dark:text-white">
																Duration of rent:&nbsp;
																{
																	values?.duration == 6 ? (
																		values.duration + ' months'
																	) : (
																		(values.duration / 12) == 1 ? (
																			(values.duration / 12) + ' year'
																		) : (
																			(values.duration / 12) + ' years'
																		)
																	)
																}
															</p>
															<p className="text-md xl:text-xl lg:text-xl font-thin text-dark truncate dark:text-gray-400 mt-1 xl:mt-3 lg:mt-3">
																Number of adults occupancy: {values.numberOfAdult}
															</p>
															<p className="text-md xl:text-xl lg:text-xl font-thin text-dark truncate dark:text-gray-400 mt-1 xl:mt-3 lg:mt-3">
																Number of children occupancy: {values.numberOfChildren}
															</p>
															<p className="text-md xl:text-xl lg:text-xl font-thin text-dark truncate dark:text-gray-400 mt-1 xl:mt-3 lg:mt-3">
																You will be paying: <b className="font-bold">GHc{totalAmount}</b>
															</p>
															{
																values.duration > 6 && (
																	<div className="row">
																		<p className="text-red-800 mt-1.5 xl:mt-5 lg:mt-5"><b className="text-md xl:text-lg lg:text-lg">Notice on Rent Payments:</b><hr className="py-[1px] mt-2 flex justify-end items-end rounded-full bg-red-800 w-[80px]"/><br />
																			<div className="overflow-scroll h-[130px] xl:h-full lg:h-full -mt-3 xl:-mt-1 lg:mt-1">
																				<span className="text-sm xl:text-md lg:text-md text-black font-josefin-sans relative">
																					As per the Ghana Rent Act section 25(5) 1963 (Act 220), landlords <br /> are prohibited from demanding rent payments exceeding six months in advance.
																					Tenants who choose to pay beyond this limit do so at their own risk. This platform disclaims any liability for agreements <br /> that contravene the Rent Act.
																				</span>
																			</div>
																		</p>
																	</div>
																)
															}
														</div>
													</div>
												</li>
											</ul>
										</div>

										<div className="flex justify-end items-center">
											<hr className="py-[1px] mb-1 flex justify-end items-end rounded-full bg-blue-800 w-[80px]"/>
										</div>
										<div className="py-1 flex sm:flex sm:px-6 mt-2 mb-2 justify-end">
											<button
												type="button"
												onClick={() => setOpen(false)}
												className={`inline-flex justify-center w-full rounded-md border border-bg-color px-4 py-1.5 xl:py-2 lg:py-2 text-sm font-semibold text-bg-color shadow-xs hover:bg-dark sm:ml-3 sm:w-auto`}
											>
												Cancel
											</button>
											&nbsp;
											<button
												type="button"
												disabled = {isLoading}
												onClick={handleSubmitRent}
												className={`inline-flex justify-center w-full rounded-md ${isLoading === true ? 'bg-blue-400' : 'bg-bg-color'} px-3 py-1.5 xl:py-2 lg:py-2 text-sm font-semibold text-white shadow-xs hover:bg-dark sm:ml-3 sm:w-auto`}
											>
												{isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Booking</span></>) : (<><span className="ml-3">Confirm booking</span></>)}
											</button>
										</div>
									</div>
								</Modal.Body>
							</form>
						</Modal>

						<Modal className="bg-bg-color" show={alert} size={modalSize}>
							<form className="rounded-xl border-1  border-green-800" style={{ height: 'auto', backgroundColor: 'white'}}>
								<Modal.Header className='items-center'>Dear {user?.profile?.name}</Modal.Header>
								<Modal.Body className='scrollable h-auto'>
									<hr className="py-[3px] mb-3 rounded-full bg-green-800 w-[80px]"/>
									<div className="mt-2">
										<div className="flow-root w-full">
											<p>
												Thank you for choosing Oshelter!<br /><br />
												Your booking request has been successfully submitted. <br /> You will receive a confirmation email as soon as possible. <br /> We appreciate your patience.
												<br />
												In the meantime, you can track and manage your request through your dashboard.
											</p>
										</div>
									</div>
									<div className="flex justify-end items-end">
										<hr className="py-[3px] rounded-full mb-3 flex justify-end items-end bg-green-800 w-[80px]"/>
									</div>

									<div className="py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3 mb-3">
										<Link
											to='/dashboard/myspaces'
											className="inline-flex justify-center w-full rounded-md bg-green-600 px-3 py-3 text-sm font-semibold text-white shadow-xs hover:bg-dark sm:ml-3 sm:w-auto"
										>
											Continue
										</Link>
									</div>
								</Modal.Body>
							</form>
						</Modal>
					</>
				)
			}
		</div>
	);
};

export default RentHouseSection;
