import { Link } from "react-router-dom";
import PropertyCard from "../pages/properties/PropertyCard";
import PropertySlider from "./properties/propertySlider";
import PropertyMobile from '../cards/PropertyCard';

export default function  PropertyType({title, url, properties, w, ads, cleaning}) {
    const propertieslength = properties?.length
    return(
        <>
            <div className='relative w-full h-8 container mx-auto text-bg-color'>
                <div className='absolute xl:top-10 lg:top-4 flex items-center h-full '>
                    <h2 className='text-2xl font-semibold mb-4 text-black sm:ml-3'>
                        <span className='featured-homes'>
                            { title }
                        </span>
                    </h2>
                </div>
            </div>

            { w <= 789 || w <= 810 ?
                properties?.length <= 2 ? (
                    <div className="vibTech mt-12">
                        <div className="grid gap-1 grid-cols-2 ml-2 relative bottom-10">
                            {
                                properties?.map((property, index) => (
                                    <>
                                        <div className="container mx-auto property-slider">
                                            <PropertyMobile key={property.id} property={property} numberOfProperty={properties?.length} width={w}/> 
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="row property-slider relative bottom-10">
                        <PropertySlider properties={properties} speed={1500} delay={2500} numberOfProperty={properties?.length}/>
                        <span className="flex justify-end items-end mr-1.5 -mt-8">
                            <Link className="px-3 py-2 text-xs font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800" to={`/properties/${url}/type`}>view all</Link>
                        </span>
                    </div>
                )
            :
                <>
                    {
                        ads === 1 ? (
                            <>
                                <div className="container mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/4">
                                            <img src={cleaning} className="w-full h-[833px] rounded-md relative bottom-3"  />
                                        </div>
                                        <div className="w-3/4 p-4">
                                            <div className={`container grid xl:grid-cols-3 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8`}>
                                                {properties === null ? "" : 
                                                    <>
                                                        {
                                                            (
                                                                properties?.map((property) => (
                                                                    <PropertyCard key={property.id} property={property} />
                                                                ))
                                                            )
                                                        }
                                                        
                                                        {
                                                            propertieslength > 3 && (
                                                                <div className={`absolute z-30 right-0 -bottom-[480px] hidden xl:flex lg:flex items-center h-full`}>
                                                                <Link
                                                                    to={`/properties/${url}/type`}
                                                                    className='text-bg-color rounded-xl border border-bg-color px-8 py-1 text-sm font-josefin-sans hover:bg-bg-color hover:text-white'>
                                                                    view more
                                                                </Link>
                                                            </div>
                                                            )
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        :
                        ads === 3 ? (
                            <>
                                <div className="container mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8">
                                    <div className="flex items-center justify-center">
                                        <div className="w-3/4 p-4">
                                            <div className={`container grid xl:grid-cols-3 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8`}>
                                                {properties === null ? "" : 
                                                    <>
                                                        {
                                                            (
                                                                properties?.slice(0, 6).map((property) => (
                                                                    <PropertyCard key={property.id} property={property} />
                                                                ))
                                                            )
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div className="w-1/4">
                                            <img src={cleaning} className="w-full h-[833px] rounded-md relative bottom-3"  />
                                        </div>
                                    </div>

                                    <div className="container grid xl:grid-cols-4 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-12 xl:left-3 lg:left-3 xl:-mt-12 lg:bottom-8">
                                        {properties === null ? "" : 
                                            <>
                                                {
                                                    (
                                                        properties?.slice(6, 11).map((property) => (
                                                            <PropertyCard key={property.id} property={property} />
                                                        ))
                                                    )
                                                }
                                            </>
                                        }

                                        {
                                            propertieslength > 3 && (
                                                <div className={`absolute z-30 right-0 -bottom-[260px] hidden xl:flex lg:flex items-center h-full`}>
                                                    <Link
                                                        to={`/properties/${url}/type`}
                                                        className='text-bg-color rounded-xl border border-bg-color px-8 py-1 text-sm font-josefin-sans hover:bg-bg-color hover:text-white'>
                                                        view more
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ) :
                        ads === 4 ? (
                            <>
                                <div className="container grid xl:grid-cols-4 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:-left-3 lg:-left-3">
                                    {properties === null ? "" : 
                                        <>
                                            {
                                                (
                                                    properties?.slice(0, 4).map((property) => (
                                                        <PropertyCard key={property.id} property={property} />
                                                    ))
                                                )
                                            }
                                        </>
                                    }
                                </div>
                                <div className="container mx-auto py-8 xl:relative lg:relative xl:bottom-20 lg:bottom-20">
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/4">
                                            <img src={cleaning} className="w-full h-[833px] rounded-md relative bottom-3"  />
                                        </div>
                                        <div className="w-3/4 p-4">
                                            <div className={`container grid xl:grid-cols-3 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8`}>
                                                {properties === null ? "" : 
                                                    <>
                                                        {
                                                            (
                                                                properties?.slice(4, 10).map((property) => (
                                                                    <PropertyCard key={property.id} property={property} />
                                                                ))
                                                            )
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container grid xl:grid-cols-4 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-16 lg:bottom-16 xl:-left-3 lg:-left-3 xl:-mt-12 lg:-mt-12">
                                        {properties === null ? "" : 
                                            <>
                                                {
                                                    (
                                                        properties?.slice(10, 15).map((property) => (
                                                            <PropertyCard key={property.id} property={property} />
                                                        ))
                                                    )
                                                }
                                            </>
                                        }

                                        {
                                            propertieslength > 3 && (
                                                <div className={`absolute z-30 right-0 -bottom-[260px] hidden xl:flex lg:flex items-center h-full`}>
                                                    <Link
                                                        to={`/properties/${url}/type`}
                                                        className='text-bg-color rounded-xl border border-bg-color px-8 py-1 text-sm font-josefin-sans hover:bg-bg-color hover:text-white'>
                                                        view more
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ) : ads === 5 ? (
                            <>
                                <div className="container mx-auto py-8 xl:relative lg:relative right-8 -mt-7">
                                    <div className="flex items-center justify-center">
                                        <div className="w-3/4 p-4">
                                            <div className={`container grid xl:grid-cols-3 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8`}>
                                                {properties === null ? "" : 
                                                    <>
                                                        {
                                                            (
                                                                properties?.slice(0, 6).map((property) => (
                                                                    <PropertyCard key={property.id} property={property} />
                                                                ))
                                                            )
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div className="w-1/4">
                                            <img src={cleaning} className="w-full h-[833px] rounded-md relative bottom-3"  />
                                        </div>
                                    </div>

                                    <div className="container grid xl:grid-cols-4 xl:gap-[1px] md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-16 lg:bottom-16 xl:left-3 lg:left-3 xl:-mt-12 lg:-mt-12">
                                        {properties === null ? "" : 
                                            <>
                                                {
                                                    (
                                                        properties?.slice(6, 15).map((property) => (
                                                            <PropertyCard key={property.id} property={property} />
                                                        ))
                                                    )
                                                }
                                            </>
                                        }

                                        {
                                            propertieslength > 3 && (
                                                <div className={`absolute z-30 -bottom-[480px] right-3 hidden xl:flex lg:flex items-center h-full`}>
                                                    <Link
                                                        to={`/properties/${url}/type`}
                                                        className='text-bg-color rounded-xl border border-bg-color px-8 py-1 text-sm font-josefin-sans hover:bg-bg-color hover:text-white'>
                                                        view more
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ) 
                        : (
                            <>
                                <div className={`container grid xl:grid-cols-4 xl:gap-3 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6 mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8`}>
                                    {properties === null ? "" : 
                                        <>
                                            {
                                                (
                                                    properties?.map((property) => (
                                                        <PropertyCard key={property.id} property={property} />
                                                        ))
                                                    )
                                            }
                                            {
                                                propertieslength > 4 && (
                                                    <div className={`absolute z-30 right-0 ${ads === 2 ? '-bottom-[710px]': '-bottom-[480px]'} hidden xl:flex lg:flex items-center h-full`}>
                                                    <Link
                                                        to={`/properties/${url}/type`}
                                                        className='text-bg-color rounded-xl border border-bg-color px-8 py-1 text-sm font-josefin-sans hover:bg-bg-color hover:text-white'>
                                                        view more
                                                    </Link>
                                                </div>
                                                )
                                            }   
                                        </>
                                    }
                                </div>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}