import { FaBed, FaBath, FaToilet } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "flowbite-react";
import { Link } from 'react-router-dom';
import { MdLabel } from "react-icons/md";
import { useSelector } from 'react-redux';
import PropertyWishListIcon from '../../cards/PropertyWishListIcon';
import PropTypes from 'prop-types';

const PropertyCard = ({ property }) => {
	const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    let duration = ""

    if(property?.marketType === "Short Stay") {
        duration = "| per night"
    } else if(property?.marketType === "Sale" || property?.marketType === "Long Lease") {
        duration = ""
    }
    else {
        duration = "| month"
    }

    const formatNumberWithCommas = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const formatNumberWithSuffix = (number) => {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + 'B';
        } else if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1) + 'M';
        } else if (number >= 1_000) {
            return (number / 1_000).toFixed(1) + 'K';
        } else {
            return number?.toString();
        }
    };

	return (
        <div className="">
            <PropertyWishListIcon token={token} user={user} property_id={property.externalId} />
            <Link to={`/properties/detail-property/${property.externalId}`} className="z-10 relative flex flex-col my-2 bg-white shadow-sm border border-slate-200 rounded-lg w-96 mobile-screen-property hover:scale-105 duration-200 ease-in-out hover:border-blue-500 hover:border-2 ">
                <div className="m-2.5">
                    <img src={property?.featuredPropertyPhoto.url}  alt='Property' className='mb-image rounded-md'/>
                    <div className="absolute top-4 right-4  flex flex-wrap gap-2">
                        <Badge color="indigo" icon={MdLabel} className='flex flex-wrap gap-2'>{property.propertyType === "Event Space" ? "Rent" : property?.marketType}&nbsp;</Badge>
                    </div>
                    
                    <span className='absolute flex rounded-full mx-3 tracking-wider right-4 property-type'>
                        <div className="relative top-1 w-3 h-3 bg-red-400 rounded-full mx-1 property-badge" style={{ backgroundColor:'#283890' }}></div>
                        <span className='font-medium' style={{ color: 'gray', fontSize: '12px' }}>{property.propertyType}</span>
                    </span>
                </div>
                <div className="p-4">
                    <h6 className="relative bottom-5 mb-10 text-slate-800 text-base font-semibold" style={{ fontSize: '14px' }}>
                        {property?.title.length >= 25 ? property?.title.substring(0,23)+'...' : property?.title }

                        {/* {
                            property?.base === "Land" && (
                                <>, <span className="relative text-bg-color rounded-full">family Land</span>
                                </>
                            )
                        } */}
                    </h6>

                    <p className="relative bottom-12 text-slate-600 leading-normal font-light">
                        <b className='font-semibold text-base' style={{ color: '#488cf5' }}>{property?.currency} {formatNumberWithCommas(property?.amount) || 0}</b> {duration}
                    </p>

                    <p className="relative flex bottom-10 text-slate-600 leading-normal font-light">
                        <FaLocationDot  className='relative mr-1 top-2 text-xs' style={{ color: '#488cf5' }}/>
                        <span className="mt-1">
                            {property?.location.length >= 40 ? property?.title.substring(0, 40)+'...' : property?.location }
                        </span>
                    </p>
                    <div className="relative lg:bottom-1/2 sm:bottom-12 text-slate-600 mb-2 leading-normal font-light text-center items-center property-amentity">
                        <hr className="property-line"/>
                        {
                            property?.propertyType === "Event Space" ? (
                                <>
                                    <div className="flex items-center xl:text-xs">
                                        <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                            <p className="relative flex text-slate-600 leading-normal font-light">
                                                Cap.&nbsp; {formatNumberWithSuffix(property?.capacity)}
                                            </p>
                                        </div>
                                        <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                            <p className="relative flex text-slate-600 leading-normal font-light">
                                                Noise Res.&nbsp; <span className={`border ${property?.IsNoise === true ? 'border-bg-color text-bg-color' : 'border-red-800 text-red-800'} rounded-full px-2 py-0.5 text-xs`}>{ property?.IsNoise === true ? 'Yes' : 'No'}</span>
                                            </p>
                                        </div>
                                        <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                            <p className="relative flex text-slate-600 leading-normal font-light">
                                                Adv Notice&nbsp; <span className={`border ${property?.isAdvancedNotice === true ? 'border-bg-color text-bg-color' : 'border-red-800 text-red-800'} rounded-full px-2 py-0.5  text-xs`}>{ property?.isAdvancedNotice === true ? 'Yes' : 'No'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                property?.base === "Land" ? (
                                    <>
                                        <div className="flex items-center xl:text-sm">
                                            <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    Indenture&nbsp; <span className="border border-bg-color rounded-full px-2 py-0.5 text-bg-color text-xs">Yes</span>
                                                </p>
                                            </div>
                                            <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    Title&nbsp; <span className="border border-bg-color rounded-full px-2 py-0.5 text-bg-color text-xs">Yes</span>
                                                </p>
                                            </div>
                                            <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    Serviced&nbsp; <span className="border border-red-800 rounded-full px-2 py-0.5 text-red-800 text-xs">No</span>
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center xl:text-sm">
                                            <div className='xl:mr-4 lg:mr-4 lg:ml-1 sm:mr-8 sm:ml-4'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaBed className='relative top-1' style={{ color: '#488cf5' }}/>&nbsp;
                                                    <span>{property?.numberOfBedrooms}bedrooms</span>
                                                </p>
                                            </div>
                                            <div className='xl:mr-2 lg:mr-3 lg:ml-1 sm:mr-6'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaBath className='relative top-1' style={{ color: '#488cf5' }}/>&nbsp;
                                                    <span>{property?.numberOfBath}bathrooms</span>
                                                </p>
                                            </div>
                                            <div className='lg:mr-12 sm:mr-1 xl:mr-2 xl:ml-2'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaToilet  className='relative top-1' style={{ color: '#488cf5' }}/>&nbsp;
                                                    <span>{property.numberOfToilet}toilets</span>
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )
                            )
                        }
                    </div>
                    
                </div>
            </Link>
        </div>
	);
};
PropertyCard.propTypes = {
    property: PropTypes.shape({
        externalId: PropTypes.string.isRequired,
        marketType: PropTypes.string,
        featuredPropertyPhoto: PropTypes.shape({
            url: PropTypes.string,
        }),
        propertyType: PropTypes.string,
        title: PropTypes.string,
        currency: PropTypes.string,
        amount: PropTypes.number,
        location: PropTypes.string,
        capacity: PropTypes.number,
        IsNoise: PropTypes.bool,
        isAdvancedNotice: PropTypes.bool,
        base: PropTypes.string,
        numberOfBedrooms: PropTypes.number,
        numberOfBath: PropTypes.number,
        numberOfToilet: PropTypes.number,
    }).isRequired,
};

export default PropertyCard;