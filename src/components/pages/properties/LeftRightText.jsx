/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import React from 'react';

const LeftRightText = ({ leftText, rightText }) => {
	return (
		<div className='relative w-full h-8 container mx-auto text-bg-color '>
			<div className='absolute left-0 top-0  flex items-center h-full '>
				<span className='text-base sm:text-lg md:text-xl lg:text-1xl xl:text-1xl text-text-color font-josefin-sans'>
					{leftText}
				</span>
			</div>
			<div className='absolute right-0 top-0  flex items-center h-full '>
				<Link
					href='/allservices'
					className='text-base sm:text-lg text-text-color md:text-xl lg:text-1xl xl:text-1xl font-josefin-sans'>
					{rightText}
				</Link>
			</div>
		</div>
	);
};

export default LeftRightText;