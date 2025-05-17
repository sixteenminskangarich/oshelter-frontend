"use client";
import React, { useState }  from 'react';
import { ShortStayScheme } from '../../lib/scheme';
import { bookShortStay } from '../../utils/request';
import { useFormState } from 'react-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'flowbite';
import { useFormik, useField } from "formik";
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Datepicker } from "flowbite-react";
import { Modal } from "flowbite-react";
import { ImSpinner9 } from 'react-icons/im';

const ShortStay = ({ id, property }) => {
    const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();

    const [modalSize, setModalSize] = useState('xl');
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(true)

    const onSubmit = (values, actions) => {
        if (user && token) {
            const start = new Date(values.checkIn);
            const end = new Date(values.checkOut.toLocaleDateString());

            const diffInMs = Math.abs(end - start);
            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            console.log(start)
            if(start < now) {
                setError('Invalid checkIn date')
            } else if(end < now) {
                setError('Invalid checkOut date')
            }
            else if(diffInDays < 1)
            {
                setError('Kindly check your checkin date and check out date')
            }else {
                setOpen(true)
            }
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const handleShortStaySubmit = async() => {
        setIsLoading(true)
        if (user && token) {
            const response = await bookShortStay(values, token, id)
            if(response.success === true) {
                showCustomAlert ({
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
                toast.error(response.message);
            }
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            checkIn: new Date(),
            checkOut: new Date(),
            numberOfAdult: 0,
            numberOfChildren: 0   
        },
        validationSchema: ShortStayScheme,
        onSubmit,
    })

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
    const checkIn = new Date(values.checkIn.toLocaleDateString());
    const checkOut = new Date(values.checkOut.toLocaleDateString());

    let result = checkOut - checkIn;
    let amount = 0;
    if(result > 1) {
        result = Math.round(result / (1000 * 3600 * 24));
        amount = result * property?.amount
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

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const minDate = year+' '+month+' '+day;

    console.log(values.checkIn.toLocaleDateString())

	return (
        <div> 
            <form onSubmit={handleSubmit}>
                <div className='space-y-4 bg-sigin-color roboto-font josefin-sans'>
                    <p className='font-bold tex-sm tracking-wider text-sm'>When will you check in?</p>
                    <div className='flex space-x-4'>
                        <div className="flex-1">
                            <label className='block text-sm text-gray-600'>Check in</label>
                            <div className="relative max-w-sm">
                                <Datepicker 
                                    selected={values.checkIn}
                                    dateFormat="MMMM d, yyyy"
                                    className="text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    showIcon 
                                    name="checkIn"
                                    onBlur={handleBlur}
                                    theme={customTheme}
                                    minDate={new Date(minDate)}
                                    onChange={date => setFieldValue('checkIn', date)}
                                />
                            </div>
                            {errors.checkIn && <p className="text-red-500 text-sm">{ errors.checkIn }</p>}
                            &nbsp;&nbsp;
                        </div>
                        <div className="flex-1">
                            <label className='block text-sm'>Check out</label>
                            <div className="relative max-w-sm">
                                <Datepicker 
                                    selected={values.checkOut}
                                    dateFormat="MMMM d, yyyy"
                                    className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    showIcon 
                                    name="checkOut"
                                    onBlur={handleBlur}
                                    theme={customTheme}
                                    minDate={new Date(minDate)}
                                    onChange={date1 => setFieldValue('checkOut', date1)}
                                />
                            </div>
                            {errors.checkOut && <p className="text-red-500 text-sm">{ errors.checkOut }</p>}
                        </div>
                    </div>
                    {
                        amount > 0 && (
                            <div className="relative bottom-6 flex-1 text-black mt-2">
                                <label
                                    htmlFor='stayDuration'
                                    className='block text-lg font-bold text-black'>
                                    You will be paying: GHc{amount}
                                </label>
                            </div>
                        )
                    }
                    <p className='font-bold tracking-wider text-sm relative bottom-4'>How many people will be in the room?</p>
                    <div className='relative flex space-x-4 bottom-3'>
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
                                <input type="text" 
                                    id="quantity-input" 
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 focus:outline-none text-sm block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="999"
                                    required
                                    value={values.numberOfAdult}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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
                                <input type="text" 
                                    id="quantity-input" 
                                    data-input-counter aria-describedby="helper-text-explanation" 
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                                    placeholder="999" 
                                    required 
                                    value={values.numberOfChildren}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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

                    <div className="flex">
                        {error && <p className="text-red-500 text-sm">{ error }</p>}
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-bg-color text-white py-2 rounded-md'>
                        Book Apartment
                    </button>
                </div>
            </form>

            {
                user && (
                    <>
                        <Modal className="bg-bg-color" show={open} size={modalSize} onClose={() => setOpen(false)}>
                            <form className="rounded-xl border-1  border-green-800" style={{ height: 'auto', backgroundColor: 'white'}}>
                                <Modal.Header className='items-center'>Confirm short stay booking</Modal.Header>
                                <Modal.Body className='scrollable h-auto'>
                                    <hr className="py-[3px] mb-3 rounded-full bg-blue-800 w-[80px]"/>
                                    <div className="mt-2">
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
                                                            <p className="text-xl font-thin text-dark truncate dark:text-white">
                                                                Duration of stay:&nbsp; {result}

                                                            </p>
                                                            <p className="text-xl font-thin text-dark truncate dark:text-gray-400 mt-3">
                                                                Number of adults occupancy: {values.numberOfAdult}
                                                            </p>
                                                            <p className="text-xl font-thin text-dark truncate dark:text-gray-400 mt-3">
                                                                Number of children occupancy: {values.numberOfChildren}
                                                            </p>
                                                            <p className="text-xl font-thin text-dark truncate dark:text-gray-400 mt-3">
                                                                You will be paying: GHc{amount}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                        
                                        <div className="flex justify-end items-center">
                                            <hr className="py-[3px] mb-3 flex justify-end items-end rounded-full bg-blue-800 w-[80px]"/>
                                        </div>
                                        <div className="py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3 mb-3">
                                            <button
                                                type="button"
                                                onClick={handleShortStaySubmit}
                                                className={`text-white flex ml-4 ${isLoading === true ? 'bg-blue-500' : 'bg-bg-color'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                                                disabled={isLoading}
                                            >
                                                {isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Booking short stay</span></>) : (<><span className="ml-3">Confirm booking</span></>)}
                                            </button>
                                            <button
                                                type="button"
                                                data-autofocus
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </form>
                        </Modal>
                        
                        <Modal className="bg-bg-color" show={alert} size={modalSize}>
                            <form className="rounded-xl border-1  border-green-800" style={{ height: 'auto', backgroundColor: 'white'}}>
                                <Modal.Header className='items-center'>Dear {user?.profile.name}</Modal.Header>
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

export default ShortStay;
