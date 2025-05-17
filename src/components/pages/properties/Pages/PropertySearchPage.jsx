/* eslint-disable no-unused-vars */
import { useGetPropetyByLocation } from '../../../../../hooks/propertiesqueries/propertyqueries';
import PropertySearchBar from '../PropertySearchBar';
import PropertyFilter from './../../properties/filters/FiltersSearchBars';

import React, { useState } from 'react';
import PropertyCard from '../PropertyCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropertyMobile from '../../../cards/PropertyCard';

const PropertySearchPage = () => {
	let w = window.innerWidth;
	const [querys, setQuery] = useState('');
	const router = useNavigate();
	const [isOpen, setIsOpen] = useState(false); // For mobile filter menu toggle

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleSearch = () => {
		if (querys.trim()) {
			router(`/properties/search-results?query=${querys.trim()}`);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const [query] = useSearchParams();
	const q = query.get('query');
	const { data: properties } = useGetPropetyByLocation(q);
	const [filter, setFilter] = useState({
		saleType: '',
		price: '',
		propertyType: '',
		bed: '',
		bath: '',
	});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	// Filter properties based on user input
	const filteredProperties =
		properties?.filter(
			(property) =>
				(filter.saleType === '' || property.marketType === filter.saleType) &&
				(filter.price === '' || property.amount <= parseInt(filter.price)) &&
				(filter.propertyType === '' ||
					property.propertyType === filter.propertyType) &&
				(filter.bed === '' ||
					property.numberOfBedrooms >= parseInt(filter.bed)) &&
				(filter.bath === '' || property.numberOfBath >= parseInt(filter.bath))
		) || [];

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProperties = filteredProperties.slice(
		indexOfFirstItem,
		indexOfLastItem
	);
	const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilter((prevFilter) => ({
			...prevFilter,
			[name]: value,
		}));
		setCurrentPage(1); // Reset to the first page when filters change
	};

	const toggleFilterMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='py-8 pt-10 sm:px-6 lg:px-8 mt-10'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4'>
				{/* Wrapper for Search and Filters */}
				<div className='flex flex-1 '>
					{/* Search Bar */}
					<div className='flex-1'>
						<PropertySearchBar
							query={querys}
							handleInputChange={handleInputChange}
							handleSearch={handleSearch}
							handleKeyPress={handleKeyPress}
						/>
					</div>

					{/* Filters: Hidden on mobile, visible on desktop */}
					<div className='hidden sm:flex flex-1 justify-end '>
						<PropertyFilter
							filter={filter}
							handleFilterChange={handleFilterChange}
						/>
					</div>

					{/* Hamburger Icon for Mobile */}
					<button
						className='sm:hidden text-gray-600 hover:text-gray-900 focus:outline-none ml-4'
						onClick={toggleFilterMenu}>
						{isOpen ? (
							<FaTimes size={24} />
						) : (
							<FaBars size={24} className='bg-bg-color text-white ' />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Filters (Dropdown) */}
			{isOpen && (
				<div className='sm:hidden mb-4'>
					<PropertyFilter
						filter={filter}
						handleFilterChange={handleFilterChange}
					/>
				</div>
			)}

			{/* Property Cards */}
			{ w <= 789 || w <= 810 ?
                <div className="vibTech">
					<div className="grid gap-1 grid-cols-2 ml-2">
						{
							currentProperties?.map((property, index) => (
								<>
									<div className="container mx-auto property-slider">
										<PropertyMobile key={property.id} property={property} />
									</div>
								</>
							))
						}
					</div>
				</div>
            :
                <div className='container grid xl:grid-cols-4 xl:gap-4 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8'>
                    {currentProperties === null ? "" : 
                        (
                            currentProperties?.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))
                        )
                    }
                </div>
            }

			{/* Ad Banner */}
			<div className='mt-8 container mx-auto bg-bg-color p-4 sm:p-6 lg:p-8 rounded text-center'>
				<h3 className='text-xl'>Ad Banner</h3>
				<p>Your advertisement here</p>
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className='mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2'>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
						<button
							key={number}
							className={`p-2 rounded ${
								currentPage === number
									? 'bg-bg-color text-white'
									: 'bg-text-btn text-bg-text font-medium'
							}`}
							onClick={() => paginate(number)}>
							{number}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default PropertySearchPage;
