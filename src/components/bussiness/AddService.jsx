/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../utils/request';

const AddService = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);

	const [category, setCategory] = useState([]);
	useEffect(() => {
		getCategories().then((res) => setCategory(res));
	}, []);
	const [formData, setFormData] = useState({
		title: '',
		price: '',

		photos: null,

		description: '',
		type_of_service_id: '', // Single selection for expertise
	});

	const [errors, setErrors] = useState({});
	const [uploading, setUploading] = useState(false);
	const [photosPreview, setPhotosPreview] = useState(null);

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Title  is required'),

		price: Yup.string().required('Price is required'),

		photos: Yup.mixed().required('Photos is required'),

		description: Yup.string().required('Description is required'),
		type_of_service_id: Yup.string().required('Expertise is required'),
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
		setFormData((prev) => ({ ...prev, photos: file }));
		setPhotosPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if(user.businessInfo.name===''){
		// 	toast.error('Please add your business name');
		// 	return;
		// }
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
				`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services/create`,
				formDataToSend,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				toast.success('Services  created successfully');
			}
			setFormData({
				title: '',
				price: '',

				photos: null,

				description: '',

				type_of_service_id: '',
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
			}
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg font-josefin-sans shadow-md w-full max-w-4xl mx-auto'>
			<h2 className='text-2xl font-semibold mb-4 text-bg-color'>
				Service Setup
			</h2>
			<p className='mb-6'>Provide your service Details</p>

			<form onSubmit={handleSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-gray-700'>Title Name</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							placeholder='Enter your title name'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.title && (
							<p className='text-red-color text-sm'>{errors.title}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Price</label>
						<input
							type='text'
							name='price'
							value={formData.price}
							onChange={handleInputChange}
							placeholder='Enter your business price'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.price && (
							<p className='text-red-color text-sm'>{errors.price}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Service Photos</label>
						<div className='flex items-center mt-2'>
							<input
								type='file'
								name='photos'
								onChange={handleFileChange}
								className='hidden'
								id='photos-upload'
							/>
							<label
								htmlFor='photos-upload'
								className='cursor-pointer px-4 py-2 border border-gray-300 rounded bg-white'>
								Upload Photos
							</label>
						</div>
						{photosPreview && (
							<div className='mt-4'>
								<img
									src={photosPreview}
									alt='Photos Preview'
									className='w-24 h-24 object-cover rounded'
								/>
							</div>
						)}
						{errors.photos && (
							<p className='text-red-color text-sm'>{errors.photos}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Description</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							placeholder='Describe your business'
							className='w-full p-2 border border-gray-300 rounded mt-2'
						/>
						{errors.description && (
							<p className='text-red-color text-sm'>{errors.description}</p>
						)}
					</div>

					<div>
						<label className='block text-gray-700'>Service Type</label>
						<select
							name='type_of_service_id'
							value={formData.type_of_service_id}
							onChange={handleInputChange}
							className='w-full p-2 border border-gray-300 rounded mt-2'>
							<option value=''>Select your expertise</option>
							{category?.data?.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.services}
								</option>
							))}
						</select>
						{errors.type_of_service_id && (
							<p className='text-red-color text-sm'>
								{errors.type_of_service_id}
							</p>
						)}
					</div>
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

export default AddService;
