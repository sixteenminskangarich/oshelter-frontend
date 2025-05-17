import { FaBed, FaBath, FaToilet , FaDotCircle } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "flowbite-react";
import { Link } from 'react-router-dom';
import { MdLabel, MdOutlineReduceCapacity } from "react-icons/md";
import { useSelector } from 'react-redux';
import PropertyWishListIcon from './PropertyWishListIcon';
import { GrDocumentSound } from "react-icons/gr";
import PropTypes from 'prop-types';

const PropertyMobile = ({ property, numberOfProperty }) => {
	let image;
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    let duration = ""

    if(property?.marketType === "Short Stay") {
        duration = "| per night"
    } else if(property?.marketType === "Sale") {
        duration = ""
    }
    else {
        duration = "| month"
    }

    const formatNumberWithCommas = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	return (
        <div className="-mt-12">
            <span className="relative bottom-1 right-0.5">
                <PropertyWishListIcon token={token} user={user} property_id={property.externalId} numberOfProperty={numberOfProperty} />
            </span>

            <Link to={`/properties/detail-property/${property.externalId}`} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 mobile-screen-property-card hover:scale-105 duration-200 ease-in-out hover:border-red-500 hover:border-2" style={{ fontFamily: '"Josefin Sans",sans-serif', fontStyle: 'normal' }}>
                <div className="m-2.5">
                    <img src={property?.featuredPropertyPhoto.url}  alt='Property' className='mb-image rounded-md' style={{ height: '130px' }}/>
                    <div className="absolute top-5 right-4 flex flex-wrap gap-2 bg-bg-color rounded-xl mx-auto">
                        <div className="relative top-2 left-2.5 w-2 h-2 bg-red-400 rounded-full -mt-0.5" style={{ backgroundColor:'white' }}></div>
                        <span className='font-medium mt-0.5 px-1.5 text-xs text-white'>{property.propertyType}</span>
                    </div>
                </div>

                <div className="p-4">
                    <h6 className="relative bottom-5 mb-10 text-slate-800 text-base font-semibold" style={{ fontSize: '12px' }}>
                        {property?.title.substring(0,20)} <br />
                        <span className="font-medium border border-bg-color text-bg-color rounded-lg mx-auto px-4 py-0.5" style={{ fontSize: '11px' }}>
                            For {property.propertyType === "Event Space" ? "Rent" : property?.marketType}
                        </span>
                    </h6>
                    <p className="relative bottom-[60px] text-slate-600 leading-normal font-light">
                        <b className='font-semibold text-xs' style={{ color: '#488cf5' }}>{property?.currency}{formatNumberWithCommas(property?.amount) || 0}</b> {duration}
                    </p>

                    <p className="relative flex bottom-[55px] text-slate-600 leading-normal font-light">
                        <FaLocationDot  className='relative mr-1 top-1 text-xs' style={{ color: '#488cf5' }}/>
                        <span className="text-xs">{property.location.substring(0,30)}</span>    
                    </p>
                    <p className="relative bottom-12 text-slate-600 mb-2 leading-normal font-light items-center property-amentity">
                        <hr className="w-48 h-0.5 mx-auto my-2 mt-4 bg-gray border-1 rounded md:my-10 dark:bg-gray property-lined"></hr>
                        <div className="flex items-center text-xs property-amentity-icons">
                            {
                                property?.propertyType === "Event Space" ? (
                                    <>
                                        <div className="flex" style={{ fontSize: '10px' }}>
                                            <div className='mr-2 ml-4'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <MdOutlineReduceCapacity /> {property.capacity}
                                                </p>
                                            </div>

                                            <div className='mr-2'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    NR.&nbsp; <span className={`text-xs ${property?.IsNoise === true ? ' text-bg-color' : 'border-red-800 text-red-800'} rounded-full px-0.5 py-0.2 text-xs`}>{ property?.IsNoise === true ? 'Yes' : 'No'}</span>
                                                </p>
                                            </div>

                                            <div className='mr-2'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    AN&nbsp; <span className={`text-xs ${property?.isAdvancedNotice === true ? 'text-bg-color' : 'text-red-800'} rounded-full px-0.5 py-0.2  text-xs`}>{ property?.isAdvancedNotice === true ? 'Yes' : 'No'}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    property?.base === "Land" ? (
                                        <>
                                            <div className="flex" style={{ fontSize: '10px' }}>
                                                <div className='mr-2 ml-4'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Ind <span className="ml-1 text-[9px] border border-bg-color text-bg-color rounded-full px-1">Yes</span>
                                                    </p>
                                                </div>
    
                                                <div className='mr-2'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Tit <span className="ml-1 text-[9px] border border-bg-color text-bg-color rounded-full px-1">Yes</span>
                                                    </p>
                                                </div>
    
                                                <div className='mr-2'>
                                                    <p className="relative flex text-slate-600 leading-normal font-light">
                                                        Ser <span className="ml-1 text-[9px] border border-bg-color text-bg-color rounded-full px-1">Yes</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    ) 
                                    
                                    : (
                                        <>
                                            <div className='mr-12 ml-3'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaBed className='relative mr-0.5 top-1 text-bg-color'/>
                                                    <span>{property?.numberOfBedrooms}</span>
                                                </p>
                                            </div>
    
                                            <div className='mr-8 -ml-2'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaBath className='relative mr-0.5 top-1 text-bg-color'/>
                                                    <span>{property?.numberOfBath }</span>
                                                </p>
                                            </div>
                                            <div className='mr-3 ml-3'>
                                                <p className="relative flex text-slate-600 leading-normal font-light">
                                                    <FaToilet  className='relative mr-0.5 top-1 text-bg-color'/>
                                                    <span>{property.numberOfToilet  }</span>
                                                </p>
                                            </div>
                                        </>
                                    ) 
                                )
                            } 
                        </div>
                    </p>
                    
                </div>
            </Link>
        </div>
	);
};
PropertyMobile.propTypes = {
    property: PropTypes.shape({
        externalId: PropTypes.string.isRequired,
        marketType: PropTypes.string,
        featuredPropertyPhoto: PropTypes.shape({
            url: PropTypes.string
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
        numberOfToilet: PropTypes.number
    }).isRequired,
    numberOfProperty: PropTypes.number.isRequired
};

export default PropertyMobile;