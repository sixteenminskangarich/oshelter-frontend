import React from 'react';
import { FaBed, FaBath, FaToilet , FaDotCircle } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { MdLabel } from "react-icons/md";
import { Drawer, Modal } from "flowbite-react";


const BookTour = ({ property, openModal  }) => {
    const [setOpenModal] = useState(false);
    const [modalSize1] = useState('md');
	return (
        <Modal show={openModal} size={modalSize1} onClose={() => setOpenModal(false)}>
            <Modal.Header className='items-center text-2xl font-bold'>
                <h2 className="text-2xl font-bold">
                    Book a buying appointment
                </h2>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className='[&>div]:bg-transparent [&>div]:p-0'>
                    <div className="p-4 pt-0">
                        <div clas sName="">
                            <h4 className="text-md font-bold text-gray-900 dark:text-white">Date of appointment</h4>
                            <Datepicker 
                                inline 
                                className='w-full p-4'
                                selected={values.dateOfAppointment}
                                name="dateOfAppointment"
                                onBlur={handleBlur}
                                onChange={date => setFieldValue('dateOfAppointment', date)}
                                style={{ width: '100%'}}
                            />
                            {errors.dateOfAppointment && <p className="text-red-500 text-sm">{ errors.dateOfAppointment }</p>}
                        </div>
                        <h4 className="text-md font-bold text-gray-900 dark:text-white">Time of appointment</h4> <br />
                        <div className="">
                            <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5">
                                <li>
                                    <input type="radio" id="10-am" value="10:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="10-am"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    10:00 AM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="10-30-am" value="10:30AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="10-30-am"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    10:30 AM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="11-am" value="11:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="11-am"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    11:00 AM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="11-30-am" value="11:30AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="11-30-am"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    11:30 AM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="12-am" value="12:00AM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="12-am"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    12:00 AM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="12-30-pm" value="12:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="12-30-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    12:30 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="1-pm" value="01:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="1-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    01:00 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="1-30-pm" value="01:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="1-30-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    01:30 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="2-pm" value="02:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="2-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    02:00 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="2-30-pm" value="02:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="2-30-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    02:30 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="3-pm" value="03:00PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="3-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    03:00 PM
                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="3-30-pm" value="03:30PM" onChange={handleChange} onBlur={handleBlur} className="hidden peer" name="timeOfAppointment" />
                                    <label htmlFor="3-30-pm"
                                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                                    03:30 PM
                                    </label>
                                </li>
                            </ul>
                            {errors.timeOfAppointment && <p className="text-red-500 text-sm">{ errors.timeOfAppointment }</p>}
                        </div>
                        
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
            <div className="grid grid-cols-2 gap-2">
                <button type="button" data-modal-hide="timepicker-modal" className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Book Appointment</button>
            </div>
            </Modal.Footer>
        </Modal>
	);
};

export default BookTour;