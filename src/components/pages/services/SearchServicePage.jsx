/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

import ServiceCard from './ServiceCard';
import Hero from './Hero';
import Spinner from '../../Spinner';

const SearchServicePage = () => {
	const location = useLocation();
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);

	const searchParams = new URLSearchParams(location.search);
	const search = searchParams.get('query') || null;
	const category = searchParams.get('category') || null;

	useEffect(() => {
		const searchResults = async () => {
			try {
				const namePattern = new RegExp(search, 'i');
				let query = {
					$or: [
						{ title: namePattern },
						{ description: namePattern },
						{ 'location.city': namePattern },
						{ 'location.region': namePattern },
					],
				};
				if (category && category !== 'All') {
					const typePattern = new RegExp(category, 'i');
					query.type = typePattern;
				}

				const res = await axios.get(
					`${
						import.meta.env.VITE_APP_SERVICE_URL
					}/services/search-results?key=${search}&category=${category}`
				);
				if (res.status === 200) {
					const { data } = res;
					setServices(data.data);
				} else {
					setServices([]);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		searchResults();
	}, [search, category]);
	console.log(services);
	return (
		<>
			<Hero />

			{loading && <Spinner loading={loading} />}
			{!loading && services && (
				<section className='px-4 py-6 '>
					<div className='container-xl lg:container m-auto'>
						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							{services.length === 0 ? (
								<p>No Services Found</p>
							) : (
								services.map((service) => (
									<ServiceCard
										key={service.id}
										service={service}
										btnText='Details'
									/>
								))
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default SearchServicePage;
