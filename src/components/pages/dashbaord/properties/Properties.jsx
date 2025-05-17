/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import SmsImage from '../../../../assets/images/sms.png';
import { getProperties } from '../../../../utils/request';
import { useQuery } from 'react-query';
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import Spinner from '../../../Spinner';
import { Badge } from "flowbite-react";
import { Link } from 'react-router-dom';
import { MdLabel } from "react-icons/md";

const Properties = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const pathname = useLocation();
	const key = pathname.pathname.split('/')[3];
	console.log(user);
	const [selectedSection, setSelectedSection] = useState('');
	const [currentStep, setCurrentStep] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
    let search = ""
    let title = ""

    let w = window.innerWidth;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
      

    if(key === "pending" || key === "approved" || key === "unapproved" || key === "sold" || key === "rented" || key === "auctioned" || key === "rejected") {
        search = key
        title = capitalizeFirstLetter(key)
    }else {
        title = "My"
    }

    const {
		data: properties,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['property', { token }],
		queryFn: () => getProperties(token),
		refetchInterval: 5000,
	});


    const results = properties?.data;
    console.log(results)


	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
			{
                isLoading === true ? (
                    <></>
                ) : (
                    properties ? (
                        <div className='p-4 sm:ml-64 flex-1 mt-16'>
                            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white">{title} Properties</h3>
                                    <Link to="/dashboard/properties/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg">
                                        + New Listing
                                    </Link>
                                </div>
                                <br />
                                <div className="relative overflow-x-auto">
                                    {
                                        w <= 789 || w <= 810 ?
                                            (
                                                <div className="row h-[580px]">
                                                    <div className="flow-root">
                                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                                            {
                                                                results ? (
                                                                    results?.map((property, index) => (
                                                                        <>
                                                                            <li className="py-6 mt-2 sm:py-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                                <div className="flex items-center">
                                                                                    <div className="flex-shrink-0 ml-3">
                                                                                        <img className="w-20 h-20 rounded-md" src={ property.featuredPropertyPhoto?.url } alt="Neil image" />
                                                                                    </div>
                                                                                    <div className="flex-1 min-w-0 ms-4">
                                                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                                            {property.title} {
                                                                                                property?.status === "pending" ?
                                                                                                (
                                                                                                    <span className="bg-green-100 text-indigo-800 text-xs font-medium me-2 px-2 rounded dark:bg-gray-700 dark:text-green-400 border border-indigo-400">Pending</span>
                                                                                                ): property?.status === "completed" ? (
                                                                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-blue-400">Completed</span>
                                                                                                ) :
                                                                                                (
                                                                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Published</span>
                                                                                                )
                                                                                            }
                                                                                        </p>
                                                                                        
                                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                                            <span className='flex rounded-full tracking-wider property-type' style={{ marginRight: '50px' }}>
                                                                                                <div className="relative top-1 w-3 h-3 bg-red-400 rounded-full mx-1 property-badge" style={{ backgroundColor:'#283890' }}></div>
                                                                                                <span className='font-medium' style={{ color: 'gray', fontSize: '12px' }}>{property.propertyType}</span>
                                                                                            </span>
                                                                                        </p>
        
                                                                                        <br/>
        
                                                                                        <Link className="bg-transparent mb-10 hover:bg-blue-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                                                                            change
                                                                                        </Link>&nbsp;
                                    
                                                                                        <Link to={`/dashboard/properties/${property.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                                            edit
                                                                                        </Link>&nbsp;
                                    
                                                                                        <Link className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded">
                                                                                            delete
                                                                                        </Link>&nbsp;
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            </li>
                                                                        </>
                                                                    ))
                                                                ) : (
                                                                    "Loading"
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        :
                                            (
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ fontfamily: 'Josefin Sans' }}>
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                IMAGE
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                DETAILS
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                VIEW
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                STATUS
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                ACTION
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            results ? (
                                                                results?.map((property, index) => (
                                                                    <>
                                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                            <td className="px-6 py-4 items-center">
                                                                                <img className="object-cover h-32 w-32 rounded-2xl" src={ property.featuredPropertyPhoto?.url } />
                                                                            </td>
                                                                            <td className="mr-4 py-4 text-gray-800">
                                                                                {property.title}<br />
                                                                                <div className="flex items-center space-x-2">
                                                                                    <FaLocationDot  className='relative top-0 text-xs' style={{ color: '#488cf5' }}/>
                                                                                    <span className="ml-3 font-light">
                                                                                        {property.location}
                                                                                    </span>
                                                                                </div>
                                                                                <span className="mt-1">{property.base}</span><br />
                                                                                <span className="bg-pink-800 text-white text-xs me-2 px-3 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300">For {property.marketType}</span>
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                {property.viewed}
                                                                            </td>
                            
                                                                            <td className="px-6 py-4">
                                                                                {
                                                                                    property?.status === "pending" ?
                                                                                    (
                                                                                        <span className="bg-green-800 text-white text-xs me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-indigo-400">Pending</span>
                                                                                    ): property?.status === "completed" ? (
                                                                                        <span className="bg-indigo-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-blue-400">Completed</span>
                                                                                    ) :
                                                                                    (
                                                                                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-green-400">Published</span>
                                                                                    )
                                                                                }
                                                                            </td>
                            
                                                                            <td className="px-6 py-4">
                                                                                <Link className="bg-transparent hover:bg-blue-500 text-green-700 text-xs hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded">
                                                                                    change state
                                                                                </Link>&nbsp;
                            
                                                                                <Link to={`/dashboard/properties/${property.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 text-xs hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                                    edit
                                                                                </Link>&nbsp;
                            
                                                                                <Link className="bg-transparent hover:bg-red-500 text-red-700 text-xs hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
                                                                                    delete
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))
                                                            ) : (
                                                                "Loading"
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            )
                                    }
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                                        onClick={() => {
                                            if (currentStep > 1) setCurrentStep(currentStep - 1);
                                        }}
                                        disabled={currentStep === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-gray-700">
                                        Page {currentStep} of {Math.ceil(results?.length / 10) || 1}
                                    </span>
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                                        onClick={() => {
                                            if (currentStep < Math.ceil(results?.length / 10)) setCurrentStep(currentStep + 1);
                                        }}
                                        disabled={currentStep === Math.ceil(results?.length / 10)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        "Loading"
                    )
                )
            }
		</div>
	);
};

export default Properties;