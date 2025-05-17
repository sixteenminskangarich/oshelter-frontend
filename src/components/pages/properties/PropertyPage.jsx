/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AddsBanner from '../../banner/AddsBanner';
import PropertyCard from './PropertyCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import buy from '../../../assets/images/buy3.jpeg';
import sale from '../../../assets/images/back.png';
import rent from '../../../assets/images/buy2.jpeg';
import event from '../../../assets/images/event.jpg';
import { useProperty } from '../../../utils/stateQueries';
import PropertyMobileCard from '../../cards/PropertyMobile';
import PropertyMobile from '../../cards/PropertyCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Hero from '../services/Hero';
import HeroSection from './HeroSection';
import PropertySlider from '../../cards/properties/propertySlider';
import PropertyType from '../../cards/Property';
import Spinner from '../../Spinner';
import cleaning from '../../../assets/images/cleaning.jpg'
import building from '../../../assets/images/electronic.jpg';

const PropertyPage = () => {
	const { id } = useParams();
    const pathname = useLocation();
	const key = pathname.pathname.split('/')[2];
	const { data: property, isLoading } = useProperty(key);
	const [query, setQuery] = useState('');
	const router = useNavigate();
	let title = "Find your future home"

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleSearch = () => {
		if (query.trim()) {
			router(`/properties/search-results?query=${query.trim()}`);
		}
	};
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

    let w = window.innerWidth;
    let image = "";

    if(id === "rent") {
        image = rent
    }else if(id === "sale") {
        image = buy
    }else if(id === "shortstay") {
        image = sale
    }else if(id === "events") {
		image = event
		title = "Perfect spaces, memorable events"
	}

    const latestProperties = property?.latestProperties.data;
	const featuredProperties = property?.featuredProperties.data;
    const popularProperties = property?.popularProperties.data;
    const deluxeProperties = property?.deluxeProperties.data;
    const standardProperties = property?.standardProperties.data;
    const premiumProperties = property?.premiumProperties.data;

	const topRef = useRef(null);

	if (isLoading === true) return <Spinner />;

    return (
		<div ref={topRef}>
            <HeroSection image={image} title={title} type={id}/>
            <section className='xl:mb-1 lg:mb-1 mt-4'>
                <PropertyType title="Latest Properties" properties={latestProperties} w={w} url="5800" ads={4} cleaning={cleaning}/>
			</section>

            <section className='xl:mb-1 lg:mb-1 xl:relative lg:relative xl:bottom-[180px] lg:bottom-[180px] -mt-8 mb-9'>	
                <PropertyType title="Featured Properties" properties={featuredProperties} w={w} url="5000" ads={5} cleaning={cleaning}/>
			</section>

            <section className='container mx-auto px-4 flex space-x-2 mb-4 -mt-[200px] mobile-ad-banner'>
				<AddsBanner />
			</section>

            <section className='mb-1 xl:mb-1 lg:mb-1'>
                <PropertyType title="Deluxe Properties" properties={deluxeProperties} w={w} url="5130"/>
			</section>

            <section className='xl:mb-1 lg:mb-1 mb-8'>
                <PropertyType title="Popular Properties" properties={popularProperties} w={w} url="5030" ads={4} cleaning={cleaning}/>
			</section>

            <section className='container mx-auto px-4 flex space-x-2 mb-4 -mt-[100px] mobile-ad-banner'>
				<AddsBanner />
			</section>
            
            <section className='mb-1 xl:mb-1 lg:mb-1'>
                <PropertyType title="Premium Properties" properties={premiumProperties} w={w} url="5930"/>
			</section>

            <section className='mb-16 xl:mb-1 lg:mb-1'>
                <PropertyType title="Standard Properties" properties={standardProperties} w={w} url="5530"/>
			</section>
		</div>
	);
};

export default PropertyPage;