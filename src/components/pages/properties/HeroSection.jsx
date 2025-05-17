/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GrSort } from "react-icons/gr";
import { ImSpinner9 } from 'react-icons/im';
import { Modal } from 'flowbite-react';
import { useFormik, useField } from "formik";
import { useMutation } from "react-query";
import { advancedSearchForProperties } from '../../../utils/request';

const HeroSection = ({image, setSearch, title , type}) => {
	const [query, setQuery] = useState('');
	const router = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('md');
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState({
        saleType: '',
        price: '',
        propertyType: '',
        bed: '',
        bath: '',
    });

    const [loading, setLoading] = useState(false)

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

    const mutation = useMutation(
        (searchData) => advancedSearchForProperties(searchData),
        {
            onSuccess: (data) => {
                router('/search-results', { state: { results: data?.data } });
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onSubmit = async (values) => {
        try {
            if(values.minPrice === '' && values.maxPrice === '' && values.minBed === '' && values.maxBed === '' && values.minBath === '' && values.maxBath === '' && values.type === '' && values.category === '' && values.marketType === '') {
                setLoading(false)
                setError("Please fill in at least one field to search");
            } else {
                setLoading(true)
                mutation.mutate(values)
            }
        } catch (error) {
            
        }
    }

    const OnSearch = () => {
        setSearch(true)
    }

    const resetHandleSubmit = () => {  
        setFieldValue('type', '');
        setFieldValue('category', '');
        setFieldValue('marketType', '');
        setFieldValue('minPrice', '');
        setFieldValue('maxPrice', '');
        setFieldValue('minBed', '');
        setFieldValue('maxBed', '');
        setFieldValue('minBath', '');
        setFieldValue('maxBath', '');
        setFieldValue('location', '');
        setError('')
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            location: '',
            type: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            minBed: '',
            maxBed: '',
            minBath: '',
            maxBath: '',
            marketType: ''
        },
        onSubmit,
    })

	const handleSearch = () => {
		mutation.mutate(values)
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

    const handleModal = () => {
        setModalSize(!modalSize);
    }

    const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilter((prevFilter) => ({
			...prevFilter,
			[name]: value,
		}));
		setCurrentPage(1); // Reset to the first page when filters change
	};

    const handleCloseModal = () => {
        setOpenModal(false) 
        setFieldValue('type', '');
        setFieldValue('category', '');
        setFieldValue('marketType', '');
        setFieldValue('minPrice', '');
        setFieldValue('maxPrice', '');
        setFieldValue('minBed', '');
        setFieldValue('maxBed', '');
        setFieldValue('minBath', '');
        setFieldValue('maxBath', '');
        setFieldValue('location', '');
        setError('')
    }
    
    console.log(values)

	return (
		<div className="flex h-screen justify-center items-center bg-cover bg-center home-banner" style={{backgroundImage: `url(${image})`}}>
            <div className="text-center max-w-6xl mx-10 ">
                <div className='relative banner-item justify-center items-center'>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white banner-text'>
                        {title}
                    </h1>
                    {
                        type === 'events' ? (
                            <div className='flex flex-col md:flex-row md:justify-center md:space-x-4 mb-4 banner-navigation'>
                                <Link
                                    to='/properties/events/studio'
                                    className='text-white mb-3 mr-2 md:mb-0 hover:underline active'>
                                    Studio
                                </Link>
                                <Link
                                    to='/properties/events/conference'
                                    className='text-white mb-2 mr-2 md:mb-0 hover:underline'>
                                    Conference Hall
                                </Link>
                                <Link
                                    to='/properties/events/outdoor'
                                    className='text-white mb-2 md:mb-0 hover:underline'>
                                    Outdoor
                                </Link>
                            </div>
                        ) : (
                            <div className='flex flex-col md:flex-row md:justify-center md:space-x-4 mb-4 banner-navigation'>
                                <Link
                                    to='/properties/rent/all'
                                    className='text-white mb-3 mr-2 md:mb-0 hover:underline active'>
                                    Rent
                                </Link>
                                <Link
                                    to='/properties/sale/all'
                                    className='text-white mb-2 mr-2 md:mb-0 hover:underline'>
                                    Buy
                                </Link>
                                <Link
                                    to='/properties/shortstay/all'
                                    className='text-white mb-2 md:mb-0 hover:underline'>
                                    Short Stay
                                </Link>
                            </div>
                        )
                    }
                    
                    <div className='relative mx-auto w-full max-w-lg banner-search xl:right-0 lg:right-0 right-5'>
                        <input
                            type="text"
                            placeholder='Address, City, Neighborhood'
                            className='w-full p-4 rounded-full focus:border-bg-color text-black banner-input placeholder:text-sm'
                            value={values.location}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="location"
                            onKeyPress={handleKeyPress}
                        />
                        <FaSearch
                            size={35}
                            color='#fff'
                            className='absolute xl:right-3 lg:right-3 right-1 xl:-mt-7 lg:-mt-7 -mt-5 text-md transform -translate-y-1/2 bg-bg-color text-white p-2 rounded-full cursor-pointer banner-search-icon'
                            onClick={handleSearch}
                            onKeyPress={handleKeyPress}
                        />

                        <div className="xl:flex lg:flex hidden absolute ml-[520px] xl:bottom-[0px] lg:bottom-[58px] bottom-[40px] justify-end items-end">
                            <button type="button" onClick={() => setOpenModal(true)} className="border-2 bg-white border-bg-color font-bold text-bg-color xl:px-4 xl:py-4 lg:px-4 lg:py-4 px-3 py-3 hover:bg-bg-color hover:text-white hover:border-white rounded-full">
                                <GrSort className="xl:text-2xl lg:text-2xl text-sm font-bold" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={openModal} size={modalSize} className="bg-bg-color fade" onClose={handleCloseModal}>
                <form className="rounded-xl" onSubmit={handleSubmit} style={{ height: 'auto', backgroundColor: 'white'}}>
                    <Modal.Header className='items-center'>Filter</Modal.Header>
                    <Modal.Body className={`scrollable ${error ? 'h-[510px]' : 'h-[490px]'}`}>
                        <div className="sm:col-span-full">
                            <label htmlFor="country" className="block text-xs font-bold text-gray-900">
                                Property type 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <select
                                    id="country"
                                    name="type"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={loading}
                                    value={values.type}
                                    autoComplete="country-name"
                                    className="border border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    <option value="">Any</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="room">Room</option>
                                    <option value="house">House</option>
                                    <option value="office space">Office Space</option>
                                    <option value="land">Land</option> 
                                    <option value="off the plan">Off The Plan</option>   
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-full mt-3">
                            <label htmlFor="country" className="block text-xs font-bold text-gray-900">
                                Property Categories 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <select
                                    id="country"
                                    name="category"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={loading}
                                    value={values.category}
                                    autoComplete="country-name"
                                    className="border border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    <option value="">Any</option>
                                    <option value="premium">Premium</option>
                                    <option value="deluxe">Deluxe</option>
                                    <option value="standard">Standard</option>  
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-full mt-3">
                            <label htmlFor="country" className="block text-xs font-bold text-gray-900">
                                Bed 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <div className="flex">
                                    <select
                                        id="country"
                                        name="minBed"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={loading}
                                        value={values.minBed}
                                        autoComplete="country-name"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">Any</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))} 
                                    </select>
                                    &nbsp;
                                    <span className="text-xl mt-1 font-bold w-[12px]">-</span>
                                    &nbsp;
                                    <select
                                        id="country"
                                        name="maxBed"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={loading}
                                        value={values.maxBed}
                                        autoComplete="country-name"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">Any</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}    
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-full mt-3">
                            <label htmlFor="country" className="block text-xs font-bold text-gray-900">
                                Bath 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <div className="flex">
                                    <select
                                        id="country"
                                        name="minBath"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={loading}
                                        value={values.minBath}
                                        autoComplete="country-name"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">Any</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))} 
                                    </select>
                                    &nbsp;
                                    <span className="text-xl mt-1 font-bold">-</span>
                                    &nbsp;
                                    <select
                                        id="country"
                                        name="maxBath"
                                        value={values.maxBath}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={loading}
                                        autoComplete="country-name"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">Any</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}    
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-full mt-3">
                            <label htmlFor="country" className="block text-xs font-bold text-gray-900">
                                Price 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <div className="flex">
                                    <input
                                        id="street-address"
                                        name="minPrice"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.minPrice}
                                        disabled={loading}
                                        placeholder="Min Price"
                                        autoComplete="street-address"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                    &nbsp;
                                    <span className="text-xl mt-1 font-bold">-</span>
                                    &nbsp;
                                    <input
                                        id="street-address"
                                        name="maxPrice"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.maxPrice}
                                        disabled={loading}
                                        type="text"
                                        placeholder="Max Price"
                                        autoComplete="street-address"
                                        className="border w-full border-gray-300 rounded px-4 py-2 text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {
                            error && (
                                <div className="sm:col-span-full mt-3">
                                    <p className="text-red-500 text-sm font-bold">{error}</p>
                                </div>
                            )
                        }

                        <div className="sm:col-span-full mt-5">
                            {
                                loading === true ? (
                                    <>
                                        <div className="flex justify-end">
                                            <button className="flex bg-bg-color px-4 py-1 rounded-lg text-white"><ImSpinner9 className="animate-spin mt-1 mr-2"/>&nbsp;Finding data ...</button>
                                        </div>
                                    </>
                                ):
                                (
                                    <>
                                        <div className="flex justify-end">
                                            <button type="button" onClick={() => resetHandleSubmit()} className="bg-white text-bg-color px-4 py-2 rounded-md w-1/2">Reset</button>
                                            &nbsp;&nbsp;
                                            <button type="submit" className="bg-[#251E4F] text-white px-4 py-2 rounded-md w-1/2">View results</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        </div>
	);
};

export default HeroSection;
