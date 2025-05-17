import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicMetaTagComponent from '../../cards/helmet/dynamicTags';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropertySearchBar from '../properties/PropertySearchBar';
import PropertyFilter from '../properties/filters/FiltersSearchBars';
import { filterEvents } from '../../../utils/stateQueries';
import PropertyCard from '../properties/PropertyCard';
import PropertyMobileCard from '../../cards/PropertyCard';
import cleaning from '../../../assets/images/cleaning.jpg'
import plumbing from '../../../assets/images/plumbing.jpg'

function EventListing() {
    const { id } = useParams();
    const [hostContact, setHostContact] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { data: property } = filterEvents(id);
    
    let w = window.innerWidth
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleHostContact = () => {
        setHostContact(!hostContact)
    }
    
    const handleCopy = async () => {
        try {
            const text = window.location.href;
            await navigator.clipboard.writeText(text);
            toast.success('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy text');
        }
    };

    console.log(property)

    return (
        <div>
			<section className="rounded-xl dark:bg-gray-900 mb-6">
    			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
					<div className='flex flex-col sm:flex-row sm:items-center mt-12 sm:space-x-4 -mb-10'>
						{/* Wrapper for Search and Filters */}
						<div className='flex flex-1'>
							{/* Search Bar */}
							<div className='flex-1'>
								<PropertySearchBar
								/>
							</div>

							{/* Filters: Hidden on mobile, visible on desktop */}
							<div className='hidden sm:flex flex-1 justify-end '>
								
							</div>

							{/* Hamburger Icon for Mobile */}
							<button
								className='sm:hidden text-gray-600 hover:text-gray-900 focus:outline-none ml-4'>
								{isOpen ? (
									<FaTimes size={24} />
								) : (
									<FaBars size={24} className='bg-bg-color text-white ' />
								)}
							</button>
						</div>
					</div>
				</div>
			</section>

            <section className='mb-18 -mt-5' style={{ fontFamily: '"josephin-sans"' }}>
                <div className='relative w-full h-8 container mx-auto text-bg-color mb-4 xl:-mb-7 lg:mb-7'>
                    <div className='absolute left-2 top-4 flex items-center h-full '>
                        <h2 className='text-base xs:text-2xl sm:text-2xl md:text-xl lg:text-2xl xl:text-1xl text-text-color'>
                            All {id} locations
                        </h2>
                    </div>
                    <div className='absolute right-0 top-0 hidden xl:flex lg:flex items-center h-full '>
                        
                    </div>
                </div>
                {property?.properties?.data.length === 0 ? (
					<div className='flex justify-center items-center'>
						<h1 className='text-center flex justify-center items-center text-2xl font-bold mt-10'>
							No location listed
						</h1>
					</div>
				) : (
                    <div className="vibTech">
                        { w <= 789 || w <= 810 ?
                            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 ml-4 mb-12">
                                {property?.properties?.data.map((property) => (
                                    <PropertyMobileCard key={property.id} property={property} />
                                ))}
                            </div>
                        :
							<div className="container mx-auto py-8 xl:relative lg:relative xl:bottom-8 lg:bottom-8">
								<div className="flex items-center justify-center">
									<div className="w-1/4">
										<img src={cleaning} className="w-[25%] h-[853px] rounded-md absolute top-32"  />
										<img src={plumbing} className="w-[25%] h-[863px] rounded-md absolute top-[1050px]"  />
										<img src={cleaning} className="w-[25%] h-[385px] rounded-md absolute top-[1980px]"  />
										<img src={cleaning} className="w-[25%] h-[385px] rounded-md absolute top-[2440px]"  />
									</div>
									<div className="w-3/4 p-4">
										<div className='container grid xl:grid-cols-3 xl:gap-4 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6  mx-auto py-8 '>
											{property?.properties?.data.map((property) => (
												<PropertyCard key={property.id} property={property} />
											))}
										</div>
									</div>
								</div>
							</div>
                        }
                    </div>
				)}
            </section>
        </div>
    );
}

export default EventListing;