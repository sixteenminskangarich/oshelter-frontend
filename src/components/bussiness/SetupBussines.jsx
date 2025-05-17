/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
	getCategories,
	getLnaguage,
	getYearsOfExperience,
} from '../../utils/request';
const SetupBusiness = ({ onSetup }) => {
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);
	const [userCategories, setUserCategories] = useState([]);
	const [userLanguage, setUserLanguage] = useState([]);
	const [yearsofExperience, setyearsofExperience] = useState([]);
	const [formData, setFormData] = useState({
		business: '',
		city: '',
		registrationNumber: '',
		location: '',
		country: '',
		region: '',
		image: null,
		languageIds: [],
		description: '',
		expertiseIds: [],
		yearsOfExperienceId: '',
	});
	const [errors, setErrors] = useState({});
	const [uploading, setUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	//Get categories

	const validationSchema = Yup.object().shape({
		business: Yup.string().required('Business name is required'),
		registrationNumber: Yup.string().required(
			'Registration number is required'
		),
		city: Yup.string().required('city is required'),

		location: Yup.string().required('Location is required'),
		country: Yup.string().required('Country is required'),
		region: Yup.string().required('Region is required'),
		image: Yup.mixed().required('Image is required'),
		languageIds: Yup.array().min(1, 'At least one language is required'),
		description: Yup.string().required('Description is required'),
		expertiseIds: Yup.array().min(1, 'At least one expertiseIds is required'),
		yearsOfExperienceId: Yup.string().required(
			'YearsOfExperienceId is required'
		),
	});

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === 'checkbox') {
			setFormData((prev) => ({
				...prev,
				[name]: checked
					? [...prev[name], value]
					: prev[name].filter((item) => item !== value),
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prev) => ({ ...prev, image: file }));
		setImagePreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(e.target.value);
		try {
			await validationSchema.validate(formData, { abortEarly: false });
			setErrors({});

			const formDataToSend = new FormData();
			Object.keys(formData).forEach((key) => {
				if (Array.isArray(formData[key])) {
					formDataToSend.append(key, formData[key].join(','));
				} else {
					formDataToSend.append(key, formData[key]);
				}
			});

			setUploading(true);
			const response = await axios.post(
				`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/create`,
				formDataToSend,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				toast.success('Business created successfully');
				onSetup();
			}
			setFormData({
				business: '',
				city: '',
				registrationNumber: '',
				location: '',
				country: '',
				region: '',
				image: null,
				languageIds: [],
				description: '',
				expertiseIds: [],
				yearsOfExperienceId: '',
			});
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const newErrors = {};
				error.inner.forEach((err) => {
					newErrors[err.path] = err.message;
				});
				setErrors(newErrors);
			} else {
				console.error('Error:', error.response || error.message);
				toast.error(error.response.data.message);
			}
		} finally {
			setUploading(false);
		}
	};
	useEffect(() => {
		const language = async () => {
			const language = await getLnaguage();
			setUserLanguage(language.language);
		};
		const experience = async () => {
			const experiences = await getYearsOfExperience();
			setyearsofExperience(experiences.years);
		};
		const cat = async () => {
			const categories = await getCategories(token);
			setUserCategories(categories.data);
		};
		language();
		cat();
		experience();
	}, [token]);
	return (
		<div className='bg-white p-6 rounded-lg font-josefin-sans shadow-md w-full max-w-4xl mx-auto'>
			<h2 className='text-2xl font-semibold mb-4 text-bg-color'>
				Business Setup
			</h2>
			<p className='mb-6'>Provide your personal and business details</p>

			<form onSubmit={handleSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-gray-700'>Business name</label>
						<input
							type='text'
							name='business'
							value={formData.business}
							onChange={handleInputChange}
							placeholder='Enter your business name'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.business && (
							<p className='text-red-color text-sm'>{errors.business}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Location</label>
						<input
							type='text'
							name='location'
							value={formData.location}
							onChange={handleInputChange}
							placeholder='Enter your business location'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.location && (
							<p className='text-red-color text-sm'>{errors.location}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Registration Number</label>
						<input
							type='text'
							name='registrationNumber'
							value={formData.registrationNumber}
							onChange={handleInputChange}
							placeholder='Enter your business name'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.registrationNumber && (
							<p className='text-red-color text-sm'>
								{errors.registrationNumber}
							</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>City</label>
						<input
							type='text'
							name='city'
							value={formData.city}
							onChange={handleInputChange}
							placeholder='Enter your business city'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.city && (
							<p className='text-red-color text-sm'>{errors.city}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Country</label>
						<CountryDropdown
							value={formData.country}
							onChange={(val) =>
								setFormData((prev) => ({ ...prev, country: val }))
							}
							classes='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.country && (
							<p className='text-red-color text-sm'>{errors.country}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Region</label>
						<RegionDropdown
							country={formData.country}
							value={formData.region}
							onChange={(val) =>
								setFormData((prev) => ({ ...prev, region: val }))
							}
							classes='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.region && (
							<p className='text-red-color text-sm'>{errors.region}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Business logo</label>
						<div className='flex items-center mt-2'>
							<input
								type='file'
								name='image'
								onChange={handleFileChange}
								className='hidden'
								id='image-upload'
							/>
							<label
								htmlFor='image-upload'
								className='cursor-pointer px-4 py-2 border border-gray-300 rounded bg-white'>
								Upload logo
							</label>
						</div>
						{imagePreview && (
							<div className='mt-4'>
								<img
									src={imagePreview}
									alt='Image Preview'
									className='w-24 h-24 object-cover rounded'
								/>
							</div>
						)}
						{errors.image && (
							<p className='text-red-color text-sm'>{errors.image}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Languages</label>
						<div className='flex flex-wrap'>
							{userLanguage.map((language, index) => (
								<label key={index} className='flex items-center mr-4 mb-2'>
									<input
										type='checkbox'
										name='languageIds'
										value={language.id}
										checked={formData.languageIds.includes(String(language.id))}
										onChange={handleInputChange}
										className='mr-2'
									/>
									{language.language}
								</label>
							))}
						</div>
						{errors.languageIds && (
							<p className='text-red-color text-sm'>{errors.languageIds}</p>
						)}
					</div>
				</div>
				<div>
					<label className='block text-gray-700'>Years of Experience</label>
					<select
						name='yearsOfExperienceId'
						value={formData.yearsOfExperienceId}
						onChange={handleInputChange}
						className='w-full p-2 border border-gray-300 rounded mt-2'>
						<option value=''>Select years of experience</option>
						{yearsofExperience.map((year, index) => (
							<option key={index} value={year.id}>
								{year.years}
							</option>
						))}
					</select>
					{errors.yearsOfExperienceId && (
						<p className='text-red-color text-sm'>
							{errors.yearsOfExperienceId}
						</p>
					)}
				</div>
				<div className='mt-6'>
					<label className='block text-gray-700'>Description</label>
					<textarea
						name='description'
						value={formData.description}
						onChange={handleInputChange}
						placeholder='Write about your business'
						className='w-full p-2 border border-gray-300 rounded mt-2'
						rows='4'></textarea>
					{errors.description && (
						<p className='text-red-color text-sm'>{errors.description}</p>
					)}
				</div>

				<div>
					<label className='block text-gray-700'>Expertise</label>
					<div className='flex flex-wrap'>
						{userCategories?.map((category, index) => (
							<label key={index} className='flex items-center mr-4 mb-2'>
								<input
									type='checkbox'
									name='expertiseIds'
									value={category.id}
									checked={formData.expertiseIds.includes(String(category.id))}
									onChange={handleInputChange}
									className='mr-2'
								/>
								{category.services}
							</label>
						))}
					</div>
					{errors.expertiseIds && (
						<p className='text-red-color text-sm'>{errors.expertiseIds}</p>
					)}
				</div>

				<button
					type='submit'
					className='px-4 py-2 mt-6 bg-bg-color text-white rounded hover:bg-blue-600'
					disabled={uploading}>
					{uploading ? 'Uploading...' : 'Continue'}
				</button>
			</form>
		</div>
	);
};

export default SetupBusiness;
