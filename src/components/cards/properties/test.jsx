import { useState}  from 'react';
// Removed unused imports 'Drawer' and 'Modal'
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import { PropertyScheme } from '../../../lib/scheme';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { updateProperty } from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { ImSpinner9 } from 'react-icons/im';
import InputField from '../form/InputField';
import SelectField from '../form/SelectField';

const Property = ({ externalId, properties }) => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let step = 0;
    const [loading, setLoading] = useState(false)

    const seatStyleOptions = [
        { id: 100, name: "Theater Style" },
        { id: 200, name: "Classroom Style" },
        { id: 300, name: "Banquet Style" },
        { id: 400, name: "Boardroom Style" },
        { id: 500, name: "U-Shape Style" },
        { id: 600, name: "Hollow Square" },
        { id: 700, name: "Lounge Style" },
        { id: 800, name: "Cocktail" },
    ]

    const spaceTypeOptions = [
        { id: 12001, name: "Outdoor Space" },
        { id: 12002, name: "Conference room" },
        { id: 12003, name: "Garden" },
        { id: 12004, name: "Rooftop" },
        { id: 12005, name: "Hall" },
        { id: 12006, name: "Studio" },
        { id: 12007, name: "Coworking / Event Hybrid" }
    ]
    
    const mutation = useMutation(
        (propertyData) => updateProperty(externalId, propertyData, token),
        {
            onSuccess: (data) => {
                if(data.success === true) {
                    navigate(`/dashboard/properties/${data?.data.externalId}/0`);
                    setLoading(false)
                }else {
                    setLoading(true)
                }
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

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

    const data = properties?.data
    let spaceTypeData = []
    let seatingData = []

    data?.propertySpaceTypes?.map((space) => (
        spaceTypeData.push(space.spaceId.toString())
    ))

    data?.propertySeating?.map((seating) => (
        seatingData.push(seating.id.toString())
    ))

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            propertyTitle: data?.title,
            propertyType: data?.propertyType,
            baseProperty: data?.base,
            marketType: data?.marketType,
            isWholeProperty: true,
            stories: data?.stories,
            furnish: data?.furnish,
            numberOfBedrooms: data?.numberOfBedrooms,
            kitchen: data?.kitchen,
            numberOfToilet: data?.numberOfToilet,
            numberOfBathrooms: data?.numberOfBath,
            numberOfPlot: data?.numberOfPlots,
            landDimension: data?.landDimension,
            landSizeUnit: data?.landSizeMeasurement,
            zoningType: data?.zoning,
            topography: data?.topography,
            partition: false,
            toiletType: data?.toiletType === "private" ? true : false,
            bathType: data?.bathType === "private" ? 1 : 0,
            serviced: data?.serviced,
            indenture: data?.hasIndenture,
            spaceTypes : spaceTypeData,
            seatingStyle: data?.isSeatingStyle,
            areaSize: data?.areaSize,
            capacity: data?.capacity,
            seatingStyleIds: seatingData
        },
        enableReinitialize: true,
        validationSchema: PropertyScheme,
        onSubmit,
    })

    console.log(values.toiletType)

    return (
        <>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-10">
                <div className="bg-bg-color text-xs font-medium text-blue-100 py-[2px] text-center leading-none rounded-full" style={{ width: "15%" }}>15%</div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="font-semibold text-gray-900 text-xl">Property Information</h2>
                <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
                <br />
                {
                    properties ? (
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                                <InputField
                                    label="Property Title"
                                    id="propertyTitle"
                                    name="propertyTitle"
                                    type="text"
                                    placeholder="Property Name"
                                    value={values.propertyTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.propertyTitle}
                                />
                                <SelectField
                                    label="Property Type"
                                    id="propertyType"
                                    name="propertyType"
                                    value={values.propertyType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    options={[
                                        { value: "", label: "--Select--" },
                                        { value: "Room", label: "Room" },
                                        { value: "Apartment", label: "Apartment" },
                                        { value: "Off The Plan", label: "Off The Plan" },
                                        { value: "Land", label: "Land" },
                                        { value: "House", label: "House" },
                                        { value: "Office Space", label: "Office Space" },
                                        { value: "Event Space", label: "Event Space" },
                                    ]}
                                    error={errors.propertyType}
                                />
                            </div>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
                                <SelectField
                                    label="Base Property"
                                    id="baseProperty"
                                    name="baseProperty"
                                    value={values.baseProperty}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    options={getBasePropertyOptions(values.propertyType)}
                                    error={errors.baseProperty}
                                />
                                {values.propertyType === "Event Space" ? (
                                    <>
                                        <InputField
                                            label="Total Area Size"
                                            id="areaSize"
                                            name="areaSize"
                                            type="text"
                                            placeholder="Total Area Size"
                                            value={values.areaSize}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.areaSize}
                                        />
                                        <InputField
                                            label="Capacity"
                                            id="capacity"
                                            name="capacity"
                                            type="text"
                                            placeholder="Capacity"
                                            value={values.capacity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.capacity}
                                        />
                                    </>
                                ) : (
                                    <SelectField
                                        label="What would you like to do with your property?"
                                        id="marketType"
                                        name="marketType"
                                        value={values.marketType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        options={getMarketTypeOptions(values.propertyType)}
                                        error={errors.marketType}
                                    />
                                )}

                                {
                                    values.propertyType === "Off The Plan" || values.propertyType === "Land" || values.marketType === "Sale"
                                    ? (
                                        ""
                                    ) : (
                                        <>
                                            <SelectField
                                                label="Stories"
                                                id="stories"
                                                name="stories"
                                                value={values.stories}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                options={[
                                                    { value: "", label: "--Select--" },
                                                    { value: "Single Family", label: "Single Family" },
                                                    { value: "Mixed Family", label: "Mixed Family" }
                                                ]}
                                                error={errors.stories}
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <hr />
                            <br /><br />
                            {renderAdditionalFields(values, handleChange, handleBlur, errors, seatStyleOptions, spaceTypeOptions)}
                            <div className="flex xl:items-end xl:justify-end lg:items-end lg:justify-end items-center justify-center">
                                <div className="row flex">
                                    <button
                                        className="rounded-md w-full rounded-l-none bg-bg-color py-3 px-14 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        "Loading!!!"
                    )
                }
            </div>
        </>
    );
};

function getBasePropertyOptions(propertyType) {
    if (propertyType === "Land") {
        return [{ value: "Land", label: "Land" }];
    } else if (propertyType === "Event Space") {
        return [
            { value: "Outdoor Space", label: "Outdoor Space" },
            { value: "Storey Building", label: "Storey Building" },
            { value: "House", label: "House" },
        ];
    } else {
        return [
            { value: "Storey Building", label: "Storey Building" },
            { value: "House", label: "House" },
        ];
    }
}

function getMarketTypeOptions(propertyType) {
    if (propertyType === "Off The Plan" || propertyType === "Land") {
        return [
            { value: "Sale", label: "Sale" },
            ...(propertyType === "Land" ? [{ value: "Long Lease", label: "Long Lease" }] : []),
        ];
    } else if (propertyType === "Office Space") {
        return [
            { value: "Rent", label: "Rent" },
            { value: "Sale", label: "Sale" },
            { value: "Long Lease", label: "Long Lease" },
        ];
    } else if (propertyType === "Room" || propertyType === "Apartment") {
        return [
            { value: "Rent", label: "Rent" },
            { value: "Sale", label: "Sale" },
            ...(propertyType === "Apartment" ? [{ value: "Long Lease", label: "Long Lease" }] : []),
            { value: "Short Stay", label: "Short Stay" },
        ];
    } else {
        return [
            { value: "Rent", label: "Rent" },
            { value: "Sale", label: "Sale" },
            ...(propertyType === "House" ? [{ value: "Long Lease", label: "Long Lease" }] : []),
            { value: "Short Stay", label: "Short Stay" },
            { value: "Auction", label: "Auction" },
        ];
    }
}

function renderAdditionalFields(values, handleChange, handleBlur, errors, seatStyleOptions) {
    // Add logic to render additional fields based on property type
    if (values.propertyType === "Land") {
        return (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                <InputField
                    label="Number of Plots"
                    id="numberOfPlot"
                    name="numberOfPlot"
                    type="text"
                    placeholder="Number of Plots"
                    value={values.numberOfPlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.numberOfPlot}
                />
                <InputField
                    label="Land Dimension"
                    id="landDimension"
                    name="landDimension"
                    type="text"
                    placeholder="Land Dimension"
                    value={values.landDimension}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.landDimension}
                />
                <SelectField
                    label="Land Size Unit"
                    id="landSizeUnit"
                    name="landSizeUnit"
                    value={values.landSizeUnit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                        { value: "", label: "--Select--" },
                        { value: "Acres", label: "Acres" },
                        { value: "Hectares", label: "Hectares" },
                        { value: "Square Feet", label: "Square Feet" },
                    ]}
                    error={errors.landSizeUnit}
                />
                <InputField
                    label="Zoning Type"
                    id="zoningType"
                    name="zoningType"
                    type="text"
                    placeholder="Zoning Type"
                    value={values.zoningType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.zoningType}
                />
                <InputField
                    label="Topography"
                    id="topography"
                    name="topography"
                    type="text"
                    placeholder="Topography"
                    value={values.topography}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.topography}
                />
                <SelectField
                    label="Indenture"
                    id="indenture"
                    name="indenture"
                    value={values.indenture}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                    ]}
                    error={errors.indenture}
                />
            </div>
        );
    } else if (values.propertyType === "House" || values.propertyType === "Apartment") {
        return (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                <SelectField
                    label="Furnish"
                    id="furnish"
                    name="furnish"
                    value={values.furnish}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                        { value: '', label: "--Select--"},
                        { value: 'Fully Furnished', label: "Fully furnished" },
                        { value: 'Partially Furnished', label: "Partially furnished" },
                        { value: 'Not Furnished', label: "Not furnished" },
                    ]}
                    error={errors.furnish}
                />

                <InputField
                    label="Number of Bedrooms"
                    id="numberOfBedrooms"
                    name="numberOfBedrooms"
                    type="text"
                    placeholder="Number of Bedrooms"
                    value={values.numberOfBedrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.numberOfBedrooms}
                />
                <InputField
                    label="Number of Bathrooms"
                    id="numberOfBathrooms"
                    name="numberOfBathrooms"
                    type="text"
                    placeholder="Number of Bathrooms"
                    value={values.numberOfBathrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.numberOfBathrooms}
                />
                <InputField
                    label="Number of Toilets"
                    id="numberOfToilet"
                    name="numberOfToilet"
                    type="text"
                    placeholder="Number of Toilets"
                    value={values.numberOfToilet}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.numberOfToilet}
                />
                
                <SelectField
                    label="Kitchen"
                    id="kitchen"
                    name="kitchen"
                    value={values.kitchen}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                        { value: '', label: "--Select--" },
                        { value: 'Private', label: "Private" },
                        { value: 'Shared', label: "Shared" },
                    ]}
                    error={errors.kitchen}
                />
            </div>
        );
    } else if (values.propertyType === "Event Space") {
        return (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
                
                <SelectField
                    label="Seating Style"
                    id="seatingStyleIds"
                    name="seatingStyleIds"
                    value={values.seatingStyleIds}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={seatStyleOptions.map((option) => ({
                        value: option.id.toString(),
                        label: option.name,
                    }))}
                    error={errors.seatingStyleIds}
                    isMulti
                />
            </div>
        );
    }
    return null;
}

Property.propTypes = {
    externalId: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
};
export default Property;