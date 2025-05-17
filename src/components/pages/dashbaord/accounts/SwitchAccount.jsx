/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../../redux/slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import service from '../../../../assets/images/service.png';
import visitor from '../../../../assets/images/vistor.png';
import owner from '../../../../assets/images/owner.png';
import { useDispatch, useSelector } from 'react-redux';

const SwitchAccount = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const [accountType, setAccountType] = useState('serviceprovider');
	const navigate = useNavigate(); // useNavigate hook to redirect
	const externalId = user.externalId;
	console.log(externalId);
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			// Assume the token is stored in localStorage

			const response = await axios.post(
				`${import.meta.env.VITE_APP_SERVICE_URL}/user/switch/${externalId}`,
				{ accountType },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				toast.success('Account switched successfully! login to continue');
				dispatch(logout()); // Dispatch the logout action
				navigate('/login'); // Redirect to the login page
			}
		} catch (error) {
			toast.error('Failed to switch account: ' + error.message);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen bg-cover bg-center'>
			<div className='w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden m-28'>
				<div className='flex flex-col md:flex-row'>
					{/* Left side with text overlay */}

					{/* Right side with form */}
					<div className='w-full p-8 bg-[#F6F6F6]'>
						<h2 className='text-xl font-bold mb-4 text-center text-bg-color'>
							Switch Your account type
						</h2>
						<div className='flex justify-around mb-6'>
							{/* Property Owner */}
							<div
								onClick={() => setAccountType('owner')}
								className={`p-4 cursor-pointer flex flex-col items-center ${
									accountType === 'owner'
										? 'bg-bg-color text-white'
										: 'text-black-text'
								}`}>
								<img
									src={owner}
									alt='Property Owner'
									className={
										accountType === 'owner' ? 'w-8 ' : 'w-8 text-black-text'
									}
								/>
								<p>Property Owner</p>
							</div>
							{/* Service Provider */}
							<div
								onClick={() => setAccountType('serviceprovider')}
								className={`p-4 cursor-pointer flex flex-col items-center ${
									accountType === 'serviceprovider'
										? 'bg-bg-color text-white'
										: ''
								}`}>
								<img
									src={service}
									alt='Service Provider'
									className='w-8 text-white'
								/>
								<p>Service Provider</p>
							</div>
							{/* Visitor */}
							<div
								onClick={() => setAccountType('visitor')}
								className={`p-4 cursor-pointer flex flex-col items-center ${
									accountType === 'visitor' ? 'bg-bg-color text-white' : ''
								}`}>
								<img src={visitor} alt='Visitor' className='w-8 text-white' />
								<p>Visitor</p>
							</div>
						</div>

						<form onSubmit={onSubmit}>
							<div className='mb-4'>
								<button className='w-full bg-bg-color text-white px-4 py-2 rounded-md'>
									Switch Account
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SwitchAccount;
