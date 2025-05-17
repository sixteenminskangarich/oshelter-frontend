/* eslint-disable no-unused-vars */
import React from 'react';

import SearchBar from './SearchBar';

const Hero = () => {
	return (
		<div>
			{/* <section className='bg-hero-color py-20 pt-20 mb-4 h-18 mt-18 flex items-center'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
					
				</div>
			</section> */}
			<section className="bg-hero-color dark:bg-gray-900">
    			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
					<SearchBar style={{ width: '100%' }}/>
				</div>
			</section>
		</div>
	);
};

export default Hero;
