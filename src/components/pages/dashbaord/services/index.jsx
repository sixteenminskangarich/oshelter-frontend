/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { fetchServices, getCategories } from '../../../../utils/request';
import Sidebar from '../../../layouts/SideBar';
import { Link } from 'react-router-dom';

const ListOfServices = () => {
	const token = useSelector((state) => state.auth.token);
    console.log(token)
    const {
		data: services,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['services', { token }],
		queryFn: () => fetchServices(token)
	});

    console.log(services)

	return (
        <div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                    <div>
                        <div className='mt-10'>
                            <h3 className='text-xl font-semibold mb-4'>Saved Services</h3>
                            <div className='overflow-x-auto'>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className='py-2 px-6 border-b text-center'>Title</th>
                                            <th className='py-2 px-4 border-b text-center'>Price</th>
                                            <th className='py-2 px-4 border-b text-center hidden md:table-cell'>
                                                Rating Average
                                            </th>
                                            <th className='py-2 px-4 border-b text-center hidden md:table-cell'>
                                                Views
                                            </th>
                                            <th className='py-2 px-4 border-b text-center hidden md:table-cell'>
                                                Category
                                            </th>
                                            <th className='py-2 px-4 border-b text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services?.map((service) => (
                                            <tr key={service?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className='px-6 py-4 border-b text-center'>
                                                    {service?.title}
                                                </td>
                                                <td className='py-1 px-4 border-b text-center'>
                                                    GH₵{service?.price}
                                                </td>
                                                <td className='py-1 px-4 border-b text-center hidden md:table-cell'>
                                                    {service?.ratingAverage}
                                                </td>
                                                <td className='py-1 px-4 border-b text-center hidden md:table-cell'>
                                                    {service?.views}
                                                </td>
                                                <td className='py-1 px-4 border-b text-center hidden md:table-cell'>
                                                    {service?.Category}
                                                </td>
                                                <td className='px-6 border-b text-center'>
                                                    <Link to={`/dashboard/services/${service?.id}`}
                                                        className='bg-transparent hover:bg-blue-500 text-green-700 text-xs hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded'>
                                                        Edit
                                                    </Link>
													{' '}
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className='bg-transparent hover:bg-red-500 text-red-700 hover:text-white text-xs py-1 px-3 border border-red-500 hover:border-transparent rounded'>
                                                        Delete
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
        </div>
	);
};

export default ListOfServices;