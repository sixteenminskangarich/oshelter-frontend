import { FaSearch } from "react-icons/fa";
import { useCategories } from "../../../../../hooks/propertiesqueries/propertyqueries";
import { useFormik } from "formik";

export default function SearchForProperty({ category }) {
    const { data: categories } = useCategories();
    const popularCategories = categories?.data?.categories?.data;

    const onSubmit = (values, actions) => {
        console.log(values)
    }
    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            categoryId: category,
            text: "", 
        },
        onSubmit,
        enableReinitialize: true,
    })

    let category_id = parseInt(category)
    return (
		<div>
			{/* <section className='bg-hero-color py-20 pt-20 mb-4 h-18 mt-18 flex items-center'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
					
				</div>
			</section> */}
			<section className="bg-hero-color dark:bg-gray-900 xl:mt-16 lg:mt-16">
    			<div className="xl:py-8 py-1 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <div className="">
                        <div className='p-4 pt-20'>
                            <div className='hidden max-w-7xl mx-auto flex-col lg:flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
                                <div className="relative -top-8" style={{ width: '100%' }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                                            <select id="countries" name="categoryId" onChange={handleChange} onBlur={handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option>Choose a category</option>
                                                {
                                                    popularCategories?.map((category) => (
                                                        <option value={category.id} selected={category.id === category_id ? true : false}>{ category.name }</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <input type="search" style={{ paddingLeft: '190px' }} 
                                            id="default-search" 
                                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Search for your favorite location..." 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="text"
                                            required 
                                        />
                                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <form className="max-w-md mx-auto lg:hidden sm:flex">   
                            <div className="relative -top-8">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a property..." required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <FaSearch
                                        size={20}
                                        color='#fff'
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
				</div>
			</section>
		</div>
	);
}