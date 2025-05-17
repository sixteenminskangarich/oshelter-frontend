/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// PropertyFilter.js
import React from 'react';

const PropertyFilter = ({ filter, handleFilterChange }) => {
	return (
		<div className='flex flex-col w-full sm:flex-row sm:items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4'>
			<select
				name='saleType'
				className='border sm:w-auto rounded-lg border-gray-400 text-xs py-4'
				style={{ width: '20%' }}
				value={filter.saleType}
				onChange={handleFilterChange}>
				<option value=''>Sale Type</option>
				<option value='For sale'>For sale</option>
				<option value='Rent'>Rent</option>
				<option value='Short Stay'>Short Stay</option>
			</select>

			<select
				name='price'
				className='border w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
				style={{ width: '15%' }}
				value={filter.price}
				onChange={handleFilterChange}>
				<option value=''>Price</option>
				{Array.from({ length: 50 }, (_, i) => (i + 1) * 200).map((price) => (
					<option key={price} value={price}>
						{price}
					</option>
				))}
			</select>

			<select
				name='propertyType'
				className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
				style={{ width: '25%' }}
				value={filter.propertyType}
				onChange={handleFilterChange}>
				<option value=''>Property Type</option>
				<option value='House'>House</option>
				<option value='Apartment'>Apartment</option>
				<option value='Land'>Land</option>
				<option value='Hostel'>Hostel</option>
				<option value='Room'>Room</option>
			</select>

			<select
				name='bed'
				className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
				style={{ width: '20%' }}
				value={filter.bed}
				onChange={handleFilterChange}>
				<option value=''>Beds</option>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((bed) => (
					<option key={bed} value={bed}>
						{bed}
					</option>
				))}
			</select>

			<select
				name='bath'
				className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
				style={{ width: '20%' }}
				value={filter.bath}
				onChange={handleFilterChange}>
				<option value=''>Baths</option>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((bath) => (
					<option key={bath} value={bath}>
						{bath}
					</option>
				))}
			</select>
		</div>
	);
};

export default PropertyFilter;
