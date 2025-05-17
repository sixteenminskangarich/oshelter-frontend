import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { savePropertyRules, getRules } from '../../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';

const PropertyRules = ({ externalId, properties  }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();
	const [selectedSection, setSelectedSection] = useState('');
	const [currentStep, setCurrentStep] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

    const {
		data: rules,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['rules', { token }],
		queryFn: () => getRules(token),

		refetchInterval: 5000,
	});

    const mutation = useMutation(
		(propertyRules) => savePropertyRules(propertyRules, token, externalId),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    navigate(`/dashboard/properties/add/${externalId}/2`);
                }else {
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const data = properties?.data?.propertyRules

    let ruleData = []

    data?.map((rule, index) => (
        ruleData.push(rule.id.toString())
    ))

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
            ruleIds: ruleData,
            step: 3
        },
        enableReinitialize: true,
        onSubmit,
    })

    const rulesData = rules?.data;

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "45%" }}>45%</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">Property Rules</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Kindly select the type of rules that is applicable to you</p>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="overflow-y-auto" style={{ height: '530px' }}>
                        <h4 className="text-base/7 font-semibold text-gray-900">Property Rules</h4>
                        <br />

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                            {rulesData?.map((rule, index) => (
                                <div className="relative mb-6">
                                    <div className="flex items-center my-1">
                                        <input 
                                            id={rule.name} 
                                            type="checkbox" 
                                            value={rule.id} 
                                            name="ruleIds" 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                            checked={values.ruleIds.includes(String(rule.id))}
                                        />
                                        <label for={rule.name} className="text-sm font-normal text-gray-600">{ rule.name }</label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <input type="hidden" name="step" value="3" />
                    </div>

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

export default PropertyRules;