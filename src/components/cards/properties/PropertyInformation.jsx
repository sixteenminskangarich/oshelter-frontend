import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Tiptap from '../Tiptap/Tiptap';
import { useForm } from 'react-hook-form';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { PropertyDetailsScheme } from '../../../lib/scheme';
import { saveFinishLIne } from '../../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { LuBedDouble } from "react-icons/lu";
import { MdOutlineBathtub } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Accordion, AccordionItem as Items } from "@szhsin/react-accordion";
import { Gallery, Item } from 'react-photoswipe-gallery'
import { FaUserGroup } from "react-icons/fa6";
import { useGetPropertyDetails } from '../../../../hooks/propertiesqueries/propertyqueries';
import chevron from "../../../assets/images/chevron-down.svg";
import { ImSpinner9 } from 'react-icons/im';

const PropertyInformation = ({ externalId, properties  }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const mutation = useMutation(
		(propertyData) => saveFinishLIne(propertyData, token, externalId),
		{
			onSuccess: (data) => {
				console.log(data)
				if(data.success === true) {
                    navigate(`/dashboard/properties/add/${externalId}/6`)
                }else {
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = (values, actions) => {
        setLoading(true)
        if (user && token) {
            // User is logged in, proceed with booking
            mutation.mutate(values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

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

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            step: 7
        },
        onSubmit,
    })

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "100%" }}>100%</div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Property Amenities</h2>
            <div className="overflow-y-auto" style={{ height: '680px' }}>
                <div className='container mx-auto p-2 mt-10'>

                    {/* Main Section */}
                    <div className='lg:flex lg:space-x-8'>
                        {/* Left Section */}
                        <div className=' md:w-full lg:w-full '>
                            <div className='flex flex-col md:flex-row'>
                            </div>
                        </div>
                    </div>

                {/* Similar Homes */}
                </div>
                <div className='container mx-auto mt-2'>
                    <div className='flex flex-col md:flex-row mt-1 md:space-x-4'>
                        <div className='lg:w-3/10 w-full' style={{ fontFamily: "'Josefin Sans'" }}>
                            <span className='flex rounded-full mx-3 tracking-wider'>
                                <div className="relative top-1 w-3 h-3 bg-red-400 rounded-full mx-1" style={{ backgroundColor:'#283890' }}></div>
                                <span className='font-medium' style={{ color: 'gray' }}>{properties?.data?.propertyType}</span>
                            </span>
                            <p className='text-gray-600 flex items-center text-xl font-bold mb-1 mx-3 mb-2 tracking-wider'>
                                {properties?.data?.location}
                            </p>
                            <p className='flex mx-3 amentity'>
                                <span className='font-bold text-xl currency'>{properties?.data?.currency}{properties?.data?.amount || 0}
                                    {
                                        properties?.data?.marketType === "Rent" ?
                                            (" | Month")
                                        :
                                            ("")
                                    }
                                </span>
                                <br />
                                <span className='flex xl:ml-28 xl:text-lg'>
                                    <LuBedDouble className='mr-1 ml-2 mt-1 text-gray'/> {properties?.data?.numberOfBedrooms} Bedroom &nbsp;&nbsp;
                                </span>

                                <span className='flex xl:ml-16 xl:text-lg'>
                                    <MdOutlineBathtub className='mr-1 mt-1' />{properties?.data?.numberOfBath}{' '}Bathroom
                                </span>

                                <span className='flex xl:ml-16 xl:text-lg'>
                                    <GoHome className='ml-4 mt-1' /> {properties?.data?.sqft}{' '}
                                    sqft
                                </span>

                                <span className='flex xl:ml-16 xl:text-lg'>
                                    <FaUserGroup className='ml-1 mt-1' />&nbsp;
                                    {properties?.data?.stories}{' '}
                                </span>
                            </p>

                            {/* Accordion Details */}
                            <div className='mt-4'>
                                <div className="mx-2 my-4">
                                    <Accordion transition transitionTimeout={200} allowMultiple>
                                        <AccordionItem header="Property details">
                                            <strong>Detailed Description:</strong> <p>{properties?.data?.detailedDescription}</p> <hr /> <br />
                                            <strong>Location: </strong> <p>{ properties?.data?.location }</p> <hr /><br />
                                            <strong>Nearest Landmark: </strong> <p>{ properties?.data?.nearest_landmark }</p>
                                        </AccordionItem>

                                        <AccordionItem header="Amenities">
                                            <div className="grid grid-rows-4 grid-flow-col gap-3">
                                                {properties?.data?.propertyAmenities.map((amenity, index) => (
                                                    <span key={index}>
                                                        <span className="inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-white bg-blue-500 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                            </svg>
                                                        </span>{amenity.name} &nbsp;
                                                    </span>
                                                ))}
                                            </div>
                                        </AccordionItem>

                                        <AccordionItem header="Rules">
                                            <div className="grid grid-rows-4 grid-flow-col gap-4">
                                                {properties?.data?.propertyRules.map((rule, index) => (
                                                    <span key={index}>
                                                        <span className="inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-white bg-blue-500 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                            </svg>
                                                        </span>{rule.name} &nbsp;
                                                    </span>
                                                ))}
                                                
                                            </div>
                                            
                                        </AccordionItem>

                                        <AccordionItem header="Map">
                                            Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.Fusce vulputate purus sed tempus feugiat.
                                        </AccordionItem>

                                        <AccordionItem header="Reviews">
                                            <p className='mt-2 text-gray-600'>No reviews yet.</p>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex xl:items-end xl:justify-end lg:items-end lg:justify-end relative bottom-20 items-center justify-center">
                    <div className="row flex">
                        {
                            loading === true ? (
                                <>
                                    <button
                                        disabled
                                        className="rounded-xl w-full flex animate-pulse bg-bg-color py-3 px-32 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit">
                                        <ImSpinner9 className="animate-spin mt-1 mr-2"/> processing
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`/dashboard/properties/${externalId}`}
                                        className="rounded-md w-full rounded-r-none bg-red-700 py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            Back
                                    </Link>
                                    <button
                                        className="rounded-md w-full rounded-l-none bg-bg-color py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit">
                                        Publish
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </form>
        </>
	);
};

export default PropertyInformation;