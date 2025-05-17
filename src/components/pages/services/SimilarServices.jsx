/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ServiceCard from './ServiceCard';
import { ServicesSlider } from '../../cards/services/ServicesSlider';

const SimilarServices = ({ services }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	let w = window.innerWidth

	return (
		<div className='relative xl:bottom-[480px] bottom-20 lg:bottom-32 container justify-center rounded-lg xl:mt-14 lg:mt-14 xl:-mb-[450px]'>
			<h2 className='text-2xl font-bold xl:mb-4 lg:mb-4'>Similar services</h2>
			<section className='container xl:mb-8 lg:mb-8'>
                { w <= 789 || w <= 810 ?
                    <ServicesSlider services={services} />
                :
					<div className='row w-[70%]'>
						<ServicesSlider services={services} />
					</div>
                }
            </section>
		</div>
	);
};

export default SimilarServices;