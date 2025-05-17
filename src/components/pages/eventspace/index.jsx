import React, { useRef } from 'react';
import HeroSection from '../properties/HeroSection';
import Spinner from '../../Spinner';
import eventspace from '../../../assets/images/event.jpg';
import cleaning from '../../../assets/images/cleaning.jpg'
import building from '../../../assets/images/electronic.jpg';
import { useEventSpace, useProperty } from '../../../utils/stateQueries';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropertyType from '../../cards/Property';
import AddsBanner from '../../banner/AddsBanner';

const EventSpace = () => {
    const { id } = useParams();
    const count = "events"
    const pathname = useLocation();
    const key = pathname.pathname.split('/')[2];
    const { data: events, isLoading } = useEventSpace();
    const [query, setQuery] = useState('');
    const router = useNavigate();
    let title = "Perfect spaces, memorable events"
    
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

    console.log(events)
    
    let w = window.innerWidth;

    
    const latestProperties = events?.latestProperties?.data;
    const featuredProperties = events?.featuredProperties.data;
    const popularProperties = events?.popularProperties.data;
    const deluxeProperties = events?.deluxeProperties.data;
    const standardProperties = events?.standardProperties.data;
    const premiumProperties = events?.premiumProperties.data;
    
    const topRef = useRef(null);
    
    if (isLoading === true) return <Spinner />;
    
    return (
        <>
            <div ref={topRef}>
                <HeroSection image={eventspace} title={title} type={count}/>
                <section className='xl:mb-1 lg:mb-1 mt-4'>
                    <PropertyType title="Latest Location" properties={latestProperties} w={w} url="5800" ads={4} cleaning={cleaning}/>
                </section>

                <section className='xl:mb-1 lg:mb-1 xl:relative lg:relative xl:bottom-[180px] lg:bottom-[180px] -mt-8 mb-9'>	
                    <PropertyType title="Featured Location" properties={featuredProperties} w={w} url="5000" ads={5} cleaning={cleaning}/>
                </section>

                <section className='container mx-auto px-4 flex space-x-2 mb-4 -mt-[200px] mobile-ad-banner'>
                    <AddsBanner />
                </section>

                <section className='mb-1 xl:mb-1 lg:mb-1'>
                    <PropertyType title="Deluxe Location" properties={deluxeProperties} w={w} url="5130"/>
                </section>

                <section className='xl:mb-1 lg:mb-1 mb-8'>
                    <PropertyType title="Popular Location" properties={popularProperties} w={w} url="5030" ads={4} cleaning={cleaning}/>
                </section>

                <section className='container mx-auto px-4 flex space-x-2 mb-4 -mt-[100px] mobile-ad-banner'>
                    <AddsBanner />
                </section>
                
                <section className='mb-1 xl:mb-1 lg:mb-1'>
                    <PropertyType title="Premium Location" properties={premiumProperties} w={w} url="5930"/>
                </section>

                <section className='mb-16 xl:mb-1 lg:mb-1'>
                    <PropertyType title="Standard Location" properties={standardProperties} w={w} url="5530"/>
                </section>
            </div>
        </>
    );
};

export default EventSpace;