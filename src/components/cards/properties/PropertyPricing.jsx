/* eslint-disable react/prop-types */
import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from "formik";
import { useMutation } from 'react-query';
import { savePricingAndSchedule, savePropertyPackage, savePropertyService, savePropertyUnits } from '../../../utils/request';
import { Link, useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import preview from '../../../assets/images/file.jpg'
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { set } from 'date-fns';

// eslint-disable-next-line react/prop-types
export default function PropertyPricing({ externalId, properties  }){
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const [packageList, setPackageList] = useState([]);
    const [components, setComponents] = useState([])
    const [unitName, setUnitName] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [selectValue, setSelectValue] = useState("")
    const [description] = useState(true)
    const [error, setError] = useState(null);
    const [image, setImage] = useState(preview);
    const [getProperty, setGetProperty] = useState(properties);
    const navigate = useNavigate();

    useEffect(() => {
        setGetProperty(properties)
    }, [setGetProperty, properties]);

    const mutation = useMutation(
		(propertyData) => savePricingAndSchedule(propertyData, token, externalId),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    navigate(`/dashboard/properties/add/${externalId}/5`);
                } else {
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const saveUnitMutation = useMutation(
        (propertyUnit) => savePropertyUnits(propertyUnit, token, externalId),
		{
			onSuccess: (data) => {
                console.log(data)
			},
			onError: (error) => {
				console.error(error);
			},
		}
    )

    const savePackageMutation = useMutation(
		(propertyData) => savePropertyPackage(propertyData, token, externalId),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    console.log("successful")
                }
                console.log(data)
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const saveServiceMutation = useMutation(  
		(propertyData) => savePropertyService(propertyData, token, externalId),
		{
			onSuccess: (data) => {
                if(data.success === true) {
                    toast.success("Service saved successfully")
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const addComponent = () => {
        const componentInput = document.getElementById("component");
        const newComponent = componentInput.value.trim();

        if (newComponent) {
            setComponents((prevComponents) => [...prevComponents, newComponent]);
            componentInput.value = "";
        }
    };

    const savePackageComponent = () => {
        const packageName = document.getElementById(`packageName`).value;
        const packageAmount = document.getElementById(`packageAmount`).value;

        const formData = new FormData();
        formData.append("name", packageName)
        formData.append("amount", packageAmount)
        formData.append("components", components)
        savePackageMutation.mutate(formData, token, externalId)
        setComponents([])
        document.getElementById(`packageName`).value = "";
        document.getElementById(`packageAmount`).value = "";
    }

    const saveServices = () => {
        const serviceName = document.getElementById(`serviceName`).value;
        const serviceAmount = document.getElementById(`serviceAmount`).value;

        const formData = new FormData();
        formData.append("name", serviceName)
        formData.append("amount", serviceAmount)
        saveServiceMutation.mutate(formData, token, externalId)
        document.getElementById(`serviceName`).value = "";
        document.getElementById(`serviceAmount`).value = "";
    }

    const removePackageForms = (id) => {
        setComponents((prevComponents) => prevComponents.filter((component) => component.id !== id));
    }

    const onSubmit = (values) => {
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

    const initialPackages = [
        { id: 12, unit: "Unit A", floorPlan: "floor-plan-a.jpg" },
        { id: 13, unit: "Unit B", floorPlan: "floor-plan-b.jpg" },
        { id: 14, unit: "Unit C", floorPlan: "floor-plan-c.jpg" },
        { id: 15, unit: "Unit D", floorPlan: "floor-plan-d.jpg" },
    ];

    const handleChangePrice = () => {
        const unitPrice = document.getElementById("unitPrice").value.trim();
        setUnitPrice(unitPrice);
    }

    const property = getProperty?.data;

    const handleUnitChange = () => { 
        const unitInput = document.getElementById("unitName").value.trim();
        setUnitName(unitInput);
    }

    const handleSelectChange = () => {
        const selectInput = document.getElementById("multipleUnit").value.trim();
        setSelectValue(selectInput);
    }

    const saveUnitData = () => {
        const typeId = document.getElementById("typeId").value;
        const floorId = document.getElementById("floorId").value;
        const priceId = document.getElementById("priceId").value;
        const floorSquareFeet = document.getElementById("floorSquareFeet").value;
        const id = components.length + 1; // Generate a unique ID for the new component

        if (!typeId || !floorId || !priceId || !floorSquareFeet) {
            alert("Please fill in all fields before adding a component.");
            return;
        }

        setComponents((prevComponents) => [
            ...prevComponents,
            { id, typeId, floorId, priceId, floorSquareFeet }
        ]);

        document.getElementById("typeId").value = "";
        document.getElementById("floorId").value = "";
        document.getElementById("priceId").value = "";
        document.getElementById("floorSquareFeet").value = "";
    }

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            currency: property?.currency,
            amount: property?.amount,
            advancePaymentDuration: property?.advancePaymentDuration,
            paymentOptions: [],
            minimumStay: property?.minimumStay,
            maximumStay: property?.maximumStay,
            priceCalendar: "",
            reservationFee: "",
            isNegotiable: "0",
            agent: "",
            newAgentName: "",
            newAgentPhone: "",
            rate: property?.rate,
            isSpecialServices: property?.isService,
            minBooking: "",
            isAdvancedNotice: property?.isAdvancedNotice,
            noiseRestriction: property?.IsNoise,
            securityAvailability: property?.isSecurityAvailable
        },
        enableReinitialize: true,
        onSubmit,
    })
    
    const handleSaveUnit = () => {
        try {
            const formData = new FormData();
            formData.append("unitName", unitName);
            formData.append("multipleUnit", selectValue);
            formData.append("unitData", JSON.stringify(components));
            formData.append("propertyId", externalId);
            formData.append("unitPrice", unitPrice);
            formData.append("image", image); // Append the image file to the FormData
            saveUnitMutation.mutate(formData, token, externalId);
            setUnitName("");
            setUnitPrice("");

        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = () => {
        const imageInput = document.getElementById("imagePhoto");
        if (imageInput && imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result)
            };

            reader.readAsDataURL(file);
        } else {
            console.log("No image selected");
        }
    }

    const getIdFromArray = (array) => {
        const ids = array.map((item) => item.id); // Extract the IDs from the objects in the array
        console.log(ids); // Log the array of IDs
    }

    const deleteService = (id) => {
        console.log(id)
    }

	return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "95%" }}>95%</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold text-gray-900">{property?.propertyType === "Event Space" ? "Event Space" : "Property"} Pricing And Scheduling</h2>
                <p className="mt-1 text-sm/6 text-gray-600"></p>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                        <div className="relative mb-6">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Currency
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="currency"
                                    value={values.currency}
                                    onChange={handleChange}
                                    autoComplete="country-name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                    <option value="">--Select--</option>
                                    <option>GH₵</option>
                                    <option>USD</option>
                                </select>
                            </div>
                        </div>

                        {
                            property?.propertyType === "Event Space" ? (
                                <div className="relative mb-6">
                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                        Rate
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="rate"
                                            value={values.rate}
                                            onChange={handleChange}
                                            autoComplete="country-name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                            <option value="">--Select--</option>
                                            <option value="per hour">Per Hour</option>
                                            <option value="per day">Per Day</option>
                                            <option value="per package">Per Package</option>
                                        </select>
                                    </div>
                                </div>
                            ) : ("")
                        }
                        
                        {
                            property?.propertyType === "Event Space" ? (
                                <>
                                    {
                                        values.rate === "per package" ? (
                                            <>
                                                <div className="overflow-x-auto rounded-lg border-t-4 border-bg-color">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Package Name
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Amount
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Component
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Actions
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {property?.propertyPackages.map((item, index) => (
                                                                <>
                                                                    <tr key={index}>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{item.package}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">GHc{item.rate}</div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">
                                                                                {
                                                                                    item.components && (
                                                                                        item.components.split(",").map((component, index) => (
                                                                                            <span key={index} className="rounded-xl px-5 py-1 border border-bg-color text-bg-color text-xs mr-2">{component}</span>
                                                                                        ))
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                            <button type="button" className="text-red-500 cursor-pointer rounded-full border border-red-500 px-3 py-2"><RiDeleteBin5Line /></button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="row">
                                                    <div className="flex">
                                                        <div className="relative mb-6 w-[50%]">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Package Name
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="packageName"
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Enter package name"
                                                                />
                                                            </div>
                                                        </div>
                                                        &nbsp;

                                                        <div className="relative mb-6 w-[50%]">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Package Amount
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="packageAmount"
                                                                    name="packageAmount"
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Enter amount per package"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        description && (
                                                            <>
                                                                <div className="relative w-full">
                                                                    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 gap-2">
                                                                        {components?.map((component, index) => (
                                                                            <span key={index} className="rounded-xl px-5 py-1 border border-bg-color text-bg-color text-xs mr-2">{component}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="flex relative mb-5 mt-3">
                                                                    <div className="flex">
                                                                        <div className="row">
                                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                                Add Component
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    id="component"
                                                                                    type="text"
                                                                                    autoComplete="given-name"
                                                                                    className="bg-gray-50 border py-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                    placeholder="Enter package"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-8 ml-2">
                                                                            <button type="button" onClick={() => addComponent()} className="px-4 py-1.5 border border-bg-color text-bg-color rounded-xl">Save Component</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                    <div className="relative mb-6">
                                                        <button type="button" onClick={() => savePackageComponent() } className="rounded-lg border border-bg-color px-6 py-1 text-bg-color">
                                                            Save Package
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="relative mb-6">
                                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                        Amount per rate
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="first-name"
                                                            name="amount"
                                                            value={values.amount}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="text"
                                                            autoComplete="given-name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Enter amount per month"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            ) : 
                            property?.propertyType === "Off The Plan" ? (
                                <>
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            Reservation Fee
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="reservationFee"
                                                value={values.reservationFee}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="given-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter Reservation Fee"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="xl:flex lg:flex">
                                            <div className="relative xl:mb-6 lg:mb-6 xl:w-[50%] lg:w-[50%] w-full">
                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                    Unit
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="unitName"
                                                        onChange={handleUnitChange}
                                                        type="text"
                                                        autoComplete="given-name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Enter unit name"
                                                    />
                                                </div>
                                            </div>
                                            &nbsp;
                                            {
                                                unitName && (
                                                    <div className="relative xl:mb-6 lg:mb-6 xl:w-[50%] lg:w-[50%] w-full">
                                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                            Does {unitName} have multiple unit?
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="multipleUnit"
                                                                name="multipleUnit"
                                                                onChange={handleSelectChange}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            >
                                                                <option value="">--Select--</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        {
                                            selectValue && (
                                                selectValue === "no" ? (
                                                    <>
                                                        <div className="relative mb-6">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Price
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="unitPrice"
                                                                    onChange={handleChangePrice}
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Enter price"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="mx-auto mt-2 mb-10">
                                                            <div className="relative overflow-x-auto border-t-4 border border-t-bg-color rounded-xl">
                                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                        <tr>
                                                                            <th scope="col" className="px-6 py-3">
                                                                                Type
                                                                            </th>
                                                                            <th scope="col" className="px-6 py-3">
                                                                                Floor ID
                                                                            </th>
                                                                            <th scope="col" className="px-6 py-3">
                                                                                Floor sqt
                                                                            </th>
                                                                            <th scope="col" className="px-6 py-3">
                                                                                Price
                                                                            </th>
                                                                            <th scope="col" className="px-6 py-3">
                                                                                Action
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {components.map((item, index) => (
                                                                            <>
                                                                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                                        {item.typeId}
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                                        {item.floorId}
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                                        {item.floorSquareFeet}
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                                        GHc{item.priceId}
                                                                                    </td>
                                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                                                        <button type="button" onClick={() => removePackageForms(item.id)} className="px-3 border border-red-800 text-red-800 py-1.5 rounded-xl hover:bg-red-800 hover:text-white"><RiDeleteBin5Line /></button>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="xl:flex lg:flex mx-auto">
                                                            <div className="relative mb-6 mr-2 w-full">
                                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                    Type
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="typeId"
                                                                        type="text"
                                                                        autoComplete="given-name"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Enter type"
                                                                    />
                                                                </div>
                                                            </div>
    
                                                            <div className="relative mb-6 mr-2 w-full">
                                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                    Floor ID
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="floorId"
                                                                        type="text"
                                                                        autoComplete="given-name"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Enter floor id"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="relative mb-6 mr-2 w-full">
                                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                    Floor square feet
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="floorSquareFeet"
                                                                        type="text"
                                                                        autoComplete="given-name"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Enter floor square feet"
                                                                    />
                                                                </div>
                                                            </div>
    
                                                            <div className="relative mb-6 w-full">
                                                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                    Price
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        id="priceId"
                                                                        type="text"
                                                                        autoComplete="given-name"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        placeholder="Enter price"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button type="button" onClick={saveUnitData} className="border border-bg-color px-4 py-0.5 rounded-lg hover:bg-bg-color hover:text-white">Save</button>
                                                    </>
                                                )
                                            )
                                        }

                                        <div className="relative mb-5 mt-3">
                                            <div>
                                                <span>
                                                    <label className="block text-sm mt-5 p-6 bg-white border border-gray-200 rounded-lg">
                                                        <span className="text-gray-700 text-xl mb-3">Upload a floor plan</span> 
                                                        <div className="mb-5 mt-5">
                                                            <div>
                                                                <img src={image ? image : preview} alt="Preview" className="h-48 w-48 rounded-lg cursor-pointer"/>
                                                                <input type="file" id="imagePhoto" onChange={handleImageChange} className="file cursor-pointer" name="photo" style={{ display: "none" }} />
                                                            </div>
                                                        </div>
                                                    </label>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative mb-6">
                                            <button type="button" onClick={() => handleSaveUnit() } className="rounded-lg border border-bg-color px-6 py-1 text-bg-color">
                                                Save {unitName}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto border-t-4 border border-t-bg-color rounded-xl">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Unit
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Floor Plan
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {property?.propertyUnits?.map((unit, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{unit.unitName}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {
                                                                    unit.hasMultiple === 1 ? (
                                                                        <span className="text-bg-color">Multipe</span>
                                                                    ) : (
                                                                        <span className="text-bg-color">GHc{unit.unitPrice}</span>
                                                                    )
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <img src={unit?.file?.url} alt="Floor Plan" className="h-12 w-12 rounded-lg" />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            {
                                                                unit.hasMultiple === 1 && (
                                                                    <button type="button" onClick={() => getIdFromArray(unit.id)} className="px-3 border border-bg-color text-bg-color py-1.5 rounded-xl hover:bg-bg-color hover:text-white mr-1"><GoEye /></button>
                                                                ) 
                                                            }
                                                            <button type="button" className="px-3 border border-red-800 text-red-800 py-1.5 rounded-xl hover:bg-red-800 hover:text-white"><RiDeleteBin5Line /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            Amount {property?.marketType === "Sale" && property?.propertyType === "Land" ? "Per Plot" : property?.marketType === "Sale" ? "" : "per month"}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="amount"
                                                value={values.amount}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="given-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter amount per month"
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>

                    {
                        property?.propertyType === "Event Space" && (
                            <>
                                <div className="relative mb-6">
                                    <div className="mt-2">
                                        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                            <div className="flex items-center my-1">
                                                <input id="specialServices" onChange={handleChange} onBlur={handleBlur} type="checkbox" value={values.isSpecialServices} checked={values.isSpecialServices} name="isSpecialServices" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                <label htmlFor="specialServices" className="text-sm font-normal text-gray-600">Do you offer special services?</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    values.isSpecialServices && (
                                        <>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                                <div className="row">
                                                    <table className="min-w-full divide-y divide-gray-200 border-t-4 border-bg-color rounded-lg">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Service Name
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Amount
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Actions
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {property?.propertyServices.map((item, index) => (
                                                                <>
                                                                    <tr key={index}>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">{item.name}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-gray-900">GHc{item.amount}</div>
                                                                        </td>
                                                                        
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                            <button type="button" onClick={() => deleteService(item.id)} className="text-red-500 cursor-pointer rounded-full border border-red-500 px-3 py-2"><RiDeleteBin5Line /></button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="row">
                                                    <div className="flex">
                                                        <div className="relative mb-6 w-[50%]">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Service Name
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="serviceName"
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Enter service name"
                                                                />
                                                            </div>
                                                        </div>
                                                        &nbsp;

                                                        <div className="relative mb-6 w-[50%]">
                                                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                                                Service Amount
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="serviceAmount"
                                                                    name="serviceAmount"
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Enter amount for service"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative mb-6">
                                                        <button type="button" onClick={() => saveServices() } className="rounded-lg border border-bg-color px-6 py-1 text-bg-color">
                                                            Save Service
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                } 
                                <hr className="mt-2"/>
                                <div className="grid md:grid-cols-4 grid-cols-1 mt-5">
                                    <div className="relative mb-6">
                                        <div className="mt-2">
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                                <div className="flex items-center my-1">
                                                    <input id="advancedNotice" onChange={handleChange} onBlur={handleBlur} type="checkbox" value={values.isAdvancedNotice} checked={values.isAdvancedNotice} name="isAdvancedNotice" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                    <label htmlFor="advancedNotice" className="text-sm font-normal text-gray-600">Is advanced notice required?</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mb-6">
                                        <div className="mt-2">
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                                <div className="flex items-center my-1">
                                                    <input id="securityAvailability" onChange={handleChange} onBlur={handleBlur} type="checkbox" value={values.securityAvailability} checked={values.securityAvailability} name="securityAvailability" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                    <label htmlFor="securityAvailability" className="text-sm font-normal text-gray-600">Security availability?</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="relative mb-6">
                                        <div className="mt-2">
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                                <div className="flex items-center my-1">
                                                    <input id="noiseRestrition" onChange={handleChange} onBlur={handleBlur} type="checkbox" value={values.noiseRestriction} checked={values.noiseRestriction} name="noiseRestriction" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                    <label htmlFor="noiseRestrition" className="text-sm font-normal text-gray-600">Noise Restriction?</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mb-6">
                                        <div className="mt-2">
                                            <input
                                                id="minBooking"
                                                name="minBooking"
                                                value={values.minBooking}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="given-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter minimum booking"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                        {
                            property?.marketType === "Short Stay" || property?.marketType === "Sale" ? ("") : (
                                <div className="relative mb-6">
                                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                                        Advance payment duration in months
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="advancePaymentDuration"
                                            value={values.advancePaymentDuration}
                                            onChange={handleChange}
                                            autoComplete="country-name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                            <option value="">--Select--</option>
                                            <option value="1">1 month</option>
                                            <option value="3">3 months</option>
                                            <option value="6">6 month</option>
                                            <option value="12">12 months</option>
                                            <option value="18">18 months</option>
                                            <option value="24">24 months</option>
                                            <option value="36">36 months</option>
                                            <option value="48">48 months</option>
                                            <option value="60">60 months</option>
                                        </select>
                                    </div>
                                </div>
                            ) 
                        }

                        {
                            property?.propertyType != "Event Space" && (
                                <>
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            Preferred payment Options
                                        </label>
                                        <div className="mt-2">
                                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                                <div className="flex items-center my-1">
                                                    <input id="Full Payment" type="checkbox" value="Full Payment" name="paymentOptions" onChange={handleChange} className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                    <label htmlFor="Full Payment" className="text-sm font-normal text-gray-600">Full Payment</label>
                                                </div>
                                                <div className="flex items-center my-1">
                                                    <input id="Installment" type="checkbox" name="paymentOptions" onChange={handleChange} className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                    <label htmlFor="Installment" className="text-sm font-normal text-gray-600">Installment</label>
                                                </div>

                                                {
                                                    property?.propertyType === "Off The Plan" && property?.marketType === "Sale" ? (
                                                        <div className="flex items-center my-1">
                                                            <input id="Upfront" type="checkbox" name="paymentOptions" onChange={handleChange} className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
                                                            <label htmlFor='Upfront' className="text-sm font-normal text-gray-600">30% Upfront</label>
                                                        </div>
                                                    ) : ("")
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    
                    {
                        property?.marketType === "Short Stay" ? (
                            <>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                                            Minimum stay in days
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="minimumStay"
                                                value={values.minimumStay}
                                                onChange={handleChange}
                                                autoComplete="country-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                <option value="">--Select--</option>
                                                <option value="1">1 day</option>
                                                <option value="2">3 days</option>
                                                <option value="3">6 day</option>
                                                <option value="4">12 days</option>
                                                <option value="5">18 days</option>
                                                <option value="6">24 days</option>
                                                <option value="7">36 days</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="relative mb-6">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                                            Maximum stay in days
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                name="maximumStay"
                                                value={values.maximumStay}
                                                onChange={handleChange}
                                                autoComplete="country-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                <option value="">--Select--</option>
                                                <option value="10">10 day</option>
                                                <option value="20">20 days</option>
                                                <option value="25">25 day</option>
                                                <option value="30">30 days</option>
                                                <option value="40">40 days</option>
                                                <option value="50">50 days</option>
                                                <option value="60">60 days</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <hr style={{ marginTop: '10px' }} /> 
                            </>
                        )
                    }
                    <input type="hidden" name="step" value="6" />
                    {
                        property?.propertyType === "Event Space" ? (
                            <>
                            
                            </>
                        ): (
                            <>
                                <p className="text-sm mt-6 font-semibold">Do you have care taker or agents on this property?</p>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                    <div>
                                        <div className="relative mb-6">
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                    <option value="">--Select--</option>
                                                    <option>No</option>
                                                    <option>Yes</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

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
                                            disabled={loading}
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
}