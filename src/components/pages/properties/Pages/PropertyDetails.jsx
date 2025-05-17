/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { LuBedDouble, LuUser } from "react-icons/lu";
import { MdAlternateEmail, MdOutlineBathtub } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Accordion, AccordionItem as Items } from "@szhsin/react-accordion";
import { Link, useParams } from 'react-router-dom';
import { useGetPropertyDetails } from '../../../../../hooks/propertiesqueries/propertyqueries';
import Spinner from '../../../Spinner';
import Head from 'next/head';
import PropertyCard from '../PropertyCard';
import BookProperty from '../../../bookings/BookProperty';
import chevron from "../../../../assets/images/chevron-down.svg";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import AddsBanner from '../../../banner/AddsBanner';
import { Badge } from "flowbite-react";
import { FaRegImages } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import PropertyMobileCard from '../../../cards/PropertyCard';
import { FaLocationDot, FaUserGroup } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { RiTelegramLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { MdVerifiedUser } from "react-icons/md";
import { htmlConverterReact } from 'html-converter-react';
import DynamicMetaTagComponent from '../../../cards/helmet/dynamicTags';
import MapWithMarker from '../../../cards/Map/MapWithMarker';

const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			onClick={onClick}
			className='transform -translate-y-1/2 left-[3px] cursor-pointer z-10 siarrowright' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
			<b><SlArrowLeft size={16} style={{ margin: '10px 10pc 10px 10px', fontWeight: '500px' }}/></b>
		</div>
	);
};

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			onClick={onClick}
			className='transform -translate-y-1/2 right-[2px] cursor-pointer siarrowright' style={{ backgroundColor: 'white', borderRadius: '50%', height: '37px', width: '37px', display: 'inline-block', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', position: 'absolute', bottom: '-55px;' }}>
                <b><SlArrowRight size={16} style={{ margin: '10px -10px 10px 10px', fontWeight: '500px' }}/></b>
		</div>
	);
};

const containerStyle = {
    width: '400px',
    height: '300px',
};

const PropertyDetails = () => {
	const { id } = useParams();
	const propertyData = useGetPropertyDetails(id);
	const { data: property, isLoading } = propertyData;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const center = {
        lat: parseFloat(property?.data?.latitude),
        lng: parseFloat(property?.data?.longitude),
    };

    console.log(center)

	// Set the main image
	const [mainImage, setMainImage] = useState(
		property?.data?.propertyPhotos[0].url
	);

	const [showMap, setShowMap] = useState(false);

	// State to track which section is open
	const [openSections, setOpenSections] = useState({
		details: false,
		amenities: false,
		map: false,
		reviews: false,
	});

    const AccordionItem = ({ header, ...rest }) => (
        <Items
            {...rest}
            header={({ state: { isEnter } }) => (
                <>
                    {header}
                    <img className={`ml-auto transition-transform duration-200 ease-out ${ isEnter && "rotate-180" }`} src={chevron} alt="Chevron" />
                </>
            )}
            className="border-b"
            buttonProps={{className: ({ isEnter }) => `flex w-full p-4 text-left hover:bg-slate-100 ${ isEnter && "bg-slate-200"}`}}
            contentProps={{className: "transition-height duration-200 ease-out"}}
            panelProps={{ className: "p-4" }}
        />
    );

    const ImageSlider = ({ properties }) => {
        const [oldSlide, setOldSlide] = useState(0);
        const [activeSlide, setActiveSlide] = useState(0);
        const [activeSlide2, setActiveSlide2] = useState(0);
        const [count, setCount] = useState(0)
        let y = "";

        if(activeSlide == 0) {
            y = "";
        } else {
            y = <SamplePrevArrow to='prev' />;
        }

		const settings = {
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: false,
			            infinite: true,
			            speed: 500,
			            slidesToShow: 2,
			            slidesToScroll: 1,
			            nextArrow: <SampleNextArrow to='next' />,
			            prevArrow: y,
                        className: "slider variable-width",
                        centerMode: true,
                        centerPadding: "-10px",
					},
				},
				{
					breakpoint: 640,
					settings: {
                        dots: false,
			            infinite: true,
			            speed: 500,
			            slidesToShow: 1,
			            slidesToScroll: 1,
			            nextArrow: <SampleNextArrow to='next' />,
			            prevArrow: y,
					},
				},
			],
            beforeChange: (current, next) => {
                setOldSlide(current);
                setActiveSlide(next);
            },
            afterChange: (current) => {
                setActiveSlide2(current)
            }
		};

		return (
            <div className='slider' style={{ marginTop: '-30px' }}>
                <Slider {...settings}>
                        <div className='p-2 mt-4'>
                            <img src={property.data.featuredPropertyPhoto.url} className='rounded-lg m w-full object-cover cursor-pointer' style={{ height: '265px' }} onClick={() => setMainImage(image.url)} />
                        </div>
                    {property.data.propertyPhotos.map((image, index) => (
                        <div key={index} className='p-2 mt-4'>
                            <img key={index} src={image.url} alt={`Property ${index + 1}`} className='rounded-lg m w-full object-cover cursor-pointer' style={{ height: '265px' }} onClick={() => setMainImage(image.url)} />
                        </div>
                    ))}
                </Slider>
            </div>
		);
	};

	const toggleSection = (section) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

    let w = window.innerWidth;

	if (isLoading) return <Spinner loading={isLoading} />;

    const images = property?.data?.propertyPhotos;
    const length = property.data.propertyPhotos.length;

    if(length > 4) {
        images.splice(4);
    }
    let duration = "";
    if(property?.data?.marketType === "Short Stay") {
        duration = "| per night"
    } else if(property?.data?.marketType === "Sale" || property?.data?.marketType === "Long Lease") {
        duration = ""
    }
    else {
        duration = "| month"
    }


    const description = htmlConverterReact(property?.data?.detailedDescription)
    const formatNumberWithCommas = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const currentUrl = window.location.href;

    function shareOnWhatsApp(url, message) {
        const encodedMessage = encodeURIComponent(`${message} ${url}`);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank'); // Open in a new tab
    }

    function shareOnSMS(url, message) {
        const encodedMessage = encodeURIComponent(`${message} ${url}`);
        const smsUrl = `sms:?body=${encodedMessage}`;
        window.open(smsUrl, '_blank'); // Open in a new tab
    }

    function shareOnTelegram(url, message) {
        const encodedUrl = encodeURIComponent(url);
        const encodedMessage = encodeURIComponent(message);
        const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
        window.open(telegramUrl, '_blank'); // Open in a new tab
    }

    function shareOnFacebook(url) {
        const encodedUrl = encodeURIComponent(url);
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(facebookUrl, '_blank'); // Open in a new tab
    }

    function shareOnX(url, text) {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        window.open(xUrl, '_blank');
    }

    console.log(property?.data)

	return (
		<>
            <DynamicMetaTagComponent title={'Oshelter - '+property?.data?.title} description={description} imageUrl={property?.data?.featuredPropertyPhoto?.url} />
			<div className='container mx-auto p-2 xl:mt-20 lg:mt-20 mt-12'>
                <div className='lg:flex lg:space-x-8'>
					{/* Left Section */}
					<div className=' md:w-full lg:w-full'>
                        { w <= 789 ?
                            <ImageSlider style={{ width: '100%', marginTop: '15px;' }} properties={property}/>
                        : 
                            <>
                                <div className='flex flex-col md:flex-row'>
                                    <Gallery>
                                        <Item
                                            original={property?.data?.featuredPropertyPhoto?.url}
                                            thumbnail={property?.data?.featuredPropertyPhoto?.url}
                                            width="1024"
                                            height="768"
                                        >
                                            {({ ref, open }) => (
                                                <img 
                                                    ref={ref} 
                                                    onClick={open} 
                                                    src={property?.data?.featuredPropertyPhoto?.url} 
                                                    className='rounded-lg w-full h-96 object-cover lg:w-3/5 md:w-2/3 mb-4 md:mb-0'
                                                />
                                            )}
                                        </Item>

                                        <div className='grid grid-cols-2 gap-1 md:w-2/3 ml-2'>
                                            {property?.data?.propertyPhotos.map((image, index) => (
                                                <Item
                                                    original={image.url}
                                                    thumbnail={image.url}
                                                    width="1024"
                                                    height="768"
                                                    key={index}
                                                >
                                                    {({ ref, open }) => (
                                                        <img 
                                                            ref={ref} 
                                                            onClick={open} 
                                                            src={image.url}
                                                            className='rounded-lg m w-full object-cover cursor-pointer' style={{ height: '185px' }}
                                                        />
                                                    )}
                                                </Item>
                                            ))}
                                        </div>
                                    </Gallery>
                                </div>
                            </>
                        }
                        <div className="relative flex bottom-12 justify-end items-end">
                            <span className="mx-2">
                                <span className="bg-white text-black me-2 px-2.5 py-1 rounded-lg dark:bg-gray-700 text-lg font-medium">{property.data.propertyPhotos.length} pictures</span>  
                            </span>
                        </div>
                    </div>
                </div>

                <div className='container mx-auto'>
                    <div className='flex flex-col md:flex-row mt-1 md:space-x-4'>
                        <div className='lg:w-3/10 w-full josefin-sans' style={{ fontFamily: "'Josefin Sans'" }}>
                            <span className='flex rounded-full mx-3 tracking-wider'>
                                <div className="relative top-1 w-3 h-3 bg-red-400 rounded-full mx-1" style={{ backgroundColor:'#283890' }}></div>
                                <span className='font-medium' style={{ color: 'gray' }}>{property?.data?.propertyType}</span>
                            </span>

                            <div className="flex justify-end">
                                <button type="button" onClick={toggleDropdown} className="flex absolute xl:-mt-5 lg:-mt-5 -mt-10 xl:mr-5 lg:mr-5 mr-3 xl:px-6 lg:px-6 px-2.5 py-1 border border-bg-color text-bg-color rounded-lg hover:text-white hover:bg-bg-color">
                                    <IoIosShareAlt className="mr-1 mt-1"/>Share
                                </button>
                                
                            </div>
                            <div className="flex absolute left-[55%] ml-3 mt-5 border border-bg-color shadow-2xl text-bg-color">
                                {isOpen && (
                                    <ul className="dropdown-menu rounded-lg bg-white z-10">
                                        <li className="dropdown-menu-item mt-1 mb-1"><button type="button" onClick={() => shareOnWhatsApp(currentUrl, property?.data?.title)} className='flex py-1'><FaWhatsapp className="ml-2 mt-1"/>&nbsp;Whatsapp</button></li>
                                        <li className="dropdown-menu-item mb-1 flex py-1"><button type="button" onClick={() => shareOnFacebook(currentUrl, property?.data?.title)} className="flex py-1"><RiFacebookCircleLine className="ml-2 mt-1"/>&nbsp;Facebook</button></li>
                                        <li className="dropdown-menu-item mb-1 flex py-1"><button type="button" onClick={() => shareOnTelegram(currentUrl, property?.data?.title)} className="flex py-1"><RiTelegramLine className="ml-2 mt-1"/>&nbsp;Telegram</button></li>
                                        <li className="dropdown-menu-item mb-1 flex py-1"><button className="flex" type="button" onClick={() => shareOnSMS(currentUrl, property?.data?.title) }><BiMessageDetail className="ml-2 mt-1"/>&nbsp;SMS</button></li>
                                        <li className="dropdown-menu-item mb-1 flex py-1"><button className="flex" type="button" onClick={() => shareOnX(currentUrl, property?.data?.title) }><FaXTwitter className="ml-2 mt-1"/>&nbsp;X</button></li>
                                    </ul>
                                )}
                            </div>
                            <p className='text-gray-600 flex items-center text-xl font-bold mb-1 mx-3 tracking-wider'>
                                {property?.data?.location}
                            </p>
                            <div className='lg:flex xl:flex mx-3 amentity'>
                                <span className='font-bold text-xl currency'>
                                    {
                                        property?.data?.propertyType === "Off The Plan" ? (
                                            <>
                                                Starting from {property?.data?.currency} {formatNumberWithCommas(property?.data?.amount) || 0}
                                            </>
                                        ) : (
                                            <>
                                                {property?.data?.currency} {formatNumberWithCommas(property?.data?.amount) || 0} {duration}
                                            </>
                                        )
                                    }
                                </span>
                                <br />
                                <div className="flex">
                                    {
                                        property?.data?.propertyType === "Land" ? (
                                            <>
                                                <div className='flex text-md mr-3 xl:ml-28 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Indenture:&nbsp; Yes
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Title:&nbsp; Yes
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Serviced:&nbsp; Yes
                                                    </p>
                                                </div>
                                            </>
                                        ) : 
                                        property?.data?.propertyType === "Off The Plan" ?
                                        (
                                            <>
                                                <div className='flex text-md mr-3 xl:ml-28 xl:text-md'>
                                                    <p className="relative flex text-bg-color leading-normal font-medium">
                                                        Indenture:&nbsp; Yes
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-bg-color leading-normal font-medium cursor-pointer">
                                                        View Brochure
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-bg-color leading-normal font-medium">
                                                        Serviced:&nbsp; Yes
                                                    </p>
                                                </div>
                                            </>
                                        )
                                        :
                                        property?.data?.propertyType === "Event Space" ? (
                                            <>
                                                <div className='flex text-md mr-3 xl:ml-28 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-medium">
                                                        Capacity:&nbsp; {property?.data?.capacity}
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-medium">
                                                        Noise Restriction:&nbsp; {property?.data?.isNoise === true ? 'Yes' : 'No'}
                                                    </p>
                                                </div>

                                                <div className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <p className="relative flex text-slate-600 leading-normal font-medium">
                                                        Advanced Notice:&nbsp; {property?.data?.isAdvancedNotice === true ? 'Yes' : 'No'}
                                                    </p>
                                                </div>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <span className='flex text-md mr-3 xl:ml-16 xl:text-md'>
                                                    <LuBedDouble className='mr-1 ml-2 mt-1 text-gray'/> {property?.data?.numberOfBedrooms} Bedroom &nbsp;&nbsp;
                                                </span>

                                                <span className='flex text-md mr-3 xl:ml-10 xl:text-md'>
                                                    <MdOutlineBathtub className='mr-1 mt-1' />{property?.data?.numberOfBath}{' '}Bathroom
                                                </span>

                                                <span className='flex text-md mr-3 xl:ml-10 xl:text-md'>
                                                    <GoHome className='ml-4 mt-1' /> {property?.data?.sqft}{' '}
                                                   sqft
                                                </span>

                                                <span className='flex text-md xl:ml-10 xl:text-lg'>
                                                    <FaUserGroup className='ml-4 mt-1' />&nbsp;
                                                    {property?.data?.stories}{' '}
                                                </span>
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Accordion Details */}
                            <div className='mt-4'>
                                <div className="mx-2 my-4">
                                    <Accordion transition transitionTimeout={200} allowMultiple>
                                        <AccordionItem header="Property details">
                                            {htmlConverterReact(property?.data?.detailedDescription)}
                                        </AccordionItem>

                                        <AccordionItem header="Amenities">
                                            <div className="grid grid-rows-4 grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-2">
                                                {property?.data?.propertyAmenities.map((amenity, index) => (
                                                    <span key={index}>
                                                        <span key={index}>
                                                            <span className="inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-white bg-blue-500 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                                </svg>
                                                            </span>{amenity.name} &nbsp;
                                                        </span>
                                                    </span>
                                                ))}
                                            </div>
                                        </AccordionItem>

                                        <AccordionItem header="Map">
                                            <MapWithMarker center={center} />
                                        </AccordionItem>

                                        <AccordionItem header="Host Details">
                                            <div className='lg:w-3/10 w-full'>
                                                <div className="flow-root overflow-x-auto mb-2">
                                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        <li className="py-6 mt-2 w-full bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                            <div className="flex">
                                                                <div className="flex items-right xl:ml-8 lg:ml-8">
                                                                    <div className="flex-shrink-0 ml-3">
                                                                        <img src={property?.data?.business?.url} className="w-16 h-16 xl:w-32 xl:h-32 lg:w-24 lg:h-24 rounded-full border-2 border-gray-700 mt-2" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0 ms-4 xl:mt-6 lg:mt-6 mt-2 text-xs">
                                                                        <h2 className="text-xl">{ property?.data?.business?.business }</h2>
                                                                        <hr className="py-[1px] w-[60px] my-1 bg-black"/>
                                                                        <span className="flex bg-gray-100 text-black mt-2 font-medium me-2 px-2.5 py-0.5">
                                                                            <FaLocationDot /> {property?.data?.business?.location}
                                                                        </span>
                                                                        <span className="flex bg-gray-100 text-black mt-2 font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-gray-400 text-sm">
                                                                            <MdVerifiedUser className="text-md mt-0.5 mr-0.5 text-blue-800"/>Identity Verified
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex">
                                                                    <div className="flex-shrink-0 relative xl:left-64 lg:left-32 xl:mt-12 mt-10 left-3">
                                                                        <Link to={`/properties/${property?.data?.business?.id}/profile`} className="xl:py-2 lg:py-2 xl:px-7 lg:px-7 py-1 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-800 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">View all listing</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        
                        <BookProperty
                            id={property?.data?.externalId}
                            property={property?.data}
                        />
                    </div>
                </div>

                <div className='p-2 xl:mb-8 lg:mb-8'>
                    { w <= 789 ?
                        <>
                            <h2 className='text-xl font-semibold font-josefin-sans mx-auto mb-12 mt-8'>
                                Similar {property?.data?.propertyType === "Event Space" ? 'Locations' : 'Properties'}
                            </h2>
                            <div className="">
                                <div className="grid gap-2 grid-cols-2 -mt-10 mb-10">
                                    {property?.data?.similarProperties?.data?.map((property, index) => (
                                        <div key={index} >
                                            <PropertyMobileCard key={property.id} property={property} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    :
                        <div className="container mx-auto">
                            <h2 className='text-xl font-semibold font-josefin-sans mx-auto'>
                                Similar {property?.data?.propertyType === "Event Space" ? 'Locations' : 'Properties'}
                            </h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
                                {property?.data?.similarProperties?.data?.map((property, index) => (
                                    <div key={index} className='bg-white '>
                                        <PropertyCard property={property} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
		</>
	);
};

export default PropertyDetails;
