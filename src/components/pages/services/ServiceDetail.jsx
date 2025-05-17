/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import lock from '../../../assets/images/lock.png';
import { Link } from 'react-router-dom';
import { htmlConverterReact } from 'html-converter-react';

const ServiceDetail = ({ service, handleClick }) => {
	const { title, price, location, category, ratingAverage, views, business } =
		service?.data;

	const dateString = service?.data?.created_at;
	const date = new Date(dateString);
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	const hour = String(date.getUTCHours()).padStart(2, '0');
	const minute = String(date.getUTCMinutes()).padStart(2, '0');
	const formattedDate = `${month}/${day} at ${hour}:${minute}`;

	

	return (
		<div className='container mx-auto font-josefin-sans bg-white rounded-lg flex flex-col md:flex-row'>
			<div className="xl:flex lg:flex">
				<div className="xl:w-3/4 lg:w-2/3 w-full">
					<div className=''>
						<h1 className='text-2xl text-bg-color mb-2' style={{ fontSize: '30px' }}>{title}</h1>
						<div className='flex flex-col md:flex-row text-sm text-light-gray mb-4'>
							<span className='flex xl:text-xl lg:text-xl text-md'>
								Published on {formattedDate}
								<span className="flex items-end relative xl:left-[150px] lg:left-26 left-[90px]" ><FaMapMarkerAlt className='ml-2 mb-1 md:ml-48 text-md' /> {location?.region}, {location?.city}</span>
							</span>
						</div>
						<img
							src={service?.data?.images}
							alt='Service'
							className='rounded-lg w-full border-2 bg-cover' style={{ width: '100%', height: '500px', objectFit: 'contain' }}
						/>
					</div>

					<div className="mt-8">
						<div className='mb-4'>
							<h2 className='text-xl font-bold text-indigo-600' style={{ fontSize: '30px' }}>GH₵ {price}</h2>
							<p className='text-sm text-gray-500'>{category}</p>
						</div>
						<div>
							<p className='mb-4 w-full mt-5'>
								{htmlConverterReact(service?.data?.description)}
							</p>
						</div>
						<div className="flex justify-end items-end">
							<button
								className='bg-[#251E4F] text-white px-16 py-2 rounded font-medium'
								onClick={handleClick}>
								Book service
							</button>
						</div>
					</div>
				</div>

				<div className="xl:w-1/4 lg:w-1/3 w-full mt-6">
					<div className='w-full xl:h-796 lg:h-796 p-1 xl:ml-6 lg:ml-6'>
						<div className='p-4 flex xl:block lg:block rounded-lg mb-4 border-2 border-bg-color justify-center items-center text-center'>
							<img
								src={business?.logoUrl}
								alt={business?.business}
								className='xl:rounded-full lg:rounded-full rounded-md xl:h-36 xl:w-36 lg:h-36 lg:w-36 w-20 h-20 xs:ml-10 xs:mr-10 mr-8  justify-center items-center mb-2 xl:ml-12 lg:m-12 border-2 border-[#283890]'
							/>
							<div className="vibtech mr-7">
								<h3 className='text-lg font-medium text-[#283890]'>
									<Link to={`/services/${business?.id}`}>{business?.business}</Link>
								</h3>
								<p className='text-sm text-gray-500 mb-2'>
									{/* <FaMapMarkerAlt className='ml-2 mb-1 md:ml-48 text-md' /> */}{location?.region}, {location?.city}
								</p>
							</div>
							<p className='text-sm hidden xl:block lg:block text-light-gray mb-2'>
								{ratingAverage} ({views} views)
							</p>
							<div className='flex items-center justify-center'>
								<button
									className='bg-[#251E4F] flex justify-center items-center text-white p-3 rounded font-medium w-full md:w-32'
									onClick={handleClick}>
									Book service
								</button>
							</div>
						</div>

						<div className='p-4 rounded-md  mb-32 justify-center items-center border-2 bg-[#C9DCF9]'>
							<div className="container xl:grid lg:grid flex">
								<div className="flex xl:justify-center xl:items-center lg:justify-center lg:items-center">
									<img
										src={lock}
										alt="Escrow"
										className="w-16 h-16"
									/>
									<p className="xl:mr-6 xl:ml-4 lg:mr-6 lg:ml-4 mr-10 ml-2 mt-2 text-bold xl:text-lg lg:text-lg text-xs">
										Pay with <br /> Oshelter Escrow
									</p>
								</div>

								<div className="my-5">
									<hr className="hidden xl:flex lg:flex py-[1px] my-1 bg-black mb-6 "/>
									<p className="xl:text-center lg:text-center xl:text-xl lg:text-xl float-end text-black text-sm font-josefin-sans">
										Your payment is safe in escrow, only released when the job is done
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceDetail;
