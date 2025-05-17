import React from 'react';
import { useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import Tiptap from '../Tiptap/Tiptap';
import { useForm } from 'react-hook-form';
import preview from '../../../assets/images/property.png'


const PropertyOtherDetails = ({ property  }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);

    console.log(property)

	return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold text-gray-900">Property Other information</h2>
            <p className="mt-1 text-sm/6 text-gray-600"></p>
            <br />
            <form action="">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                    <div className="relative mb-6">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                            Currency
                        </label>
                        <div className="mt-2">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                <option value="">--Select--</option>
                                <option>GHc</option>
                                <option>USD</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                            Amount per month
                        </label>
                        <div className="mt-2">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                autoComplete="given-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter amount per month"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                    <div className="relative mb-6">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                            Advance payment duration in months
                        </label>
                        <div className="mt-2">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                <option value="">--Select--</option>
                                <option>1 month</option>
                                <option>3 months</option>
                                <option>6 month</option>
                                <option>12 months</option>
                                <option>18 months</option>
                                <option>24 months</option>
                                <option>36 months</option>
                                <option>48 months</option>
                                <option>60 months</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                            Preferred payment Options
                        </label>
                        <div className="mt-2">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                <div className="flex items-center my-1">
                                    <input id="Full Payment" type="checkbox" value="Full Payment" name="Full Payment" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                    <label for="Full Payment" className="text-sm font-normal text-gray-600">Full Payment</label>
                                </div>

                                <div className="flex items-center my-1" style={{ position: 'absolute', right: '350px' }}>
                                    <input id="Installment" type="checkbox" value="Installment" name="Installment" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                    <label for="Installment" className="text-sm font-normal text-gray-600">Installment</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ marginTop: '10px' }} />
                <p className="text-sm mt-6 font-semibold">Do you have care taker or agents on this property?</p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                    <div>
                        <div className="relative mb-6">
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                    <option value="">--Select--</option>
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-end">
                    <button className="w-52 h-12 bg-blue-600 rounded-md hover:bg-blue-800 transition-all duration-700 shadow-xs text-white text-base font-semibold leading-6">Next</button>
                </div>
            </form>
        </div>
	);
};

export default PropertyOtherDetails;