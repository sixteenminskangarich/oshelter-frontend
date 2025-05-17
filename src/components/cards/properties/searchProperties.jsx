import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../../pages/properties/PropertyCard"
import PropertyMobile from "../PropertyCard"
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import { useFormik, useField } from "formik";
import { useMutation } from "react-query";
import { advancedSearchForProperties } from "../../../utils/request";
import { ImSpinner9 } from 'react-icons/im';

export default function SearchProperties() {
    let w = window.innerWidth;
    const router = useNavigate();
    const location = useLocation();
    const results = location.state?.results;
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({ saleType: '', price: '', propertyType: '', bed: '', bath: ''});

    const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilter((prevFilter) => ({
			...prevFilter,
			[name]: value,
		}));
		setCurrentPage(1); // Reset to the first page when filters change
	};

    const mutation = useMutation(
        (searchData) => advancedSearchForProperties(searchData),
        {
            onSuccess: (data) => {
                setLoading(false)
                router('/search-results', { state: { results: data?.data } });
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onSubmit = () => {
        setLoading(true)
        mutation.mutate(values)
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            location: '',
            type: '',
            minPrice: '',
            maxPrice: '',
            minBed: '',
            maxBed: '',
            minBath: '',
            maxBath: '',
            marketType: '',
            category: ''
        },
        onSubmit,
    })
    
    const toggleFilterMenu = () => {
		setIsOpen(!isOpen);
	};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return(
        <>
            <div className="xl:py-8 py-1 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <div className='flex flex-col sm:flex-row sm:items-center mt-24 sm:space-x-4 -mb-10'>
                    {/* Wrapper for Search and Filters */}
                    <div className='flex flex-1'>
                        {/* Search Bar */}
                        {/* Filters: Hidden on mobile, visible on desktop */}
                        <div className='hidden sm:flex flex-1 justify-end '>
                            <div className='flex flex-col w-full sm:flex-row sm:items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4'>
                                <input
                                    type='text'
                                    name="location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    disabled={loading}
                                    value={values.location}
                                    placeholder='Address, City, Neighborhood'
                                    className='w-[70px] p-3 mr-2 lg:w-w100 rounded-lg text-xs py-4 border border-gray-400 hover:border-gray-800 text-black focus:border-gray-800'
                                />
                                <select
                                    name='marketType'
                                    className='border sm:w-auto rounded-lg border-gray-400 text-xs py-4'
                                    style={{ width: '20%' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={loading}
                                    value={values.marketType}
                                    >
                                    <option value=''>Sale Type</option>
                                    <option value='sale'>For sale</option>
                                    <option value='rent'>Rent</option>
                                    <option value='short stay'>Short Stay</option>
                                </select>

                                <select
                                    name="minPrice"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={loading}
                                    value={values.minPrice}
                                    className='border w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
                                    style={{ width: '15%' }}
                                    
                                    >
                                    <option value=''>Price</option>
                                    {Array.from({ length: 50 }, (_, i) => (i + 1) * 200).map((price) => (
                                        <option key={price} value={price}>
                                            {price}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name='type'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.type}
                                    disabled={loading}
                                    className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
                                    style={{ width: '25%' }}
                                    >
                                    <option value=''>Property Type</option>
                                    <option value='house'>House</option>
                                    <option value='apartment'>Apartment</option>
                                    <option value='land'>Land</option>
                                    <option value='hostel'>Hostel</option>
                                    <option value='room'>Room</option>
                                </select>

                                <select
                                    name='minBed'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.minBed}
                                    disabled={loading}
                                    className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
                                    style={{ width: '20%' }}>
                                    <option value=''>Beds</option>
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((bed) => (
                                        <option key={bed} value={bed}>
                                            {bed}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name='minBath'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.minBath}
                                    disabled={loading}
                                    className='border p-2 w-full sm:w-auto rounded-lg border-gray-400 text-xs py-4'
                                    style={{ width: '20%' }}>
                                    <option value=''>Baths</option>
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((bath) => (
                                        <option key={bath} value={bath}>
                                            {bath}
                                        </option>
                                    ))}
                                </select>

                                <button 
                                    type="button" 
                                    onClick={onSubmit}
                                    disabled={loading}
                                    className={`px-6 py-2.5 flex text-white rounded-xl ${loading === true ? 'bg-blue-400' : 'bg-bg-color hover:bg-transparent hover:border hover:text-bg-color hover:border-bg-color'}`}>
                                        {
                                            loading === true ? (
                                                <>
                                                   <ImSpinner9 className="animate-spin mr-2 mt-1"/> finding
                                                </>
                                            ) : (
                                                <>
                                                    <RiMenuSearchLine className="mb-2 text-md mt-1.5 mr-2"/>
                                                    Search
                                                </>
                                            )
                                        }
                                </button>
                            </div>
                        </div>
                        {/* Hamburger Icon for Mobile */}
                        <button
                            className='sm:hidden text-gray-600 hover:text-gray-900 focus:outline-none ml-4'
                            onClick={toggleFilterMenu}>
                            {isOpen ? (
                                <FaTimes size={24} />
                            ) : (
                                <FaBars size={24} className='bg-bg-color text-white ' />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className='py-8 pt-10 sm:px-6 lg:px-8 -mt-10'>
                <div className='relative w-full h-8 container mx-auto text-bg-color'>
                    <div className='absolute xl:top-10 lg:top-4 flex items-center h-full '>
                        <h2 className='text-xl font-semibold mb-7 text-black sm:ml-3'>
                            Search Results: <span className="rounded-full bg-bg-color text-white px-2 py-1.5 text-xs">{results?.length}</span>
                        </h2>
                    </div>
                </div>
			    <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4'>
                    { w <= 789 || w <= 810 ?
                        <div className="vibTech">
                            <div className="grid gap-1 grid-cols-2 ml-2">
                                {
                                    results?.map((property, index) => (
                                        <>
                                            <div className="container mx-auto property-slider">
                                                <PropertyMobile key={property.id} property={property} />
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    :
                        <div className='container grid xl:grid-cols-4 xl:gap-4 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8'>
                            {results === null ? "" : 
                                (
                                    results?.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}