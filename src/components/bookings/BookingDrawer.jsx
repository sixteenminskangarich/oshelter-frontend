/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useFormik, useField } from "formik";
import { htmlConverterReact } from 'html-converter-react';
import { bookServices, checkIfServiceBooked } from '../../utils/ServicesQueries';
import { SlClose } from "react-icons/sl";
import { useSettings } from '../../context/SettingsContext';
import { truncateString } from '../../utils/functions';
import { ClipLoader } from 'react-spinners';
import showCustomAlert from '../cards/Alert';
import Swal from 'sweetalert2';

const BookingDrawer = ({ showDrawer, toggleDrawer, service }) => {
	const today = new Date();
	const defaultDay = today.getDate().toString().padStart(2, '0');
	const defaultMonth = today.toLocaleString('default', { month: 'long' });
	const defaultYear = today.getFullYear().toString();

	const [day, setDay] = useState(defaultDay);
	const [month, setMonth] = useState(defaultMonth);
	const [year, setYear] = useState(defaultYear);

	const days = Array.from({ length: 31 }, (_, i) =>
		(i + 1).toString().padStart(2, '0')
	);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const years = Array.from({ length: 5 }, (_, i) =>
		(today.getFullYear() + i).toString()
	);
	const location = useLocation();
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();
	const { id } = useParams();
	const [startDate, setStartDate] = useState(new Date());
	const [note, setNote] = useState('');
	const [name, setName] = useState(user?.profile?.name);
	const [email, setEmail] = useState(user?.email);
	const [amount, setAmount] = useState(service?.data?.price || 0);
	const [openModal1, setOpenModal1] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const { settings, loading } = useSettings();

	const validationSchema = Yup.object().shape({
		note: Yup.string().required('Note is required'),
	});

	const commissionPayable = settings?.commission_type == 'percentage' ? ((parseInt(settings.commission_percentage) / 100) * parseFloat(amount)) : settings?.commission_fee;

	const stableReference = useMemo(() => new Date().getTime().toString(), []);

	const config = {
		reference: stableReference,
		email: user?.email,
		publicKey: settings.paystack_public ?? 'pk_test_f7fabac74978f7d1edbdfc63a0856c37e8f45019',
		currency: 'GHS',
		amount: parseFloat(commissionPayable) * 100,
	};

	const handlePaystackSuccessAction = async (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		const response = await bookServices(values, id, token);
		if (response.success === true) {
			toast.success('Service booked successfully');
			navigate('/services');
		} else {
			toast.error("Service already booked");
			setOpenModal1(true)
			setIsLoading(false)
		}
	};

	const checkIsValidDate = (day, month, year) => {
		const monthIndex = months.indexOf(month); // convert month name to index (0-based)
		const selectedDate = new Date(year, monthIndex, day);
		const today = new Date();

		// Remove time for accurate date comparison
		selectedDate.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);

		return selectedDate >= today;
	};

	const handleBookService = async () => {
		const isValid = checkIsValidDate(day, month, year);
		setSubmitting(true);
		if (isValid) {
			const response = await bookServices(values, id, token);
			if (response.errors) {
				toast.error(response?.errors?.note[0]);
				setSubmitting(false);
			} else {
				if (response.success === true) {
					setSubmitting(false);
					showCustomAlert({
						title: 'Booking Successful',
						message: ` Your service booking was successful! We’ve sent your request to the service provider,and you’ll be notified as 
						soon as they accept it. <br /><br />
 						Thank you for using OShelter — we’ll keep you updated`,
						confirmText: 'Yes, Confirm',
						onConfirm: () => {
							toast.success('Service booked successfully');
							navigate('/dashboard/orders');
						},
					});
				} else {
					toast.error(response?.message);
					setSubmitting(false);
				}
			}

		} else {
			toast.error("Please select a valid date for booking");
			setOpenModal1(true)
			setIsLoading(false)
			setSubmitting(false);
		}
	}

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		// console.log('closed')
	}

	const componentProps = {
		...config,
		text: 'Book Service',
		onSuccess: (reference) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	const onSubmit = async () => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: 'Are you sure you want to book this service?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#283890',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, book it!',
				cancelButtonText: 'No'
			}).then((result) => {
				if (result.isConfirmed) {
					handleBookService();
				}
			});
			// handlePaystackSuccessAction();

		} catch (error) {
			console.error('An error occurred while booking the service:', error);
		}
	}

	const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues: {
			reference: config?.reference,
			note: note,
			execution_date: day + '-' + month + '-' + year,
		},
		onSubmit,
		enableReinitialize: true,
	})

	return (
		<>
			{showDrawer && (
				<div className='fixed inset-0 z-50 flex font-josefin-sans'>
					<div
						className='fixed inset-0 bg-placeholder-Text bg-opacity-50'
						onClick={toggleDrawer}></div>
					<div className='fixed right-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-6 overflow-y-auto'>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-lg font-semibold'>Order details</h2>
							<button onClick={toggleDrawer} className='text-black' >
								<SlClose className="text-2xl" />
							</button>
						</div>

						<h3 className='text-xl font-bold mb-2'>{service?.data?.title}</h3>
						<div className='border p-4 rounded mb-4'>
							<p className='text-gray-700 font-bold '>
								{settings?.commission_type == 'percentage' ? (
									<>
										To secure your booking, a <b>{settings.initial_deposit ?? '20'}%</b> down payment of GH₵{((parseInt(settings.initial_deposit) / 100) * parseFloat(amount)).toFixed(2)} out of GH₵{amount.toFixed(2)} is required.
									</>
								) : (
									<span>
										To secure your booking, an amount of GH₵{settings?.commission_fee ?? '300'} out of GH₵{amount.toFixed(2)} is required.
									</span>
								)} <br />
								You will be notified to make the down payment after the service provider has aprroved to provide the service. Thank you.
							</p>
							<p className='text-sm mt-2 text-light-gray'>
								{truncateString(htmlConverterReact(service?.data?.description), 200)}
							</p>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Select order execution date
							</label>
							<div className='flex gap-2'>
								<select
									value={day}
									onChange={(e) => setDay(e.target.value)}
									className='border rounded p-2 text-sm'>
									{days.map((d) => (
										<option key={d} value={d}>
											{d}
										</option>
									))}
								</select>
								<select
									value={month}
									onChange={(e) => setMonth(e.target.value)}
									className='border rounded p-2 text-sm'>
									{months.map((m) => (
										<option key={m} value={m}>
											{m}
										</option>
									))}
								</select>
								<select
									value={year}
									onChange={(e) => setYear(e.target.value)}
									className='border rounded p-2 text-sm'>
									{years.map((y) => (
										<option key={y} value={y}>
											{y}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='bg-[#C9DCF9] p-4 rounded mb-4'>
							<h4 className='text-lg font-semibold'>
								GH₵ {settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(amount)).toFixed(2) : settings?.commission_fee} down payment
							</h4>
							<p className='text-sm text-gray-600'>
								Payment held in escrow until the job is done by the Service
								Provider
							</p>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1'>
								Note to service provider
							</label>
							<textarea
								className='w-full border rounded p-2 text-sm'
								rows='3'
								placeholder='Your message...'
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</div>

						{!user ? (
							<Link
								to={`/login?redirect=${location.pathname}`}
								className='w-full bg-bg-color text-white p-3 rounded text-center block mt-2'>
								Login to continue
							</Link>
						) : (
							<button type='button'
								disabled={submitting}
								onClick={handleSubmit}
								className='w-full bg-bg-color text-white p-3 rounded text-center mt-2'>
								{submitting ? (
									<>
										<ClipLoader color="#ffffff" size={20} /> Booking...
									</>
								) : (
									'Book Service'
								)}
							</button>
							// <PaystackButton
							// 	type="button"
							// 	className='w-full bg-bg-color text-white p-3 rounded text-center mt-2'
							// 	{...componentProps}
							// />
						)}

						<p className='text-xs text-gray-500 text-center mt-2'>
							You won’t be charged yet
						</p>

						<button
							onClick={toggleDrawer}
							className='w-full bg-gray-200 text-gray-700 p-2 rounded mt-4'>
							Close
						</button>

					</div>
				</div>
			)}
		</>
	);
};

export default BookingDrawer;