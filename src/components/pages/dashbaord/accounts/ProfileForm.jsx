/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileForm = () => {
	const [initialValues, setInitialValues] = useState({
		name: '',
		email: '',
		gender: '',
		dob: '',
		phone: '',
		occupation: '',
		country: '',
		address: '',
		emergencyNumber: '',
		emergencyNumberPhone: '',
		idCard: null,
	});

	useEffect(() => {
		// Retrieve the token (assuming it's stored in localStorage)
		const token = localStorage.getItem('token');

		// Fetch profile data from backend with Bearer token in header
		axios
			.get(`${import.meta.env.VITE_APP_SERVICE_URL}/user/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// Populate form fields with the data from the backend
				setInitialValues(response.data.data);
			})
			.catch((error) => {
				console.error('Error fetching profile data', error);
			});
	}, []);
	console.log(initialValues);
	const formik = useFormik({
			
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required('Full Name is required'),
			email: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			gender: Yup.string().required('Gender is required'),
			dob: Yup.string().required('Date of Birth is required'),
			phone: Yup.string().required('Phone Number is required'),
			occupation: Yup.string().required('Occupation is required'),
			country: Yup.string().required('Country is required'),
			address: Yup.string().required('Address is required'),
			emergencyNumber: Yup.string().required('Emergency Contact is required'),
			emergencyNumberPhone: Yup.string().required(
				'Emergency Contact Phone is required'
			),
			idCard: Yup.mixed().required('ID Card is required'),
		}),
		onSubmit: (values) => {
			// Retrieve the token (assuming it's stored in localStorage)
			const token = localStorage.getItem('token');

			// Submit updated profile data to backend with Bearer token in header
			axios
				.post(
					`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`,
					values,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					toast.success('Profile updated successfully');
				})
				.catch((error) => {
					console.error('Error updating profile', error);
					toast.error('Failed to update profile');
				});
		},
	});

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h2 className='text-2xl font-bold mb-4'>Update Profile</h2>
			<form onSubmit={formik.handleSubmit} className='space-y-4'>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Full Name
						</label>
						<input
							type='text'
							name='name'
							placeholder='Enter your full name'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.name}
						/>
						{formik.touched.name && formik.errors.name ? (
							<div className='text-red-color text-sm'>{formik.errors.name}</div>
						) : null}
					</div>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							name='email'
							placeholder='Enter your email address'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className='text-red-color text-sm'>
								{formik.errors.email}
							</div>
						) : null}
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Gender
						</label>
						<select
							name='gender'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.gender}>
							<option value=''>Select gender</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</select>
						{formik.touched.gender && formik.errors.gender ? (
							<div className='text-red-color text-sm'>
								{formik.errors.gender}
							</div>
						) : null}
					</div>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Date of Birth
						</label>
						<input
							type='date'
							name='dob'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.dob}
						/>
						{formik.touched.dob && formik.errors.dob ? (
							<div className='text-red-color text-sm'>{formik.errors.dob}</div>
						) : null}
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Phone Number
						</label>
						<input
							type='text'
							name='phone'
							placeholder='Enter your phone number'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.phone}
						/>
						{formik.touched.phone && formik.errors.phone ? (
							<div className='text-red-color text-sm'>
								{formik.errors.phone}
							</div>
						) : null}
					</div>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Occupation
						</label>
						<input
							type='text'
							name='occupation'
							placeholder='Enter your occupation/profession'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.occupation}
						/>
						{formik.touched.occupation && formik.errors.occupation ? (
							<div className='text-red-color text-sm'>
								{formik.errors.occupation}
							</div>
						) : null}
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Country
						</label>
						<select
							name='country'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.country}>
							<option value=''>Select your country</option>
							<option value='Ghana'>Ghana</option>
							<option value='USA'>USA</option>
							<option value='India'>India</option>
							<option value='Other'>Other</option>
						</select>
						{formik.touched.country && formik.errors.country ? (
							<div className='text-red-color text-sm'>
								{formik.errors.country}
							</div>
						) : null}
					</div>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Address
						</label>
						<input
							type='text'
							name='address'
							placeholder='Enter your address'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.address}
						/>
						{formik.touched.address && formik.errors.address ? (
							<div className='text-red-color text-sm'>
								{formik.errors.address}
							</div>
						) : null}
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Emergency Contact
						</label>
						<input
							type='text'
							name='emergencyNumber'
							placeholder='Enter emergency contact name'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.emergencyNumber}
						/>
						{formik.touched.emergencyNumber && formik.errors.emergencyNumber ? (
							<div className='text-red-color text-sm'>
								{formik.errors.emergencyNumber}
							</div>
						) : null}
					</div>
					<div className='flex-1'>
						<label className='block text-sm font-medium text-gray-700'>
							Emergency Contact Phone
						</label>
						<input
							type='text'
							name='emergencyNumberPhone'
							placeholder='Enter emergency contact phone number'
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
							onChange={formik.handleChange}
							value={formik.values.emergencyNumberPhone}
						/>
						{formik.touched.emergencyNumberPhone &&
						formik.errors.emergencyNumberPhone ? (
							<div className='text-red-color text-sm'>
								{formik.errors.emergencyNumberPhone}
							</div>
						) : null}
					</div>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						ID Card
					</label>
					<input
						type='file'
						name='idCard'
						onChange={(event) => {
							formik.setFieldValue('idCard', event.currentTarget.files[0]);
						}}
						className='mt-1 block w-full text-sm text-gray-500'
					/>
					{formik.touched.idCard && formik.errors.idCard ? (
						<div className='text-red-color text-sm'>{formik.errors.idCard}</div>
					) : null}
				</div>
				<div>
					<button
						type='submit'
						className='px-4 py-2 bg-bg-color text-white rounded-md'>
						Update Profile
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileForm;
