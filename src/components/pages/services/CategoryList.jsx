/* eslint-disable no-unused-vars */
import React from 'react';
import {
	faShower,
	faTruck,
	faCamera,
	faPaintRoller,
	faBroom,
	faClipboardCheck,
	faArrowLeft,
	faArrowRight,
	faArrowCircleRight,
	faPlugCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import CategoryCard from './CategoryCard';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineElectricalServices } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categories = [
	{ label: 'Plumbing', icon: faShower, color: '#283890' },
	{ label: 'Logistics', icon: faTruck, color: '#283890' },
	{ label: 'Electricals', icon: faPlugCircleCheck, color: '#283890' },
	{ label: 'Painting', icon: faPaintRoller, color: '#283890' },
	{ label: 'Cleaning', icon: faBroom, color: '#283890' },
	{ label: 'Surveying', icon: faClipboardCheck, color: '#283890' },
];

const CategoryList = () => {
	const navigate = useNavigate();

	const handleNavigate = (query) => {
		navigate(`/services/categories?key=${query}`);
	};

	return (
		<section className='mb-8'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-2xl font-bold text-bg-color'>Categories</h2>
				<Link
					to='/services/all-services'
					className='text-2xl font-bold ml-auto text-hero-color cursor-pointer'>
					View All
				</Link>
			</div>

			<div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{categories.map((category, index) => (
					<CategoryCard
						key={index}
						icon={category.icon}
						label={category.label}
						color={category.color}
						handleNavigate={handleNavigate}
					/>
				))}
			</div>
		</section>
	);
};

export default CategoryList;
