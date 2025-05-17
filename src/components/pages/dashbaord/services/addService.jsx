/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { getCategories, saveService } from '../../../../utils/request';
import Sidebar from '../../../layouts/SideBar';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { ServiceScheme } from '../../../../lib/scheme';
import preview from '../../../../assets/images/property.png'
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateServices() {
	const editorRef = useRef(null);
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const inputRef = useRef(null);
	const [image, setImage] = useState("");
	const navigate = useNavigate();

	// Fetch categories
	const { data: category } = useQuery(['categories'], getCategories);

	const mutation = useMutation(
		(serviceData) => saveService(serviceData, token),
		{
			onSuccess: (data) => {
				if(data.success === true) {
					navigate(`/dashboard/services`);
				}
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

	const handleImageChange = (event) => {
        const file = event.target.files[0];
		setFieldValue("photos", file)
        const url = URL.createObjectURL(file)
        setImage(url)
    }

    const onSubmit = (values, actions) => {
		if (user && token) {
			const formData = new FormData();
			formData.append("photos", values.photos);
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("type_of_service_id", values.type_of_service_id);
			formData.append("price", values.price);
            mutation.mutate(formData);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            title: "",
			price: "",
			description: "",
			type_of_service_id: "",
			photos: "",   
        },
        validationSchema: ServiceScheme,
        onSubmit,
    })

	const handleDescription = () => {
        setFieldValue("description", editorRef.current.getContent())
    }

	const handleImageClick = () => {
        inputRef.current.click();
    }

	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className='w-full p-4'>
				<div className='bg-white p-6 rounded-lg font-josefin-sans shadow-md w-full max-w-7xl'>
						<h2 className='text-2xl font-semibold mb-4 text-bg-color'>
							New Service
						</h2>
						<p className='mb-6'>Provide your service Details</p>

						<form onSubmit={handleSubmit}>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label className='block text-gray-700'>Title Name</label>
									<input
										type="text"
										name="title"
										value={values.title}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Enter your title name"
										className="w-full p-2 border border-gray-300 rounded mt-2"
									/>
									{errors.title && (
										<p className='text-red-color text-sm'>{errors.title}</p>
									)}
								</div>

								<div>
									<label className='block text-gray-700'>Price</label>
									<input
										type="text"
										name="price"
										value={values.price}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder='Enter your business price'
										className='w-full p-2 border border-gray-300 rounded mt-2'
									/>
									{errors.price && (
										<p className='text-red-color text-sm'>{errors.price}</p>
									)}
								</div>

								<div>
									<span>
										<label className="block text-sm  mt-5 p-6 bg-white border border-gray-200 rounded-lg">
											<span className="text-gray-700 text-xl mb-3">Upload photos</span> 
											<div className="mb-5 mt-5">
												<div>
													{
														image ? (
															<img src={image} alt={image.name} className="h-30 w-48 rounded-lg"/>
														) : (
															<img src={preview} alt="Preview" className="h-30 w-48 rounded-lg"/>
														)
													}
													<input type="file" className="file" name="photos" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
												</div>
												<button type="button" onClick={handleImageClick} className="px-6 py-2 mt-6 bg-bg-color text-white rounded hover:bg-blue-600">Upload image</button>
											</div>
										</label>
									</span>
								</div>

								<div>
									<label className='block text-gray-700'>Service Type</label>
									<select
										name="type_of_service_id"
										value={values.type_of_service_id}
										onChange={handleChange}
										onBlur={handleBlur}
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

							<div className="mt-5">
								<label className='block text-gray-700'>Description</label>
								<Editor
									apiKey='hdsydtbe3tq5rqbah4wefec2nwb8e7gxkp0iurcobwuj7wg7'
									onInit={(_evt, editor) => editorRef.current = editor}
									initialValue={values.description}
									onChange={handleDescription}
									name="description"
									init={{
									height: 200,
									menubar: false,
									plugins: [
										'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
										'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
										'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
									],
									toolbar: 'undo redo | blocks | ' +
										'bold italic forecolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',
									content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
									}}
								/>
								{errors.description && (
									<p className='text-red-color text-sm'>{errors.description}</p>
								)}
							</div>

							<button
								type='submit'
								className='px-4 py-2 mt-6 bg-bg-color text-white rounded hover:bg-blue-600'
								>
									Continue
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}