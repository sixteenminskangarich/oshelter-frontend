/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useFormik, useField } from "formik";
import { AgentScheme, ChangePasswordScheme } from '../../../../lib/scheme';
import { useMutation } from 'react-query';
import {addAgentCaretaker, changePassword} from '../../../../utils/request';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { LineWave, Audio } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const ChangePassword = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(false);

    const mutation = useMutation(
		(data) => changePassword(data, token),
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
                setLoading(false)
                toast.error(error)
				console.error(error);
			},
		}
	);

    const onSubmit = (values, actions) => {
        setLoading(true)
        if (user && token) {
            mutation.mutate(values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            currentPassword: "",
            password: ""
        },
        validationSchema: ChangePasswordScheme,
        enableReinitialize: true,
        onSubmit,
    })

	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 p-4 mt-16'>
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 w-[90%]">
                        { alert && 
                            <Alert color="success" role="alert" className="dismissable" icon={HiInformationCircle}>
                                <span className="font-medium">Alert!</span> Agent / Caretaker added
                            </Alert>
                        }
                        <div className="mt-12 flex flex-col items-center">
                            <>
                                <h3 className="text-xl font-extrabold" style={{ fontSize: '25px' }}>
                                    Reset Password
                                </h3>
                                <div className="w-full flex-1 mt-8">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mx-auto">
                                            <div className="mb-5">
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                                <input 
                                                    type="password" 
                                                    id="name" 
                                                    className="block p-2.5 w-full text-sm border-gray-300 bg-white rounded-md focus:border-bg-color focus:outline-none focus:shadow-outline-bg-color form-input mt-4" 
                                                    placeholder="Current Password"  
                                                    name="currentPassword"
                                                    value={values.currentPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                />

                                                <span className="text-xs text-red-800">{errors.currentPassword}</span>
                                            </div>

                                            <div className="xl:mb-5 lg:mb-5 -mt-2">
                                                <label for="password" className="block xl:mb-2 lg:mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                                <input 
                                                    type="password" 
                                                    id="email-address" 
                                                    className="block p-2.5 w-full text-sm border-gray-300 bg-white rounded-md focus:border-bg-color focus:outline-none focus:shadow-outline-bg-color form-input mt-4" 
                                                    placeholder="New Password"  
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                />

                                                <span className="text-xs text-red-800">{errors.password}</span>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`mt-5 tracking-wide font-semibold ${loading === true ? 'bg-blue-300' : 'bg-bg-color'} text-gray-100 w-full py-2 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center`}>
                                                <span className="ml-3 flex">
                                                    {loading ? (<><ImSpinner9 className="animate-spin mt-1"/>&nbsp;<span>Changing password</span></>) : 'Change Password'}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("https://oshelter.com/_nuxt/img/add-user.07e74ed.png")` }}>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default ChangePassword;
