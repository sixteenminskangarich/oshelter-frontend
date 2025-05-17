/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const [category, setCategory] = useState('');
	const [query, setQuery] = useState('');
	const router = useNavigate();

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleSearch = () => {
		if (query.trim()) {
			router(
				`/services/services/search-results?query=${query.trim()}&category=${category}`
			);
		}
		setCategory('');
		setQuery('');
	};

	return (
		<div className="">
			<div className='p-4 pt-20'>
				<div className='hidden max-w-7xl mx-auto flex-col lg:flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
					<div className="relative -top-8" style={{ width: '100%' }}>
						<div className="absolute inset-y-0 start-0 flex items-center ps-3">
							<select id="countries" 
							value={category}
							onChange={handleCategoryChange}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								<option selected>Choose a category</option>
								<option value="Plumbering">Plumbering</option>
								<option value="Office Cleaning">Office Cleaning</option>
								<option value="Painting">Painting</option>
								<option value="Photography">Photography</option>
								<option value="Logistics">Logistics</option>
							</select>
						</div>
						<input type="search" style={{ paddingLeft: '190px' }} 
							id="default-search" 
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
							placeholder="Search for a service..." 
							required 
							value={query}
							onChange={handleInputChange}
						/>
						<button onClick={handleSearch} type="button" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
					</div>
					{/* <div className='relative inline-block text-left w-full md:w-auto'>
						<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option selected>Choose a country</option>
							<option value="US">United States</option>
							<option value="CA">Canada</option>
							<option value="FR">France</option>
							<option value="DE">Germany</option>
						</select>
						
					</div>

					<div className="relative flex items-center" style={{ width: '100%' }}>
							<input type='text' placeholder='Enter name' className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]" />
							<div className="absolute left-4">
								<svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
							</div>
						</div>	

					<button
						onClick={handleSearch}
						className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Search
					</button> */}
				</div>
			</div>
			<form className="max-w-md mx-auto lg:hidden sm:flex">   
				<div className="relative -top-8">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
						</svg>
					</div>
					<input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a service..." required />
					<button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
