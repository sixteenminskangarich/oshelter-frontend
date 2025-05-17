/* eslint-disable no-unused-vars */
import React from 'react';

import Apartment from '../../../assets/images/apartment.jpeg';
import Home from '../../../assets/images/house.jpeg';
import Hotel from '../../../assets/images/hostel.jpeg';
import Room from '../../../assets/images/room.jpeg';
import Land from '../../../assets/images/land.jpeg';
import Office from '../../../assets/images/office.jpeg';
import Event from '../../../assets/images/eventspace.png';
import { useCategories } from '../../../../hooks/propertiesqueries/propertyqueries';

import { Link } from 'react-router-dom';
const CategorySection = () => {
	const { data: categories } = useCategories();
	const popularCategories = categories?.data?.categories;
	
	return (
		<div className='container mx-auto py-8 text-[#8C8D90] font-light font-josefin-sans'>
			<h2 className='text-2xl font-semibold mb-4 text-black sm:ml-3'>
                <span className='featured-homes'>
                    Popular Categories
                </span>
            </h2>
			<div className='hidden md:grid grid-cols-4 gap-4 text-black'>
				<div className='relative rounded-md'>
					<Link to={`/properties/category/${popularCategories?.data[4].id}`}>
						<img
							src={popularCategories?.data[4].backgroundImageUrl}
							alt='Category 1'
							className='w-full h-full  object-cover rounded-md'
						/>
						<h3 className='absolute bottom-0 left-0 p-2 m-2 bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn text-right'>
							{popularCategories?.data[4].name}
						</h3>
					</Link>
				</div>

				<div className='flex flex-col'>
					<div className='relative'>
						<Link to={`/properties/category/${popularCategories?.data[5].id}`}>
							<h3 className='absolute bottom-0 left-0 p-2 m-4 bg-[#FFFFFFCC] rounded-full text-text-btn  text-right px-4 py-1'>
								{popularCategories?.data[5].name}
							</h3>
							<img
								src={popularCategories?.data[5].backgroundImageUrl}
								className='w-full h-64 rounded-md object-cover mb-2'
								alt='Room'
							/>
						</Link>
					</div>
					<div className='relative'>
						<Link to={`/properties/category/${popularCategories?.data[0].id}`}>
							<h3 className='absolute bottom-0 left-0 p-2 m-2 bg-[#FFFFFFCC] rounded-full text-text-btn  text-right px-4 py-1'>
								{popularCategories.data[0].name}
							</h3>
							<img
								src={popularCategories.data[0].backgroundImageUrl}
								alt='House'
								className='w-full h-64 rounded-md object-cover'
							/>
						</Link>
					</div>
				</div>

				<div className='relative'>
					<Link to={`/properties/category/${popularCategories?.data[2].id}`}>
						<img
							src={popularCategories.data[2].backgroundImageUrl}
							alt='Hotel'
							className='w-full h-full object-cover rounded-md'
						/>
						<h3 className='absolute bottom-0 left-0 p-2 m-2 bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn  text-right'>
							{popularCategories.data[2].name}
						</h3>
					</Link>
				</div>

				<div className='flex flex-col'>
					<div className='relative'>
						<Link to={`/properties/category/${popularCategories?.data[3].id}`}>
							<h3 className='absolute bottom-0 left-0 p-2 m-4 bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn  text-right'>
								{popularCategories.data[3].name}
							</h3>
							<img
								src={popularCategories.data[3].backgroundImageUrl}
								alt='Land'
								className='w-full h-64 rounded-md object-cover mb-2'
							/>
						</Link>
					</div>
					<div className='relative'>
						<Link to={`/properties/category/${popularCategories?.data[1].id}`}>
							<h3 className='absolute bottom-0 left-0 p-2 m-2 bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn  text-right'>
								Office Space
							</h3>
							<img
								src={popularCategories.data[1].backgroundImageUrl}
								alt='Office'
								className='w-full h-64 rounded-md object-cover'
							/>
						</Link>
					</div>
				</div>
			</div>

			{/* Mobile Layout */}
			<div className='md:hidden flex flex-col items-center'>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-black">
                        <div className="grid gap-2">
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[4].id}`}>
                                    <img className="max-w-full rounded-lg object-cover" style={{ height: '230px' }} src={Apartment} alt="" />
                                </Link>
                                <h3 className='absolute bg-[#FFFFFFCC] px-4 py-1 rounded-full font-medium text-text-btn text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    Apartment
                                </h3>
                            </div>
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[5].id}`}>
                                    <img className="h-auto max-w-full rounded-lg" src={Room} alt="" />
                                </Link>
                                <h3 className='absolute bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    Room
                                </h3>
                            </div>
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[0].id}`}>
                                    <img className="h-auto max-w-full rounded-lg" src={Home} style={{ height: '140px' }} alt="" />
                                </Link>
                                <h3 className='absolute p-2 bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    House
                                </h3>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[2].id}`}>
                                    <img className="h-auto w-100 max-w-full rounded-lg" src={Hotel} alt="" style={{ height: '160px', width: '100%' }}/>
                                </Link>
                                <h3 className='absolute bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    Hostel
                                </h3>
                            </div>
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[3].id}`}>
                                    <img className="h-auto max-w-full rounded-lg" src={Land} alt="" style={{ height: '220px', width: '100%' }}/>
                                </Link>
                                <h3 className='absolute bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    Land
                                </h3>
                            </div>
                            <div>
                                <Link to={`/properties/category/${popularCategories?.data[4].id}`}>
                                    <img className="h-auto max-w-full rounded-lg" src={Office} alt="" style={{ height: '180px', width: '100%' }}/>
                                </Link>

                                <h3 className='absolute bg-[#FFFFFFCC] px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-35px', marginLeft: '10px' }}>
                                    Office Space
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="-mt-8 -mb-12 container mx-auto px-3">
					<Link to='/properties/events'>
                        <img className="h-auto w-full rounded-lg" src={Event} alt="" style={{ width: '100%' }}/>
                    </Link>
                    <h3 className='absolute bg-[#FFFFFFCC] text-gray-800 px-4 py-1 rounded-full text-text-btn font-medium text-right text-sm' style={{ marginTop: '-85px', marginLeft: '10px' }}>
                        Event Space
                    </h3>
                </div>
			</div>
		</div>
	);
};

export default CategorySection;