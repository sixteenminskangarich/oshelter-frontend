/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchUserPayment } from '../../../../utils/request';

const PaymentHistroy = () => {
	const [activeTab, setActiveTab] = useState('active');
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const {
		data: payment,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['payment', token],
		queryFn: () => fetchUserPayment(token),

		refetchInterval: 5000,
	});
	// console.log(payment);
	// const fetchOrders = async (status) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${import.meta.env.VITE_APP_SERVICE_URL}/user/payment`,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		setOrders(response.data || []);
	// 	} catch (error) {
	// 		console.error('Error fetching orders:', error);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchOrders(activeTab);
	// }, [activeTab]);

	// const handleTabClick = (tab) => {
	// 	setActiveTab(tab);
	// };
	console.log(orders);
	return (
		<div className='p-4 bg-[#FFFFFF]'>
			<h1 className='text-2xl font-bold mb-6'>Payment History</h1>
			<div className='mb-4'>
				{/* <button
					onClick={() => handleTabClick('active')}
					className={`px-12 m-2 py-2 rounded-full ${
						activeTab === 'active'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Active
				</button> */}
				{/* <button
					onClick={() => handleTabClick('in-progress')}
					className={`px-12 py-2 m-2 rounded-full ${
						activeTab === 'in-progress'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					In-progress
				</button> */}
				{/* <button
					onClick={() => handleTabClick('completed')}
					className={`px-12 py-2 m-2 rounded-full ${
						activeTab === 'completed'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Completed
				</button> */}
				{/* <button
					onClick={() => handleTabClick('cancelled')}
					className={`px-12 py-2 m-2 rounded-full ${
						activeTab === 'cancelled'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Cancelled
				</button> */}
			</div>
			<div className='bg-white shadow rounded-lg p-6'>
				<h2 className='text-lg font-semibold mb-4 capitalize'>
					{activeTab} Orders
				</h2>
				<table className='min-w-full bg-[#F9FAFB]'>
					<thead>
						<tr>
							<th className='py-2'>Date</th>
							<th className='py-2'>Service Provider</th>
							<th className='py-2'>Service</th>
							<th className='py-2'>Amount</th>
							<th className='py-2'></th>
						</tr>
					</thead>
					<tbody>
						{payment?.data?.map((order, index) => (
							<tr key={index}>
								<td className='border-t pl-20 py-2'>
									{format(order.date, 'dd/MM/yyyy')}
								</td>
								<td className='border-t pl-20 py-2'>{order.serviceProvider}</td>
								<td className='border-t py-2 pl-20'>{order.service}</td>
								<td className='border-t py-2 pl-20'>{order.amount}</td>
								<td className='border-t py-2'>{order.cost}</td>
								<td className='border-t py-2'>
									<button className='bg-gray-200 text-gray-700 px-2 py-1 rounded'>
										...
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistroy;
