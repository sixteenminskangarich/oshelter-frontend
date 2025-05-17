/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { getBookTourRequest, getSingleBookTourRequest, getAllAgentCareTaker, updateTourRequest, showAgent, cancelTourRequest } from '../../../../utils/request';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from "flowbite-react";
import { useFormik, useField } from "formik";
import { LuUser } from 'react-icons/lu';
import { MdAlternateEmail } from 'react-icons/md';
import { BiPhoneCall } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { RiHome9Line } from "react-icons/ri";
import { ImSpinner9 } from 'react-icons/im';

const Tour = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const pathname = useLocation();
    const [key, setKey] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('xl');
    const [loading, setLoading] = useState(false)
    let w = window.innerWidth;
    const navigate = useNavigate();

    const {
		data: tour,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['tour', { token }],
		queryFn: () => getBookTourRequest(token),

		refetchInterval: 5000,
	});

    const {
		data: agents,
	} = useQuery({
		queryKey: ['agent', { token }],
		queryFn: () => getAllAgentCareTaker(token)
	});

    const agentsData = agents?.data;
    const results = tour?.data;

    const handleClick = (event) => {
        setKey(null)
        setSelectedAgent(null)
        const externalId = event.currentTarget.value;
        const firstData = getSingleBookTourRequest(token, externalId);
        firstData.then((result) => {
            setKey(result)
            console.log(result)
            if(result?.status === 2) {
                const agents = showAgent(token, result?.agentId);
                agents.then((results) => {
                    setSelectedAgent(results)
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
        
        setOpenModal(true)
    };

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            agent: ""
        },
        enableReinitialize: true
    })

    const handleUpdateRequest = (event) => {
        const externalId = event.currentTarget.value;
        setLoading(true)
        if(values.agent != "") {
            const data = {
                agentId: values.agent,
            };
            if (user && token) {
                const response = updateTourRequest(data, token, externalId)
                response.then((result) => {
                    if(result?.success === true) {
                        setOpenModal(false)
                        setLoading(false)
                        toast.success(result?.message)
                        navigate(`/dashboard/properties/tour`);
                    }else {
                        toast.success(result?.message)
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                });
            } else {
                // User is not logged in, append the current page URL to the login route
                const currentUrl = window.location.pathname + window.location.search;
                navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
            }
        }
    }

    const cancelRequest = async(externalId) => {
        try {
            const response = await cancelTourRequest(token, externalId);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

	return(
        <div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-10 xl:mt-16 lg:mt-16'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Request Tour</h3>
                    <br />
                    {
                        tour ? (
                            w <= 789 || w <= 810 ? (
                                <>
                                    {
                                        results?.map((row) => (
                                            <>
                                                <div class="max-w-sm rounded-xl border-2 overflow-hidden shadow-xl mb-4 tracking-wide hover:border-bg-color">
                                                    <div class="px-6 py-4">
                                                        <div class="font-bold text-sm mb-2 flex">
                                                            <RiHome9Line  className="text-bg-color mr-1 mt-1"/> {row.property}
                                                        </div>
                                                        <p class="text-gray-700 text-base">
                                                            <span className="flex text-md mt-1">
                                                                Requested By: <span className="font-thin">{row.name}</span>
                                                            </span>

                                                            <span className="flex">
                                                                <MdOutlineMarkEmailUnread className="text-bg-color mr-1 mt-1.5"/> {row.email}
                                                            </span>

                                                            <span className="flex text-xs mt-1">
                                                                <BiPhoneCall className="text-bg-color mr-1"/> {row.phone}
                                                            </span>

                                                            <div className="absolute mt-3.5">
                                                                {row.status == 1 ? (
                                                                    <span className="text-bg-color text-xs font-thin me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-blue-800">Pending approval</span>
                                                                ): (
                                                                    <span className="bg-green-800 text-white text-xs font-thin me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-green-800">Approved</span>
                                                                )}
                                                            </div>
                                                        </p>
                                                    </div>
                                                    <div class="px-6 pt-4 pb-2 -mt-5 mb-2">
                                                        <div className="flex justify-end">
                                                            <button type="button" value={row?.id } onClick={handleClick} className="bg-transparent hover:bg-blue-800 text-bg-color py-0.5 text-md font-thin hover:text-white px-4 border border-bg-color hover:border-transparent rounded-lg">
                                                                view
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        NAME
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        EMAIL
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        PHONE NUMBER
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        REQUESTED PROPERTY
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
                                                    results?.map((row, index) => (
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td className="px-6 py-4 items-center">
                                                                {row.name}
                                                            </td>
                                                            <td className="mr-4 py-4">
                                                                {row.email}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {row.phone}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {row.property}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {row.status == 1 ? (
                                                                    <span className="bg-blue-800 text-white text-xs font-thin me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-blue-800">Pending</span>
                                                                ): (
                                                                    <span className="bg-green-800 text-white text-xs font-thin me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-green-800">Approved</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button type="button" value={row?.id } onClick={handleClick} className="bg-transparent hover:bg-blue-800 text-green-700 py-1 text-md font-thin hover:text-white px-4 border border-green-500 hover:border-transparent rounded-lg">
                                                                    view
                                                                </button>&nbsp;
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )
                        ) : (
                            "Loading"
                        )
                    }
                </div>
            </div>
            <Modal show={openModal} size={modalSize} onClose={() => setOpenModal(false)}>
                {
                    key ? (
                        <>
                            <Modal.Header className='items-center'>Requested Tour Information</Modal.Header>
                            <Modal.Body>
                                {
                                    key && (
                                        <>
                                            <div className="p-4 md:p-5 space-y-4">
                                                <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                    Name:
                                                </h6>
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                    {key?.name}
                                                </p>

                                                <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                    Email Address:
                                                </h6>
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                    {key?.email}
                                                </p>
                                                {
                                                    key?.status === 2 ? (
                                                        <li className="py-6 mt-2 sm:py-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                            <div className="flex">
                                                                <div className="flex items-right">
                                                                    <div className="flex-shrink-0 ml-3">
                                                                        <LuUser className="w-20 h-20 " />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0 ms-4">
                                                                        <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                                                            {selectedAgent?.data?.name} {
                                                                                selectedAgent?.data?.type === "Agent" ?
                                                                                (
                                                                                    <span className="bg-green-800 ml-2 text-white text-sm font-medium me-2 px-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-800">Agent</span>
                                                                                ): (
                                                                                    <span className="bg-green-100 ml-2 text-green-800 text-sm font-medium me-2 px-2 rounded dark:bg-green-700 dark:text-green-400 border border-green-400">CareTaker</span>
                                                                                )
                                                                            } 
                                                                        </p>
                                                                        <p className="flex text-sm text-gray-500 dark:text-gray-400" style={{ marginTop: '6px' }}>
                                                                            <MdAlternateEmail className='mt-1 w-4 h-4'/>
                                                                            {selectedAgent?.data?.email}
                                                                        </p>
                                                                        <p className="flex text-sm text-gray-500 dark:text-gray-400" style={{ marginTop: '6px' }}>
                                                                            <BiPhoneCall className='mt-1 w-4 h-4'/>
                                                                            {selectedAgent?.data?.phone}
                                                                        </p>
                                                                        <br/>
                                                                        <div className="flex">
                                                                        </div>
                                                                    </div>
                                                                        
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <>
                                                            <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                Mobile Number:
                                                            </h6>
                                                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                {key?.phone}
                                                            </p>

                                                            <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                Message:
                                                            </h6>
                                                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                            {key?.message}
                                                            </p>
                                                        </>
                                                    )
                                                }
                                            </div>

                                            <div className="mb-2">
                                                {
                                                    user.accountType === "owner" ? (
                                                        <>
                                                            <div>
                                                                <label htmlFor="" className="font-bold mb-2">Assign an agent</label>
                                                                <select 
                                                                    id="agents" 
                                                                    name="agent"
                                                                    value={values.agent}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                    <option value="">Select an agent / caretaker</option>
                                                                    {
                                                                        agentsData?.map((row, index) => (
                                                                            <option value={row.id}>{row.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        key?.status === 2 && (
                                                            ""
                                                        )
                                                    )
                                                }
                                            </div>
                                        </>
                                    )
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="relative xl:left-[60%] lg:left-[55%] left-[40%]">
                                    {
                                        user.accountType === "owner" ? (
                                            <>
                                                {
                                                    key?.status === 2 ? (
                                                        <button 
                                                            type="button" 
                                                            onClick={handleUpdateRequest} value={key?.id } 
                                                            disabled={loading}
                                                            className={`text-white items-center ${loading === true ? 'bg-blue-200 flex' : 'bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'} font-medium rounded-lg text-xs px-5 py-2.5 text-center`}>
                                                                {loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Reassigning request</span></>) : (<><span className="ml-3">Reassign Request</span></>)}
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            type="button" 
                                                            onClick={handleUpdateRequest} value={key?.id } 
                                                            disabled={loading}
                                                            className={`text-white items-center ${loading === true ? 'bg-blue-200 flex' : 'bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'} font-medium rounded-lg text-xs px-5 py-2.5 text-center`}>
                                                                {loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Approving request</span></>) : (<><span className="ml-3">Approve Request</span></>)}
                                                        </button>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <button type="button" onClick={() => cancelRequest(key?.id)} className="text-white items-center bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel Request</button>
                                            </>
                                        )
                                    }
                                    &nbsp;
                                    <button type="button" onClick={() => setOpenModal(false)} className="text-white items-center bg-red-800 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                                </div>
                            </Modal.Footer>
                        </>
                    ) : ("Loading")
                }
            </Modal>
        </div>
	);
};

export default Tour;