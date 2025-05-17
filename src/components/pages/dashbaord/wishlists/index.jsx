import { useSelector } from "react-redux";
import { wishList } from "../../../../utils/stateQueries";
import Sidebar from "../../../layouts/SideBar";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { addWishListProperty } from "../../../../utils/request";

export default function Wishlists() {
    const token = useSelector((state) => state.auth.token);
    const { data: properties } = wishList(token);
    let w = window.innerWidth;
    const wishlists = properties?.data

    async function handleAddWishLIst (event)  {
        const externalId = event.currentTarget.value;
        try {
            const response = await addWishListProperty(externalId, token)

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(wishlists)
    return(
        <div className='flex font-josefin-sans'>
			<Sidebar />
            {
                wishlists ? (
                    <div className='p-4 sm:ml-64 flex-1 mt-16'>
                        
                    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">List of items in wishlist</h3>
                        <div className="relative overflow-x-auto">
                            {
                                w <= 789 || w <= 810 ?
                                    (
                                        <>
                                            <div className="row h-[580px]">
                                                <div className="flow-root mb-4">
                                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {
                                                            wishlists?.map((property, index) => (
                                                                <>
                                                                    <li className="py-6 mt-2 sm:py-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                        <div className="flex items-center">
                                                                            <div className="flex-shrink-0 ml-3">
                                                                                <img className="w-20 h-20 rounded-md" src={ property?.property.featuredPropertyPhoto?.url } alt="Neil image" />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0 ms-4">
                                                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                                    {property?.property.title} 
                                                                                </p>
                                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                                    <span className='flex rounded-full tracking-wider property-type' style={{ marginRight: '50px' }}>
                                                                                        <div className="relative top-1 w-3 h-3 bg-red-400 rounded-full mx-1 property-badge" style={{ backgroundColor:'#283890' }}></div>
                                                                                        <span className='font-medium' style={{ color: 'gray', fontSize: '12px' }}>{property?.property.propertyType}</span>
                                                                                    </span>
                                                                                </p>
                                                                                <br/>
                                                                                <Link to={`/properties/detail-property/${property?.property.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                                    view
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    )
                                :
                                    (
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        IMAGE
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        DETAILS
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        ACTION
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    wishlists?.map((property, index) => (
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td className="px-6 py-4 items-center">
                                                                <img className="object-cover h-32 w-32 rounded-2xl" src={ property?.property.featuredPropertyPhoto?.url } />
                                                            </td>
                                                            <td className="mr-4 py-4">
                                                                {property?.property.title}<br />
                                                                <div className="flex items-center space-x-2 font-thin">
                                                                    <FaLocationDot  className='relative top-0 text-xs' style={{ color: '#488cf5' }}/>
                                                                    <span className="ml-3">
                                                                        {property?.property.location}
                                                                    </span>
                                                                </div>
                                                                <span className="mt-1">{property?.property.base}</span><br />
                                                                <span className="bg-pink-800 text-white text-xs me-2 px-3 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300 font-thin">For {property?.property.marketType}</span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <Link to={`/properties/detail-property/${property?.property.externalId}`} className="bg-transparent hover:bg-blue-500 text-blue-700 text-xs hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                                                    view
                                                                </Link>&nbsp;
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No property in your wishlists</p>
                )
            }
        </div>
	);
}