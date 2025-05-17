import { useState}  from 'react';
// Removed unused imports 'Drawer' and 'Modal'
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import { PropertyScheme } from '../../../lib/scheme';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { updateProperty } from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { ImSpinner9 } from 'react-icons/im';

const Property = ({ externalId, properties }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let step = 0;
    const [loading, setLoading] = useState(false)

    const seatStyleOptions = [
        { id: 100, name: "Theater Style" },
        { id: 200, name: "Classroom Style" },
        { id: 300, name: "Banquet Style" },
        { id: 400, name: "Boardroom Style" },
        { id: 500, name: "U-Shape Style" },
        { id: 600, name: "Hollow Square" },
        { id: 700, name: "Lounge Style" },
        { id: 800, name: "Cocktail" },
    ]

    const spaceTypeOptions = [
        { id: 12001, name: "Outdoor Space" },
        { id: 12002, name: "Conference room" },
        { id: 12003, name: "Garden" },
        { id: 12004, name: "Rooftop" },
        { id: 12005, name: "Hall" },
        { id: 12006, name: "Studio" },
        { id: 12007, name: "Coworking / Event Hybrid" }
    ]
    
    const mutation = useMutation(
		(propertyData) => updateProperty(externalId, propertyData, token),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    navigate(`/dashboard/properties/${data?.data.externalId}/0`);
                    setLoading(false)
                }else {
                    setLoading(true)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = (values) => {
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

    const data = properties?.data
    let spaceTypeData = []
    let seatingData = []

    data?.propertySpaceTypes?.map((space) => (
        spaceTypeData.push(space.spaceId.toString())
    ))

    data?.propertySeating?.map((seating) => (
        seatingData.push(seating.id.toString())
    ))

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            propertyTitle: data?.title,
            propertyType: data?.propertyType,
            baseProperty: data?.base,
            marketType: data?.marketType,
            isWholeProperty: true,
            stories: data?.stories,
            furnish: data?.furnish,
            numberOfBedrooms: data?.numberOfBedrooms,
            kitchen: data?.kitchen,
            numberOfToilet: data?.numberOfToilet,
            numberOfBathrooms: data?.numberOfBath,
            numberOfPlot: data?.numberOfPlots,
            landDimension: data?.landDimension,
            landSizeUnit: data?.landSizeMeasurement,
            zoningType: data?.zoning,
            topography: data?.topography,
            partition: false,
            toiletType: data?.toiletType === "private" ? true : false,
            bathType: data?.bathType === "private" ? true : false,
            serviced: data?.serviced,
            indenture: data?.hasIndenture,
            spaceTypes : spaceTypeData,
            seatingStyle: data?.isSeatingStyle,
            areaSize: data?.areaSize,
            capacity: data?.capacity,
            seatingStyleIds: seatingData
        },
        enableReinitialize: true,
        validationSchema: PropertyScheme,
        onSubmit,
    })

    console.log(properties)

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "15%" }}>15%</div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="font-semibold text-gray-900 text-xl">Property Information</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
                <br />
                {
                    properties ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                <div className="relative mb-6">
                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                    Property Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            name="propertyTitle"
                                            type="text"
                                            autoComplete="given-name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Property Name"
                                            value={values.propertyTitle}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    {errors.propertyTitle && <p className="text-red-500 text-sm">{ errors.propertyTitle }</p>}
                                </div>
                                <div className="relative mb-6">
                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                    Property Type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="propertyType"
                                            autoComplete="country-name"
                                            value={values.propertyType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                            <option value="">--Select--</option>
                                            <option>Room</option>
                                            <option>Apartment</option>
                                            <option>Off The Plan</option>
                                            <option>Land</option>
                                            <option>House</option>
                                            <option>Office Space</option>
                                            <option>Event Space</option>
                                        </select>
                                    </div>
                                    {errors.propertyType && <p className="text-red-500 text-sm">{ errors.propertyType }</p>}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                <div className="relative mb-6">
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                        Base Property
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="baseProperty"
                                                autoComplete="country-name"
                                                value={values.baseProperty}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                <option value="">--Select--</option>
                                                {
                                                    values.propertyType === "Land"
                                                    ? (
                                                        <>
                                                            <option>Land</option>
                                                        </>
                                                    ) : values.propertyType === "Event Space" ? 
                                                    (
                                                        <>
                                                            <option>Outdoor Space</option>
                                                            <option>Storey Building</option>
                                                            <option>House</option>
                                                        </>
                                                    )
                                                    :(
                                                        <>
                                                            <option>Storey Building</option>
                                                            <option>House</option>
                                                        </>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        {errors.baseProperty && <p className="text-red-500 text-sm">{ errors.baseProperty }</p>}
                                    </div>
                                </div>
                                
                                {
                                    values.propertyType === "Event Space" ? (
                                        <>
                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Total Area Size
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="first-name"
                                                            name="areaSize"
                                                            type="text"
                                                            autoComplete="given-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Total Area Size"
                                                            value={values.areaSize}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>

                                                    {errors.isWholeProperty && <p className="text-red-500 text-sm">{ errors.isWholeProperty }</p>}
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Capacity
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="first-name"
                                                            name="capacity"
                                                            type="text"
                                                            autoComplete="given-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Capacity"
                                                            value={values.capacity}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>

                                                    {errors.isWholeProperty && <p className="text-red-500 text-sm">{ errors.isWholeProperty }</p>}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="relative mb-6">
                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    What would you like to do with your property?
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="country"
                                                        name="marketType"
                                                        value={values.marketType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        autoComplete="country-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        >
                                                        <option value="">--Select--</option>
                                                        {
                                                            values.propertyType === "Off The Plan" || values.propertyType === "Land" 
                                                            ? (
                                                                <>
                                                                    <option>Sale</option>
                                                                    {
                                                                        values.propertyType === "Land" ? (
                                                                            <option>Long Lease</option>
                                                                        ) : (
                                                                            ""
                                                                        )
                                                                    }
                                                                </>
                                                            ):(
                                                                values.propertyType === "Office Space" ? (
                                                                    <>
                                                                        <option>Rent</option>
                                                                        <option>Sale</option>
                                                                        <option>Long Lease</option>
                                                                    </>
                                                                ) : (
                                                                    values.propertyType === "Room" || values.propertyType === "Apartment" ? (
                                                                        <>
                                                                            <option>Rent</option>
                                                                            <option>Sale</option>
                                                                            {
                                                                                values.propertyType === "Apartment" ? (
                                                                                    <option>Long Lease</option>
                                                                                ) : (
                                                                                    ""
                                                                                )
                                                                            }
                                                                            <option>Short Stay</option>
                                                                        </>
                                                                    ) :(
                                                                        <>
                                                                            <option>Rent</option>
                                                                            <option>Sale</option>
                                                                            {
                                                                                values.propertyType === "House" ? (
                                                                                    <option>Long Lease</option>
                                                                                ) : (
                                                                                    ""
                                                                                )
                                                                            }
                                                                            <option>Short Stay</option>
                                                                            <option>Auction</option>
                                                                        </>
                                                                    )
                                                                )
                                                            )
                                                        }
                                                        
                                                    </select>
                                                </div>
                                                {errors.marketType && <p className="text-red-500 text-sm">{ errors.marketType }</p>}
                                            </div>

                                            {
                                                values.propertyType === "Off The Plan" || values.propertyType === "Land" || values.marketType === "Sale"
                                                ? (
                                                    ""
                                                ):(
                                                    <div className="relative mb-6">
                                                        <div className="relative mb-6">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                            Stories
                                                            </label>
                                                            <div className="mt-2">
                                                                <select
                                                                    id="country"
                                                                    name="stories"
                                                                    autoComplete="country-name"
                                                                    value={values.stories}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    >
                                                                    <option value="">--Select--</option>
                                                                    <option>Single Family</option>
                                                                    <option>Mixed Family</option>
                                                                </select>
                                                            </div>

                                                            {errors.stories && <p className="text-red-500 text-sm">{ errors.stories }</p>}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                            <hr />
                            <br /><br />
                            {
                                values.propertyType === "Land" ? (
                                    <>
                                        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Number Of Plot(s)
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="numberOfPlot"
                                                            value={values.numberOfPlot}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                    {errors.numberOfPlot && <p className="text-red-500 text-sm">{ errors.numberOfPlot }</p>}
                                                </div>
                                            </div>
                                            
                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Land Dimension
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="first-name"
                                                            name="landDimension"
                                                            type="text"
                                                            autoComplete="given-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Land"
                                                            value={values.landDimension}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {errors.landDimension && <p className="text-red-500 text-sm">{ errors.landDimension }</p>}
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Land Size Unit
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="landSizeUnit"
                                                            value={values.landSizeUnit}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>sqm</option>
                                                            <option>ft</option>
                                                            <option>acre</option>
                                                        </select>
                                                    </div>
                                                    {errors.landSizeUnit && <p className="text-red-500 text-sm">{ errors.landSizeUnit }</p>}
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Zoning type
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="zoningType"
                                                            value={values.zoningType}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>Residential</option>
                                                            <option>Commercial</option>
                                                            <option>Agricultural</option>
                                                        </select>
                                                    </div>
                                                    {errors.zoningType && <p className="text-red-500 text-sm">{ errors.zoningType }</p>}
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Topography
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="topography"
                                                            value={values.topography}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>Flat</option>
                                                            <option>Sloped</option>
                                                            <option>Forrested</option>
                                                        </select>
                                                    </div>
                                                    {errors.topography && <p className="text-red-500 text-sm">{ errors.topography }</p>}
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <br />
                                                <br />
                                                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-3">
                                                    <div className="flex items-center my-1">
                                                        <input id="Full Payment" type="checkbox" value="Full Payment" name="Full Payment" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                        <label htmlFor="Full Payment" className="text-sm font-normal text-gray-600">Serviced</label>
                                                    </div>

                                                        <div className="flex items-center my-1" style={{ position: 'absolute', right: '300px' }}>
                                                            <input id="Installment" type="checkbox" value="Installment" name="Installment" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                            <label htmlFor="Installment" className="text-sm font-normal text-gray-600">Indenture</label>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    values.propertyType === "Office Space" ? (
                                        <>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                                <div className="relative mb-6">
                                                    <div className="relative mb-6">
                                                        <div className="flex my-1">
                                                            <input id="Installment" 
                                                                type="checkbox"
                                                                name="partition" 
                                                                onChange={handleChange} 
                                                                onBlur={handleBlur}
                                                                className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                            <label htmlFor="Installment" className="text-xl font-normal text-gray-600">One big space without partition</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative mb-6">
                                                    <div className="relative mb-6">
                                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                            Number Of Rooms
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                name="numberOfBedrooms"
                                                                value={values.numberOfBedrooms}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                autoComplete="country-name"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                <option value="">--Select--</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                            </select>
                                                        </div>
                                                        {errors.numberOfBedrooms && <p className="text-red-500 text-sm">{ errors.numberOfBedrooms }</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Number Of Toilet
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="numberOfToilet"
                                                            value={values.numberOfToilet}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                    {errors.numberOfToilet && <p className="text-red-500 text-sm">{ errors.numberOfToilet }</p>}
                                                    <div className="flex items-center  my-6">
                                                        <input 
                                                            id="toiletType" 
                                                            type="checkbox" 
                                                            name="toiletType" 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                        <label htmlFor="toiletType" className="text-sm font-normal text-gray-600">Is toilet private?</label>
                                                    </div>
                                                </div>
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    Number Of Bathrooms
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="numberOfBathrooms"
                                                            value={values.numberOfBathrooms}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                    {errors.numberOfBathrooms && <p className="text-red-500 text-sm">{ errors.numberOfBathrooms }</p>}
                                                    <div className="flex items-center  my-6">
                                                        <input 
                                                            id="bathType" 
                                                            type="checkbox" 
                                                            name="bathType" 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur} 
                                                            className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                        <label htmlFor="bathType" className="text-sm font-normal text-gray-600">Is bath private?</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) 
                                    :  values.propertyType === "Event Space" ? (
                                        <>
                                            <h2 className="text-xl font-semibold text-gray-900">Space Type</h2>
                                            <p className="mt-1 text-sm/6 text-gray-600">Kindly select the type of space type you have</p>
                                            <br />

                                            <div className="flex">
                                                {spaceTypeOptions?.map((space, index) => (
                                                    <div className="relative mr-4 -mb-3" key={index}>
                                                        <div className="flex items-center my-1">
                                                            <input 
                                                                key={index} 
                                                                id={space.name}
                                                                type="checkbox" 
                                                                name="spaceTypes"
                                                                value={space.id}
                                                                checked={values.spaceTypes.includes(String(space.id))}
                                                                onChange={handleChange} 
                                                                onBlur={handleBlur}
                                                                className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                                            />
                                                            <label htmlFor={space.name} className="text-sm font-normal text-gray-600">{ space.name }</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <br /><br />
                                            <div className="relative mb-6">
                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    Seating Style
                                                </label>
                                                <div className="mt-2">
                                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                                        <div className="flex items-center my-1">
                                                            <input id="seatingStyle" onChange={handleChange} onBlur={handleBlur} type="checkbox" value={values.seatingStyle} checked={values.seatingStyle} name="seatingStyle" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                            <label htmlFor="seatingStyle" className="text-sm font-normal text-gray-600">Do you provide seats to your visitors</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />

                                            {
                                                values.seatingStyle === true && (
                                                    <>
                                                        <div className="-mt-6">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Seating arrangement
                                                            </label>
                                                            <div className="flex mt-3">
                                                                {seatStyleOptions?.map((seating, index) => (
                                                                    <div className="relative mr-4" key={index}>
                                                                        
                                                                        <div className="flex items-center my-1">
                                                                            <input 
                                                                                id={seating.name}
                                                                                type="checkbox"
                                                                                value={seating.id}
                                                                                name="seatingStyleIds" 
                                                                                checked={values.seatingStyleIds.includes(String(seating.id))}
                                                                                onChange={handleChange} 
                                                                                onBlur={handleBlur}
                                                                                className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                                                            />
                                                                            <label htmlFor={seating.name} key={seating.id} className="text-sm font-normal text-gray-600">{ seating.name }</label>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                                <div className="relative mb-6">
                                                    <div className="relative mb-6">
                                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Furnish
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                name="furnish"
                                                                value={values.furnish}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                autoComplete="country-name"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                <option value="">--Select--</option>
                                                                <option>Fully furnished</option>
                                                                <option>Partially furnished</option>
                                                                <option>Not furnished</option>
                                                            </select>
                                                        </div>
                                                        {errors.furnish && <p className="text-red-500 text-sm">{ errors.furnish }</p>}
                                                    </div>
                                                </div>
                                                <div className="relative mb-6">
                                                    <div className="relative mb-6">
                                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Number Of Bedrooms
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                name="numberOfBedrooms"
                                                                value={values.numberOfBedrooms}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                autoComplete="country-name"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                <option value="">--Select--</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                            </select>
                                                        </div>
                                                        {errors.numberOfBedrooms && <p className="text-red-500 text-sm">{ errors.numberOfBedrooms }</p>}
                                                    </div>
                                                </div>
                                                <div className="relative mb-6">
                                                    <div className="relative mb-6">
                                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Kitchen
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="country"
                                                                name="kitchen"
                                                                value={values.kitchen}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                autoComplete="country-name"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                <option>--Select--</option>
                                                                <option>Private</option>
                                                                <option>Shared</option>
                                                            </select>
                                                        </div>
                                                        {errors.kitchen && <p className="text-red-500 text-sm">{ errors.kitchen }</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    Number Of Toilet
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="numberOfToilet"
                                                            value={values.numberOfToilet}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                    {errors.numberOfToilet && <p className="text-red-500 text-sm">{ errors.numberOfToilet }</p>}
                                                    <div className="flex items-center  my-6">
                                                        <input 
                                                            id="toiletType" 
                                                            type="checkbox" 
                                                            name="toiletType"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                        <label htmlFor="toiletType" className="text-sm font-normal text-gray-600">Is toilet private?</label>
                                                    </div>
                                                </div>
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    Number Of Bathrooms
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="numberOfBathrooms"
                                                            value={values.numberOfBathrooms}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            autoComplete="country-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                            <option value="">--Select--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                    {errors.numberOfBathrooms && <p className="text-red-500 text-sm">{ errors.numberOfBathrooms }</p>}
                                                    <div className="flex items-center  my-6">
                                                        <input 
                                                            id="bathType" 
                                                            type="checkbox" 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                        <label htmlFor="bathType" className="text-sm font-normal text-gray-600">Is bath private?</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                )
                            }
                            <div className="flex xl:items-end xl:justify-end lg:items-end lg:justify-end items-center justify-center">
                                <div className="row flex">
                                    <button
                                        className="rounded-md w-full rounded-l-none bg-bg-color py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) :(
                        "Loading!!!"
                    )
                }
            </div>
        </>
	);
};
Property.propTypes = {
    externalId: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
};

export default Property;