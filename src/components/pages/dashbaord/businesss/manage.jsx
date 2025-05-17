/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import * as Yup from 'yup';
import { getBusinesses, getLnaguage } from '../../../../utils/request';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import { BusinessScheme } from '../../../../lib/scheme';
import preview from '../../../../assets/images/property.png'
import { saveBusiness } from '../../../../utils/BusinessQueries';

const ManageBusiness = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const inputRef = useRef(null);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState("");

    let expertiseData = []
    let languageData = []

    const {data: otherData} = useQuery({queryKey: ['other'],queryFn: () => getLnaguage()});
    const {data: business} = useQuery({queryKey: ['business', { token }],queryFn: () => getBusinesses(token)});
    const info = business?.data;

	const [uploading, setUploading] = useState(false);

    info?.expertiseIds?.map((rule, index) => (
        expertiseData.push(rule.toString())
    ))

    info?.languageIds?.map((rule, index) => (
        languageData.push(rule.toString())
    ))

    const mutation = useMutation(
        (bookingData) => saveBusiness(bookingData, token),
        {
            onSuccess: (data) => {
                console.log(data)
                // Handle success here
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onSubmit = (values, actions) => {
        if (user && token) {
            const formData = new FormData();
			formData.append("image", values.image);
			formData.append("business", values.business);
			formData.append("registrationNumber", values.registrationNumber);
			formData.append("location", values.location);
			formData.append("country", values.country);
            formData.append("region", values.region);
			formData.append("languageIds", values.languageIds);
			formData.append("registrationNumber", values.registrationNumber);
			formData.append("description", values.description);
			formData.append("expertiseIds", values.expertiseIds);
            formData.append("yearsOfExperienceId", values.yearsOfExperienceId);
            formData.append("city", values.city);
            mutation.mutate(formData)
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file)
        setImage(url)
        setFieldValue("image", event.target.files[0])
    }

    const onChangeCountry = (val) => {
        setCountry(val);
        setFieldValue("country", val)
        if (!val) {
            setRegion('');
        }
    };

    const onChangeRegion = (val) => {
        setFieldValue("region", val)
    };

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            business: info?.business,
			city: info?.city,
			registrationNumber: info?.registration_number,
			location: info?.location,
			country: info?.country,
			region: info?.region,
			image: null,
			languageIds: languageData,
			description: info?.description,
			expertiseIds: expertiseData,
            yearsOfExperienceId: info?.years
        },
        enableReinitialize: true,
        validationSchema: BusinessScheme,
        onSubmit
    })

	return(
        <div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className='text-2xl font-semibold mb-4 text-bg-color'>
                        Update Business Details
                    </h2>

                    
                    <div className='bg-white p-6 rounded-lg font-josefin-sans shadow-md w-full'>
                    <p className='mb-6'>Provide your personal and business details</p>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {/* Form fields with error handling */}
                                {/* Business name */}
                                <div>
                                    <label className='block text-gray-700'>Business name</label>
                                    <input
                                        type='text'
                                        name='business'
                                        value={values.business}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter your business name'
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.business && (
                                        <p className='text-red-color text-sm'>{errors.business}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className='block text-gray-700'>Location</label>
                                    <input
                                        type='text'
                                        name='location'
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter your business location'
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.location && (
                                        <p className='text-red-color text-sm'>{errors.location}</p>
                                    )}
                                </div>

                                {/* Registration Number */}
                                <div>
                                    <label className='block text-gray-700'>Registration Number</label>
                                    <input
                                        type='text'
                                        name='registrationNumber'
                                        value={values.registrationNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter your registration number'
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.registrationNumber && (
                                        <p className='text-red-color text-sm'>
                                            {errors.registrationNumber}
                                        </p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label className='block text-gray-700'>City</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter your business city'
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.city && (
                                        <p className='text-red-color text-sm'>{errors.city}</p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className='block text-gray-700'>Country</label>
                                    <CountryDropdown 
                                        value={values.country} 
                                        name="country"
                                        onChange={onChangeCountry}  
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.country && (
                                        <p className='text-red-color text-sm'>{errors.country}</p>
                                    )}
                                </div>

                                {/* Region */}
                                <div>
                                    <label className='block text-gray-700'>Region</label>
                                    <RegionDropdown
                                        country={info?.country != null ? info?.country : values.country}
                                        value={values.region}
                                        onChange={onChangeRegion}
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                    />
                                    {errors.region && (
                                        <p className='text-red-color text-sm'>{errors.region}</p>
                                    )}
                                </div>

                                {/* Language */}
                                <div>
                                    <label className='block text-gray-700'>Languages</label>
                                    <div className='flex flex-wrap'>
                                        {otherData?.language.map((language, index) => (
                                            <label key={index} className='flex items-center mr-4 mb-2'>
                                                <input
                                                    type='checkbox'
                                                    name='languageIds'
                                                    value={language.id}
                                                    onChange={handleChange}
                                                    className='mr-2 rounded h-5 w-5'
                                                    checked={values.languageIds.includes(String(language.id))}
                                                />
                                                {language.language}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.languageIds && (
                                        <p className='text-red-color text-sm'>{errors.languageIds}</p>
                                    )}
                                </div>

                                {/* Expertise */}
                                <div>
                                    <label className='block text-gray-700'>Expertise</label>
                                    <div className='flex flex-wrap'>
                                        {otherData?.expertises?.map((category, index) => (
                                            <label key={index} className='flex items-center mr-4 mb-2'>
                                                <input
                                                    type='checkbox'
                                                    name='expertiseIds'
                                                    value={category.id}
                                                    onChange={handleChange}
                                                    className='mr-2 rounded h-5 w-5'
                                                    checked={values.expertiseIds.includes(String(category.id))}
                                                />
                                                {category.expertise}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.expertiseIds && (
                                        <p className='text-red-color text-sm'>{errors.expertiseIds}</p>
                                    )}
                                </div>
                                {/* Experience */}
                                <div>
                                    <label className='block text-gray-700'>Years of Experience</label>
                                    <select
                                        name='yearsOfExperienceId'
                                        value={values.yearsOfExperienceId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='w-full p-2 border border-gray-300 rounded mt-2'>
                                        <option value=''>Select years of experience</option>
                                        {otherData?.years.map((year, index) => (
                                            <option key={index} value={year.id}>
                                                {year.years}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.yearsOfExperienceId && (
                                        <p className='text-red-color text-sm'>
                                            {errors.yearsOfExperienceId}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className='block text-gray-700'>Description</label>
                                    <textarea
                                        name='description'
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Describe your business'
                                        className='w-full p-2 border border-gray-300 rounded mt-2'
                                        rows='4'></textarea>
                                    {errors.description && (
                                        <p className='text-red-color text-sm'>{errors.description}</p>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className='block text-gray-700'>Business Logo</label>
                                    <span>
                                        <label className="block text-sm p-4 bg-white border-gray-200 rounded-lg">
                                            <div className="">
                                                <div>
                                                    {
                                                        image ? (
                                                            <img src={image} alt={image.name} className="h-[40%] w-[40%] rounded-lg"/>
                                                        ):
                                                        info?.logoUrl != null ? 
                                                            <img src={info?.logoUrl} alt="Logo" className="h-[40%] w-[40%] rounded-lg"/>
                                                        :
                                                        (
                                                            <img src={preview} alt="Preview" className="h-[40%] w-[40%] rounded-lg"/>
                                                        )
                                                    }
                                                    <input type="file" className="file" name="photo" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                                                </div>
                                                
                                            </div>
                                        </label>
                                    </span>
                                    {errors.image && (
                                        <p className='text-red-color text-sm'>{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='mt-6 px-6 py-2 bg-bg-color text-white rounded-lg shadow hover:bg-red-color transition-colors'
                                disabled={uploading}>
                                {uploading ? 'Updating...' : 'Update Business'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default ManageBusiness;