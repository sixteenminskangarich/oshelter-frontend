/* eslint-disable react/prop-types */
import React, { useState }  from 'react';
import { Datepicker, Drawer, Modal } from "flowbite-react";
import { HiOutlineLightBulb } from 'react-icons/hi';
import { useFormik } from 'formik';
import { ImSpinner9 } from 'react-icons/im';
import { bookShortStay, saveBookTour } from '../../utils/request';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { BookEventSpaceScheme } from '../../lib/scheme';
import showCustomAlert from '../cards/Alert';

const BookEventSpace = ({id , property}) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('md');
    const [modalSize1, setModalSize1] = useState('5xl');
    const [isLoading, setIsLoading] = useState(false)
    const [openModal1, setOpenModal1] = useState(false);
    const [hasPackage, setHasPackage] = useState(false);
    const [packageId, setPackageId] = useState(null)
    const [tour, setTour] = useState(false)

    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const mutation = useMutation(
        (bookingData) => bookShortStay(bookingData, token, id),
        {
            onSuccess: (data) => {
                console.log(data)
                if (data.success === true) {
                    setHasPackage(false)
                    setPackageId(null)

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
                } else {
                    toast.error(data.message);
                    setOpenModal1(false);
                    setIsLoading(false);
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

    const onSubmit = (values) => {
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

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            dateOfAppointment: "",
            timeOfAppointment: "",
            startTime: "",
            endTime: "",
            packageId: ""
        },
        validationSchema: BookEventSpaceScheme,
        enableReinitialize: true,
        onSubmit,
    })

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

    const bookTour = useFormik({
        initialValues: {
            name: "",
            email: 0,
            phone: "",
            message: ""
        }
    })

    const getPackageId = (id) => {
        setHasPackage(true);
        setPackageId(id)
        setFieldValue("packageId", id)
    }

    console.log(values)

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const minDate = year+' '+month+' '+day;

    return (
        <div className='bg-sigin-color roboto-font josefin-sans'>
            <br />
            <div className='p-4 bg-white rounded-md mb-4'>
                <div className="icons">   
                    <h3 className='font-bold flex items-center space-x-2'>
                        <HiOutlineLightBulb />
                        <span className="text-lg 
                        text-gray-700 ml-10">
                            Permitted event types
                        </span>
                    </h3>
                </div>
                <p className='mt-2 text-sm text-gray-600'>
                    <>
                        <span className="text-gray-800 text-md">This event space is available exclusively for the following types of events</span>
                        <ul className="mt-2">
                            <li className="font-medium text-gray-800 mb-1" style={{ fontSize: '1em' }}>• Weddings</li>
                            <li className="font-medium text-gray-800 mb-1" style={{ fontSize: '1em' }}>• Funerals</li>
                            <li className="font-medium text-gray-800 mb-1" style={{ fontSize: '1em' }}>• Corporate events</li>
                            <li className="font-medium text-gray-800 mb-1" style={{ fontSize: '1em' }}>• Concerts</li>
                            <li className="font-medium text-gray-800 mb-1" style={{ fontSize: '1em' }}>• Birthday parties</li>
                            <li className="font-medium text-gray-800" style={{ fontSize: '1em' }}>• Exhibitions</li>
                        </ul>
                    </>
                </p>
            </div>
            <div className="row flex">
                <button
                    className="rounded-md w-full rounded-r-none bg-bg-color py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" onClick={() => setOpenModal1(true)}>
                        Book Space
                </button>
                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-md w-full rounded-l-none border border-bg-color py-2 px-4 text-center text-sm text-bg-color transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    Take a tour
                </button>
            </div>

            <Modal show={openModal1} size={property?.rate === "per package" && hasPackage === false ? modalSize1 : modalSize} onClose={() => setOpenModal1(false)} >
                <form onSubmit={handleSubmit} className='[&>div]:bg-transparent [&>div]:p-0 rounded-xl' style={{ backgroundColor: 'white'}}>
                    <Modal.Header className='items-center mt-4 ml-5'>Book a space</Modal.Header>
                    <Modal.Body>
                        {
                            property?.rate === "per package" && hasPackage === false ? (
                                <>
                                    <section className="bg-white dark:bg-gray-900">
                                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                                                <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">{property?.title}</h2>
                                                <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Packages</p>
                                            </div>
                                            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                                                {property?.propertyPackages?.map((item, index) => (
                                                    <div key={index} className="max-w-sm bg-white border-t-4 border-bg-color rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                                                        <div className="p-5">
                                                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.package}</h5>
                                                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                                                {item?.components?.split(',').map((feature, i) => (
                                                                    <>
                                                                        <li key={i} className="flex items-center space-x-3">
                                                                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                                            <span>{feature}</span>
                                                                        </li>
                                                                    </>
                                                                ))}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xl font-bold text-gray-900 dark:text-white">{property?.currency+""+item.rate}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => getPackageId(item.id)}
                                                                    className="text-white bg-bg-color hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-bg-color dark:focus:ring-blue-800"
                                                                >
                                                                    Book now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                </>
                            ): (
                                <>
                                    <div className="xl:p-10 lg:p-10 p-5 pt-0 overflow-y-auto -mt-5">
                                        <div className="-mt-2">
                                            <h4 className="text-md font-bold text-gray-900 dark:text-white">Booking Date</h4>
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
                                            {errors.dateOfAppointment && <p className="text-red-500 text-sm">{ errors.dateOfAppointment }</p>}
                                        </div>

                                        <h4 className="text-md font-bold text-gray-900 dark:text-white mt-2">Booking Time</h4> <br />
                                        <div className="-mt-2">
                                            <div className="flex">
                                                <div className="w-full">
                                                    <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                        <input type="time" name="startTime" id="start-time" value={values.startTime} onChange={handleChange} onBlur={handleBlur} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    </div>
                                                    {errors.startTime && <p className="text-red-500 text-xs mb-3">{ errors.startTime }</p>}
                                                </div>
                                                <div className="w-full ml-4">
                                                    <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                        <input type="time" name="endTime" id="end-time" value={values.endTime} onChange={handleChange} onBlur={handleBlur} className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    </div>

                                                    {errors.endTime && <p className="text-red-500 text-xs mb-3">{ errors.endTime }</p>}
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <div className="mt-6 mb-6 flex items-end justify-end">
                                            <button 
                                                type="submit" 
                                                className={`text-white flex ${isLoading === true ? 'bg-blue-500' : 'bg-bg-color'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-bg-color focus:outline-none dark:focus:ring-blue-800`}
                                                disabled={isLoading}
                                                >
                                                {isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Booking space</span></>) : (<><span className="ml-3">Book space</span></>)}
                                            </button>&nbsp;
                                            <button
                                                type="button"
                                                onClick={() => setOpenModal1(false)}
                                                className={`text-white flex ${isLoading === true ? 'bg-red-500' : 'bg-red-800'} hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 mb-2 dark:bg-red-600 dark:hover:bg-red-800 focus:outline-none dark:focus:ring-red-800`}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </Modal.Body>
                </form>
            </Modal>

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
                            className={`text-white flex mt-6 ${tour === true ? 'bg-blue-500' : 'bg-bg-color'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-bg-color dark:focus:ring-blue-800`}>
                            {tour === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Requesting for tour</span></>) : (<><span className="ml-3">Request a tour</span></>)}
                        </button>
                    </Modal.Body>
                </form>
            </Modal>
        </div>
    );
};

export default BookEventSpace;