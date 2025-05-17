/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SideImage = ({ src }) => {
	return (
		<div className='w-full sm:w-80 h-full  mb-4 bg-light-gray container sm:pr-44 m-4'>
			<img src={src} alt='Side' className='w-full h-auto object-cover' />
		</div>
	);
};

export default SideImage;
