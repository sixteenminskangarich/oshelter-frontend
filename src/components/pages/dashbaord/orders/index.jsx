/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import axios from 'axios';
import { useQuery } from 'react-query';
import format from 'date-fns/format';
import { Modal } from "flowbite-react";
import { acceptOrder, cancelOrder, fetchOrder, fetchorders, fetchOrdersB, fetchUserOrderedServices, getRejectReasons, makeCashPayment, makePayment, sendReview } from '../../../../utils/request';
import { toast } from 'react-toastify';
import { bookServices, paymentServices, paystackSuccess, rejectBookings } from '../../../../utils/ServicesQueries';
import { ImSpinner9 } from 'react-icons/im';
import { PaystackButton } from 'react-paystack';
import { useFormik } from 'formik';
import ProgressChecked from '../../../cards/business/ProgressIconChecked';
import ProgressUnchecked from '../../../cards/business/ProgressIconUnchecked';
import { BounceLoader, ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { set } from 'date-fns';
import { useSettings } from '../../../../context/SettingsContext';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import showCustomAlert from '../../../cards/Alert.jsx';
import { Link } from 'react-router-dom';

const Orders = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [activeTab, setActiveTab] = useState('active');
	const [openModal, setOpenModal] = useState(false);
	const [key, setKey] = useState(null);
	const [modalSize, setModalSize] = useState('lg');
	const [image, setImage] = useState(null);
	const [isCancelled, setIsCancelled] = useState(false);
	const [loading, setLoading] = useState({ reasons: false, orders: true, order: false, services: false, accepting: false, cancelling: false, paying: false, working: false, completing: false, confirming: false });
	const [orders, setOrders] = useState([]);
	const [services, setServices] = useState([]);
	const [reasons, setReasons] = useState([]);
	const [orderId, setOrderId] = useState(null);
	const [order, setOrder] = useState({});
	const { settings } = useSettings();
	const [payUrl, setPayUrl] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [cancelDailog, setCancelDailog] = useState(false);
	const [amountPayable, setPayable] = useState(0);
	const [amountPaid, setAmountPaid] = useState(0);
	const [payMode, setPaymentMode] = useState(0);
	const [actualPrice, setActualPrice] = useState(0);
	const [serviceFilter, setServiceFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pagination, setPagination] = useState({});
	const [searchParams, setSearchParams] = useSearchParams();
	const [rating, setRating] = useState(0);
	const [selectedReasons, setSelectedReasons] = useState([]);
	const [customReason, setCustomReason] = useState('');

	const stableReference = useMemo(() => new Date().getTime().toString(), []);

	const updateOrderstatus = async (orderId, status) => {
		try {
			await axios.patch(
				`${import.meta.env.VITE_APP_SERVICE_URL
				}/provider/business/orders/${orderId}/accept`,
				{ status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// Optimistic update of the frontend table
			// setOrders((prevOrders) =>
			// 	prevOrders.filter((order) => order.id !== orderId)
			// );
		} catch (error) {
			console.error(`Error updating order status to ${status}:`, error);
		}
	};

	const rejectReasons = async () => {

		try {
			setLoading({ reasons: true })

			const response = await getRejectReasons(token);

			setReasons(response.data);
			setLoading({ reasons: false });
			//
		} catch (error) {
			console.error('Error fetching reasons:', error);
			setLoading({ reasons: false });
		}
	};

	const fetchServices = async () => {

		try {
			setLoading({ services: true })

			const response = await fetchUserOrderedServices(token);

			setServices(response.data);
			setLoading({ services: false });
			//
		} catch (error) {
			console.error('Error fetching orders:', error);
			setLoading({ services: false });
		}
	};

	const fetchOrdersData = async () => {
		setLoading({ orders: true })
		try {
			const response = await fetchOrdersB(activeTab, token, statusFilter, searchQuery, currentPage, 10, serviceFilter);
			// console.log(response);

			setOrders(response.data.data);
			setPagination({
				currentPage: response.data.current_page,
				lastPage: response.data.last_page,
			});
			setLoading({ orders: false });
		} catch (error) {
			console.error('Error fetching orders:', error);
			setLoading({ orders: false });
		}
	};

	const loadPaystackScript = () => {
		const script = document.createElement("script");
		script.src = "https://js.paystack.co/v1/inline.js";
		document.body.appendChild(script);
	};

	console.log(orders)

	const debouncedFetch = useCallback(
		debounce((search) => {
			fetchOrdersData(1, search);
		}, 600),
		[fetchOrdersData]
	);

	useEffect(() => {
		debouncedFetch(searchQuery);
		return debouncedFetch.cancel;
	}, [searchQuery]);

	useEffect(() => {
		fetchOrdersData();
		fetchServices();
		rejectReasons();
		loadPaystackScript();
	}, [statusFilter, searchQuery, serviceFilter, currentPage]);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= pagination.lastPage) {
			setCurrentPage(page);
		}
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1); // Reset to first page
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const confirmAction = (orderId, action, msg = 'This action cannot be undone.', amount = null) => {
		// Swal.fire({
		// 	title: 'Are you sure?',
		// 	text: msg,
		// 	icon: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonColor: '#3085d6',
		// 	cancelButtonColor: '#d33',
		// 	confirmButtonText: 'Yes, do it!',
		// }).then((result) => {
		// 	if (result.isConfirmed) {
		// 		if (action == 'accept') {
		// 			handleAccept(orderId, 2, amount);
		// 		} else if (action == 'payment') {
		// 			handlePayment(orderId, amount)
		// 		} else if (action == 'working') {
		// 			handleAccept(orderId, 3)
		// 		} else if (action == 'completed') {
		// 			handleAccept(orderId, 4)
		// 		} else if (action == 'confirm') {
		// 			handleAccept(orderId, 5)
		// 		} else if (action == 'cashpayment') {
		// 			handleCashPayment(orderId, amount)
		// 		} else if (action == 'cancel') {
		// 			handleAccept(orderId, 6)
		// 		}
		// 	}
		// });
		if (action == 'accept') {
			showCustomAlert({
				title: 'Accept Service Order',
				message: msg,
				confirmText: 'Yes, Proceed',
				onConfirm: () => handleAccept(orderId, 2, amount),
			});
		} else if (action == 'payment') {
			showCustomAlert({
				title: 'Confirm Payment',
				message: msg,
				confirmText: 'Yes, Proceed',
				onConfirm: () => handlePayment(orderId, amount),
			});

		} else if (action == 'working') {
			showCustomAlert({
				title: 'Service Delivery',
				message: msg,
				confirmText: 'Yes, Delivering',
				onConfirm: () => handleAccept(orderId, 3),
			});
		} else if (action == 'completed') {
			showCustomAlert({
				title: 'Service Completed',
				message: msg,
				confirmText: 'Yes, Completed',
				onConfirm: () => handleAccept(orderId, 4),
			});
		} else if (action == 'confirm') {
			showCustomAlert({
				title: 'Service Confirmation',
				message: msg,
				confirmText: 'Yes, Confirm',
				onConfirm: () => handleAccept(orderId, 5),
			});
		} else if (action == 'cashpayment') {
			showCustomAlert({
				title: 'Confirm Payment',
				message: msg,
				confirmText: 'Yes, Proceed',
				onConfirm: () => handlePayment(orderId, amount),
			});
		} else if (action == 'cancel') {
			// Swal.fire({
			// 	title: 'Are you sure?',
			// 	text: msg,
			// 	icon: 'warning',
			// 	showCancelButton: true,
			// 	confirmButtonColor: '#283890',
			// 	cancelButtonColor: '#d33',
			// 	confirmButtonText: 'Yes, do it!',
			// 	cancelButtonText: 'No'
			// }).then((result) => {
			// 	if (result.isConfirmed) {
			// 		handleAccept(orderId, 6)
			// 	}
			// });
			setSelectedReasons([]);
			setCustomReason('')
			setCancelDailog(true);
		}

	};

	const handleReasonToggle = (reasonId) => {
		setSelectedReasons(prevSelected => {
			if (prevSelected.includes(reasonId)) {
				return prevSelected.filter(id => id !== reasonId);
			} else {
				return [...prevSelected, reasonId];
			}
		});
	};

	const handleCancleSubmit = async () => {
		const cancellationData = {
			// selectedReasons: selectedReasons.map(id =>
			// 	reasons.find(reason => reason.id === id)
			// ),
			// selectedReasons: selectedReasons,
			// customReason: customReason,
			reject_reason: customReason, reject_reasons: selectedReasons, order_id: order?.id
		};

		if (selectedReasons.length < 1 && customReason === '') {
			toast.error('Please provide a reason')
		} else {
			Swal.fire({
				title: 'Are you sure?',
				text: 'This action will cancel your order!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#283890',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, do it!',
				cancelButtonText: 'No'
			}).then(async (result) => {
				if (result.isConfirmed) {
					setIsCancelled(true);
					try {
						const response = await cancelOrder(token, cancellationData);
						if (response.success == true) {
							Swal.fire('Done!', 'The order has been cancelled!', 'success');
							fetchOrdersData();
							setIsCancelled(false);
							setSelectedReasons([]);
							setCustomReason('')
							setCancelDailog(false);
							setOpenModal(false);
						} else {
							toast.error('Cancellation failed!')
							setIsCancelled(false);
							setSelectedReasons([]);
							setCustomReason('')
							setCancelDailog(false);
							setOpenModal(false);
						}
					} catch (error) {
						setIsCancelled(false);
						console.error('Error cancelling order:', error);
					}
				}
			});
		}
	};

	const confirmAcceptance = async (orderId) => {
		const { value: price } = await Swal.fire({
			title: `<div class="text-left" >Service Charge</div>`,
			html: `<span class="text-left" >Please enter the <b>service cost</b> for the requested job <b>excluding the cost of any additional 
					materials</b>. Material costs can be discussed separately with the client if needed. <br/>
					Kindly note that <b>setting a higher service cost may discourage the client from proceeding</b> 
					with your offer. We encourage you to quote fairly and competitively to increase your chances of being selected.</span> <br/> <br/> 
					Estimated Cost is <b>GHS ${order?.price.toFixed(2)}</b> `,
			input: 'number',
			// inputLabel: 'Estimated cost is GHS ' + order?.price,
			inputPlaceholder: 'Enter your cost here...',
			inputAttributes: {
				'aria-label': 'Enter your cost here',
				style: 'appearance: none; -moz-appearance: textfield;',
				min: order?.price,
			},
			showCancelButton: true,
			confirmButtonText: 'Accept Order!',
			cancelButtonText: 'Cancel Order',
			customClass: {
				popup: 'custom-swal-popup',
				input: 'custom-swal-input',
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button',
			},
			inputValidator: (value) => {
				if (!value) {
					return 'You need to provide an actual cost!';
				}
				if (value < order?.price) {
					return 'Actual cost can\'t be less than estimated cost!';
				}
			},
		});
		if (price) {
			confirmAction(orderId, 'accept', 'Accepting this order will notify the customer with the actual cost of the service as GHS ' + price, price)
		} else {
			// Handle cancel action
			confirmAction(orderId, 'cancel', 'Are you sure you want to cancel this order?');
		}
	};

	const handleAccept = async (orderId, state, price = null) => {
		if (state != 6) {
			setLoading({ ...loading, accepting: true, confirming: true, completing: true, working: true });

		} else {
			setIsCancelled(true);
		}
		try {
			const response = await acceptOrder(orderId, state, price, token);
			if (response.success == true) {

				setOrders((orders) =>
					orders.map((item) =>
						item.id === orderId ? { ...item, status: state, actual_fee: price } : item
					)
				);
				if (state == 2) {
					Swal.fire('Done!', 'Customer has been notified of your acceptance to make down payment.', 'success');
				} else if (state == 3) {
					Swal.fire('Done!', 'Customer has been notified that you are currently on site working.', 'success');
				} else if (state == 4) {
					Swal.fire('Done!', 'Customer has been notified of your service completion waiting for customer confirmation and balance payment.', 'success');
					fetchOrdersData()
				} else if (state == 5) {
					Swal.fire('Done!', 'Thank you for confirming the service completion. Kindly make the balance payment and leave a comment.', 'success');
					fetchOrdersData()
					handleViewOrder(orderId)
				} else if (state == 6) {
					Swal.fire('Done!', 'The order has been cancelled!', 'success');
					fetchOrdersData()
					handleViewOrder(orderId)
					setIsCancelled(false);
				}
				setOpenModal(false)
				setLoading({ ...loading, accepting: false, confirming: false, completing: false, working: false });
				setIsCancelled(false);
			} else {
				toast.error('Error Accepting Order')
				setLoading({ ...loading, accepting: false, confirming: false, completing: false, working: false });
				setIsCancelled(false);
			}
		} catch (error) {
			// console.log(error);

			toast.error('Error Communicating with server, try again or contact admin')
			setLoading({ ...loading, accepting: false, confirming: false, completing: false, working: false });
		}
	};

	const config = {
		reference: stableReference,
		email: "lorddj8@gmail.com",
		publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
		currency: 'GHS',
		amount: 100 * 100,
	};

	const handleCashPayment = async (orderId, amount) => {
		setIsOpen(false);
		setLoading({ ...loading, paying: true });
		try {
			const response = await makeCashPayment('service', orderId, amount, 1, token);
			console.log(response);

			if (response.success == true) {
				toast.success('Service payment successful!');
				fetchOrdersData();
			} else {
				toast.error('Service payment unsuccessful!');
			}
			setIsOpen(false);
			setOpenModal(false);
			setLoading({ ...loading, paying: false });
		} catch (error) {
			setIsOpen(false);
			setLoading({ ...loading, paying: false });
		}
	}

	const handlePayment = async (orderId, amount) => {
		// console.log(payMode);

		setIsOpen(false);
		setLoading({ ...loading, paying: true });
		try {
			const response = await makePayment('service', orderId, amount, payMode, token);

			if (settings.payment_gateway == 'paystack') {
				payWithPaystack(response?.data?.reference, response?.data?.payment?.id, amount);
			} else {
				if (settings.payment_type == 'redirect') {
					setIsOpen(false);
					setLoading({ ...loading, paying: false });
					window.open(response?.data?.payLink, '_blank', '');
					// window.open(response?.data?.payLink);
				} else {
					setPayUrl(response?.data?.payLink);
					setIsOpen(true);
					setLoading({ ...loading, paying: false });
				}
			}
		} catch (error) {
			setIsOpen(false);
			setLoading({ ...loading, paying: false });
		}
	}

	const payWithPaystack = (ref, id, amount) => {
		const handler = window.PaystackPop.setup({
			key: settings.paystack_public ?? 'pk_test_f7fabac74978f7d1edbdfc63a0856c37e8f45019',
			email: user?.email,
			amount: parseFloat(amount).toFixed(2) * 100,
			currency: "GHS",
			ref: ref,
			metadata: { 'reference': ref, 'payment_id': id },
			callback: function (response) {
				handlePaystackSuccessAction2(response.reference);
				// alert('Payment successful! Reference: ' + );
			},
			onClose: function () {
				// alert('');
				setLoading({ paying: false });
				toast.error('Transaction cancelled.');
			},
		});

		handler.openIframe();
	};

	const handleCancel = async (orderId) => {
		setIsCancelled(true);
		try {
			const response = await rejectBookings(orderId, token);
			if (response.success == true) {
				toast.success('Booking Cancelled Successfully');
				setOpenModal(false)
			} else {
				toast.error('Error Cancelling Booking')
				setIsCancelled(false)
			}
		} catch (error) {
			console.log(error)
		}
	};

	const handleViewOrder = (order) => {
		setOrder(order);

		const fee = order.actual_fee ?? order.price;

		let commission = (settings?.commission_type === 'percentage' && settings?.commission_percentage)
			? ((parseInt(settings?.commission_percentage) / 100) * parseFloat(fee)).toFixed(2)
			: (settings?.commission_fee || 0).toFixed(2);
		let amtPaid = order?.payments
			.filter(item => item.status === 2)
			.reduce((sum, item) => sum + item.amount, 0);

		let intital = ((parseInt(settings?.initial_deposit) / 100) * parseFloat(fee)).toFixed(2)

		if (order?.status <= 2 && amtPaid < 1) {
			setPayable(intital);
			setPaymentMode(1);
		} else {
			if (amtPaid < 1) {
				setPayable(commission);
				setPaymentMode(1);
			} else if (amtPaid >= commission) {
				setPaymentMode(2);
				setPayable(parseFloat(fee) - amtPaid)
			} else {
				setPaymentMode(2);
				setPayable(parseFloat(fee) - amtPaid)
			}
		}

		setAmountPaid(order?.payments
			.filter(item => item.status === 2)
			.reduce((sum, item) => sum + item.amount, 0));

		setOpenModal(true);
	}

	const handlePaystackSuccessAction2 = async (reference) => {
		try {
			const response = await paystackSuccess(reference, token);
			if (response.status == 'success') {
				fetchOrdersData()
				setLoading({ ...loading, paying: false });
				toast.success('Service payment successful!');
				setOpenModal(false);
				order?.status == 5 ? handleOpenReviewForm() : '';
			} else {
				setLoading({ ...loading, paying: false });
				toast.error('Service payment Error!');
				setOpenModal(false)
			}
		} catch (error) {
			setLoading({ ...loading, paying: false });
			console.log(error)
		}
	};

	const handlePaystackSuccessAction = async () => {
		try {
			const response = await paymentServices(values, key?.id, token);
			if (response.success == true) {
				toast.success('Service booked successfully');
				setOpenModal(false)
			}
		} catch (error) {
			console.log(error)
		}
	};

	const handlePaystackCloseAction = () => {
		// navigate('/services');
	};

	const handleOpenReviewForm = (id) => {
		Swal.fire({
			title: 'Leave a Review',
			html: `
				<div class="rating-container">
					<div id="stars-container" class="flex justify-center space-x-2 my-4">
						<span class="star cursor-pointer text-gray-300" data-value="1">★</span>
						<span class="star cursor-pointer text-gray-300" data-value="2">★</span>
						<span class="star cursor-pointer text-gray-300" data-value="3">★</span>
						<span class="star cursor-pointer text-gray-300" data-value="4">★</span>
						<span class="star cursor-pointer text-gray-300" data-value="5">★</span>
					</div>
					<p id="rating-text" class="text-center mb-4">Select a rating</p>
					<textarea id="review-content" class="w-full p-2 border border-gray-300 rounded" 
						placeholder="Share your experience with us..." rows="4"></textarea>
				</div>
			`,
			showCancelButton: true,
			confirmButtonText: 'Submit Review',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			didOpen: () => {
				const stars = document.querySelectorAll('.star');
				const ratingText = document.getElementById('rating-text');
				const ratingTexts = [
					'Select a rating',
					'Poor',
					'Fair',
					'Good',
					'Very Good',
					'Excellent'
				];

				let selectedRating = 0; // Track the selected rating

				stars.forEach(star => {
					star.addEventListener('click', () => {
						const value = parseInt(star.getAttribute('data-value'));
						selectedRating = value; // Update the selected rating
						updateStars(value);
						ratingText.textContent = ratingTexts[value];
					});

					star.addEventListener('mouseover', () => {
						const value = parseInt(star.getAttribute('data-value'));
						updateStars(value, true); // Temporarily update stars on hover
						ratingText.textContent = ratingTexts[value];
					});

					star.addEventListener('mouseout', () => {
						updateStars(selectedRating); // Reset to the selected rating
						ratingText.textContent = selectedRating > 0 ? ratingTexts[selectedRating] : ratingTexts[0];
					});
				});

				function updateStars(count, isHover = false) {
					stars.forEach((star, index) => {
						star.classList.remove('text-yellow-400', 'text-gray-300', 'selected');
						if (index < count) {
							star.classList.add('text-yellow-400');
							if (!isHover) star.classList.add('selected');
						} else {
							star.classList.add('text-gray-300');
						}
					});
				}
			},
			preConfirm: () => {
				const selectedStars = document.querySelectorAll('.star.selected').length;
				const reviewContent = document.getElementById('review-content').value;

				if (selectedStars === 0) {
					Swal.showValidationMessage('Please select a rating');
					return false;
				}

				return { rating: selectedStars, content: reviewContent };
			}
		}).then((result) => {
			if (result.isConfirmed) {
				const { rating, content } = result.value;

				// Handle the submitted review
				// console.log('Rating:', rating);
				// console.log('Review Content:', content);

				// Example: Send the review to the backend
				newReview({ rating: rating, order_id: id, comment: content, type: 1 });
			}
		});
	};

	const newReview = async (data) => {
		try {
			const response = await sendReview(data, token);
			if (response.status == true) {
				Swal.fire({
					icon: 'success',
					title: 'Thank You!',
					text: `Your ${data?.rating}-star review has been submitted.`,
					confirmButtonColor: '#3085d6'
				});
				fetchOrdersData()
			} else {
				toast.error('Review Error!');
			}
		} catch (error) {
			toast.error('Review Error!');
			// setLoading({ ...loading, paying: false });
			console.log(error)
		}
	};

	const email = "lorddj8@gmail.com"
	const name = "Lorddje "
	const amount = 100

	const componentProps = {
		...config,
		metadata: { name, email, amount },
		text: `Make payment`,
		onSuccess: handlePaystackSuccessAction,
		onClose: handlePaystackCloseAction,
	};

	const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
		initialValues: {
			reference: config?.reference
		},
		enableReinitialize: true,
	})

	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 mt-16 overflow-y-scroll h-[700px]'>
				<div className="w-100 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
					<div className='p-4 bg-[#FFFFFF] w-full'>
						<h1 className='text-2xl font-bold mb-6'>Requested Orders</h1>
						<div className="flex justify-between items-center mb-4">
							<div>
								<input
									type="text"
									value={searchQuery}
									onChange={handleSearchChange}
									placeholder={user.accountType == 'visitor' ? 'Search by service / provider' : 'Search by service / customer'}
									className="border border-gray-300 sm:w-full rounded px-3 py-2"
								/>
							</div>
							<div>
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="border border-gray-300 rounded w-50 sm:w-30 px-3 py-2"
								>
									<option value="">All Statuses</option>
									<option value="1">Pending Approval</option>
									<option value="2">Work Accepted</option>
									<option value="3">Work In Progress</option>
									<option value="4">Work Completed</option>
									<option value="5">Work Confirmed</option>
									<option value="6">Cancelled</option>
								</select>
							</div>
						</div>
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>ORDER ID</th>
										<th className='py-2 px-4 border-b text-center sm:hidden'>ORDER DETAILS</th>
										<th className='py-2 px-6 border-b text-center hidden md:table-cell'>
											{
												user?.accountType === 'visitor' ? (
													<>
														SERVICE PROVIDER
													</>
												) : (
													<>
														CUSTOMER
													</>
												)
											}
										</th>

										<th className='py-2 px-4 border-b text-center sm:hidden'>ACTIONS</th>
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>SERVICE</th>
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>
											DUE
										</th>
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>ESTIMATED COST</th>
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>ACTUAL COST</th>
										{/* <th className='py-2 px-4 border-b text-center'>AMOUNT PAID</th> */}
										<th className='py-2 px-4 border-b text-center hidden md:table-cell'>STATUS</th>
										{activeTab === 'completed' || activeTab === 'cancelled' ? (
											<></>
										) : (
											<th className='py-2 px-4 border-b text-center hidden md:table-cell'>ACTION</th>
										)}
									</tr>
								</thead>
								<tbody>
									{!loading.orders ? (
										<>
											{orders?.map((order, index) => (
												<tr key={index} onClick={() => handleViewOrder(order)} className='bg-white border-b dark:bg-gray-800 dark:border-gray- cursor-pointer hover:bg-gray-100 transition-colors text-left'>
													<td className='py-1 px-4 border-b text-left'>
														{order?.order_id}
														<div className='sm:hidden'>
															<hr className='mt-2 mb-2' />
															{
																user?.id === order?.user_id ? (
																	<>
																		{order.business?.business}
																	</>
																) : (
																	<>
																		{order.user?.profile?.name} <br /> <b>{order.user?.profile?.country_code + '-' + order.user?.profile?.phone}</b>
																	</>
																)
															}
															<hr className='mt-2 mb-2' />
															<b>GH₵ {order?.actual_fee ?? order?.price}</b>
														</div>
													</td>
													<td className='py-1 px-4 border-b text-left sm:hidden'>
														<button
															onClick={() => handleViewOrder(order)}
															className=' mt-2 me-2 bg-transparent hover:bg-blue-500 text-green-700 text-xs hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
															view
														</button>
														{
															order?.payments
																.filter(item => item.status === 2)
																.reduce((sum, item) => sum + item.amount, 0) > 0 && order?.status === 6 && order?.user_id === user?.id && (
																<button
																	// onClick={() => handleOpenReviewForm(order.id)}
																	className='bg-yellow-500 hover:bg-yellow-300 text-white text-xs hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded mt-2 '
																>
																	Refund
																</button>
															)
														}
														{
															order?.reviews.filter((review) => review.user_id === user?.id).length < 1 && order?.status >= 5 && (
																<button
																	onClick={() => handleOpenReviewForm(order.id)}
																	className='bg-transparent hover:bg-red-500 text-blue-700 text-xs hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-2 '
																>
																	review
																</button>
															)
														}
													</td>
													<td className='py-1 px-4 border-b text-left hidden md:table-cell'>
														{
															user?.id === order?.user_id ? (
																<>
																	{order.business?.business}
																</>
															) : (
																<>
																	{order.user?.profile?.name} <br /> <b>{order.user?.profile?.country_code + '-' + order.user?.profile?.phone}</b>
																</>
															)
														}
													</td>
													<td className='py-1 px-4 border-b text-left hidden md:table-cell'>{order.services?.title}</td>
													<td className='py-1 px-4 border-b text-left hidden md:table-cell'>
														{format(order.execution_date, 'dd/MM/yyyy')}
													</td>
													<td className='py-1 px-4 border-b text-left md:table-cell hidden'>GH₵ {order.price}</td>
													<td className='py-1 px-4 border-b text-left md:table-cell hidden'>GH₵ {order?.actual_fee}</td>
													<td className='py-1 px-4 border-b text-center md:table-cell hidden'>
														{
															order?.status === 1 && (
																<span className="inline-block bg-indigo-800 text-white text-xs font-medium p-1 rounded text-center">
																	Pending Approval
																</span>
															)
														}
														{
															order?.status === 2 && (
																<>
																	<span className="inline-block bg-blue-800 text-white text-xs font-medium p-1 rounded text-center">
																		Work Accepted
																	</span> <br />
																</>
															)
														}
														{
															order?.status === 2 && ((settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings?.commission_fee) > order?.payments
																.filter(item => item.status === 2)
																.reduce((sum, item) => sum + item.amount, 0)) && (
																<>
																	<span className='text-center text-xs text-red-700 text-bold' >
																		Waiting for down a {settings.initial_deposit}% payment of <br /><b>GHS {(settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings.commission_fee).toFixed(2)}</b>
																	</span> <br />
																</>
															)
														}
														{
															order?.status === 3 && (
																<span className="inline-block bg-yellow-800 text-white text-xs font-medium p-1 rounded text-center">
																	Work In Progress
																</span>
															)
														}
														{
															order?.status === 4 && (
																<span className="inline-block bg-green-500 text-white text-xs font-medium p-1 rounded text-center">
																	Work Completed
																</span>
															)
														}
														{
															order?.status === 5 && (
																<span className="inline-block bg-green-800 text-white text-xs font-medium p-1 rounded text-center">
																	Work Confirmed
																</span>
															)
														}
														{
															order?.status === 6 && (
																<span className="inline-block bg-red-800 text-white text-xs font-medium p-1 rounded text-center">
																	Cancelled
																</span>
															)
														}
													</td>
													{activeTab === 'completed' || activeTab === 'cancelled' ? (
														<></>
													) : (
														<td className='py-2 px-4 border-b text-center hidden md:table-cell'>
															<button
																onClick={() => handleViewOrder(order)}
																className=' mt-2 me-2 bg-transparent hover:bg-blue-500 text-green-700 text-xs hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
																view
															</button>
															{
																order?.payments
																	.filter(item => item.status === 2)
																	.reduce((sum, item) => sum + item.amount, 0) > 0 && order?.status === 6 && order?.user_id === user?.id && (
																	<button
																		// onClick={() => handleOpenReviewForm(order.id)}
																		className='bg-yellow-500 hover:bg-yellow-300 text-white text-xs hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded mt-2 '
																	>
																		Refund
																	</button>
																)
															}
															{
																order?.reviews.filter((review) => review.user_id === user?.id).length < 1 && order?.status >= 5 && (
																	<button
																		onClick={() => handleOpenReviewForm(order.id)}
																		className='bg-transparent hover:bg-red-500 text-blue-700 text-xs hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mt-2 '
																	>
																		review
																	</button>
																)
															}
														</td>
													)}
												</tr>
											))}
										</>

									) : (
										<>
											<tr>
												<td colSpan={6} className="text-center py-10" >
													<div className='justify-center' >
														<BounceLoader
															className='mt-3 text-center'
															color='#283890'
															loading={loading.orders}
															size={60}
															aria-label="Loading Spinner"
															data-testid="loader"
														/>
													</div>
												</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
							<div className="flex justify-between items-center mt-4">
								<button
									onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
								>
									Previous
								</button>
								<span className="text-gray-700">
									Page {pagination.currentPage} of {pagination.lastPage}
								</span>
								<button
									onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.lastPage}
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal show={cancelDailog} size={'xl'} onClose={() => setCancelDailog(false)}>
				<Modal.Header className='items-center text-center'>Cancel Order</Modal.Header>
				<Modal.Body className="p-0 rounded-xl" style={{ backgroundColor: 'white' }}>
					<div className='p-3' >
						<div className="text-center">
							<span className='text-lg' >Let us know why {`you're`} cancelling this order. CLick all that apply.</span>
						</div>
						<div className="flex items-center justify-center mt-3">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								{
									order?.user_id == user?.id ? (
										<>
											{reasons?.filter((reason) => reason.reason_for === 2 || reason.reason_for === 3).map((reason) => (
												<div key={reason.id} className="flex items-center space-x-3">
													<div
														className={`w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer
                						${selectedReasons.includes(reason.id) ? 'border-2 border-blue-500' : 'border-gray-400'}`}
														onClick={() => handleReasonToggle(reason.id)}
													>
														{selectedReasons.includes(reason.id) && (
															<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
														)}
													</div>
													<label className="text-gray-700 cursor-pointer" onClick={() => handleReasonToggle(reason.id)}>
														{reason.reason}
													</label>
												</div>
											))}
										</>

									) : (
										<>
											{reasons?.filter((reason) => reason.reason_for === 1 || reason.reason_for === 3).map((reason) => (
												<div key={reason.id} className="flex items-center space-x-3">
													<div
														className={`w-5 h-5 border rounded-full flex items-center justify-center cursor-pointer
                						${selectedReasons.includes(reason.id) ? 'border-2 border-blue-500' : 'border-gray-400'}`}
														onClick={() => handleReasonToggle(reason.id)}
													>
														{selectedReasons.includes(reason.id) && (
															<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
														)}
													</div>
													<label className="text-gray-700 cursor-pointer" onClick={() => handleReasonToggle(reason.id)}>
														{reason.reason}
													</label>
												</div>
											))}
										</>
									)
								}

							</div>
						</div>
						<div className="mb-6">
							<p className="text-sm text-center text-gray-600 mb-2">Type your own reason</p>
							<input
								type="text"
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g. Don't like the compound"
								value={customReason}
								onChange={(e) => setCustomReason(e.target.value)}
							/>
						</div>

						<div className="text-center">
							<button
								onClick={handleCancleSubmit}
								className="bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-8 rounded-full min-w-48"
							>
								{isCancelled === true ? (<><ImSpinner9 className="animate-spin" /><span className="ml-2">Cancelling...</span></>) : (<><span className="ml-3">Cancel Booking</span></>)}

								{/* Cancel Booking */}
							</button>
						</div>
					</div>

				</Modal.Body>
			</Modal>

			<Modal show={isOpen} size={'xl'} onClose={() => setIsOpen(false)}>
				<Modal.Header className='items-center'>Service Payment</Modal.Header>
				<Modal.Body className="p-0 rounded-xl" style={{ backgroundColor: 'white' }}>
					<div className="flex items-center justify-center">
						<iframe
							style={{ height: '36rem' }}
							src={payUrl}
							title="Hubtel Payment"
							className="w-full border-0"
						/>
					</div>
				</Modal.Body>
			</Modal>

			<Modal show={openModal} size={'xl'} onClose={() => setOpenModal(false)}>
				<Modal.Header className='items-center'>Booked Service For <b>{order?.services?.title}</b> </Modal.Header>
				<Modal.Body className="rounded-xl" style={{ height: 'auto', backgroundColor: 'white' }}>
					{
						order ? (
							<>
								{
									order?.user_id === user?.id ? (
										<>
											{
												order?.status != 6 ? (
													<div className="p-4 max-w-xl mx-auto dark:bg-gray-800">
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 2 ? <ProgressChecked /> : <ProgressUnchecked />}
																<div className={`h-full w-px ${order?.status >= 2 ? 'bg-green-600' : 'bg-red-300 '} dark:bg-slate-500`}></div>
															</div>
															<div className="pt-1 pb-8">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Request Accepted</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">The service provider has accepted to work <br /> and will begin preparations soon.
																</p>
															</div>
														</div>
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 2 ? <ProgressChecked /> : <ProgressUnchecked />}
																<div className={`h-full w-px ${order?.status >= 2 ? 'bg-green-600' : 'bg-red-300 '} dark:bg-slate-500`}></div>
															</div>
															<div className="pt-1 pb-8">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Preparing For Service</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">
																	The service provider is getting ready and organizing<br /> tools for the task.
																</p>
															</div>
														</div>
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 2 && amountPaid > 0 ? <ProgressChecked /> : <ProgressUnchecked />}
																<div className={`h-full w-px ${order?.status >= 2 ? 'bg-green-600' : 'bg-red-300 '} dark:bg-slate-500`}></div>
															</div>
															<div className="pt-1 pb-8">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Gathering Materials</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">
																	Materials and necessary details are being acquired to <br /> ensure quality service.
																</p>
															</div>
														</div>
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 3 ? <ProgressChecked /> : <ProgressUnchecked />}
																<div className={`h-full w-px ${order?.status >= 3 ? 'bg-green-600' : 'bg-red-300 '} dark:bg-slate-500`}></div>
															</div>
															<div className="pt-1 pb-8">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Service in Progress</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">
																	Work has started. The provider is currently delivering <br />the service.
																</p>
															</div>
														</div>
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 4 ? <ProgressChecked /> : <ProgressUnchecked />}
																<div className={`h-full w-px ${order?.status >= 3 ? 'bg-green-600' : 'bg-red-300 '} dark:bg-slate-500`}></div>
															</div>
															<div className="pt-1 pb-8">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Work Completed</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">
																	The provider has completed the service and is awaiting <br />your confirmation.
																	{
																		order?.status === 4 && (
																			<>
																				<br />
																				<button
																					onClick={() => confirmAction(order?.id, 'confirm', 'Confrim that you are statisfied with the service and pay the balance.')}
																					type="button"
																					className="bg-transparent border border-bg-color hover:bg-bg-color hover:text-white text-bg-color font-bold mt-4 py-1.5 px-4 rounded-xl"
																				>
																					{loading.confirming ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Confirming...</span></>) : (<><span className="ml-3">Confirm service completion</span></>)}


																				</button>
																			</>
																		)
																	}
																</p>
															</div>
														</div>
														<div className="flex">
															<div className="mr-4 flex flex-col items-center">
																{order?.status >= 5 ? <ProgressChecked /> : <ProgressUnchecked />}
															</div>
															<div className="pt-1 ">
																<p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Completion Confirmed</p>
																<p className="text-gray-600 dark:text-slate-400 text-xs">
																	You have confirmed the service completion. Thank you <br />
																	for using OShelter!
																</p>
															</div>
														</div>
														{/* <hr /> */}
														{
															order.status > 1 && (
																<>
																	<div className='mt-3 text-center bg-blue-100 rounded-lg p-1' >
																		<table style={{ width: '100%' }} >
																			<tbody>
																				<tr>
																					<td>Cost</td>
																					<td>Amount Paid</td>
																				</tr>
																				<tr>
																					<td><b>GHc {order.actual_fee ?? order.price}</b> </td>
																					<td><b>GHc {
																						parseFloat(order?.payments
																							.filter(item => item.status === 2)
																							.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)
																					}</b>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>

																</>
															)
														}
													</div>
												) : (
													<div className='text-center' >
														<span className='text-xl text-red-600 font-bold' >This order was cancelled {order?.cancelled_by === 1 ? 'by the service provider' : 'by yourself'} !!!</span> <br />
														<hr className='mb-2 mt-2' />
														<span className='font-bold' >Reasons for Cancellation</span>
														<div className="flex items-center justify-center mt-3">
															<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
																{order?.reject_reasons_details?.map((reason, index) => (
																	<div key={reason.id} className="flex items-center space-x-3">
																		<div
																			className={`w-5 h-5 border rounded-full flex items-center justify-center border-blue-500`}
																		>
																			<span className='text-red-500 text-xs' >{++index}</span>
																		</div>
																		<label className="text-gray-700">
																			{reason.reason}
																		</label>
																	</div>
																))}
															</div>
														</div>
														<hr className='mt-2 mb-2' />
														{
															order?.reject_reason && (
																<>
																	<span className='font-bold' >Other Reason</span>
																	<div className="text-left">
																		<span className='mb-2' >{order?.reject_reason}</span>
																	</div>
																	<hr className='mt-2 mb-2' />
																</>
															)
														}

														<span className='mt-2' >Visit <Link className='text-blue-600 font-bold' to={'/services'} >here</Link> to book another service.</span> <br />
														{
															amountPaid > 0 && (
																<button className='bg-green-500 hover:bg-green-300 text-white text-sm hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded mt-2 ' >Request For a Refund</button>
															)
														}
													</div>
												)
											}
										</>
									) : (
										<>
											{
												order?.status == 6 ? (
													<div className='text-center' >
														<span className='text-xl text-red-600 font-bold' >This order was cancelled {order?.cancelled_by === 2 ? 'by the service provider' : 'by yourself'} !!!</span> <br />
														<hr className='mb-2 mt-2' />
														<span className='font-bold' >Reasons for Cancellation</span>
														<div className="flex items-center justify-center mt-3">
															<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
																{order?.reject_reasons_details?.map((reason, index) => (
																	<div key={reason.id} className="flex items-center space-x-3">
																		<div
																			className={`w-5 h-5 border rounded-full flex items-center justify-center border-blue-500`}
																		>
																			<span className='text-red-500 text-xs' >{++index}</span>
																		</div>
																		<label className="text-gray-700 ">
																			{reason.reason}
																		</label>
																	</div>
																))}
															</div>
														</div>
														<hr className='mt-2 mb-2' />
														{
															order?.reject_reason && (
																<>
																	<span className='font-bold' >Other Reason</span>
																	<div className="text-left">
																		<span className='mb-2' >{order?.reject_reason}</span>
																	</div>
																</>
															)
														}
													</div>
												) : (
													<div className="row">
														<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
															Requested By:
														</p>
														<h6 className="text-md font-semibold text-gray-900 dark:text-white mb-5">
															{order.user?.profile?.name}
														</h6>
														<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
															Mobile Number:
														</p>
														<h6 className="text-md font-semibold text-gray-900 dark:text-white mb-5">
															{order.user?.profile?.country_code}-{order.user?.profile?.phone}
														</h6>
														<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
															Service Requested:
														</p>
														<h6 className="text-md font-semibold text-gray-900 dark:text-white mb-5">
															{order.services?.title}
														</h6>
														<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
															Customer Location:
														</p>
														<h6 className="text-md font-semibold text-gray-900 dark:text-white mb-5">
															{order.user?.profile?.address}
														</h6>
														<hr />
														{
															order.status > 1 && (
																<>
																	<h6 className="text-md font-semibold text-gray-900 dark:text-white">
																		Cost of work
																	</h6>
																	<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
																		GHc {order.actual_fee ?? order.price}
																	</p>
																	<h6 className="text-md font-semibold text-gray-900 dark:text-white">
																		Amount Paid
																	</h6>
																	<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-5">
																		GHc {
																			parseFloat(order?.payments
																				.filter(item => item.status === 2)
																				.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)
																		}
																	</p>

																	<h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
																		Customer Note
																	</h6>
																	<p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
																		{order?.note}
																	</p>
																</>
															)
														}
													</div>
												)
											}
										</>
									)
								}
							</>
						) : (
							<>
								<div className="p-6 flex items-center justify-center">
									<ClipLoader size={35} color="#283890" />
								</div>
							</>
						)
					}
					<hr className='mb-2 mt-3' />
					<div className='text-center mb-3' >
						{
							order?.user_id !== user?.id ? (
								<>
									{
										order?.status === 4 && (
											<span className='text-center text-red-800 text-bold' >
												Waiting for customer to confirm job done!
											</span>
										)
									}
									{
										order?.status === 5 && (
											<span className='text-center text-green-800 text-bold' >
												Customer has confirmed job done!
											</span>
										)
									}
									{
										order?.status === 2 && ((settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings?.commission_fee) > order?.payments
											.filter(item => item.status === 2)
											.reduce((sum, item) => sum + item.amount, 0)) && (
											<>
												<span className='text-center text-red-700 text-bold' >
													Waiting for customer to make a <b>{settings?.initial_deposit}%</b> down payment  <br /><b>GHS {(settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings.commission_fee).toFixed(2)}</b>
												</span> <br />
											</>
										)
									}

								</>
							) : (
								<>
									{
										order?.status === 2 && ((settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings?.commission_fee) > order?.payments
											.filter(item => item.status === 2)
											.reduce((sum, item) => sum + item.amount, 0)) && (
											<>
												<span className='text-center text-red-700 text-bold' >
													Service provider is waiting for a <b>{settings?.initial_deposit}%</b> down payment of <br /><b>GHS {(settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings.commission_fee).toFixed(2)}</b>
												</span> <br />
											</>
										)
									}
									{
										order.status === 5 && parseFloat(amountPayable).toFixed(2) < parseFloat(order.actual_fee ?? order.price).toFixed(2) && parseFloat(amountPayable).toFixed(2) != 0.00 && (
											<>
												<span className='text-center text-red-700 text-bold' >
													Kindly make the balance payment of <br /><b>GHS {amountPayable.toFixed(2)}</b> to the Service Provider
												</span> <br />
											</>
										)
									}
								</>
							)}
					</div>
					<div className="flex justify-end">
						{
							order?.user_id !== user?.id ? (
								<>
									{
										order?.status === 1 && (
											<>
												<button
													// onClick={() => confirmAction(order?.id, 'accept', 'Accepting this order will notify the customer.')}
													onClick={() => confirmAcceptance(order?.id)}
													type="button"
													className={`text-white flex items-center bg-green-800 font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.accepting ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Accepting Order ...</span></>) : (<><span className="ml-3">Accept Order</span></>)}

													{/* <span className="ml-3">Accept Order</span> */}
												</button>

											</>
										)
									}
									{
										order?.status === 2 && ((settings?.commission_type == 'percentage' ? ((parseInt(settings.initial_deposit) / 100) * parseFloat(order.actual_fee ?? order.price)) : settings?.commission_fee) <= order?.payments
											.filter(item => item.status === 2)
											.reduce((sum, item) => sum + item.amount, 0)) && (
											<>
												<button
													onClick={() => confirmAction(order?.id, 'working', 'Confirm that you are currently on site providing the service for the customer.!')}
													type="button"
													className={`text-white flex items-center bg-yellow-500 font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.working ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Confirming...</span></>) : (<><span className="ml-3">Providing Serve</span></>)}

													{/* <span className="ml-3">Working On Order</span> */}
												</button>
											</>
										)
									}
									{
										order?.status === 3 && (
											<>
												<button
													onClick={() => confirmAction(order?.id, 'completed', 'Confrim that you have successfully completed the service provision.')}
													type="button"
													className={`text-white flex items-center bg-green-800 font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.completing ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Confirming...</span></>) : (<><span className="ml-3">Completed</span></>)}
													{/* <span className="ml-3">Completed</span> */}
												</button>
											</>
										)
									}
									{
										order.status === 4 && parseFloat(amountPayable).toFixed(2) < parseFloat(order.actual_fee ?? order.price).toFixed(2) && parseFloat(amountPayable).toFixed(2) != 0.00 && user.accountType !== 'visitor' && (
											<>
												<button
													type="button"
													onClick={() => confirmAction(order?.id, 'cashpayment', 'Confirm cash collection of payment of GHS ' + parseFloat(amountPayable).toFixed(2), amountPayable)}
													disabled={loading.paying}
													className={`text-white flex items-center ${loading.paying === true ? 'bg-green-300' : 'bg-green-500'} font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.paying === true ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Initiating Payment...</span></>) : (<><span className="ml-3">Collect Cash</span></>)}
												</button>
											</>
										)
									}

								</>
							) : (
								<>
									{
										order.status === 4 && parseFloat(amountPayable).toFixed(2) < parseFloat(order.actual_fee ?? order.price).toFixed(2) && parseFloat(amountPayable).toFixed(2) != 0.00 && user.accountType == 'visitor' && (
											<>
												<button
													type="button"
													onClick={() => confirmAction(order?.id, 'payment', 'Confirm payment of GHS ' + parseFloat(amountPayable).toFixed(2), amountPayable)}
													disabled={loading.paying}
													className={`text-white flex items-center ${loading.paying === true ? 'bg-yellow-300' : 'bg-yellow-500'} font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.paying === true ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Initiating Payment...</span></>) : (<><span className="ml-3">Pay Balance</span></>)}
												</button>
											</>
										)
									}
								</>
							)
						}
						{
							order?.status < 4 && (
								<>
									{
										order.status === 2 && order?.user_id == user?.id && (
											<>
												<button
													type="button"
													onClick={() => confirmAction(order?.id, 'payment', 'Confirm payment of GHS ' + parseFloat(amountPayable).toFixed(2), amountPayable)}
													disabled={loading.paying}
													className={`text-white flex items-center ${loading.paying === true ? 'bg-yellow-300' : 'bg-yellow-500'} font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 me-2`}>
													{loading.paying === true ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Initiating Payment...</span></>) : (<><span className="ml-3">Make Payment</span></>)}
												</button>
												{/* <PaystackButton
																{...componentProps}
																className='bg-yellow-500 flex items-center font-medium text-sm text-white px-5 py-2 rounded-lg text-center me-2'
															/> */}
											</>
										)
									}
									<button
										type="button"
										// onClick={() => handleCancel(order?.id)}
										onClick={() => confirmAction(order?.id, 'cancel', 'Are you sure you want to cancel this reservation?')}
										disabled={isCancelled}
										className={`text-white flex items-center ${isCancelled === true ? 'bg-red-500' : 'bg-red-800'} font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}>
										{isCancelled === true ? (<><ImSpinner9 className="animate-spin" /><span className="ml-3">Cancelling booking</span></>) : (<><span className="ml-3">Cancel Booking</span></>)}
									</button>
								</>
							)
						}
					</div>
				</Modal.Body>
			</Modal>
		</div >
	);
};

export default Orders;