// Desc: PropertyListing component
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listOfProperties } from '../../../utils/stateQueries';
import PropertyMobileCard from '../../cards/PropertyCard';
import PropertyCard from './PropertyCard';
import { RxCaretSort } from "react-icons/rx";
import { htmlConverterReact } from 'html-converter-react';
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { SiLinkedin } from "react-icons/si";
import { PiPhoneCallBold } from "react-icons/pi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { toast } from 'react-toastify';
import DynamicMetaTagComponent from '../../cards/helmet/dynamicTags';

export default function PropertyListing() {
    const { id } = useParams();
    const { data: properties } = listOfProperties(id);
    const business = properties?.data?.business
    const [hostContact, setHostContact] = useState(false)

    const listOfProperty = properties?.data?.totalListing
    const PropertiesListing = properties?.data?.properties?.data
    let w = window.innerWidth
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleHostContact = () => {
        setHostContact(!hostContact)
    }

    const handleCopy = async () => {
        try {
            const text = window.location.href;
            await navigator.clipboard.writeText(text);
            toast.success('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy text');
        }
    };
    const imageUrl = business?.url
    const title = business?.business
    const description = business?.description
    
    return(
        <>
        <DynamicMetaTagComponent title={'Oshelter - '+title} description={description} imageUrl={imageUrl} />
        <div className='container mx-auto px-4 py-8 xl:mt-36 lg:mt-36 mt-10'>
            <div className="xl:flex lg-flex">
                <div className="xl:w-1/4 lg:w-1/4 w-[90%] container row sm:flex-1 xl:ml-0 lg:ml-0 ml-5">
                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <div className="flex justify-center">
                            <img
                                src={business?.url}
                                alt="Just Image"
                                className='relative rounded-full xl:h-40 xl:w-40 lg:h-40 lg:w-40 h-280 w-28 mb-2 border-2 border-[#283890]'
                            />
                        </div>
                        <h2 className='xl:text-2xl lg:text-2xl text-xl font-bold text-[#283890]'>{ business?.business }</h2>
                        <p className='text-xl font-bold text-black mt-3'>{ business?.address }</p>
                        <p className='text-sm text-light-gray mt-4'>
                            <span className="bg-white text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 text-lg">Identity Verified</span>
                        </p>
                        <div className='flex items-center justify-center mt-4'>
                            <div className="mr-2 bg-[#CED4F7] rounded-md xl:p-6 lg:p-6 p-3">
                                <b className="text-[#283890] text-xl">120</b>
                                <p className="text-sm">Successful deals</p>
                            </div>

                            <div className="bg-[#CED4F7] rounded-md xl:p-6 lg:p-6 p-3">
                                <b className="text-[#283890] text-xl">{ listOfProperty }</b>
                                <p>Total listings</p>
                            </div>
                        </div>

                        <div className='items-center justify-center mt-4'>
                            <h5 className="font-bold mb-2">About Agent</h5>
                            <p className="font-thin text-sm">
                                { htmlConverterReact(business?.description) }
                            </p>
                        </div>
                    </div>

                    <div className='p-3 rounded-lg mb-4 border-2 text-center bg-gray-100'>
                        <button type='button' onClick={handleHostContact} className={`w-full bg-bg-color text-white py-4 rounded-md ${hostContact ? 'bg-white text-bg-color' : ''}`}>
                            Contact Host
                        </button>
                        {
                            hostContact && (
                                <div className="container mt-4">
                                    <h5 className="font-bold mb-2">Contact</h5>
                                    <div className="flex items-center justify-center">
                                        <PiPhoneCallBold className='text-3xl text-blue-800 mr-2' /> <MdOutlineMarkEmailUnread  className='text-3xl text-blue-800 mr-2' />
                                    </div> 
                                    <div className="mt-4">
                                        <h5 className="font-bold mb-2">Share this agent</h5>
                                        <div className="flex items-center justify-center">
                                            <FaFacebookSquare  className='text-3xl text-blue-800 mr-2' /> <AiFillTikTok  className='text-3xl text-blue-800 mr-2' /> <RiInstagramFill  className='text-3xl text-blue-800 mr-2' /> <SiLinkedin className='text-3xl text-blue-800' />
                                        </div> 
                                    </div>
                                </div>
                            )
                        }

                        <button type="button" onClick={handleCopy} className='w-full border mt-2 border-bg-color text-bg-color bg-white py-3 rounded-md'>
                            Share Host Details
                        </button>
                    </div>
                </div>
                <div className="xl:w-3/4 lg:w-3/4 w-[100%] row xl:ml-4">
                    <section className='mb-8'>
                        <div className="flex flex-1 justify-start items-start">
                            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-bg-color border border-bg-color w-[10%] hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sort By <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <div id="dropdown" className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Properties</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Apartment</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Room</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Land</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Office</a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        { w <= 789 || w <= 810 ?
                            <div className="grid gap-1 grid-cols-2 grid-rows-2 md:grid-cols-3 ml-4 mb-12">
                                {PropertiesListing?.map((property) => (
                                    <PropertyMobileCard key={property.id} property={property} />
                                ))}
                            </div>
                        :
                            <div className='grid xl:grid-cols-3 xl:gap-3 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 -mt-12 mx-auto py-8 '>
                                {PropertiesListing?.map((property, index) => (
                                    <>
                                        <div key={index}>
                                            <PropertyCard key={property.id} property={property} />
                                        </div>
                                    </>
                                ))}
                            </div>
                        }
                    </section>
                </div>
            </div>
        </div>
        </>
    )
}