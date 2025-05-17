import PropertyMobileCard from '../../cards/PropertyCard';
import PropertyCard from '../../pages/properties/PropertyCard';

export default function SearchResults({ properties, text, w }) {
    return(
        <>
            <section className='mb-20' style={{ fontFamily: '"josephin-sans"' }}>
                <div className='relative w-full h-8 container mx-auto text-bg-color mb-4 xl:-mb-7 lg:mb-7'>
                    <div className='absolute left-2 top-4 flex items-center h-full '>
                        <h2 className='text-base xs:text-2xl sm:text-2xl md:text-xl lg:text-2xl xl:text-1xl text-text-color'>
                            All {text}  
                        </h2>
                    </div>
                    <div className='absolute right-0 top-0 hidden xl:flex lg:flex items-center h-full '>
                        
                    </div>
                </div>
                {properties?.properties?.data.length === 0 ? (
					<div className='flex justify-center items-center'>
						<h1 className='text-center flex justify-center items-center text-2xl font-bold mt-10'>
							No Properties listed
						</h1>
					</div>
				) : (
                    <div className="vibTech">
                        { w <= 789 || w <= 810 ?
                            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 ml-4 mb-12">
                                {properties?.properties?.data.map((property) => (
                                    <PropertyMobileCard key={property.id} property={property} />
                                ))}
                            </div>
                        :
                            <div className='container grid xl:grid-cols-4 xl:gap-4 md:grid-cols-3 md:gap-28 sm:grid-cols-2 sm:gap-6  mx-auto py-8 '>
                                {properties?.properties?.data.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        }
                    </div>
				)}
            </section>
        </>
    )
}