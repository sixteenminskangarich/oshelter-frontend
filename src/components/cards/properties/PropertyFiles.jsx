import { useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import preview from '../../../assets/images/property.png'
import { getPropertyById, saveVideoUrl } from '../../../utils/request';
import { useMutation } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useFormik } from "formik";
import { ImSpinner9 } from 'react-icons/im';

export default function PropertyFiles(){
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    let { externalId } = useParams();

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");

    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const [checker, setChecker] = useState(null)

    const {
        data: properties,
        Loading,
        status1,
    } = useQuery({
        queryKey: ['properties', { externalId, token }],
        queryFn: () => getPropertyById(externalId, token),
    });

    const property = properties?.data;

    const videoMutation = useMutation(
        (propertyData) => saveVideoUrl(propertyData, token, externalId),
		{
			onSuccess: (data) => {
                if(data?.data?.success === true) {
                    navigate(`/dashboard/properties/add/${externalId}/4`)
                }else {
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
    )

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.split('/')[0] !== 'image') continue;
            if(!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
        if(files.length < 4) {
            setError("Property photos must be 4 or more")
            return
        }

        setFieldValue("photos", event.target.files)
    }

    function deleteImage(index) {
        setImages((prevImages) => 
            prevImages.filter((_, i) => i !== index)
        )
    }

    const onSubmit = (values) => {
        setLoading(true)
        if (user && token) {
            // User is logged in, proceed with booking
            videoMutation.mutate(values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file)
        setImage(url)
        setFieldValue("photo", event.target.files[0])
    }
    
    const { values, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            videoLink: "",
            photos: [],
            photo: "",
            step: 5,
        },
        enableReinitialize: true,
        onSubmit,
    })
    

    const handleImageClick = () => {
        inputRef.current.click();
    }

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "85%" }}>85%</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <h2 className="text-xl font-semibold text-gray-900">{properties?.data?.propertyType === "Event Space" ? "Event Space" : "Property"} Files</h2>
                    <p className="mt-1 text-sm/6 text-gray-600"></p>
                    <br />
                    <div className="grid gap-6 xl:grid-cols-2">
                        <div>
                            <span>
                                <label className="block text-sm mt-6">
                                    <span className="text-gray-700">Video Link</span> 
                                    <input
                                        id="first-name"
                                        name="videoLink"
                                        type="text"
                                        value={values.videoLink}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="given-name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Video Link"
                                        />
                                </label>
                            </span>
                        </div>
                    </div>
                    <div className='grid gap-6 xl:grid-cols-2'>
                        <div>
                            <span>
                                <label className="block text-sm  mt-5 p-6 bg-white border border-gray-200 rounded-lg">
                                    <span className="text-gray-700 text-xl mb-3">Upload a thumbnail photo</span> 
                                    <div className="mb-5 mt-5">
                                        <div>
                                            {
                                                image ? (
                                                    <img src={image} alt={image.name} className="h-48 w-48 rounded-lg"/>
                                                ) : properties?.data?.featuredPropertyPhoto?.url != null ? (
                                                    <img src={properties?.data?.featuredPropertyPhoto?.url} alt="Featured" className="h-48 w-48 rounded-lg"/>
                                                ) : (
                                                    <img src={preview} alt="Preview" className="h-48 w-48 rounded-lg"/>
                                                )
                                            }
                                            <input type="file" className="file" name="photo" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                                        </div>
                                        
                                    </div>
                                </label>
                            </span>
                        </div>
                        
                        <div>
                            <div className='block mt-5 p-6 bg-white border border-gray-200 rounded-lg'>
                                <span className="text-gray-700 text-xl mt-12">Upload photos for your {properties?.data?.propertyType === "Event Space" ? "Event Space" : "property"}</span> 
                                <br />
                                <div className="container-1 mb-4">
                                    {
                                        property?.propertyPhotos != null ? (
                                            <>
                                                {property?.propertyPhotos.map((image, index) => (
                                                    <div className="image" key={index}>
                                                        <span className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 delete" onClick={() => deleteImage(index)}>&times;</span>
                                                        <img src={image.url} alt={image.name} />
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {images.map((images, index) => (
                                        <div className="image" key={index}>
                                            <span className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 delete" onClick={() => deleteImage(index)}>&times;</span>
                                            <img src={images.url} alt={images.name} />
                                        </div>
                                    ))}
                                </div>

                                <span className="text-xs text-red-800">{error}</span>

                                <span>
                                    <label className="block text-sm mt-6">
                                        <div className="mb-5 mt-5">
                                            <div className="">
                                                <button onClick={selectFiles} type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Upload photos
                                                    </span>
                                                </button>
                                                <input type="file" className="file" name="photos" multiple ref={fileInputRef} onChange={onFileSelect} style={{ display: 'none' }} />
                                            </div>
                                        </div>
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="flex xl:items-end xl:justify-end lg:items-end lg:justify-end items-center justify-center">
                        <div className="row flex">
                            {
                                loading === true ? (
                                    <>
                                        <button
                                            disabled
                                            className="rounded-xl w-full flex animate-pulse bg-bg-color py-3 px-32 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="submit">
                                            <ImSpinner9 className="animate-spin mt-1 mr-2"/> processing
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to={`/dashboard/properties/${externalId}`}
                                            className="rounded-md w-full rounded-r-none bg-red-700 py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            >
                                                Back
                                        </Link>
                                        <button
                                            className="rounded-md w-full rounded-l-none bg-bg-color py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="submit">
                                            Next
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
	);
};