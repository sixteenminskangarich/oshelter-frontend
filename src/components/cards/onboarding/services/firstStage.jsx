import { useMutation, useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getLnaguage } from '../../../../utils/request';
import { useRef, useState } from 'react';
import preview from '../../../../assets/images/property.png'
import { useFormik } from "formik";
import { saveBusiness, saveFileAndDescription } from '../../../../utils/BusinessQueries';
import { Editor } from '@tinymce/tinymce-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function ManageBusiness({ token, result }) {
    ManageBusiness.propTypes = {
        token: PropTypes.string.isRequired,
        result: PropTypes.shape({
            onboardingStep: PropTypes.number.isRequired,
        }).isRequired,
    };

    const editorRef = useRef(null);
    const {data: otherData} = useQuery({queryKey: ['other'],queryFn: () => getLnaguage()});
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const searchInputRef = useRef(null);
    const inputRef = useRef(null);

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

    const onSubmit = async (values) => {
        try {
            if(result?.onboardingStep === 1) {
                const formData = new FormData();
                formData.append("photo", values.photo);
                formData.append("description", values.description);
                formData.append("longitude", values.longitude);
                formData.append("latitude", values.latitude);
                formData.append("location", values.location);
                const saveFileDescription = await saveFileAndDescription(formData, token)
                console.log(saveFileDescription)
            }else {
                mutation.mutate(values);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            business: '',
            gps: '',
            location: '',
            registrationNumber: '',
            yearsOfExperienceId: '',
            expertiseIds: [],
            languageIds: [],
            longitude: '',
            latitude: '',
            photo: ''
        },
        enableReinitialize: true,
        onSubmit
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file)
        setImage(url)
        setFieldValue("photo", event.target.files[0])
    }

    // Removed unused handleImageChange function
    return (
        <> 
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex w-full flex-col pb-8 xl:-mt-32 lg:-mt-10 -mt-16">
                    <div className="pb-12">
                        <h2 className="text-2xl -mb-3 font-bold text-gray-900">Business Information</h2>
                        {
                            result.onboardingStep === 1 ? (
                                <>
                                    <div className="sm:col-span-full">
                                        <div className="-mt-12 xl:mt-7 lg:mt-7">
                                            <div>
                                                <span className="flex justify-start items-start">
                                                    <label className="block text-sm  mt-5 p-6 bg-white border border-gray-200 rounded-lg">
                                                        <span className="text-gray-700 text-xl mb-3">Upload business logo</span> 
                                                        <div className="mb-5 mt-5 flex justify-center items-center">
                                                            <div>
                                                                {
                                                                    image ? (
                                                                        <img src={image} alt="Preview Image" className="h-[100px] w-[120px] rounded-lg"/>
                                                                    ): (
                                                                        <img src={preview} alt="Preview" className="h-[50px] w-full rounded-lg"/>
                                                                    )
                                                                }
                                                                <input type="file" className="file" name="photo" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                                                            </div>
                                                        </div>
                                                    </label>
                                                </span>
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.photo}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block text-gray-700 mt-3'>Description</label>
                                        <textarea
                                            name='description'
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Describe your business'
                                            className='w-full p-2 border border-gray-300 rounded mt-2'
                                            rows='2'></textarea>
                                        {errors.description && (
                                            <p className='text-red-color text-sm'>{errors.description}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm mt-2">
                                            <span className="text-gray-700">Filter Location</span> 
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                id="location"
                                                name="location"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Search for a location"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid xl:grid-cols-2">
                                        <div className="w-full">
                                            <label className="block w-full text-sm mt-6 mr-2">
                                                <span className="text-gray-700">Longitude</span> 
                                                <input
                                                    type="text"
                                                    id="longitude"
                                                    value={values.longitude}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="longitude"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Enter your longitude"
                                                />
                                            </label>
                                        </div>

                                        <div className="w-full">
                                            <label className="block w-full text-sm mt-6 ml-2">
                                                <span className="text-gray-700">Latitude</span> 
                                                <input
                                                    type="text"
                                                    id="latitude"
                                                    name="latitude"
                                                    value={values.latitude}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Enter your latitude"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <br />
                                        <div className="grid">
                                        </div>
                                    <br />
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-7">
                                        <div className="sm:col-span-3 xl:mt-0 lg:mt-0 -mt-4">
                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                Business name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    name="business"
                                                    value={values.business}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text" placeholder="Business name"
                                                />
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.business }</span>
                                        </div>

                                        <div className="sm:col-span-3 xl:mt-0 lg:mt-0 -mt-4">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                Location
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    name="location"
                                                    value={values.location}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder='Enter your business location'
                                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text"
                                                />
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.occupation }</span>
                                        </div>

                                        <div className="col-span-full -mt-6">
                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                Registration Number
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    name='registrationNumber'
                                                    value={values.registrationNumber}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text" placeholder="Registration number"
                                                />
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.business }</span>
                                        </div>

                                        <div className="col-span-full -mt-6">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                GPS Address
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                name='gps'
                                                value={values.gps}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                    placeholder='Enter GPS Address'
                                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                    type="text"
                                                />
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.occupation }</span>
                                        </div>  

                                        <div className="col-span-full -mt-6">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                Languages
                                            </label>
                                            <div className="mt-1">
                                                <div className='flex flex-wrap'>
                                                    {otherData?.language.map((language, index) => (
                                                        <label key={index} className='flex items-center mr-4 mb-2'>
                                                            <input
                                                                type='checkbox'
                                                                name='languageIds'
                                                                value={language.id}
                                                                onChange={handleChange}
                                                                className='mr-2 rounded h-5 w-5'
                                                            />
                                                            {language.language}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.occupation }</span>
                                        </div> 

                                        <div className="col-span-full -mt-6">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                Expertises
                                            </label>
                                            <div className="mt-1">
                                                <div className='flex flex-wrap'>
                                                    {otherData?.expertises?.map((category, index) => (
                                                        <label key={index} className='flex items-center mr-4 mb-2'>
                                                            <input
                                                                type='checkbox'
                                                                name='expertiseIds'
                                                                value={category.id}
                                                                onChange={handleChange}
                                                                className='mr-2 rounded h-5 w-5'
                                                            />
                                                            {category.expertise}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.expertiseIds }</span>
                                        </div> 

                                        <div className="col-span-full -mt-6">
                                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                                Years of experience
                                            </label>
                                            <div className="mt-1">
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
                                            </div>
                                            <span className="text-xs text-red-800">{ errors.yearsOfExperienceId }</span>
                                        </div> 
                                    </div>
                                </>
                            )
                        }
                        <div className="flex justify-end items-end">
                            <button
                                type='submit'
                                className='relative top-6 px-6 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-transparent hover:border-red-700 hover:border hover:text-red-700 transition-colors'
                                disabled={uploading}>
                                {uploading ? 'Updating...' : 'Cancel'}
                            </button>
                            &nbsp;
                            <button
                                type='submit'
                                className='relative top-6 px-6 py-2 bg-bg-color text-white rounded-lg shadow hover:bg-transparent hover:border-bg-color hover:border hover:text-bg-color transition-colors'
                                disabled={uploading}>
                                {uploading ? 'Updating...' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}