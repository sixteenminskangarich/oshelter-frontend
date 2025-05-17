import Hero from './Hero';
//import ServicesPage from './SearchServicePage';
import ServicePage from './ServicePage';
import Spinner from '../../Spinner';
import { getAllServices } from '../../../utils/request';

import { useQuery } from 'react-query';
import { useEffect } from 'react';


const ServicesIndex = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const serviceData = useQuery({
		queryKey: ['services'],
		queryFn: async () => {
			const response = await getAllServices();
			return response?.latest_services;
		},
	});
	
	if (serviceData.isError) {
		return (
			<div className='container mx-auto px-4 py-8 '>
				{serviceData.error.message}
			</div>
		);
	}

	//console.log(services);
	if (serviceData.isLoading) {
		return <Spinner loading={serviceData.isLoading} />;
	}
	return (
		<>
			<Hero />
			<ServicePage />
		</>
	);
};

export default ServicesIndex;
