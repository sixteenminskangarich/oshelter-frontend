'use client'
import AddsBanner from '../../banner/AddsBanner';
import CategorySection from './PropertyCategory';
import HeroSection from './HeroSection';
import { useState, useEffect, useRef } from 'react';
import { getAllProperties } from '../../../utils/request';
import { useQuery } from 'react-query';
import { useFormik, useField } from "formik";
import { useCategories } from '../../../../hooks/propertiesqueries/propertyqueries';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../../../assets/images/back.png';
import Spinner from '../../Spinner';
import PropertyType from '../../cards/Property';
import Carousel from '../../cards/properties/adsCarousel';
import cleaning from '../../../assets/images/cleaning.jpg'
import building from '../../../assets/images/electronic.jpg';
import andies from '../../../assets/images/andies.jpg';
import pattern from '../../../assets/images/oshelterpattern.png';
import love from '../../../assets/images/love.jpg';
import { useScroll, useTransform } from 'framer-motion';
import DynamicMetaTagComponent from '../../cards/helmet/dynamicTags';
import Testimonial from '../../cards/testimonial/testimonial';
import Testimony from '../../cards/testimonial/testimonials';
import SearchProperties from '../../cards/properties/searchProperties';

function useProperty() {
	return useQuery({
		queryKey: ['property'],
		queryFn: getAllProperties,
	});
}

const PropertyHomePage = () => {
	window.scrollTo(0, 0);
	const { data: property } = useProperty();
	const { data: categories, isLoading } = useCategories();
    const [isDesktop, setIsDesktop] = useState(true);
	const containerRef = useRef(null);
  	const [scrollPosition, setScrollPosition] = useState(0);
	const [search, setSearch] = useState(false)
	const [results, setResults] = useState()

	const { scrollYProgress } = useScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]); // Scale from 0.5 to 1
	const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    
	if (isLoading) return <Spinner />;
	const propertycategories = categories?.data?.categories;

	const latestProperties = property?.latestProperties.data;
	const popularProperties = property?.popularProperties.data;
	const featuredProperties = property?.featuredProperties.data;
    const payMonthly = property?.payMonthly?.data;
	const offThePlan = property?.offThePlan?.data;

    let w = window.innerWidth;
	const imageArray = [
		'https://test.oshelter.com/uploads/properties/174179630253241.jpg', // Replace with your image paths
		'https://api.oshelter.com/files/property/66d1b40f9165b.jpg',
		'https://api.oshelter.com/files/property/66d1a9636b887.jpg',
	];

	return (
		<div>
			<DynamicMetaTagComponent title="OShelter | The space is yours..." description="Oshelter is a platform that connects you with the best properties in Ghana" imageUrl={building} />
			<HeroSection image={image} setSearch={setSearch} search={search} setResults={setResults} title="Find your future home"/>
							
			<CategorySection />

			<section className='container mx-auto px-4 flex space-x-2 xl:mb-4 lg:mb-4 mb-8'>
				<Carousel images={imageArray} />
			</section>

			<section className='container mx-auto w-[100%] xl:mb-4 lg:mb-4 mb-8 '>
				<div className="bg-gradient-to-r from-bg-color to-[#5e0c50] px-6 py-12 rounded-lg">
					<div className="container mx-auto flex flex-col justify-center items-center text-center">
						<h2 className="text-white sm:text-4xl text-3xl font-bold mb-6">Discover Our New Event Space</h2>
						<p className="text-white text-base text-center mb-12">
							Our event space offers a versatile and modern setting for all your special occasions. 
							From corporate events to weddings, we provide the perfect backdrop for unforgettable memories. 
							Contact us today to learn more!
						</p>

						<button type="button" className="bg-white text-[15px] text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-slate-100">
							Find Space
						</button>
					</div>
				</div>
			</section>
							
			<section className='xl:mt-3 lg:mb-'>
				<PropertyType title="Featured Properties" properties={featuredProperties} w={w} url="5000" value={parseInt(0)} ads={1} cleaning={cleaning}/>
			</section>

			<section className='xl:-mt-28 lg:-mt-7 mb-4 -mt-8'>
				<PropertyType title="Popular Properties" properties={popularProperties} w={w} url="5030" value={parseInt(0)}/>
			</section>

			<section className='container mx-auto px-4 flex space-x-2 xl:mb-4 lg:mb-4 relative top-3 xl:top-0 lg:top-0 mb-8 mt-4 mobile-ad-banner'>
				<AddsBanner />
			</section>
							
			<section className='xl:mb-1 lg:-mt-7'>
				<PropertyType title="Latest Properties" properties={latestProperties} w={w} url="5800" value={parseInt(0)} ads={2}/>
			</section>

			<section className='container mx-auto px-4 flex space-x-2 xl:mb-4 lg:mb-4 mb-8'>
				<Carousel images={imageArray} />
			</section>

			<section className='xl:-mt-7 lg:mb-1'>
				<PropertyType title="Pay Monthly Properties" properties={payMonthly} w={w} url="5090" value={parseInt(0)} ads={3} cleaning={andies}/>
			</section>

			<section className='mb-10 xl:-mt-20 lg:-mt-20 -mt-8'>
				<PropertyType title="Off The Plan Properties" properties={offThePlan} w={w} url="5040" value={parseInt(0)}/>
			</section>

			<section className='container mx-auto px-4 flex space-x-2 xl:mb-4 lg:mb-4 xl:-mt-7 lg:-mt-7 mb-20 mt-1 mobile-ad-banner'>
				<AddsBanner />
			</section>

			<div className="min-w-screen min-h-screen flex items-center justify-center -mt-24 xl:-mb-20 lg:-mb-20 mb-5">
				<div className="w-full bg-white border-gray-200 px-5 py-16 md:py-24 text-gray-800">
					{/* <div className="flex justify-center">
						<img src={pattern} className="absolute opacity-5 w-full -mt-20 h-[100%] fill" alt="Oshelter" layout="fill" style={{ backgroundRepeat: 'repeat', width: '100%' }}/>
					</div> */}
					<div className="w-full max-w-6xl mx-auto">
						<div className="text-center max-w-xl mx-auto">
							<h1 className="text-2xl md:text-7xl font-bold mb-5 text-bg-color">What people <br />are saying.</h1>
							<h3 className="text-xl mb-5 font-light">Real experiences from satisfied users who found their perfect homes and real estate solutions with OShelter. Your dream property is just a click away!</h3>
							<div className="text-center mb-10">
								<span className="inline-block w-1 h-1 rounded-full bg-bg-color ml-1"></span>
								<span className="inline-block w-3 h-1 rounded-full bg-bg-color ml-1"></span>
								<span className="inline-block w-40 h-1 rounded-full bg-bg-color"></span>
								<span className="inline-block w-3 h-1 rounded-full bg-bg-color ml-1"></span>
								<span className="inline-block w-1 h-1 rounded-full bg-bg-color ml-1"></span>
							</div>
						</div>
						<div className="-mx-3 md:flex items-start">
							<Testimony className="z-40"/>
						</div>
						<div className="-mx-3 flex justify-center">
							<Testimonial className="z-40"/>	
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyHomePage;