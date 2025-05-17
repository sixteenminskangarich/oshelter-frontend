/* eslint-disable no-unused-vars */
import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import { Datepicker, Drawer, Modal } from "flowbite-react";
import { HiCalendar, HiUserAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useFormik, useField } from "formik";
import { BuyScheme } from '../../lib/scheme';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookShortStay, saveBookTour } from '../../utils/request';
import { toast } from 'react-toastify';
import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { ImSpinner9 } from 'react-icons/im';
import adinkra from '../../assets/images/adinkra.jpg';
import Swal from 'sweetalert2';
import showCustomAlert from '../cards/Alert';

const BuyHouseSection = ({id, property}) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('xl');

    const [openModal1, setOpenModal1] = useState(false);
    const [modalSize1, setModalSize1] = useState('2xl');
    const [tour, setTour] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const [isLoading, setIsLoading] = useState(false)

    const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

    const [read,setRead] = useState(false)

    const navigate = useNavigate();
	const [searchParams] = useSearchParams();

    const [showToast, setShowToast] = useState(false);
    const [unitId, setUnitId] = useState(null);
    const [isUnitSelected, setIsUnitSelected] = useState(false);

    const handleCloseAction = () => {
        setOpenModal(false);
        setOpenModal1(false);
        setIsUnitSelected(false);
        setUnitId(null);
    }

    const mutation = useMutation(
		(bookingData) => bookShortStay(bookingData, token, id),
		{
			onSuccess: (data) => {
				if(data.success === true) {
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
                }else {
					toast.error(data.message);
                    setOpenModal1(false)
                    setIsLoading(false)
				}
				// Handle success here
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
           			navigate(`/properties/sale`);
                }else {
					toast.error(data.message);
                    setOpenModal(true)
                    setTour(false)
				}
				// Handle success here
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

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

    const readMore = () => {
        setRead(true)
        setTimeout(() => {
            setRead(false);
        }, 30000);
    }

    const onSubmit = (values, actions) => {
        setIsLoading(true)
        if (user && token) {
            // User is logged in, proceed with booking
            mutation.mutate(values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            dateOfAppointment: "",
            timeOfAppointment: ""
        },
        validationSchema: BuyScheme,
        onSubmit,
    })

    const bookTour = useFormik({
        initialValues: {
            name: "",
            email: 0,
            phone: "",
			message: ""
        }
    })

    const customTheme ={
        popup : {
            root: {
                inner: "inline-block rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800"
            },
            "footer": {
                "base": "mt-2 flex space-x-2",
                "button": {
                    "base": "w-full rounded-lg px-5 py-1 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                    "today": "hidden bg-bg-color text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-bg-color",
                    "clear": "hidden border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                }
            }
        },
        "views": {
            "days": {
                "header": {
                    "base": "mb-1 grid grid-cols-7",
                    "title": "h-4 text-center text-xs font-medium leading-6 text-gray-500 dark:text-gray-400"
                },
                "items": {
                    "base": "grid w-64 grid-cols-7",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-xs font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        "selected": "bg-bg-color text-white hover:bg-cyan-600",
                        "disabled": "text-gray-500"
                    }
                }
            },"months": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        "selected": "bg-bg-color text-white hover:bg-cyan-600",
                        "disabled": "text-gray-500"
                    }
                }
            },"years": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        "selected": "bg-bg-color text-white hover:bg-cyan-600",
                        "disabled": "text-gray-500"
                    }
                }
            },"decades": {
                "items": {
                    "base": "grid w-64 grid-cols-4",
                    "item": {
                        "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        "selected": "bg-bg-color text-white hover:bg-cyan-600",
                        "disabled": "text-gray-500"
                    }
                }
            }
        }
    }

    const showInterest = (id) => {
        setIsUnitSelected(true);
        setUnitId(id);
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const minDate = year+' '+month+' '+day;

    const initialPackages = [
        { unit: "Unit A", price: "100,000", floorPlan: "floor-plan-a.jpg" },
        { unit: "Unit B", price: "150,000", floorPlan: "floor-plan-b.jpg" },
        { unit: "Unit C", price: "200,000", floorPlan: "floor-plan-c.jpg" },
        { unit: "Unit D", price: "250,000", floorPlan: "floor-plan-d.jpg" },
    ];

    console.log(property?.propertyUnits)

    return (
        <div className='bg-sigin-color roboto-font josefin-sans'>
            <br />
            <div className='p-4 bg-white rounded-md mb-4'>
                <div className="icons">   
                    <h3 className='font-bold flex items-center space-x-2'>
                        <HiOutlineLightBulb />
                        <span className="text-lg 
                        text-gray-700 ml-10">
                            {
                                property?.base === "Land" ? 'Buying tips' : 'TIP: Consider a building inspection.'
                            }
                        </span>
                    </h3>
                </div>
                <p className='mt-2 text-sm text-gray-600'>
                    {
                        (property?.base === "Land") ? (
                            <>
                                Buying land is a significant investment, and making the right decision requires careful planning and research. Here are key tips to ensure a secure and successful land purchase.
                                <br />
                                <span className="font-bold">1. Verify Land Ownership and Documentation</span>
                                <br />
                                    <div className="ml-4">
                                        Before committing to any land purchase, ensure that the seller has the legal right to sell the land. Ask for:<br />
                                        •	Land Title Certificate or Deed<br />
                                        •	Site Plan and Indenture<br />
                                    </div>

                                    {
                                        read === true ? (
                                            <>
                                                <div className="ml-4">
                                                    •	Property Tax Clearance Certificate<br />
                                                    •	Seller’s ID and proof of ownership history<br />
                                                </div>

                                                <span className="font-bold">2. Conduct a Land Search at the Lands Commission.</span>
                                                <div className="ml-4">
                                                    To avoid fraud, conduct an official search at the Lands Commission to confirm:<br />
                                                        •	Ownership details<br />
                                                        •	Any legal disputes or encumbrances<br />
                                                        •	Proper land registration<br />
                                                </div>
                                                <span className="font-bold">3. Engage Professionals (Surveyor & Lawyer)</span>
                                                <br />
                                                <div className="ml-4">
                                                    Hiring a licensed surveyor ensures accurate land demarcation, while a real estate lawyer helps with due diligence, contract drafting, and legal protections.
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    type="button" 
                                                    onClick={readMore}
                                                    className="mt-4 text-bg-color border border-bg-color px-4 py-1 rounded-xl hover:bg-bg-color hover:text-white"
                                                >
                                                    Read more
                                                </button>
                                            </>
                                        )
                                    }
                            </>
                        ) : (
                            <>
                                Before signing a contract of sale, consider engaging an independent
                                qualified building inspector, surveyor, or architect to provide a
                                building inspection report. The fee for a professional inspection
                                service is small compared with the cost of buying a property that
                                needs unforeseen repairs. A qualified inspector will know what to look
                                for and will see through any cosmetic improvements that cover up
                                faults.
                            </>
                        )
                    }
                </p>
            </div>

            <div className="row flex">
                <button
                    className="rounded-md w-full rounded-r-none bg-bg-color py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" onClick={() => setOpenModal1(true)}>
                        {property?.propertyType === "Off The Plan" ? "Show Interest" : (property?.marketType === "Sale" && property?.base === "Land") ? 'Buy Land' : property?.marketType === "Long Lease" ? 'LeaseHold' : 'Buy House'}
                </button>
                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-md w-full rounded-l-none border border-bg-color py-2 px-4 text-center text-sm text-bg-color transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button">
                    Take a tour
                </button>
            </div>

            
            <Modal show={openModal} className="bg-bg-color" size={modalSize} onClose={() => setOpenModal(false)}>
				<form onSubmit={BookTourSubmit} className="rounded-xl" style={{ height: 'auto', backgroundColor: 'white'}}>
					<Modal.Header className='items-center'>Request a tour</Modal.Header>
					<Modal.Body className="scrollable h-[750px]">
						<div className="mb-5">
							<label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">First & last name</label>
							<input type="text" id="name" name="name" value={bookTour.values.name} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bg-color focus:border-bg-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bg-color dark:focus:border-bg-color dark:shadow-sm-light" placeholder="First & last name" required />
						</div>
						<div className="mb-5">
							<label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Phone number</label>
							<input type="text" id="mobile" name="phone" value={bookTour.values.phone} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bg-color focus:border-bg-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bg-color dark:focus:border-bg-color dark:shadow-sm-light" placeholder="Phone number" required />
						</div>
						<div className="mb-5">
							<label htmlFor="repeat-password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email address</label>
							<input type="email" name="email" value={bookTour.values.email} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-bg-color focus:border-bg-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bg-color dark:focus:border-bg-color dark:shadow-sm-light" placeholder="Email address" required />
						</div>
						<label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Message</label>
						<textarea id="message" rows="4" name="message" value={bookTour.values.message} onChange={bookTour.handleChange} onBlur={bookTour.handleBlur} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-bg-color focus:border-bg-color dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bg-color dark:focus:border-bg-color" placeholder="I would like to schedule a tour"></textarea>
						
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
                            className={`text-white flex mt-6 ${tour === true ? 'bg-blue-500' : 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                            {tour === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Requesting for tour</span></>) : (<><span className="ml-3">Request a tour</span></>)}
                        </button>
					</Modal.Body>
				</form>
            </Modal>

            <Modal show={openModal1} size={property?.propertyType === "Off The Plan" ? modalSize1 : modalSize} onClose={() => handleCloseAction()} >
                <form onSubmit={handleSubmit} className='[&>div]:bg-transparent [&>div]:p-0 rounded-xl' style={{ backgroundColor: 'white'}}>
                    <Modal.Body>
                        {
                            property?.propertyType === "Off The Plan" ? (
                                <>
                                    {
                                        isUnitSelected === true ? (
                                            <>
                                                <div className="row mx-6 mt-3">
                                                    <hr className="py-[3px] mb-3 rounded-full bg-bg-color w-[80px]"/>
                                                    <div className="mt-2">
                                                        <div className="flow-root w-full">
                                                            <p>
                                                                You have ----------------------------------------<br /><br />
                                                                ------------------------------------------------- <br />
                                                                ---------------------------------------------------
                                                                <br /> 
                                                                ---------------------------------------------------<br />
                                                                <br />
                                                                ----------------------------------------------------<br />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end items-end">
                                                        <hr className="py-[3px] rounded-full mb-3 flex justify-end items-end bg-bg-color w-[80px]"/>
                                                    </div>
                
                                                    <div className="py-1 flex sm:flex sm:px-6 mt-2 mb-2 justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCloseAction()}
                                                            className={`inline-flex justify-center w-full rounded-md border border-bg-color px-4 py-1.5 xl:py-2 lg:py-2 text-sm font-semibold text-bg-color shadow-xs hover:bg-dark sm:ml-3 sm:w-auto`}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`inline-flex justify-center w-full rounded-md ${isLoading === true ? 'bg-blue-400' : 'bg-bg-color'} px-3 py-1.5 xl:py-2 lg:py-2 text-sm font-semibold text-white shadow-xs hover:bg-dark sm:ml-3 sm:w-auto`}
                                                        >
                                                            {isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Booking</span></>) : (<><span className="ml-3">Confirm</span></>)}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>  
                                                <div className="container mx-auto px-4 py-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCloseAction()}
                                                        className="absolute top-4 right-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <h1 className="text-gray-800 mb-4 text-2xl">List of available units.</h1>
                                                    <div className="relative overflow-x-auto border-t-4 border border-t-bg-color rounded-xl">
                                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Unit
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Price
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Availability
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Floor Plan
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3">
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {property?.propertyUnits.map((pkg, index) => (
                                                                    <>
                                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                {pkg.unitName}
                                                                            </th>
                                                                            <td className="px-6 py-4">
                                                                                {
                                                                                    pkg.hasMultiple === 1 ? (
                                                                                        <>
                                                                                            contains unit
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <b>GHc{pkg.unitPrice}</b>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${pkg.isAvailable === 1 ? 'border border-green-800 text-green-800' : 'border border-red-800 text-red-800'}`}>
                                                                                    {pkg.isAvailable === 1 ? 'Available' : 'Not Available'}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                <img src={pkg?.file?.url} alt="Floor Plan" className="h-12 w-12 rounded-lg" />
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                {
                                                                                    pkg.hasMultiple === 1 ? (
                                                                                        <button type="button" className="px-2.5 py-1 border text-bg-color rounded-lg border-bg-color">view</button>
                                                                                    ) : (
                                                                                        <button onClick={() => showInterest(pkg.unit)} className="px-2.5 py-1 border text-bg-color rounded-lg border-bg-color">select</button>
                                                                                    )
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="container mx-auto px-4 py-6">
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">Book an appointment to view the property.</p>
                                        <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
                                            <div className="row">
                                                <Datepicker 
                                                    inline 
                                                    className="focus:bg-bg-color"
                                                    selected={values.dateOfAppointment}
                                                    name="dateOfAppointment"
                                                    onBlur={handleBlur}
                                                    onChange={date => setFieldValue('dateOfAppointment', date)}
                                                    style={{ width: '100%'}}
                                                    theme={customTheme}
                                                    minDate={new Date(minDate)}
                                                />
                                                {errors.dateOfAppointment && <p className="text-red-500 text-sm mt-4">{ errors.dateOfAppointment }</p>}
                                            </div>

                                            <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
                                                <div className="-mt-2">
                                                    <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
                                                        <li>
                                                            <input type="radio" id="10-am" value="10:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="10-am"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            10:00 AM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="10-30-am" value="10:30AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="10-30-am"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            10:30 AM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="11-am" value="11:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="11-am"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            11:00 AM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="11-30-am" value="11:30AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="11-30-am"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            11:30 AM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="12-am" value="12:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="12-am"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            12:00 AM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="12-30-pm" value="12:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="12-30-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            12:30 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="1-pm" value="01:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="1-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            01:00 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="1-30-pm" value="01:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="1-30-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            01:30 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="2-pm" value="02:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="2-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            02:00 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="2-30-pm" value="02:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="2-30-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            02:30 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="3-pm" value="03:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="3-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            03:00 PM
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" id="3-30-pm" value="03:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                                            <label htmlFor="3-30-pm"
                                                                className="inline-flex items-center justify-center w-full p-2 text-xs xl:text-sm lg:text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-bg-color peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-bg-color peer-checked:bg-blue-800 peer-checked:text-white hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                                            03:30 PM
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {errors.timeOfAppointment && <p className="text-red-500 text-sm mt-3 mb-3">{ errors.timeOfAppointment }</p>}
                                            </div>
                                        </div>

                                        <div className="flex justify-end items-end mt-4">
                                            <button
                                                type="button"
                                                onClick={() => handleCloseAction()}
                                                className={`text-white flex ${isLoading === true ? 'bg-red-500' : 'bg-red-800'} hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800`}
                                            >
                                                Cancel
                                            </button>&nbsp;
                                            <button 
                                                type="submit" 
                                                className={`text-white flex ${isLoading === true ? 'bg-blue-500' : 'bg-bg-color'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-1.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                                                disabled={isLoading}
                                            >
                                                {isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Booking appointment</span></>) : (<><span className="ml-3">Book Appointment</span></>)}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </Modal.Body>
                </form>
            </Modal>
        </div>
	);
};
BuyHouseSection.propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.shape({
        base: PropTypes.string.isRequired,
        marketType: PropTypes.string,
        propertyType: PropTypes.string,
    }).isRequired,
};

export default BuyHouseSection;