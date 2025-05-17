import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { PropertyDetailsScheme } from '../../../lib/scheme';
import { savePropertyDetailed } from '../../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { ImSpinner9 } from 'react-icons/im';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const libraries = ['places'];

const PropertyDetails = ({ externalId, properties  }) => {
    const property = properties?.data
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: property?.latitude, lng: property?.longitude }); // Initial center
    const [markerPosition, setMarkerPosition] = useState(null);
    const searchInputRef = useRef(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    
    const mutation = useMutation(
		(propertyData) => savePropertyDetailed(propertyData, token, externalId),
		{
			onSuccess: (data) => {
                if(data?.data.success === true) {
                    navigate(`/dashboard/properties/add/${externalId}/3`);
                }else {
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = (values, actions) => {
        setLoading(true)
        if (user && token) {
            // User is logged in, proceed with booking
            mutation.mutate(values);
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            location: property?.location,
            longitude: property?.longitude,
            latitude: property?.latitude,
            locationLock: 1,
            gatedCommunity: property?.gatedCommunity === true ? 'yes' : 'no',
            nearestLandmark: property?.nearestLandmark,
            detailedDescription: property?.detailedDescription,
            postGps: property?.postGps,
            step: 4
        },
        validationSchema: PropertyDetailsScheme,
        enableReinitialize: true,
        onSubmit,
    })

    const handleDescription = () => {
        setFieldValue("detailedDescription", editorRef.current.getContent())
    }

    const onLoad = React.useCallback(async (mapInstance) => {
        setMap(mapInstance);
        const initialLocation = {
            lat: parseFloat(property?.data?.latitude),
            lng: parseFloat(property?.data?.longitude),
        };
        setCenter(initialLocation);
        setMarkerPosition(initialLocation);
    
        if (window.google && window.google.maps && window.google.maps.places) {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(
                searchInputRef.current
            );
        
            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();
                if (place.geometry && place.geometry.location) {
                    const newCenter = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    };
                    const location = document.getElementById(`location`).value;
                    setFieldValue("location", location)
                    setFieldValue("longitude", place.geometry.location.lng())
                    setFieldValue("latitude", place.geometry.location.lat())
                    setCenter(newCenter);
                    setMarkerPosition(newCenter);
                    mapInstance.panTo(newCenter);
                }
            });
            setAutocomplete(autocompleteInstance);
            }
        }, [ property?.data?.latitude, property?.data?.longitude, setFieldValue ]);
    
    const onUnmount = React.useCallback(() => {
        setMap(null);
        setAutocomplete(null);
    }, []);

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "65%" }}>80%</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">{properties?.data?.propertyType === "Event Space" ? "Space" : "Property"} Details</h2>
                <p className="mt-1 text-sm/6 text-gray-600"></p>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 xl:grid-cols-2">
                        <div>
                            <span>
                                <label className="block text-sm mt-6">
                                    <span className="text-gray-700">Gated Community</span> 
                                    <select 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={values.gatedCommunity}
                                        name="gatedCommunity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        >
                                        <option value="">--Select--</option>
                                        <option value="yes">yes </option>
                                        <option value="no">no </option>
                                    </select>
                                </label>

                                {errors.gatedCommunity && <p className="text-red-500 text-sm">{ errors.gatedCommunity }</p>}
                            </span>

                            <input type="hidden" name="step" value="4" />

                            <label className="block text-sm mt-6">
                                <span className="text-gray-700">GPS Address</span> 
                                <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Enter Ghana Post Address  eg. KA121-214-24" 
                                    type="text" 
                                    name="postGps"
                                    value={values.postGps}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                {errors.postGps && <p className="text-red-500 text-sm">{ errors.postGps }</p>}
                            </label>
                            <span>
                                <label className="block text-sm mt-6">
                                    <span className="text-gray-700">Nearest Landmark</span> 
                                    <input 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Enter nearest landmark" 
                                        type="text" 
                                        name="nearestLandmark"
                                        value={values.nearestLandmark}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    /> 
                                </label>
                                {errors.nearestLandmark && <p className="text-red-500 text-sm">{ errors.nearestLandmark }</p>}
                            </span>
                            <label className="block text-sm mt-6">
                                <span className="text-gray-700">Lock Location</span> 
                                <div className="mr-6">
                                    <input type="checkbox" 
                                        className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" 
                                        value="1"
                                        name="locationLock"
                                        checked="checked" 
                                    /> 
                                    <span className="ml-2 text-xs"><i>Locked</i></span>
                                </div>
                                {errors.locationLock && <p className="text-red-500 text-sm">{ errors.locationLock }</p>}
                            </label>
                        </div>

                        <div>
                            <span>
                                <label className="block text-sm mt-6">
                                    <span className="text-gray-700">Detailed Description</span> 
                                    <Editor
                                        apiKey='hdsydtbe3tq5rqbah4wefec2nwb8e7gxkp0iurcobwuj7wg7'
                                        onInit={(_evt, editor) => editorRef.current = editor}
                                        initialValue={values.detailedDescription}
                                        onChange={handleDescription}
                                        name="detailedDescription"
                                        init={{
                                        height: 300,
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
                                </label>

                                {errors.detailedDescription && <p className="text-red-500 text-sm">{ errors.detailedDescription }</p>}
                            </span>
                            
                        </div>
                    </div>

                    <h4 className="mt-2">Location Details</h4>

                    <div className="grid xl:grid-cols-3">
                        <div>
                            <label className="block text-sm mt-6">
                                <span className="text-gray-700">Filter Location</span> 
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search for a location"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm mt-6 ml-2 mr 2">
                                <span className="text-gray-700">Longitude</span> 
                                <input
                                    type="text"
                                    id="longitude"
                                    value={values.longitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="longitude"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Enter your longitude"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm mt-6 ml-2">
                                <span className="text-gray-700">Latitude</span> 
                                <input
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    value={values.latitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Enter your latitude"
                                />
                            </label>
                        </div>
                    </div>
                    
                    <br />
                    <div className="grid">
                        <LoadScript
                            googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}
                            libraries={libraries}
                        >
                            <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            >
                            {markerPosition && <Marker position={markerPosition} />}
                            </GoogleMap>
                        </LoadScript>
                        {markerPosition && (
                            <p>
                            Coordinates: Latitude: {markerPosition.lat.toFixed(6)}, Longitude:{' '}
                            {markerPosition.lng.toFixed(6)}
                            </p>
                        )}
                    </div>
                    <br />

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

export default PropertyDetails;