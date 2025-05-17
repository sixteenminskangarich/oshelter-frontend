import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { savePropertyAmenities, getAmenities } from '../../../utils/request';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';

const PropertyAmentites = ({ externalId, properties  }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();
    const [allchecked, setAllChecked] = useState([]);
    const [loading, setLoading] = useState(false)
    function handleCheckChange(e) {
        if (e.target.checked) {
            console.log(e.target.value)
        } else {
            console.log("Hello World")
        }
    }

    const {
		data: amentites,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['amentites', { token }],
		queryFn: () => getAmenities(token),
	});

    const data = properties?.data?.propertyAmenities

    const mutation = useMutation(
		(propertyAmentities) => savePropertyAmenities(propertyAmentities, token, externalId),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    const checker = data?.data;
                    if(checker.marketType === "Sale") {
                        navigate(`/dashboard/properties/add/${externalId}/2`)
                    }else {
                        navigate(`/dashboard/properties/add/${externalId}/1`)
                    }
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
    let amenityData = []

    data?.map((amenity, index) => (
        amenityData.push(amenity.id.toString())
    ))

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            amenityIds: amenityData,
            step: 2
        },
        enableReinitialize: true,
        onSubmit,
    })

    console.log(values.amenityIds)

    const is_Not_Shared = amentites?.data.amenities;
    const is_Shared = amentites?.data.sharedAmenities;
    const is_Amenities = amentites?.data.eventAmenities;

    const ages = amenityData;

    console.log(amentites?.data)

    const changeCheckBoxHandle = () => {
        if(values.amenityIds >= 1) {
            setFieldValue("amenityIds", (amenityIds.push))
        }
	}


	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "30%" }}>30%</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">{properties?.data?.propertyType === "Event Space" ? "Space" : "Property"} Amenities</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Kindly select the type of Amenities you have</p>
                <br />
                <form onSubmit={handleSubmit}>
                    {
                        properties?.data?.propertyType === "Event Space" ? (
                            <>
                                <div className="overflow-y-auto" style={{ height: '530px' }}>
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                        {is_Amenities?.map((amentity, index) => (
                                            <div className="relative mb-6" key={index}>
                                                <div className="flex items-center my-1">
                                                    <input 
                                                        id={amentity.name} 
                                                        key={amentity.externalId} 
                                                        type="checkbox" 
                                                        value={amentity.id} 
                                                        name="amenityIds" 
                                                        checked={values.amenityIds.includes(String(amentity.id))}
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur}
                                                        className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                                    />
                                                    <label htmlFor={amentity.name} key={amentity.id} className="text-sm font-normal text-gray-600">{ amentity.name }</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="overflow-y-auto" style={{ height: '530px' }}>
                                    <h4 className="text-base/7 font-semibold text-gray-900">Private Amenities</h4>
                                    <br />

                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                        {is_Not_Shared?.map((amentity, index) => (
                                            <div className="relative mb-6" key={index}>
                                                <div className="flex items-center my-1">
                                                    <input 
                                                        id={amentity.name} 
                                                        key={amentity.externalId} 
                                                        type="checkbox" 
                                                        value={amentity.id} 
                                                        name="amenityIds" 
                                                        checked={values.amenityIds.includes(String(amentity.id))}
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur}
                                                        className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                                    />
                                                    <label htmlFor={amentity.name} key={amentity.id} className="text-sm font-normal text-gray-600">{ amentity.name }</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <input type="hidden" name="step" value="2" />

                                    <h2 className="text-base/7 font-semibold text-gray-900">Shared Amenities</h2>
                                    <br />
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                        {is_Shared?.map((amentity, index) => (
                                            <div className="relative mb-6">
                                                <div className="flex items-center my-1" key={index}>
                                                    <input 
                                                        id={amentity.name} 
                                                        key={amentity.externalId} 
                                                        type="checkbox" 
                                                        value={amentity.id} 
                                                        checked={values.amenityIds.includes(String(amentity.id))}
                                                        name="amenityIds" 
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur}
                                                        className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                                    />
                                                    <label htmlFor={amentity.name} key={amentity.id} className="text-sm font-normal text-gray-600">{ amentity.name }</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <br />
                    <div className="flex xl:items-end xl:justify-end lg:items-end lg:justify-end items-center justify-center">
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
                                            Next
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </form>


            </div>
        </>
	);
};

export default PropertyAmentites;