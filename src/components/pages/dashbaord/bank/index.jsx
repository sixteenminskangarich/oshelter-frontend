import React from 'react'
import Sidebar from '../../../layouts/SideBar'
import { Link } from 'react-router-dom'
import { fetchBanks } from '../../../../utils/request';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const Bank = () => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const {
		data: banks
	} = useQuery({
		queryKey: ['banks', { token }],
		queryFn: () => fetchBanks(token),

		refetchInterval: 5000,
	});

    const results = banks?.data;

    console.log(results)
    return (
        <div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="container grid px-6 mx-auto mt-2">
                    <div className="px-4 my-6 py-3 mb-8 bg-white rounded-lg shadow-md overflow-x-auto">
                        <Link to="/dashboard/bank/create" className="py-2 text-sm font-medium leading-5 bg-[#281d52] text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-oshelter-deep-blue hover:bg-oshelter-deep-blue px-10 active:bg-transparent">
                            Create New
                        </Link>
                        <h6 className="mt-8 mb-3 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            My Banks
                        </h6>
                        <div className="w-full rounded-lg shadow-xs overflow-x-auto">
                            <table className="w-full table-auto md:flex-col justify-center">
                                <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 font-josefin-sans uppercase border-b bg-gray-50">
                                        <th className="px-4 py-3">
                                            Bank Name
                                        </th>
                                        <th className="px-4 py-3">
                                            Bank Account
                                        </th>
                                        <th className="px-4 py-3">
                                            Bank Branch
                                        </th>
                                        <th className="px-4 py-3">
                                            Swift Code
                                        </th>
                                        <th className="px-4 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {results?.map((row, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {row.bankName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {row.bankAccount}
                                            </td>
                                            <td className="px-6 py-4">
                                                {row.branch}
                                            </td>

                                            <td className="px-6 py-4">
                                                {row.swiftCode}
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <Link to={`/dashboard/bank/${row.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bank
