/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// PropertySearchBar.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const PropertySearchBar = ({
	query,
	handleInputChange,
	handleSearch,
	handleKeyPress,
}) => {
	return (
		<div className='relative flex-1'>
			<input
				type='text'
				placeholder='Search by location...'
				value={query}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
				className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
			<button
				onClick={handleSearch}
				className='absolute right-2 top-2 text-gray-600 hover:text-blue-500'>
				<FaSearch />
			</button>
		</div>
	);
};

export default PropertySearchBar;
