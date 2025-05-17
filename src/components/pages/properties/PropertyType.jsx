"use client"
import AddsBanner from '../../banner/AddsBanner';
import PropertyCard from './PropertyCard';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useTypeOfProperty } from '../../../utils/stateQueries';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyMobileCard from '../../cards/PropertyCard';
import { useCategories, useGetPropetyByLocation } from '../../../../hooks/propertiesqueries/propertyqueries';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { searchForProperty } from '../../../utils/request';
import SearchResults from '../../cards/properties/SearchResults';
import PropertySearchBar from './PropertySearchBar';
import PropertyFilter from './filters/FiltersSearchBars';
export default function TypeOfProperties() {
    const pathname = useLocation();
    const key = pathname.pathname.split('/')[2];
    const { data: categories } = useCategories();
    const popularCategories = categories?.data?.categories?.data;
    const { data: properties } = useTypeOfProperty(key);
    const [results, setResults] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({ saleType: '', price: '', propertyType: '', bed: '', bath: ''});

    let w = window.innerWidth;
    let text = key;
    if(key === "5000") {
        text = "featured properties"
    }else if(key === "5030") {
        text = "popular properties"
    }else if(key === "5800") {
        text = "latest properties"
    }else if(key === "5090") {
        text = "pay monthly properties"
    }else if(key === "5040") {
        text = "off the plan properties"
    }else if(key === "5130") {
        text = "deluxe properties"
    }else if(key === "5930") {
        text = "premium homes"
    }else if(key === "5530") {
        text = "standard properties"
    }

    const mutation = useMutation(
        (searchData) => searchForProperty(searchData),
        {
            onSuccess: (data) => {
                setResults(data)
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onSubmit = (values, actions) => {
        mutation.mutate(values)
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            text: "", 
        },
        onSubmit,
        enableReinitialize: true,
    })

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
		<div>
			<section className="xl:mt-10 lg:mt-10 font-josefin-sans">
    			<div className="xl:py-8 py-1 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <div className="">
                        <div className='flex flex-col sm:flex-row sm:items-center mt-12 sm:space-x-4 -mb-10'>
                            {/* Wrapper for Search and Filters */}
                            <div className='flex flex-1'>
                                {/* Search Bar */}
                                <div className='flex-1'>
                                    <PropertySearchBar
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
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:hidden sm:flex">   
                            <div className="relative -top-8">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input 
                                    type="search" 
                                    id="default-search" 
                                    className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search for a property..." 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="text"
                                    required 
                                />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <FaSearch
                                        size={20}
                                        color='#fff'
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
				</div>
			</section>
			
			{/* <CategorySection /> */}
            {
                results === null ? (
                    <SearchResults text={text} w={w} properties={properties}/>
                ):(
                    <SearchResults text={text} w={w} properties={results?.data}/>
                )
            }
		</div>
	);
}