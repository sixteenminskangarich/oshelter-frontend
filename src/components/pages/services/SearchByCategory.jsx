/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';

import {
	faShower,
	faTruck,
	faCamera,
	faPaintRoller,
	faBroom,
	faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import { getAllServices, getServiceByCategory } from '../../../utils/request';
import axios from 'axios';
import { FaEye, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Spinner from '../../Spinner';

const categories = [
	{ label: 'Plumbing', icon: faShower, color: '#283890' },
	{ label: 'Logistics', icon: faTruck, color: '#283890' },
	{ label: 'Photography', icon: faCamera, color: '#283890' },
	{ label: 'Painting', icon: faPaintRoller, color: '#283890' },
	{ label: 'Cleaning', icon: faBroom, color: '#283890' },
	{ label: 'Surveying', icon: faClipboardCheck, color: '#283890' },
];

const SortByCategory = () => {
	const [test] = useSearchParams();
	const category = test.get('key');

	const navigate = useNavigate();

	const categoryData = useQuery({
		queryKey: ['catagories', category],
		queryFn: async () => {
			const response = await axios.get(
				`${
					import.meta.env.VITE_APP_SERVICE_URL
				}/services/services/category?key=${category}`
			);

			return response.data.data;
		},
	});

	const handleNavigate = (query) => {
		navigate(`/services/categories?key=${query}`);
	};

	{
		categoryData.isLoading && <Spinner loading={categoryData.isLoading} />;
	}

	return (
		<div className='min-h-screen bg-gray-100 p-4 mt-10'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
				{/* Left Sidebar */}
				<div className='lg:col-span-3 space-y-4'>
					<div className='bg-white p-4 shadow rounded-lg'>
						<h2 className='font-bold mb-4'>Categories</h2>
						<div className='grid grid-cols-2 gap-4  m-2'>
							{categories.map((category) => (
								<div
									key={category.label}
									onClick={() => handleNavigate(category.label)}
									className='bg-category-icons shadow-lg flex hover:cursor-pointer mb-2 p-4  flex-col items-center space-y-2'>
									<div className='w-16 h-16 flex items-center justify-center rounded-full text-bg-color'>
										<FontAwesomeIcon icon={category.icon} size='2x' />
									</div>
									<span className='text-center text-xs lg:text-base'>
										{category.label}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='flex items-center justify-center'>
						<div className='bg-category-icons w-full h-full '>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
							ADDS
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='lg:col-span-5 space-y-4'>
					<div className='bg-white p-4 shadow rounded-lg mb-4'>
						<h2 className='font-bold text-lg'>{category} services</h2>
					</div>
					{categoryData?.data?.length > 0 ? (
						<div className='space-y-4'>
							{categoryData.data?.map((service) => (
								<Link
									to={`/services/detail-service/${service.id}`}
									key={service.id}
									className='bg-white shadow rounded-lg overflow-hidden flex flex-col lg:flex-row'>
									<img
										src={service.images}
										alt='Service'
										className='w-full h-48 lg:w-1/3 lg:h-auto object-cover'
									/>
									<div className='p-4 flex-1 flex flex-col justify-between'>
										<div>
											<h3 className='text-bg-color font-bold'>
												GH₵{' '}
												{service.price ? service.price : 'Contact for price'}
											</h3>

											<div className='flex items-center justify-between text-sm text-gray-500 mt-4'>
												<span>
													{service.BusinessName
														? service.BusinessName
														: 'Tema, Accra'}
												</span>
												<div className='flex space-x-2'>
													<FontAwesomeIcon
														icon={faStar}
														className='mr-2 text-star-color'
													/>
													({service.views ? service.views : 0})
												</div>
											</div>
											<p className='text-bg-drawer font-josefin-sans font-bold'>
												{service.title}
											</p>
											<div className='flex items-center justify-between text-sm text-gray-500 mt-4'>
												<span className='flex '>
													<FaMapMarkerAlt className='mr-1' />
													{service.location.city}, {service.location.region}
												</span>
												<div className='py-4 flex justify-between items-center'>
													<span className='text-gray-500 text-sm flex items-center'>
														<FaEye className='mr-1' /> 1K
													</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className='flex items-center justify-center text-2xl'>
							No services found, select a different category
						</div>
					)}
				</div>

				{/* Right Sidebar */}
				<div className='lg:col-span-4 flex flex-col space-y-4'>
					<div className='flex-1 flex items-center justify-center'>
						<div className='bg-category-icons w-full h-full '></div>
					</div>
					<div className='flex-1 flex items-center justify-center'>
						<div className='bg-category-icons w-full h-full '></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SortByCategory;
