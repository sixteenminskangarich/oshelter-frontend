/* eslint-disable no-unused-vars */
import AddsBanner from '../../banner/AddsBanner';
import PropertyCard from './PropertyCard';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useOtherProperties } from '../../../utils/stateQueries';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyMobileCard from '../../cards/PropertyCard';
import buy from '../../../assets/images/buy3.jpeg';
import sale from '../../../assets/images/back.png';
import rent from '../../../assets/images/buy2.jpeg';
import cleaning from '../../../assets/images/cleaning.jpg'
import plumbing from '../../../assets/images/plumbing.jpg'
import { useGetPropetyByLocation } from '../../../../hooks/propertiesqueries/propertyqueries';
import PropertySearchBar from './PropertySearchBar';
import PropertyFilter from './filters/FiltersSearchBars';

import { FaBars, FaTimes } from 'react-icons/fa';
import Spinner from '../../Spinner';

const RentPage = () => {
	const pathname = useLocation();
	const key = pathname.pathname.split('/')[2];
	const [querys, setQuery] = useState('');
	const { data: property } = useOtherProperties(key);
	const router = useNavigate();

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

	const [isOpen, setIsOpen] = useState(false); // For mobile filter menu toggle

	const [query] = useSearchParams();
	const q = query.get('query');
	const { data: properties, isLoading } = useGetPropetyByLocation(q);
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

    let w = window.innerWidth;
    let image = "";
    let text = key;
    if(key === "rent") {
        image = rent
    }else if(key === "sale") {
        image = buy
    }else if(key === "shortstay") {
        image = sale
        text = "short stay"
    }

	const propertiesLength = property?.properties?.data?.length
	console.log(propertiesLength)
	if (isLoading === true) return <Spinner />;
	return (
		<div>
			<section className="rounded-xl dark:bg-gray-900 mb-6">
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
					<div className='flex flex-col sm:flex-row sm:items-center mt-12 sm:space-x-4 -mb-10'>
						{/* Wrapper for Search and Filters */}
						<div className='flex flex-1'>
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
				</div>
			</section>
			
			{/* <CategorySection /> */}
            <section className='mb-18 -mt-5' style={{ fontFamily: '"josephin-sans"' }}>
                <div className='relative w-full h-8 container mx-auto text-bg-color mb-4 xl:-mb-7 lg:mb-7'>
                    <div className='absolute left-2 top-4 flex items-center h-full '>
                        <h2 className='text-base xs:text-2xl sm:text-2xl md:text-xl lg:text-2xl xl:text-1xl text-text-color'>
                            All {text} properties
                        </h2>
                    </div>
                    <div className='absolute right-0 top-0 hidden xl:flex lg:flex items-center h-full '>
                        
                    </div>
                </div>
                {property?.properties?.data.length === 0 ? (
					<div className='flex justify-center items-center'>
						<h1 className='text-center flex justify-center items-center text-2xl font-bold mt-10'>
							No Properties listed
						</h1>
					</div>
				) : (
                    <div className="vibTech">
                        { w <= 789 || w <= 810 ?
                            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 ml-4 mb-12">
                                {property?.properties?.data.map((property) => (
                                    <PropertyMobileCard key={property.id} property={property} />
                                ))}
                            </div>
                        :
							<div className="container mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8">
								<div className="flex items-center justify-center">
									<div className="w-1/4">
										<img src={cleaning} className="w-[25%] h-[853px] rounded-md absolute top-32"  />
										<img src={plumbing} className="w-[25%] h-[863px] rounded-md absolute top-[1050px]"  />
										<img src={cleaning} className="w-[25%] h-[385px] rounded-md absolute top-[1980px]"  />
										<img src={cleaning} className="w-[25%] h-[385px] rounded-md absolute top-[2440px]"  />
									</div>
									<div className="w-3/4 p-4">
										<div className='container grid xl:grid-cols-3 xl:gap-4 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6  mx-auto py-8 '>
											{property?.properties?.data.map((property) => (
												<PropertyCard key={property.id} property={property} />
											))}
										</div>
									</div>
								</div>
							</div>
                        }
                    </div>
				)}
            </section>
		</div>
	);
};

export default RentPage;
