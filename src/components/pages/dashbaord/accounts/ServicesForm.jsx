/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { getCategories } from '../../../../utils/request';

const ServicesForm = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [editingService, setEditingService] = useState(null);
	const [formData, setFormData] = useState({
		title: '',
		price: '',
		description: '',
		type_of_service_id: '',
		photos: null,
		negotiable: false,
	});
	const [photosPreview, setPhotosPreview] = useState(null);
	const [errors, setErrors] = useState({});
	const token = useSelector((state) => state.auth.token);

	const queryClient = useQueryClient();

	// Fetch categories
	const { data: category } = useQuery(['categories'], getCategories);

	// Fetch services
	const { data: services = [] } = useQuery(
		['services'],
		async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		},
		{
			onError: (error) => {
				console.error('Error fetching services:', error);
				toast.error('Failed to load services');
			},
		}
	);

	// Mutation for adding a service
	const addServiceMutation = useMutation(
		async (newService) => {
			const formDataToSend = new FormData();
			Object.keys(newService).forEach((key) => {
				formDataToSend.append(key, newService[key]);
			});

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
			return response.data.data;
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['services']);
				toast.success('Service created successfully');
				closeDrawer();
			},
			onError: (error) => {
				console.error('Error adding service:', error);
				toast.error('Failed to create service');
			},
		}
	);

	// Mutation for updating a service
	const updateServiceMutation = useMutation(
		async (updatedService) => {
			const formDataToSend = new FormData();
			Object.keys(updatedService).forEach((key) => {
				formDataToSend.append(key, updatedService[key]);
			});

			const response = await axios.put(
				`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services/${
					editingService.id
				}/update`,
				formDataToSend,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['services']);
				toast.success('Service updated successfully');
				closeDrawer();
			},
			onError: (error) => {
				console.error('Error updating service:', error);
				toast.error('Failed to update service');
			},
		}
	);

	// Mutation for deleting a service
	const deleteServiceMutation = useMutation(
		async (id) => {
			console.log(id);
			await axios.patch(
				`${
					import.meta.env.VITE_APP_SERVICE_URL
				}/provider/services/${id}/delete`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['services']);
				toast.success('Service deleted successfully');
			},
			onError: (error) => {
				console.error('Error deleting service:', error);
				toast.error('Failed to delete service');
			},
		}
	);

	const openDrawer = (service = null) => {
		setEditingService(service);
		if (service) {
			setFormData({
				title: service.title,
				price: service.price,
				description: service.description,
				type_of_service_id: service.type_of_service_id,
				photos: null,
			});
			setPhotosPreview(service.photos_url); // Assuming you have a photos_url field
		} else {
			setFormData({
				title: '',
				price: '',
				description: '',
				type_of_service_id: '',
				photos: null,
			});
			setPhotosPreview(null);
		}
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prev) => ({ ...prev, photos: file }));
		setPhotosPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await validationSchema.validate(formData, { abortEarly: false });
			setErrors({});

			// Check for duplicate service
			const isDuplicate = services.some(
				(service) =>
					service.title === formData.title && service.price === formData.price
			);

			if (isDuplicate) {
				toast.warn(
					'This service already exists. Please add a different service.'
				);
				return; // Exit the function if a duplicate is found
			}

			if (editingService) {
				await updateServiceMutation.mutateAsync(formData);
			} else {
				await addServiceMutation.mutateAsync(formData);
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				const newErrors = {};
				error.inner.forEach((err) => {
					newErrors[err.path] = err.message;
				});
				setErrors(newErrors);
				console.error(newErrors);
			} else {
				console.error('Error:', error.response || error.message);
			}
		}
	};

	const handleDelete = (id) => {
		toast.warn(
			<div>
				<p>Are you sure you want to delete this service?</p>
				<button
					onClick={() => deleteServiceMutation.mutate(id)}
					className='px-4 py-2 bg-red-color text-white rounded'>
					OK
				</button>
				<button
					onClick={() => toast.dismiss()}
					className='ml-4 px-4 py-2 bg-bg-color text-white rounded'>
					Cancel
				</button>
			</div>,
			{
				autoClose: false,
			}
		);
	};

	return (
		<div>
			<button
				onClick={() => openDrawer()}
				className='px-4 py-2 bg-bg-color mt-8 text-white rounded'>
				Add Service
			</button>
			<div className='mt-10'>
				<h3 className='text-xl font-semibold mb-4'>Saved Services</h3>
				{services.length > 0 ? (
					<div className='overflow-x-auto'>
						<table className='min-w-full bg-white'>
							<thead>
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
								{services.map((service) => (
									<tr key={service?.id}>
										<td className='py-2 px-4 border-b text-center'>
											{service?.title}
										</td>
										<td className='py-2 px-4 border-b text-center'>
											{service?.price}
										</td>
										<td className='py-2 px-4 border-b text-center hidden md:table-cell'>
											{service?.ratingAverage}
										</td>
										<td className='py-2 px-4 border-b text-center hidden md:table-cell'>
											{service?.views}
										</td>
										<td className='py-2 px-4 border-b text-center hidden md:table-cell'>
											{service?.Category}
										</td>
										<td className='py-2 px-4 border-b text-center'>
											<button
												onClick={() => openDrawer(service)}
												className='text-blue-500 hover:underline mr-2'>
												Edit
											</button>
											<button
												onClick={() => handleDelete(service.id)}
												className='text-red-color hover:underline'>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>No services found</p>
				)}
			</div>

			{isDrawerOpen && (
				<>
					<div className='fixed mt-12 top-0 right-0 h-full w-full md:w-1/3 bg-white p-8 shadow-lg'>
						<h3 className='text-xl font-semibold mb-4'>
							{editingService ? 'Update Service' : 'Add Service'}
						</h3>
						<div className='scrollable-drawer max-h-[80vh] overflow-y-auto'>
							<form onSubmit={handleSubmit}>
								{/* Title */}
								<div className='mb-4'>
									<label className='block text-sm font-medium mb-2'>
										Service Title
									</label>
									<input
										type='text'
										name='title'
										value={formData.title}
										onChange={handleInputChange}
										className='border border-gray-300 rounded p-2 w-full'
									/>
									{errors.title && (
										<p className='text-red-color text-sm'>{errors.title}</p>
									)}
								</div>

								{/* Price */}
								<div className='mb-4'>
									<label className='block text-sm font-medium mb-2'>
										Service Price
									</label>
									<input
										type='text'
										name='price'
										value={formData.price}
										onChange={handleInputChange}
										className='border border-gray-300 rounded p-2 w-full'
									/>
									{errors.price && (
										<p className='text-red-color text-sm'>{errors.price}</p>
									)}
								</div>

								{/* Description */}
								<div className='mb-4'>
									<label className='block text-sm font-medium mb-2'>
										Service Description
									</label>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										className='border border-gray-300 rounded p-2 w-full'
									/>
									{errors.description && (
										<p className='text-red-color text-sm'>
											{errors.description}
										</p>
									)}
								</div>

								{/* Type of Service */}
								<div className='mb-4'>
									<label className='block text-sm font-medium mb-2'>
										Service Type
									</label>
									<select
										name='type_of_service_id'
										value={formData.type_of_service_id}
										onChange={handleInputChange}
										className='border border-gray-300 rounded p-2 w-full'>
										<option value=''>Select Category</option>
										{category?.data?.map((cat) => (
											<option key={cat?.id} value={cat?.id}>
												{cat?.services}
											</option>
										))}
									</select>
									{errors.type_of_service_id && (
										<p className='text-red-color text-sm'>
											{errors.type_of_service_id}
										</p>
									)}
								</div>

								{/* Photos */}
								<div className='mb-4'>
									<label className='block text-sm font-medium mb-2'>
										Photos
									</label>
									<input
										type='file'
										name='photos'
										onChange={handleFileChange}
										className='border border-gray-300 rounded p-2 w-full'
									/>
									{photosPreview && (
										<img
											src={photosPreview}
											alt='Service Preview'
											className='mt-4 w-32 h-32 object-cover'
										/>
									)}
									{errors.photos && (
										<p className='text-red-color text-sm'>{errors.photos}</p>
									)}
								</div>

								<div className='flex justify-end flex-col sm:flex-row'>
									<button
										type='submit'
										className='px-4 py-2 bg-bg-color text-white rounded w-full sm:w-auto'>
										{editingService ? 'Update Service' : 'Add Service'}
									</button>
									<button
										type='button'
										onClick={closeDrawer}
										className='ml-0 sm:ml-4 mt-1 sm:mt-0 px-4 py-2 bg-gray-300 rounded w-full sm:w-auto'>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

const validationSchema = Yup.object().shape({
	title: Yup.string().required('Title is required'),
	price: Yup.number().required('Price is required'),
	description: Yup.string().required('Description is required'),
	type_of_service_id: Yup.string().required('Service Type is required'),
	photos: Yup.mixed().nullable(),
});

export default ServicesForm;
