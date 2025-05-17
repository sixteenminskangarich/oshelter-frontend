/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import ServiceDetail from '../services/ServiceDetail';
import SimilarServices from '../services/SimilarServices';
import SideImage from '../../banner/SideImage';
import AddsBanner from '../../banner/AddsBanner';
import BookingDrawer from '../../bookings/BookingDrawer';
import Spinner from '../../Spinner';
import { useQuery } from 'react-query';
import { getServiceById } from '../../../utils/request';
import electronic from '../../../assets/images/building.jpg';
import serviceAds from '../../../assets/images/servicePage.jpg'
import cleaning from '../../../assets/images/cleaning.jpg'
import { toast } from 'react-toastify';
import { Modal } from "flowbite-react";
import { ImSpinner9 } from 'react-icons/im';
import { PiWarningCircleBold } from "react-icons/pi";
import { checkIfServiceBooked } from '../../../utils/ServicesQueries';
import { useSelector } from 'react-redux';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { htmlConverterReact } from 'html-converter-react';
import lock from '../../../assets/images/lock.png';
import ImageSlider from '../../cards/image/ImageSlider';

export default function DetailServicePage() {
	const { id } = useParams();
	const [openModal, setOpenModal] = useState(false);
	const [modalSize, setModalSize] = useState('xl');
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const [isLoading, setIsLoading] = useState(false)
	const [showDrawer, setShowDrawer] = useState(false);
	const [error, setError] = useState(null);
	const location = useLocation();

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
		setOpenModal(false)
	};

	const isServiceBooked = async() => {
		// Assuming you have a way to check booked services, e.g., a list of booked service IDs
		const response = await checkIfServiceBooked(id, token);
		if (response?.success === true) {
			toast.error('You have already booked this service. Please check your bookings for more details.');
			setOpenModal(false);
		}else {
			setShowDrawer(true);
			setOpenModal(false);
		}	
	};

	const serviceData = useQuery(['service', id], async () => {
		return await getServiceById(id);
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!serviceData && !serviceData.isLoading) {
		return (
			<h1 className='text-center text-2xl font-bold mt-10'>
				Service not Found
			</h1>
		);
	}
	
	let w = window.innerWidth;
	const images = [
		serviceData.data?.data?.images,
		electronic,
		cleaning,
		serviceAds
	];

	console.log(serviceData?.data?.data)

	const dateString = serviceData?.data?.data?.created_at;
	const date = new Date(dateString);
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	const hour = String(date.getUTCHours()).padStart(2, '0');
	const minute = String(date.getUTCMinutes()).padStart(2, '0');
	const formattedDate = `${month}/${day} at ${hour}:${minute}`;

	const description = htmlConverterReact(serviceData.data?.data?.description)

	console.log(serviceData?.data)

	return (
		<div className='pt-4'>
			{serviceData.isLoading && <Spinner loading={serviceData.isLoading} />}
			{!serviceData.isLoading && serviceData.data && (
				<>
					<div className="container mx-auto p-2 xl:mt-20 lg:mt-20 mt-6" style={{ fontFamily: '"Josefin Sans"' }}>
						<div className=''>
							<div className="row">
								<h1 className='xl:text-2xl lg:text-2xl text-md text-bg-color mb-2' style={{ fontSize: '30px' }}>{serviceData?.data?.data?.title}</h1>
								<div className="flex xl:text-xl lg:text-xl text-md">
									Published on {formattedDate}
								</div>

								<div className='flex md:flex-row text-sm text-light-gray xl:mb-4 lg:mb-4 -mt-5 mb-2 justify-end items-end bottom-3'>
									<span className='flex xl:text-xl lg:text-xl text-md'>
										<span className="flex items-end" ><FaMapMarkerAlt className='ml-2 mb-1 md:ml-48 text-md' /> {serviceData?.data?.data?.location.region}, {serviceData?.data?.data?.location.city}</span>
									</span>
								</div>
							</div>
						</div>
						<div className='lg:flex lg:space-x-8'>
							{/* Left Section */}
							<div className=' md:w-full lg:w-full'>
								{ w <= 789 ?
									<>
										<ImageSlider images={images}/>	
									</>
								: 
									<>
										<div className='flex flex-col md:flex-row'>
											<Gallery>
												<Item
													original={serviceData.data?.data?.images}
													thumbnail={serviceData.data?.data?.images}
													width="1024"
													height="768"
												>
													{({ ref, open }) => (
														<img 
															ref={ref} 
															onClick={open} 
															src={serviceData.data?.data?.images} 
															className='rounded-lg w-full h-96 object-cover lg:w-3/5 md:w-2/3 mb-4 md:mb-0'
														/>
													)}
												</Item>
		
												<div className='grid grid-cols-2 gap-1 md:w-2/3 ml-2'>
													{images.map((image, index) => (
														<Item
															key={index}
															original={image}
															thumbnail={image}
															width="1024"
															height="768"
														>
															{({ ref, open }) => (
																<img
																	ref={ref}
																	onClick={open}
																	src={image}
																	className='rounded-lg w-full h-48 object-cover'
																/>
															)}
														</Item>
													))}
												</div>
											</Gallery>
										</div>
									</>
								}
								<div className="relative flex bottom-12 justify-end items-end">
									<span className="mx-2">
										<span className="bg-white text-black me-2 px-2.5 py-1 rounded-lg dark:bg-gray-700 text-lg font-medium">{images.length} pictures</span>  
									</span>
								</div>
							</div>
						</div>

						<div className='font-josefin-sans bg-white rounded-lg flex flex-col md:flex-row'>
							<div className="xl:flex lg:flex">
								<div className="xl:w-[700px] lg:w-2/3 w-full">
									<div className="xl:mt-8 lg:mt-8 -mt-3">
										<div className="flex">
											<div className='mb-4 text-sm text-gray-500'>
												<p className='text-xl text-gray-500'>Price</p>
												<h2 className='text-xl font-bold text-bg-color' style={{ fontSize: '30px' }}>GH₵ {serviceData.data?.data?.price}</h2>
											</div>
											<div className="mb-4 relative xl:left-[60%] md:left-[60%] left-[25%]">
												<p className='text-xl text-gray-500'>Category</p>
												<h2 className='text-xl font-bold text-bg-color' style={{ fontSize: '30px' }}>{serviceData.data?.data?.Category}</h2>
											</div>
										</div>
										<div className="container">
											<p className='text-xl text-bg-color font-bold'>Description</p>
											{description}
										</div>
										<div className="hidden xl:flex lg:flex justify-end items-end mt-[80px]">
											<button
												onClick={() => setOpenModal(true)}
												className='bg-bg-color text-white px-16 py-2 rounded-lg font-medium'
												>
												Book service
											</button>
										</div>
									</div>
								</div>

								<div className="xl:w-[400px] lg:w-1/3 w-full mt-6">
									<div className='w-full xl:h-796 lg:h-796 p-1 xl:ml-6 lg:ml-6'>
										<div className='xl:p-6 lg:p-4 flex xl:block lg:block rounded-lg mb-4 bg-gray-100'>
											<div className="flex justify-center items-center">
												<div className="xl:grid lg:grid flex">
													<img
														src="https://images.pexels.com/photos/4659442/pexels-photo-4659442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
														alt={serviceData.data?.business?.business}
														className='xl:rounded-md lg:rounded-md rounded-md xl:h-36 xl:w-36 lg:h-36 lg:w-36 w-20 h-20 xs:ml-10 xs:mr-10 mr-2 flex justify-center items-center mb-2 xl:ml-12 lg:m-12 border-2'
													/>
													<div className="mt-4 mr-5 relative xl:left-[50px] lg:left-[50px] md:left-[100px] xl:-mt-4 lg:-mt-4">
														<h3 className='xl:text-3xl lg:text-3xl md:2xl text-md font-medium text-[#283890]'>
															<Link to={`/services/${serviceData?.data?.data?.business?.id}`}>{serviceData.data?.data.business.business}</Link>
														</h3>
														<p className='xl:text-xl lg:text-xl text-md text-gray-500 mb-2'>
															{serviceData?.data?.data.location?.region}, {serviceData.data?.data.location?.city}
														</p>
													</div>
													<p className='xl:text-lg lg:text-lg relative xl:left-[50px] lg:left-[50px] md:left-[200px] text-sm hidden xl:block lg:block text-light-gray mb-2'>
														{serviceData.data?.data.ratingAverage} ({serviceData.data?.data.views} views)
													</p>
													<button
														onClick={() => setOpenModal(true)}
														className='bg-bg-color text-white p-3 mt-6 h-10 text-sm rounded-lg font-medium md:w-32 relative xl:left-[50px] lg:left-[50px] md:left-[200px] xl:mt-4 lg:-mt-4 mb-4'
													>
														Book service
													</button>
												</div>
											</div>
										</div>
			
										<div className='p-4 rounded-md mb-32 border-2 bg-[#C9DCF9]'>
											<div className="xl:flex-col flex justify-center items-center">
												<img
													src={lock}
													alt="Escrow"
													className="xl:w-24 xl:h-24 lg:w-24 lg:h-24 w-16 h-16"
												/>
												<p className="xl:mr-6 xl:ml-4 lg:mr-6 flex justify-center items-center lg:ml-4 mr-6 ml-2 mt-2 text-bold xl:text-lg lg:text-lg text-xs relative xl:-right-6">
													Pay with <br /> Oshelter Escrow
												</p>

												<hr className="hidden xl:flex lg:flex py-[1px] my-1 bg-black mb-6"/>
												<p className="xl:text-center lg:text-center xl:text-xl lg:text-xl float-end text-black text-sm font-josefin-sans xl:mb-8">
													Your payment is safe in escrow, only released when the job is done
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="xl:w-[390px] lg:w-1/3 xl:mt-6 xl:ml-8 lg:mt-6 lg:ml-8 -mt-[100px]">
									<div className="row">
										<div className="flex xl:h-[1180px] lg:h-1/2 py-24 bg-gray-100 border-2 rounded-md xl:mb-0 mb-[120px]" style={{ backgroundImage: `url(${serviceAds})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
										
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* <div className='flex lg:flex-row lg:pl-14 m-2'>
							<ServiceDetail
								service={serviceData.data}
								handleClick={() => setOpenModal(true)}
								similarServices={serviceData.data.similarServices}
							/>
							<div className='lg:w-1/5 xl:w-1/5 w-full xl:h-screen lg:h-screen flex flex-col items-center xl:ml-10 lg:ml-10 xl:mt-20 lg:mt-20 xl:mb-10 -mt-24'>
								<div className="flex w-full xl:h-1/2 lg:h-1/2 py-24 bg-gray-100 border-2 rounded-md xl:mb-0 mb-20" style={{ backgroundImage: `url(${serviceAds})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
									
								</div>

								<div className="hidden xl:flex lg:flex w-full h-1/2 mt-3 bg-gray-100 border-2 rounded-md" style={{ backgroundImage: `url(${cleaning})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
								
								</div>
							</div>
						</div> */}

						<SimilarServices
							services={serviceData.data.similarServices}
							service={serviceData.data}
						/>
					</div>
					<BookingDrawer
						showDrawer={showDrawer}
						toggleDrawer={toggleDrawer}
						service={serviceData.data}
					/>

					<Modal show={openModal} className="bg-bg-color" size={modalSize} onClose={() => setOpenModal(false)}>
						<Modal.Body className="scrollable h-[750px] font-josefin-sans">
							<h1 className="text-xl text-dark flex font-bold"><PiWarningCircleBold className="mt-1" />&nbsp;Book with Confidence – Your Payment is Secure</h1>
							<hr className="py-[1.5px] mb-4 mt-[8px] rounded-full bg-blue-800 w-[80px] relative left-4"/>
							Before you proceed with your booking, we want to assure you that your payment is fully protected by our escrow system. This means the service provider will only receive payment after the job is completed to your satisfaction.
							<br /><br />
							Your funds remain secure until you confirm that the service has been successfully delivered. If any issues arise, our support team is here to assist you.

							Book with confidence and enjoy a hassle-free experience.
							<div className="flex">
								{!user ? (
									<Link
										to={`/login?redirect=${location.pathname}`}
										className={`text-white flex mt-6 ${isLoading === true ? 'bg-blue-500' : 'bg-blue-800'} hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
										Login to continue
									</Link>
								) : (
									<button 
										type="button"
										onClick={isServiceBooked}
										className={`text-white flex mt-6 ${isLoading === true ? 'bg-blue-500' : 'bg-blue-800'} hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
										{isLoading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Requesting for tour</span></>) : (<><span className="ml-3">Continue</span></>)}
									</button>
								)}
								&nbsp;
								<button
									type="button"
									className={`text-white flex mt-6 ${isLoading === true ? 'bg-blue-500' : 'bg-red-800'} hover:border-red-800 hover:border-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
									onClick={() => setOpenModal(false)}>
									Cancel
								</button>
							</div>
						</Modal.Body>
					</Modal>
				</>
			)}
		</div>
	);
}