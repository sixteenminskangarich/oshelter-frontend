import { Link, useParams } from 'react-router-dom';
import Scrow from '../../../assets/images/scrow.png';
import { listOfServicesUnderProvider } from '../../../utils/ServicesQueries';
import ServiceCard from './ServiceCard';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

export default function ServiceProviderListing() {
    const { id } = useParams();
    const { data: services } = listOfServicesUnderProvider(id);

    const business = services?.data?.business
    const totalListings = services?.data?.totalServices

    const listOfServices = services?.data?.services?.data

    let w = window.innerWidth

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
    return(
        <div className='container mx-auto px-4 py-8 lg:mt-36 xl:mt-36 mt-8'>
            <div className="xl:flex lg:flex">
                <div className="xl:w-1/4 lg:2-1/4">
                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <img
                            src={business?.logoUrl}
                            alt="Just Image"
                            className='relative left-14 rounded-full h-40 w-40 mb-2 ml-10 border-2 border-[#283890]'
                        />
                        <h2 className='text-2xl font-bold text-[#283890]'>
                            {business?.business}
                        </h2>
                        <p className='text-xl font-bold text-black mt-3'>
                            {business?.location}
                        </p>
                        <p className='text-sm text-light-gray mt-4'>
                            <span className="bg-white text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 text-lg">Identity Verified</span>
                        </p>
                        <div className='flex items-center justify-center mt-4'>
                            <div className="mr-2 bg-[#CED4F7] rounded-md p-6">
                                <b className="text-[#283890] text-xl">120</b>
                                <p className="text-sm">Successful deals</p>
                            </div>

                            <div className="bg-[#CED4F7] rounded-md p-6">
                                <b className="text-[#283890] text-xl">{ totalListings }</b>
                                <p>Total listings</p>
                            </div>
                        </div>

                        <div className='items-center justify-center mt-4'>
                            <h5 className="font-bold mb-2">About Agent</h5>
                            <p className="font-thin text-sm">The w-auto utility can be useful if you need to remove an element’s assigned width under a specific condition, like at a particular breakpoint:</p>
                        </div>
                    </div>

                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <button type='button' className='w-full bg-[#7C8CE3] text-white py-4 rounded-md'>
                            Contact Host
                        </button>
                        <div className='space-y-4 mt-4 lg:mt-0'>
                            <div className='flex space-x-4 mt-4'>
                                <button
                                    className='w-full border border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                                    Call
                                </button>
                                <button className='w-full border border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                                    Message
                                </button>
                            </div>

                            <hr className="bg-black py-0.3 mb-2"/>
                        </div>
                        
                        <button className='w-full border mt-2 border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                            Share Host Details
                        </button>
                    </div>
                </div>
                <div className="xl:w-3/4 xl:ml-4">
                    <section className='container mb-8'>
                        { w <= 789 || w <= 810 ?
                            <ServicesSlider services={listOfServices} />
                        :
                            <div className="grid grid-cols-4 gap-4">
                                {listOfServices?.map((service, index) => (
                                    <div>
                                        <ServiceCard service={service} />
                                    </div>
                                ))}
                            </div>
                        }
                    </section>
                </div>
            </div>
            
            {/* <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-4 col-span-1">
                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <img
                            src={Scrow}
                            alt="Just Image"
                            className='relative left-24 rounded-full h-40 w-40 mb-2 ml-10 border-2 border-[#283890]'
                        />
                        <h2 className='text-2xl font-bold text-[#283890]'>
                            Vibrant Press
                        </h2>
                        <p className='text-xl font-bold text-black mt-3'>
                            Accra Ghana
                        </p>
                        <p className='text-sm text-light-gray mt-4'>
                            <span className="bg-white text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 text-lg">Identity Verified</span>
                        </p>
                        <div className='flex items-center justify-center mt-4'>
                            <div className="mr-2 bg-[#CED4F7] rounded-md p-6">
                                <b className="text-[#283890] text-xl">120</b>
                                <p className="text-sm">Successful deals</p>
                            </div>

                            <div className="bg-[#CED4F7] rounded-md p-6">
                                <b className="text-[#283890] text-xl">120</b>
                                <p>Total listings</p>
                            </div>
                        </div>

                        <div className='flex items-center justify-center mt-4'>
                            <h5 className="font-bold">About Agent</h5>
                        </div>
                    </div>

                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <button type='button' className='w-full bg-[#7C8CE3] text-white py-4 rounded-md'>
                            Contact Host
                        </button>
                        <div className='space-y-4 mt-4 lg:mt-0'>
                            <div className='flex space-x-4 mt-4'>
                                <button
                                    className='w-full border border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                                    Call
                                </button>
                                <button className='w-full border border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                                    Message
                                </button>
                            </div>

                            <hr className="bg-black py-0.3 mb-2"/>
                        </div>
                        
                        <button className='w-full border mt-2 border-bg-color text-blue-500 bg-white py-3 rounded-md'>
                            Share Host Details
                        </button>
                    </div>
                </div>
                <div className="row-span-2 col-span-6 ...">03</div>
            </div> */}
        </div>
    )
}