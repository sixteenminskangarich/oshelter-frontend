/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const PropertySearchBar = ({
	query,
	handleInputChange,
	handleSearch,

	handleKeyPress,
}) => {
	return (
		<div className='relative mx-auto w-full max-w-lg border border-bg-color rounded-full shadow-sm '>
			<input
				type='text'
				placeholder='Address, City, Neighborhood'
				className='w-full p-3 lg:w-w100 rounded-full text-xs py-4 border border-gray-400 hover:border-white text-black focus:border-white '
				value={query}
				onChange={handleInputChange}
			/>
			<FaSearch
				size={40}
				color='#fff'
				className='absolute right-2 p top-1/2 transform -translate-y-1/2 bg-bg-color text-black-text p-2 rounded-full cursor-pointer'
				onClick={handleSearch}
				onKeyPress={handleKeyPress}
			/>
		</div>
	);
};

export default PropertySearchBar;
