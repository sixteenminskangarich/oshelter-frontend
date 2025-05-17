/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CategoryList from './CategoryList';
import { getAllServices } from '../../../utils/request';
import Spinner from '../../Spinner';
import AddsBanner from '../../banner/AddsBanner';
import { useQuery } from 'react-query';
import banner from '../../../assets/images/3.jpg';
import { Link } from 'react-router-dom';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			onClick={onClick}
			className='xl:relative transform -translate-y-1/2  xl:top-[238px] cursor-pointer z-10 siarrowright ease-in-out hover:border-blue-500 hover:border-2' 
            style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
			<b><SlArrowLeft size={16} style={{ margin: '10px 10pc 10px 10px', fontWeight: '500px' }}/></b>
		</div>
	);
};

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			onClick={onClick}
			className='transform -translate-y-1/2 right-[2px] xl:top-[238px] cursor-pointer siarrowright hover:scale-105 duration-200 ease-in-out hover:border-blue-500 hover:border-2' 
            style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', position: 'absolute', bottom: '-55px;' }}>
                <b><SlArrowRight size={16} style={{ margin: '10px -10px 10px 10px', fontWeight: '500px' }}/></b>
		</div>
	);
};

const ServicePage = () => {
	const serviceData = useQuery({
		queryKey: ['services'],
		queryFn: async () => {
			const response = await getAllServices();
			return response?.latest_services;
		},
	});

	//console.log(serviceData);

	const ServicesSlider = ({ services }) => {
        const [oldSlide, setOldSlide] = useState(0);
        const [activeSlide, setActiveSlide] = useState(0);
        const [activeSlide2, setActiveSlide2] = useState(0);
        let y = "";
        if(activeSlide == 0) {
            y = "";
        } else {
            y = <SamplePrevArrow to='prev' />;
        }

		const settings = {
			dots: false,
			infinite: true,
			speed: 2000,
			slidesToShow: 4,
			slidesToScroll: 1,
			className: 'slides',
			nextArrow: <SampleNextArrow to='next' />,
			prevArrow: y,
			cssEase: "linear",
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						dots: false,
						infinite: true,
						speed: 2000,
						slidesToShow: 3,
						slidesToScroll: 1,
						className: 'slides',
						nextArrow: <SampleNextArrow to='next' />,
						prevArrow: y,
						cssEase: "linear",
						pauseOnDotsHover: true,
					},
				},
				{
					breakpoint: 768,
					settings: {
						dots: false,
						infinite: true,
						speed: 2000,
						slidesToShow: 2,
						slidesToScroll: 1,
						className: 'slides',
						nextArrow: <SampleNextArrow to='next' />,
						prevArrow: y,
						cssEase: "linear",
						pauseOnDotsHover: true,
					},
				},
				{
					breakpoint: 640,
					settings: {
                        centerMode: true,
						dots: false,
						infinite: true,
						speed: 2000,
						slidesToShow: 1,
						slidesToScroll: 1,
						className: 'slides',
						nextArrow: <SampleNextArrow to='next' />,
						prevArrow: y,
						cssEase: "linear",
						pauseOnDotsHover: true,
					},
				},
			],
            beforeChange: (current, next) => {
                setOldSlide(current);
                setActiveSlide(next);
            },
            afterChange: current => setActiveSlide2(current)
		};

		return (
            <div className='slider'>
                <Slider {...settings}>
                    {services?.map((service, index) => (
                        <div key={index} className='p-2'>
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </Slider>
            </div>
		);
	};

	if (serviceData.isError) {
		return <div>Error</div>;
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<CategoryList />
			<section className='mb-8'>
				<div className='relative w-full h-8 container mx-auto text-bg-color '>
                    <div className='absolute left-0 top-0  flex items-center h-full '>
                        <span className='text-base sm:text-lg md:text-xl lg:text-1xl xl:text-1xl text-text-color font-josefin-sans'>
                            Popular Services
                        </span>
                    </div>
                    <div className='absolute right-0 top-0  flex items-center h-full '>
                        <Link
                            href='/allservices'
                            className='text-base sm:text-lg text-text-color md:text-xl lg:text-1xl xl:text-1xl font-josefin-sans'>
                            view all
                        </Link>
                    </div>
                </div>
                
				<ServicesSlider services={serviceData?.data} />
			</section>

            <section className='flex space-x-2 mb-8'>
				<AddsBanner banner={banner}/>
				<AddsBanner />
			</section>

			<section className='mb-8'>
			<div className='relative w-full h-8 container mx-auto text-bg-color '>
                    <div className='absolute left-0 top-0  flex items-center h-full '>
                        <span className='text-base sm:text-lg md:text-xl lg:text-1xl xl:text-1xl text-text-color font-josefin-sans'>
							Making a new home/office
                        </span>
                    </div>
                    <div className='absolute right-0 top-0  flex items-center h-full '>
                        <Link
                            href='/allservices'
                            className='text-base sm:text-lg text-text-color md:text-xl lg:text-1xl xl:text-1xl font-josefin-sans'>
                            view all
                        </Link>
                    </div>
                </div>
				<ServicesSlider services={serviceData?.data} />
			</section>
		</div>
	);
};

export default ServicePage;
