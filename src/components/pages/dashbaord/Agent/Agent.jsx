/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import SmsImage from '../../../../assets/images/sms.png';
import { getAllAgentCareTaker } from '../../../../utils/request';
import { useQuery } from 'react-query';
import { LuUser } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { Link } from 'react-router-dom';


const Agent = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	console.log(user);
	const [selectedSection, setSelectedSection] = useState('');
	const [currentStep, setCurrentStep] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

    let w = window.innerWidth;

    const {
		data: agents,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['agent', { token }],
		queryFn: () => getAllAgentCareTaker(token),

		refetchInterval: 5000,
	});

    const results = agents?.data;
    console.log(results)

	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">List of Agents / Caretakers</h5>
                    <br />
                    <div className="relative overflow-x-auto">
                        {
                            results ? (
                                w <= 789 || w <= 810 ? 
                                (
                                    <div className="row h-[580px]">
                                        <div className="flow-root overflow-x-auto">
                                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {
                                                    results ? (
                                                        results?.map((agent, index) => (
                                                            <>
                                                                <li className="py-6 mt-2 sm:py-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                    <div className="flex">
                                                                        <div className="flex items-right">
                                                                            <div className="flex-shrink-0 ml-3">
                                                                                <LuUser className="w-20 h-20 " />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0 ms-4">
                                                                                <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                                                                    {agent.name} {
                                                                                        agent?.type === "Agent" ?
                                                                                        (
                                                                                            <span className="bg-indigo-800 ml-2 text-white text-sm font-medium me-2 px-2 rounded dark:bg-gray-700 dark:text-green-400 border border-indigo-400">Agent</span>
                                                                                        ): (
                                                                                            <span className="bg-green-100 ml-2 text-green-800 text-sm font-medium me-2 px-2 rounded dark:bg-green-700 dark:text-green-400 border border-green-400">CareTaker</span>
                                                                                        )
                                                                                    } 
                                                                                </p>
                                                                                <p className="flex text-sm text-gray-500 dark:text-gray-400" style={{ marginTop: '6px' }}>
                                                                                    <MdAlternateEmail className='mt-1 w-4 h-4'/>
                                                                                    {agent.email}
                                                                                </p>

                                                                                <p className="flex text-sm text-gray-500 dark:text-gray-400" style={{ marginTop: '6px' }}>
                                                                                    <BiPhoneCall className='mt-1 w-4 h-4'/>
                                                                                    {agent.phone}
                                                                                </p>

                                                                                <br/>
                                                                                <div className="flex">
                                                                                    <Link to={`/dashboard/agent/${agent.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                                        edit
                                                                                    </Link>&nbsp;

                                                                                    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0.5 px-4 border border-red-500 hover:border-transparent rounded">
                                                                                        delete
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                                
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
                                ) : (
                                    <>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        FULLNAME
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        EMAIL ADDRESS
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        PHONE NUMBER
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        TYPE
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        ACTION
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results?.map((agent, index) => (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {agent.name}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {agent.email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {agent.phone}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="bg-blue-800 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">{agent.type}</span>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <Link to={`/dashboard/agent/${agent.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                edit
                                                            </Link>&nbsp;

                                                            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">
                                                                delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )
                            )
                            :
                            (
                                ""
                            )
                        }
                    </div>
                </div>
            </div>
		</div>
	);
};

export default Agent;
