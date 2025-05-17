import React, { useRef, useState } from 'react'
import Sidebar from '../../../layouts/SideBar'
import { useFormik, useField } from "formik";

import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateIdentification } from '../../../../utils/request';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const IdCard = () => {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)

    const selectFile = (event) => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFieldValue("file", file)
        const url = URL.createObjectURL(file)
        setImage(url)
    }

    const mutation = useMutation(
		(data) => updateIdentification(data, token),
		{
			onSuccess: (data) => {
				if(data?.success === true) {
                    setLoading(false)
                    toast.success(data?.message)
                }else {
                    setLoading(false)
                    toast.error(data?.message)
                }
			},
			onError: (error) => {
                toast.error(error)
				console.error(error);
			},
		}
	);

    const onSubmit = (values) => {
        setLoading(true)
        if (user && token) {
            const formData = new FormData();
			formData.append("file", values.file);
			formData.append("type", values.type);
			formData.append("number", values.number);
            mutation.mutate(formData)
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const identification = user?.identification;

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            type: identification?.type,
            number: identification?.number,
            file: ""
        },
        enableReinitialize: true,
        onSubmit
    })

    return (
        <div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="container grid px-6 mx-auto mt-2">
                    <div className="px-4 my-6 py-3 mb-8 bg-white rounded-lg shadow-md">
                        <h6 data-v-265b0122="" className="mt-2 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Update Profile
                        </h6>
                        <div className="grid gap-6 mb-8 xl:grid-cols-3">
                            <div></div> 
                            <div className="bg-oshelter-deep-blue rounded-full h-8 w-20 flex items-center justify-center">
                                <p className="text-white text-xs">ID Card</p>
                            </div>
                        </div> 
                        <span>
                            <form onSubmit={handleSubmit}> 
                                <div className="grid gap-6 xl:mb-8 lg:mb-8 xl:grid-cols-3">
                                    <div className="flex flex-col items-center -mt-10 xl:-mt-0 lg:-mt-0">
                                        <div className="w-64 h-38 border-2 border-[#281d52] rounded-2xl flex flex-col justify-center items-center py-2">
                                            <img className="w-54 h-32 bg-gray-100 rounded-2xl flex flex-col justify-center items-center" src={image} />
                                        </div>
                                        <input type="file" name="file" ref={inputRef} onChange={handleImageChange} accept="image/x-png,image/jpeg,image/jpg" className="object-cover" style={{ display: 'none'}} /> 
                                        <button onClick={selectFile} className="flex py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-[#281d52] hover:bg-oshelter-deep-blue px-10 mt-2 active:bg-transparent" type="button">
                                            <span className="mr-2">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-cloud-arrow-up h-5 w-5">
                                                    <path fill="currentColor" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" className=""></path>
                                                </svg>
                                            </span> 
                                            Upload ID
                                        </button>
                                    </div> 
                                    <div>
                                        <span>
                                            <label className="block text-sm xl:mt-6 lg:mt-6">
                                                <span className="text-gray-700">Card Type</span> 
                                                <select 
                                                    className="block w-full text-sm form-select rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                                                    name="type"
                                                    value={values.type}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value="">--Select--</option>  
                                                    <option value="driving license">driving license </option>
                                                    <option value="ghana card">ghana card </option>
                                                    <option value="passport">passport </option>
                                                </select> 
                                                <div data-v-77ac7636="" style={{ textAlign: 'left' }}></div>
                                            </label>
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            <label className="block text-sm xl:mt-6 lg:mt-6 -mt-1">
                                                <span className="text-gray-700">ID Number</span> 
                                                <input 
                                                    className="block w-full text-sm rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                    placeholder="Enter ID number" 
                                                    type="text" 
                                                    name="number"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.number}
                                                /> 
                                                <div style={{ textAlign: 'left' }}></div>
                                            </label>
                                        </span> 
                                        <label className="block text-sm">
                                            <span className="text-gray-700"></span> 
                                            <button 
                                                type="submit" 
                                                className={`py-3 flex px-5 mt-5 float-end text-sm ${loading === true ? 'bg-blue-200' : 'bg-bg-color'} text-white rounded-lg`}>
                                                {loading === true ? (<><ImSpinner9 className="animate-spin mt-1"/><span className="ml-3">Submitting card</span></>) : (<><span>Submit card</span></>)}
                                            </button>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdCard