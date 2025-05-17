/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useActionState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { bookShortStay } from '../../utils/request';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuyHouseSection from './BuyHouseSection';
import RentHouseSection from './RentHouseSection';
import BookEventSpace from './BookEventSpace';
import { BiPhoneCall } from "react-icons/bi";

import ShortStay from './ShortStay';

const BookProperty = ({ id, property }) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	// Local state for showing either contact details or message form
	const [showContact, setShowContact] = useState(false);
	const [showMessageForm, setShowMessageForm] = useState(false);

	// Mutation to save the booking data
	const mutation = useMutation(
		(bookingData) => bookShortStay(bookingData, token, id),
		{
			onSuccess: (data) => {
				console.log(data);
				// Handle success here
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

	// Yup validation schema
	const bookingSchema = Yup.object().shape({
		checkIn: Yup.date()
			.required('Check-in date is required')
			.nullable()
			.min(new Date(), 'Check-in date cannot be in the past'),
		checkOut: Yup.date()
			.required('Check-out date is required')
			.nullable()
			.min(
				Yup.ref('checkIn'),
				'Check-out date cannot be before the check-in date'
			),
		numberOfAdult: Yup.number()
			.required('Number of Adults is required')
			.min(1, 'At least 1 adult is required'),
		numberOfChildren: Yup.number()
			.required('Number of Children is required')
			.min(0, 'Children cannot be a negative number'),
	});

	const formik = useFormik({
		initialValues: {
			checkIn: '',
			checkOut: '',
			numberOfAdult: 0,
			numberOfChildren: 0,
		},
		validationSchema: bookingSchema,
		onSubmit: (values) => {
			if (user && token) {
				// User is logged in, proceed with booking
				mutation.mutate(values);
				toast.success('Booking Successful');
				navigate(`/properties/shortstay`);
			} else {
				// User is not logged in, append the current page URL to the login route
				const currentUrl = window.location.pathname + window.location.search;
				navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
			}
		},
	});

	let initialText = "Call Owner";
	const [ButtonText, setButtonText] = useState(initialText);

	const handleCallOwners = () => {
		setButtonText("+233 123 456 789")
	}

	// Function to handle the "Message Owner" button click
	const handleMessageOwner = () => {
		setShowMessageForm(true);
		setShowContact(false); // Hide contact info if it's open
	};

	const handleCloseMessage = () => {
		setShowMessageForm(false);
	};

	// Function to handle message form submission
	const handleSubmitMessage = (event) => {
		event.preventDefault();
		toast.success('Message Sent!');
		setShowMessageForm(false); // Close the form after submission
	};

	const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });

	return (
		<>
			<div className='lg:w-3/6 w-full'>
				<h1 className='text-xl font-bold font-josefin-sans mb-4 ml-2' style={{ fontSize: '30px', letterSpacing: '2px' }}> Thinking of{' '}
					{
						property?.propertyType === "Event Space" ? 
						(
							'booking'
						) 
						: 
						(
							property?.marketType === 'Short Stay'
							? 'short stay'
							: property?.marketType === 'Rent'
							? 'Renting'
							: property?.marketType === 'Buy'
							? 'buying'
							: property?.marketType === 'Sale'
							? 'buying'
							: property?.marketType === 'Long Lease' ? 'LeaseHold'
							: property?.marketType === 'Home'
							? 'Buying a Home'
							: property?.marketType === 'Land' && 'Buying a Land'
						)
					}
					?
				</h1>
				<div className='container p-4 rounded-lg shadow-md bg-sigin-color mt-4 lg:mt-0'>
					{
						property?.propertyType === "Event Space" ? 
						(
							<BookEventSpace id={id} property={property} />
						) 
						: 
						(
							property?.marketType === "Short Stay" ? (
								<ShortStay id={id} property={property} />
							) 
							: property?.marketType === "Sale" || property?.marketType === "Long Lease" ?
							(
								<BuyHouseSection id={id} property={property} />
							)
							: property?.marketType === "Rent" ? (
								<RentHouseSection id={id} property={property} />
							) : (
								""
							)
						)
					}

					{/* Contact and Message buttons */}
					<div className='space-y-4 mt-4 lg:mt-0'>
						<div className='flex space-x-4 mt-4'>
							<button
								className='w-full border border-bg-color text-blue-500 bg-white py-2 rounded-md'
								onClick={handleCallOwners}>
								{ButtonText}
							</button>
							<button
								className='w-full border border-bg-color text-blue-500 bg-white py-2 rounded-md'
								onClick={handleMessageOwner}>
								Message Owner
							</button>
						</div>
					</div>

					{/* Show contact details when 'Call Owner' is clicked */}
					{showContact && (
						<div className='mt-4'>
							<p className='text-gray-700 font-semibold'>
								Owner's Contact: +233 123 456 789
							</p>
						</div>
					)}

					{/* Show message form when 'Message Owner' is clicked */}
					{showMessageForm && (
						<form onSubmit={handleSubmitMessage} className='mt-4'>
							<span onClick={handleCloseMessage} className='float-right' style={{ fontSize: '30px', cursor: 'pointer'}}>&times;</span>
							<textarea
								className='w-full border p-2 rounded-md'
								placeholder='Enter your message here...'
								required></textarea>
							<button
								type='submit'
								className='w-full mt-2 bg-bg-color text-white py-2 rounded-md'>
								Submit
							</button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default BookProperty;
