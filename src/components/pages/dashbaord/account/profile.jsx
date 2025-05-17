/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, useField } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../../../layouts/SideBar';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProfileScheme } from '../../../../lib/scheme';
import { updateProfile, updateProfilePhoto } from '../../../../utils/request';
import { ImSpinner9 } from 'react-icons/im';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const selectFile = (event) => {
        inputRef.current.click();
    }

    const mutation = useMutation(
		(data) => updateProfile(data, token),
		{
			onSuccess: (data) => {
				if(data?.success === true) {
                    setLoading(false)
                    toast.success(data?.message)
                }else{
                    toast.error(data?.message)
                    setLoading(false)
                }
			},
			onError: (error) => {
				toast.error(error)
                setLoading(false)
			},
		}
	);

    const onSubmit = (values, actions) => {
        setLoading(true)
        if (user && token) {
            mutation.mutate(values);
        } else {
            setLoading(false)
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "profile-photo");
        try {
            const response = updateProfilePhoto(formData, token)
            console.log(response)
        } catch (error) {
            
        }
        const url = URL.createObjectURL(file)
        setImage(url)
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: user?.profile?.name,
            email: user.email,
            gender: user?.profile?.gender,
            dob: user?.profile?.dob,

            
            phone: user?.profile?.phone,
            occupation: user?.profile?.occupation,
            address: user?.profile?.address,
            emergencyNumber: user?.profile?.emergencyNumber,
            companyName: user?.profile?.companyName,
        },
        validationSchema: ProfileScheme,
        enableReinitialize: true,
        onSubmit
    })

    console.log(user?.profilePhoto?.url)

	return (
        <div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 xl:mt-16'>
                <div className="container grid px-6 mx-auto mt-2">
                    <div className="px-4 my-6 py-3 mb-8 bg-white rounded-lg shadow-md">
                        <h6 className="mt-2 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Update Profile
                        </h6>

                        <span>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 mb-4 xl:grid-cols-3">
                                    <div>
                                        <div className="w-8 h-8 bg-[#281d52] rounded-full flex justify-center items-center">
                                            <p className="text-white text-xs">BIO</p>
                                        </div>
                                    </div>
                                </div> 

                                <div className="grid gap-6 mb-6 xl:grid-cols-3">
                                    <div className="flex flex-col items-center pull-down-on-lg relative xl:left-24 xl:top-8 lg:left-24 lg:top-8">
                                        <div className="w-42 h-42 border bg-white rounded-xl flex flex-col justify-center items-center">
                                            <img src={!user?.profilePhoto?.url ? image : user?.profilePhoto?.url } alt="Rounded avatar" className="xl:w-56 xl:h-56 w-32 h-32 rounded-xl" /> 
                                        </div>
                                        <input type="file" onChange={handleImageChange} ref={inputRef} accept="image/x-png,image/jpeg,image/jpg" style={{display: "none"}} /> 
                                        <button type="button" onClick={selectFile} className="flex px-6 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-[#281d52] hover:bg-oshelter-deep-blue mt-2 active:bg-transparent">
                                            <span>
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="svg-inline--fa fa-cloud-arrow-up w-4 h-4">
                                                    <path fill="currentColor" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" className=""></path>
                                                </svg>
                                            </span>{' '} Upload Photo
                                        </button>
                                    </div> 

                                    <div className="col-span-2 -mt-10">
                                        <div style={{ textAlign: "left" }}>
                                            <ul className="mb-8 text-red-600"></ul>
                                        </div> 
                                        <div className="grid gap-6 mb-8 xl:grid-cols-2 md:grid-cols-2">
                                            <div>
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6">
                                                        <span className="text-gray-700">Full Name</span> 
                                                        <input 
                                                            className="block w-full text-sm focus:border-purple-400 py-3 focus:outline-none focus:shadow-outline-purple rounded-lg form-input" 
                                                            placeholder="Enter full name" type="text" 
                                                            name="name"
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        /> 
                                                    </label>
                                                    <span className="text-red-700 text-xs">{ errors.name }</span>
                                                </span> 
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                        <span className="text-gray-700">Gender</span> 
                                                        <select 
                                                            className="block w-full text-sm form-select py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                                                            name="gender"
                                                            value={values.gender}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                            >
                                                            <option value="">--Select--</option>  
                                                            <option value="male" selected={"male" === user?.profile?.gender.toLowerCase() ? true : false}>Male </option>
                                                            <option value="female" selected={"female" === user?.profile?.gender.toLowerCase() ? true : false}>Female </option>
                                                        </select> 
                                                    </label>
                                                    <span className="text-red-700 text-xs">{ errors.gender }</span>
                                                </span> 
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                        <span className="text-gray-700">Phone Number</span> 
                                                        <input className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                            placeholder="Enter phone number" 
                                                            type="tel" 
                                                            name="phone"
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        />
                                                        
                                                    </label>
                                                    <span className="text-red-700 text-xs">{ errors.phone }</span>
                                                </span> 
                                                <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                    <span className="text-gray-700">Email</span> 
                                                    <input 
                                                        className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                        placeholder="Enter email address" 
                                                        type="email" 
                                                        readOnly="readonly" 
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={loading}
                                                    />
                                                    <span className="text-red-700 text-xs">{ errors.email }</span>
                                                </label> 
                                                <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                    <span className="text-gray-700">Company</span> 
                                                    <input 
                                                        className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                        placeholder="Enter company name" 
                                                        type="text" 
                                                        name="companyName"
                                                        value={values.companyName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={loading}
                                                    />
                                                    <span className="text-red-700 text-xs">{ errors.companyName }</span>
                                                </label>
                                            </div>

                                            <div>
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 -mt-3">
                                                        <span className="text-gray-700">Date of Birth</span> 
                                                        <input 
                                                            className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                            placeholder="Select date of birth" 
                                                            type="date" 
                                                            name="dob"
                                                            value={values.dob}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        /> 
                                                        <div style={{ textAlign: "left" }}></div>
                                                        <span className="text-red-700 text-xs">{ errors.dob }</span>
                                                    </label>
                                                </span> 
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                        <span className="text-gray-700">Occupation | Profession</span> 
                                                        <input 
                                                            className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                            placeholder="Enter occupation/profession" 
                                                            type="text" 
                                                            name="occupation"
                                                            value={values.occupation}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        /> 
                                                        <div style={{ textAlign: "left" }}></div>
                                                        <span className="text-red-700 text-xs">{ errors.occupation }</span>
                                                    </label>
                                                </span> 
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                        <span className="text-gray-700">Office Address</span> 
                                                        <input 
                                                            className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                            placeholder="Enter office address" 
                                                            type="text" 
                                                            name="address"
                                                            value={values.address}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        /> 
                                                    </label>
                                                    <span className="text-red-700 text-xs">{ errors.address }</span>
                                                </span> 
                                                <span>
                                                    <label className="block text-sm xl:mt-6 lg:mt-6 mt-3">
                                                        <span className="text-gray-700">Emergency Contact</span> 
                                                        <input 
                                                            className="block w-full text-sm py-3 rounded-lg focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" 
                                                            placeholder="Enter emergency contact" 
                                                            type="tel" 
                                                            name="emergencyNumber"
                                                            value={values.emergencyNumber}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={loading}
                                                        /> 
                                                        
                                                    </label>
                                                    <span className="text-red-700 text-xs">{ errors.emergencyNumber }</span>
                                                </span> 
                                                <label className="block text-sm float-right xl:mt-16 lg:mt-16 mt-4">
                                                    <span className="text-gray-700"></span> 
                                                    <button 
                                                        type="submit" 
                                                        disabled={loading}
                                                        className={`text-sm py-2 rounded-lg font-medium leading-5 text-white transition-colors duration-150 border border-transparent focus:outline-none ${loading === true ? 'flex bg-blue-300' : 'bg-bg-color'} hover:bg-oshelter-deep-blue px-10 active:bg-transparent`}
                                                    >
                                                        {loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Updating Profile</span></>) : (<><span>Update Profile</span></>)}
                                                    </button>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </span>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default Profile;