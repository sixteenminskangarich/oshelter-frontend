/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getAllServices } from '../../../utils/request';
import ServiceCard from './ServiceCard';
import Hero from './Hero';

const AllServicesPage = () => {
	const [selectedPrice, setSelectedPrice] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedRating, setSelectedRating] = useState('');
	const [selectedTime, setSelectedTime] = useState('');

	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		try {
			const response = await getAllServices();

			setServices(response.latest_services);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	const handleFilter = () => {
		let filteredServices = services;

		if (selectedPrice) {
			filteredServices = filteredServices.filter(
				(service) => service.price == selectedPrice
			);
		}

		if (selectedLocation) {
			filteredServices = filteredServices.filter(
				(service) => service.location.city === selectedLocation
			);
		}

		if (selectedRating) {
			filteredServices = filteredServices.filter(
				(service) => service.ratingAverage == selectedRating
			);
		}

		if (selectedTime) {
			filteredServices = filteredServices.filter(
				(service) => service.timePublished === selectedTime
			);
		}

		return filteredServices;
	};

	const filteredServices = handleFilter();

	return (
		<div className=''>
			<Hero />

			<div className='flex justify-end items-center mt-4'>
				<div className='flex flex-wrap gap-4 p-2 mr-2'>
					<select
						className='p-2 border border-gray-300 rounded-md'
						onChange={(e) => setSelectedPrice(e.target.value)}>
						<option value=''>Price</option>
						<option value='50'>50 GHC</option>
						<option value='100'>100GHC</option>
					</select>
					<select
						className='p-2 border border-gray-300 rounded-md'
						onChange={(e) => setSelectedLocation(e.target.value)}>
						<option value=''>Location</option>
						<option value='Tema'>Tema</option>
						<option value='Accra'>Accra</option>
					</select>
					<select
						className='p-2 border border-gray-300 rounded-md'
						onChange={(e) => setSelectedRating(e.target.value)}>
						<option value=''>Rating</option>
						<option value='5'>5 Stars</option>
						<option value='4'>4 Stars</option>
					</select>
					<select
						className='p-2 border border-gray-300 rounded-md'
						onChange={(e) => setSelectedTime(e.target.value)}>
						<option value=''>Time Published</option>
						<option value='recent'>Most Recent</option>
						<option value='older'>Older</option>
					</select>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
				{filteredServices.map((service, index) => (
					<div key={index} className='bg-white p-4 '>
						<ServiceCard service={service} />
					</div>
				))}
			</div>
		</div>
	);
};

export default AllServicesPage;
