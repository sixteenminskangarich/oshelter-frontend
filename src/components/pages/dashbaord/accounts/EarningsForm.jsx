/* eslint-disable no-unused-vars */
import { format } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const EarningsForm = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const earnings = useQuery({
		queryKey: ['earnings'],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/payments`,

				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.json();
		},
	});

	console.log(earnings);
	return (
		<div className='max-w-6xl mx-auto p-4'>
			<h2 className='text-2xl font-bold mb-4'>Manage Business Earnings</h2>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
				<div>
					<h3 className='text-lg font-semibold'>Available funds</h3>
					<div className='p-2 bg-[#E5EBF6] shadow rounded-lg '>
						<span className='text-[#8C8D90]'>Balance available for use</span>
						<p className='text-2xl font-bold'>
							GHS {earnings?.data?.balance_available}
						</p>
						<button className='bg-bg-color text-white px-4 py-2 rounded-lg mt-4'>
							Redraw funds
						</button>
					</div>
				</div>

				<div>
					<h3 className='text-lg font-semibold'>Funds in escrow</h3>
					<div className='p-6 px-6 bg-[#F5EEE7] shadow rounded-lg '>
						<span className='text-[#8C8D90]'>Payments being cleared</span>
						<p className='text-2xl font-bold'>
							GHS {earnings?.data?.payment_held}
						</p>
						<p className='text-[#8C8D90]'>Your earnings held in escrow</p>
					</div>
				</div>
				<div>
					<h3 className='text-lg font-semibold'>Total earnings</h3>
					<div className='p-6 px-6 bg-[#F5EEE7] shadow rounded-lg '>
						<span className='text-[#8C8D90]'>Earning to date</span>
						<p className='text-2xl font-bold'>
							GHS {earnings?.data?.earnings_since_joined}
						</p>
						<p className='text-[#8C8D90]'>Total earnings since joining</p>
					</div>
				</div>
			</div>
			<div className='bg-white shadow rounded-lg p-4'>
				<h3 className='text-lg font-semibold mb-4'>Payment history</h3>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Client
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Service
							</th>
							<th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Amount
							</th>
							{/* <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actions
							</th> */}
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{earnings?.list_of_payments?.length === 0 ? (
							<tr>
								<td className='px-4 py-2'>You have no earnings</td>
							</tr>
						) : (
							<tr>
								{earnings?.list_of_payments?.map((payment, index) => (
									<tr key={index}>
										<td className='px-4 py-2'>{payment.date}</td>
										<td className='px-4 py-2'>{payment.client}</td>
										<td className='px-4 py-2'>{payment.service}</td>
										<td className='px-4 py-2'>GHS {payment.amount}</td>
										{/* <td className='px-4 py-2'>
										<button className='text-blue-500 hover:underline'>
											View Service
										</button>
										<button className='text-red-500 hover:underline ml-2'>
											Delete
										</button>
									</td> */}
									</tr>
								))}
							</tr>
						)}

						{/* Add more rows as needed */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default EarningsForm;
