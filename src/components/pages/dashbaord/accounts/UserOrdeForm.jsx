/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const ManagaUserOrders = () => {
	const [activeTab, setActiveTab] = useState('active');
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);

	const fetchOrders = async (status) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_SERVICE_URL}/user/orders?key=${status}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setOrders(response.data.data || []);
			console.log('orders', response.data.data);
		} catch (error) {
			console.error('Error fetching orders:', error);
		}
	};

	const updateOrderStatus = async (orderId, status) => {
		try {
			await axios.patch(
				`${
					import.meta.env.VITE_APP_SERVICE_URL
				}/user/orders/${orderId}/approve`,
				{ status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// Optimistic update of the frontend table
			setOrders((prevOrders) =>
				prevOrders.filter((order) => order.id !== orderId)
			);
		} catch (error) {
			console.error(`Error updating order status to ${status}:`, error);
		}
	};

	useEffect(() => {
		fetchOrders(activeTab);
	}, [activeTab]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleApprove = (orderId) => {
		updateOrderStatus(orderId, 'approved');
	};

	const handleCancel = (orderId) => {
		updateOrderStatus(orderId, 'cancelled');
	};

	return (
		<div className='p-4 bg-[#FFFFFF] w-full'>
			<h1 className='text-2xl font-bold mb-6'>Manage Orders</h1>
			<div className='mb-4 flex flex-wrap'>
				<button
					onClick={() => handleTabClick('active')}
					className={`px-4 md:px-8 py-2 m-1 rounded-full ${
						activeTab === 'active'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Active
				</button>
				<button
					onClick={() => handleTabClick('in-progress')}
					className={`px-4 md:px-8 py-2 m-1 rounded-full ${
						activeTab === 'in-progress'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					In-progress
				</button>
				<button
					onClick={() => handleTabClick('completed')}
					className={`px-4 md:px-8 py-2 m-1 rounded-full ${
						activeTab === 'completed'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Completed
				</button>
				<button
					onClick={() => handleTabClick('cancelled')}
					className={`px-4 md:px-8 py-2 m-1 rounded-full ${
						activeTab === 'cancelled'
							? 'border border-bg-color text-black-text'
							: 'text-bg-drawer border border-sigin-color'
					}`}>
					Cancelled
				</button>
			</div>
			<div className='bg-white shadow rounded-lg p-4 md:p-6 overflow-x-auto'>
				<h2 className='text-lg font-semibold mb-4 capitalize'>
					{activeTab} Orders
				</h2>
				<table className='min-w-full bg-[#F9FAFB] table-auto'>
					<thead>
						<tr>
							<th className='py-2 text-left'>SERVICE PROVIDER</th>

							<th className='py-2 text-left'>SERVICE</th>

							<th className='py-2 text-left'>DUE</th>
							<th className='py-2 text-left'>COST</th>
							{activeTab === 'completed' || activeTab === 'cancelled' ? (
								<></>
							) : (
								<th className='py-2 text-left'>ACTIONS</th>
							)}
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr key={index} className='border-t'>
								<td className='py-2'>{order.ServiceName}</td>
								<td className='py-2'>{order.OrderedBy}</td>
								<td className='py-2'>
									{format(order.execution_date, 'dd/MM/yyyy')}
								</td>
								<td className='py-2'>GH {order.price}</td>
								{activeTab === 'completed' || activeTab === 'cancelled' ? (
									<></>
								) : (
									<td className='py-2'>
										<button
											onClick={() => handleApprove(order.id)}
											className='bg-green-200 text-green-700 px-2 py-1 rounded mr-2'>
											Approve
										</button>
									</td>
									// 	<button
									// 		onClick={() => handleCancel(order.id)}
									// 		className='bg-red-200 text-red-700 px-2 py-1 rounded'>
									// 		Cancel
									// 	</button>
									// </td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManagaUserOrders;
