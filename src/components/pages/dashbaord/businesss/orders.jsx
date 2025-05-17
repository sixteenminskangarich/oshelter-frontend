/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useQuery } from 'react-query';
import format from 'date-fns/format';
import { Modal } from "flowbite-react";
import { fetchOrder, fetchUsersOrders } from '../../../../utils/request';
import { approveBookings, changeStatusOrdered, declineBookings } from '../../../../utils/ServicesQueries';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import ProgressChecked from '../../../cards/business/ProgressIconChecked';
import ProgressUnchecked from '../../../cards/business/ProgressIconUnchecked';

const BusinessOrders = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [activeTab, setActiveTab] = useState('active');
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('5xl');
    const [isApprove, setIsApprove] = useState(false);
    const [isDecline, setIsDecline] = useState(false);
    const [key, setKey] = useState(null);
    const {
		data: orders,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['orders', { activeTab, token }],
		queryFn: () => fetchUsersOrders(activeTab, token),
	});

    const handleClick = (event) => {
        const externalId = event.currentTarget.value;
        setKey(null)
        const firstData = fetchOrder(token, externalId);
        firstData.then((result) => {
            setKey(result)
        })
        .catch((error) => {
            console.log(error)
        });
        
        setOpenModal(true)
    };

    const declineOrder = async(orderId) => {
        try {
            const response = await declineBookings(orderId, token);  
            if(response.success == true) {
                toast.success('Service declined successfully');
                setOpenModal(false)
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            type: '',
            cost: '',
            description: '',
        },
        enableReinitialize: true,
    })

    const approveOrder = async(orderId) => {
        try {
            const response = await approveBookings(orderId, token, values);  
            console.log(response)
            if(response.success === true) {
                toast.success('Service approved successfully');
                setOpenModal(false)
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    const changeStatusOrder = async(orderId, state) => {
        try {
            const response = await changeStatusOrdered(orderId, token, state);  
            if(response.success === true) {
                toast.success('Order changed successfully');
                setOpenModal(false)
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    return(
        <div className='flex font-josefin-sans'>
            <Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className='p-4 bg-[#FFFFFF] w-full'>
                        <h1 className='text-2xl font-bold mb-6'>User Orders</h1>
                        <div className='overflow-x-auto'>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className='py-2 px-6 border-b text-center'>SERVICE PROVIDER</th>
                                        <th className='py-2 px-4 border-b text-center'>ORDER BY</th>
                                        <th className='py-2 px-4 border-b text-center hidden md:table-cell'>
                                            DUE
                                        </th>
                                        <th className='py-2 px-4 border-b text-center'>COST</th>
                                        <th className='py-2 px-4 border-b text-center'>STATUS</th>
                                        {activeTab === 'completed' || activeTab === 'cancelled' ? (
                                            <></>
                                        ) : (
                                            <th className='py-2 px-4 border-b text-center'>ACTION</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order, index) => (
                                        <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-6 py-4 border-b text-center'>{order.ServiceName}</td>
                                            <td className='py-1 px-4 border-b text-center'>{order.orderBy}</td>
                                            <td className='py-1 px-4 border-b text-center hidden md:table-cell'>
                                                {format(order.execution_date, 'dd/MM/yyyy')}
                                            </td>
                                            <td className='py-1 px-4 border-b text-center hidden md:table-cell'>GH₵{order.price}</td>
                                            <td className='py-1 px-4 border-b text-center hidden md:table-cell'>
                                                {
                                                    order?.Status === 1 ? (
                                                        <span className="bg-green-800 ml-2 text-white text-xs font-medium me-2 px-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-800">pending approval</span>
                                                    ): 
													order?.Status === 0 ? (
														<span className="bg-red-800 ml-2 text-white text-xs font-medium me-2 px-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-800">cancelled</span>
													) :
													order?.Status === 3 ? (
														<span className="bg-green-800 ml-2 text-white text-xs font-medium me-2 px-2 py-0.5 rounded-xl">payment made</span>
													):
                                                    order?.Status >= 4 ? (
														<span className="bg-bg-color ml-2 text-white text-xs font-medium me-2 px-2 py-0.5 rounded-xl">work in progress</span>
													):
													(
                                                        <span className="bg-green-600 ml-2 text-white text-xs font-medium me-2 px-2 py-0.5 rounded-xl">awaiting payment</span>
                                                    )
                                                }
                                            </td>
                                            {activeTab === 'completed' || activeTab === 'cancelled' ? (
                                                <></>
                                            ) : (
                                                <td className='py-2 px-4 border-b text-center'>
                                                    <button
                                                        value={order?.id } 
                                                        onClick={handleClick}
                                                        type="button"
                                                        className='bg-transparent hover:bg-blue-500 text-green-700 text-xs hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
                                                        View
                                                    </button>
                                                    {' '}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={openModal} size={modalSize} onClose={() => setOpenModal(false)}>
                {
                    key ? (
                        <>
                            <Modal.Header className='items-center'>Booked Service</Modal.Header>
                            <Modal.Body>
                                {
                                    key && (
                                        <>
                                            <div className="flex">
                                                <div className="p-4 px-10 md:p-5 space-y-4 w-1/2">
                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                        Requested By:
                                                    </h6>
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        {key?.orderBy}
                                                    </p>

                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                        Mobile Number:
                                                    </h6>
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        {key?.phone}
                                                    </p>

                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                        Service Name:
                                                    </h6>
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        {key?.ServiceName}
                                                    </p>

                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                        User Location
                                                    </h6>
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        {key?.address}
                                                    </p>

                                                    
                                                </div>

                                                <div className="p-4 md:p-5 space-y-4 w-full rounded-lg">
                                                    <div className="p-4 max-w-xl mx-auto dark:bg-gray-800 -mt-8">
                                                        <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                            Service Description
                                                        </h6>
                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                            {key?.note} 
                                                        </p>
                                                        <h2 className="font-heading dark:text-gray-100 mb-8 text-md font-bold lg:text-md">Service Progress
                                                        </h2>

                                                        {
                                                            key?.Status <= 2 && (
                                                                <>
                                                                    <div className="sm:col-span-full">
                                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-900">
                                                                            Request Type
                                                                        </label>
                                                                        <div className="mt-2 grid grid-cols-1 w-full">
                                                                            <select
                                                                                id="country"
                                                                                name="type"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                autoComplete="country-name"
                                                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white border border-blue-300 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                                            >
                                                                                <option value="100">Simple Request</option>
                                                                                <option value="200">Complex Request</option>
                                                                            </select>
                                                                            <ChevronDownIcon
                                                                                aria-hidden="true"
                                                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-span-full mb-2 mt-4">
                                                                        <label htmlFor="street-address" className="block text-xs font-medium text-gray-900">
                                                                            Cost of service
                                                                        </label>
                                                                        <div className="mt-2">
                                                                            <input
                                                                                id="street-address"
                                                                                name="cost"
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                type="text"
                                                                                autoComplete="street-address"
                                                                                className="block w-full rounded-md bg-white border border-blue-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        values.type == 200 && (
                                                                            <div className="col-span-full mb-2">
                                                                                <label htmlFor="street-address" className="block text-xs font-medium text-gray-900">
                                                                                    Description of items to purchase for the work
                                                                                </label>
                                                                                <div className="mt-1 -mb-5">
                                                                                    <textarea 
                                                                                        className="w-full px-4 py-2 rounded-md font-medium bg-white border border-blue-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                                                        name="description"
                                                                                        value={values.description}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}>
                                                                                    </textarea>
                                                                                </div>
                                                                                <span className="text-xs text-red-800">{ errors.description }</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }

                                                        {
                                                            key?.Status >= 3 && (
                                                                <>
                                                                    <div className="flex">
                                                                        <div className="mr-4 flex flex-col items-center">
                                                                            { key?.Status >= 4 ? <ProgressChecked /> : <ProgressUnchecked />  }
                                                                            <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                                                                        </div>
                                                                        <div className="pt-1 pb-8">
                                                                            <p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Service Started</p>
                                                                            <p className="text-gray-600 dark:text-slate-400 text-xs">The service provider has started working <br /> on your request.
                                                                            {
                                                                                key?.Status === 3 && (
                                                                                    <>
                                                                                        <br />
                                                                                        <button 
                                                                                            type="button"
                                                                                            onClick={() => changeStatusOrder(key?.id, 4)}
                                                                                            className="bg-transparent border border-bg-color hover:bg-bg-color hover:text-white text-bg-color font-bold mt-4 py-1.5 px-4 rounded-xl"
                                                                                        >
                                                                                            Start Service
                                                                                        </button>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex">
                                                                        <div className="mr-4 flex flex-col items-center">
                                                                            { key?.Status >= 5 ? <ProgressChecked /> : <ProgressUnchecked /> }
                                                                            <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                                                                        </div>
                                                                        <div className="pt-1 pb-8">
                                                                            <p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Acquiring items</p>
                                                                            <p className="text-gray-600 dark:text-slate-400 text-xs">
                                                                                The service provider is currently acquiring all the necessary <br /> items to fulfill your request. 
                                                                                {
                                                                                    key?.Status === 4 && (
                                                                                        <>
                                                                                            <br />
                                                                                            <button 
                                                                                                type="button" 
                                                                                                onClick={() => changeStatusOrder(key?.id, 5)}
                                                                                                className="bg-transparent border border-bg-color rounded-xl hover:bg-bg-color hover:text-white text-bg-color font-bold mt-4 py-1.5 px-4"
                                                                                            >
                                                                                                Items acquired
                                                                                            </button>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex">
                                                                        <div className="mr-4 flex flex-col items-center">
                                                                            { key?.Status >= 6 ? <ProgressChecked /> : <ProgressUnchecked /> }
                                                                            <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
                                                                        </div>
                                                                        <div className="pt-1 pb-8">
                                                                            <p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Work in progress</p>
                                                                            <p className="text-gray-600 dark:text-slate-400 text-xs">
                                                                                The service provider is currently working to <br />fulfill your request.
                                                                                {
                                                                                    key?.Status === 5 &&(
                                                                                        <>
                                                                                            <br />
                                                                                            <button 
                                                                                                type="button" 
                                                                                                onClick={() => changeStatusOrder(key?.id, 6)}
                                                                                                className="bg-transparent border border-bg-color rounded-xl hover:bg-bg-color hover:text-white text-bg-color font-bold mt-4 py-1.5 px-4">
                                                                                                Completed work
                                                                                            </button>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex">
                                                                        <div className="mr-4 flex flex-col items-center">
                                                                            { key?.Status >= 7 ? <ProgressChecked /> : <ProgressUnchecked /> }
                                                                        </div>
                                                                        <div className="pt-1 ">
                                                                            <p className="mb-2 text-md font-bold text-gray-900 dark:text-slate-300">Completed!</p>
                                                                            <p className="text-gray-600 dark:text-slate-400 text-xs"></p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <br />
                                <div className="flex justify-end">
                                    {
                                        key?.Status <= 2 && (
                                            <>
                                                <button 
                                                    type="button" 
                                                    onClick={() => approveOrder(key?.id)} 
                                                    disabled={isApprove}
                                                    className={`text-white flex items-center bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                                                        {isApprove === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Approving order</span></>) : (<><span className="ml-3">Approve</span></>)}
                                                </button>&nbsp;
                                                <button 
                                                    type="button" 
                                                    onClick={() => declineOrder(key?.id)} 
                                                    className="text-white items-center bg-red-800 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Reject
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </Modal.Body>
                        </>
                    ) : ("Loading")
                }
            </Modal>
        </div>
    );
};

export default BusinessOrders;