/* eslint-disable react/prop-types */
import { FaStar, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
//import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
	function capitalizeFirstLetter(str) {
		if (!str) {
		  return ''; // Handle empty or null strings
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return (
		<div className='max-w-sm rounded-lg overflow-hidden font-josefin-sans duration-10 hover:border-blue-500 border-2 hover:border-2 bg-white mobileview'>
			<Link to={`/services/detail-service/${service.id}`} className=''>
				<img
					className='w-full h-48 object-cover mobileImage mb-image rounded-md'
					src={service.images}
					alt='Service'
				/>
				<div className='px-6 py-4'>
					<div className='font-bold text-bg-color text-lg mb-2 price'>
						GH₵ {service.price}
					</div>

					<div className='flex items-center mb-4'>
						<div className='flex items-center justify-between'>
							<span className='text-light-gray font-josefin-sans text-sm pr-8 title'>
								{service.BusinessName ? capitalizeFirstLetter(service.BusinessName) : 'Company name'}
							</span>
							<div className='flex justify-between items-center fa-marker-alt xl:ml-10 lg:ml-10'>
								<FaStar className='text-star-color mr-1' />
								<span className='text-light-gray font-bold text-sm'>4.5</span>
								<span className='text-light-gray text-sm ml-1'>
									({service.totalRatingCount})
								</span>
							</div>
						</div>
					</div>
					<p className='text-gray-900 font-semibold text-sm mb-2 description'>
						{service.title}
					</p>
					{/* <p className='text-gray-800 text-base mb-2'>
						{service.description.slice(0, 10)}...
					</p> */}
					<div className='flex relative top-4 items-center text-gray-600 text-sm locations' style={{ color:'grey' }}>
						<FaMapMarkerAlt className='mr-1' />
						<span className='w-full location'>
							{service.location?.region},{} {service.location?.city}
						</span>
						<div className='px-6 flex justify-between items-center'>
							<span className='text-gray-500 text-sm flex items-center location'>
								<FaEye className='ml-6 mr-2' /> {service.views}
							</span>
						</div>
					</div>
				</div>
			</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
	);
};

export default ServiceCard;
