import React from 'react'
import Sidebar from '../../../layouts/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { createBank } from '../../../../utils/request';
import { BankScheme } from '../../../../lib/scheme';
import { useSelector } from 'react-redux';

const CreateBank = () => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const mutation = useMutation(
		(data) => createBank(data, token),
		{
			onSuccess: (data) => {
				if(data.success === true) {
                    navigate(`/dashboard/bank`);
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = (values, actions) => {
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
            bankName: "",
            bankAccount: "",
            branch: "",
            swiftCode: ""
        },
        validationSchema: BankScheme,
        enableReinitialize: true,
        onSubmit
    })
    return (
        <div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="container grid px-6 mx-auto mt-2">
                    <div className="px-4 my-6 py-3 mb-8 bg-white rounded-lg shadow-md">
                        <h6 className="mt-2 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Bank Info
                        </h6>
                        
                        <div className="flex flex-col flex-wrap mb-4 space-y-4 md:flex-row md:items-end md:space-x-4 mt-4">
                            <div>
                                <Link to="/dashboard/bank" className="px-3 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-[#281d52] hover:bg-[#281d52] focus:shadow-outline-[#281d52]">
                                    Back
                                </Link>
                            </div>
                        </div>
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
                            <div>
                                <div style={{ textAlign: 'left' }}>
                                    <ul className="mb-8 text-red-600"></ul>
                                </div>
                                <span>
                                    <form onSubmit={handleSubmit}>
                                        <span>
                                            <label className="block text-sm mt-6">
                                                <span className="text-gray-700">Bank Name</span> 
                                                <input 
                                                    className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input rounded-lg" 
                                                    placeholder="Enter bank name" 
                                                    type="text"
                                                    name="bankName"
                                                    value={values.bankName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                <div style={{ textAlign: 'left' }}></div>
                                            </label>
                                            <span className="text-red-800 text-xs">{ errors.bankName }</span>
                                        </span> 
                                        <span>
                                            <label className="block text-sm mt-6">
                                                <span className="text-gray-700">Account Number</span> 
                                                <input 
                                                    className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input rounded-lg" 
                                                    placeholder="Enter account number" 
                                                    type="tel" 
                                                    name="bankAccount"
                                                    value={values.bankAccount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                <div style={{ textAlign: 'left' }}></div>
                                            </label>
                                            <span className="text-red-800 text-xs">{ errors.bankAccount }</span>
                                        </span> 
                                        <span>
                                            <label className="block text-sm mt-6">
                                                <span className="text-gray-700">Branch</span> 
                                                <input 
                                                    className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input rounded-lg" 
                                                    placeholder="Enter branch" 
                                                    type="text" 
                                                    name="branch"
                                                    value={values.branch}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                /> 
                                                <div style={{ textAlign: 'left' }}></div>
                                            </label>
                                            <span className="text-red-800 text-xs">{ errors.branch }</span>
                                        </span> 
                                        <label className="block text-sm mt-6">
                                            <span className="text-gray-700">Swift Code</span> 
                                            <input 
                                                className="block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input rounded-lg" 
                                                placeholder="Enter swift code" 
                                                type="text" 
                                                name="swiftCode"
                                                value={values.swiftCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <span className="text-red-800 text-xs">{ errors.swiftCode }</span>
                                        </label> 
                                        <label className="block text-sm mt-16">
                                            <span className="text-gray-700"></span> 
                                            <button type="submit" className="py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-[#281d52] hover:bg-oshelter-deep-blue px-10 active:bg-transparent">
                                                Add New
                                            </button>
                                        </label>
                                    </form>
                                </span>
                            </div> 
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-64">
                                    <p className="text-xs"><i><strong>Note:</strong> Setting up a bank will aid your buyers to easily generate a payment voucher to make payments to you.</i></p>
                                    <p className="text-xs mt-4"><i>Your bank account information is kept private and is not displayed to visitors. Only your buyers can see your Bank account numbers.</i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBank
