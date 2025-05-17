import { useRef, useState } from "react";
import preview from '../../../../assets/images/property.png'
import { ChevronDownIcon } from "@heroicons/react/outline";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io5";

export default function ThirdStage({ values, handleChange, handleBlur, errors, setFieldValue }) {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file)
        setImage(url)
        setFieldValue("photo", event.target.files[0])
    }
    return(
        <>
			<div className="flex w-full flex-col pb-8 -mt-16 xl:-mt-10 lg:-mt-10">
                <div className="pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Company Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <div className="-mt-12 xl:-mt-7 lg:-mt-7">
                                <div>
                                    <span className="flex justify-start items-start">
                                        <label className="block text-sm  mt-5 p-6 bg-white border border-gray-200 rounded-lg">
                                            <span className="text-gray-700 text-xl mb-3">Upload your logo</span> 
                                            <div className="mb-5 mt-5 flex justify-center items-center">
                                                <div>
                                                    {
                                                        image ? (
                                                            <img src={image} alt="Preview Image" className="h-[100px] w-[120px] rounded-lg"/>
                                                        ): (
                                                            <img src={preview} alt="Preview" className="h-[50px] w-full rounded-lg"/>
                                                        )
                                                    }
                                                    <input type="file" className="file" name="photo" ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
                                                </div>
                                                
                                            </div>
                                        </label>
                                    </span>
                                </div>

                                <span className="text-xs text-red-800">{ errors.photo}</span>
                            </div>
                        </div>

                        <div className="col-span-3 xl:col-span-full -mt-6">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Type of development 
                            </label>
                            <div className="mt-2 w-full">
                                <select
                                    id="country"
                                    name="development"
                                    value={values.development}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="country-name"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-50 border border-gray-300 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Residential & Commercial</option>
                                </select>
                            </div>
                            <span className="text-xs text-red-800">{ errors.development}</span>
                        </div>

                        <div className="col-span-3 xl:col-span-full lg:col-span-full -mt-5">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Website URL
                            </label>
                            <div className="mt-2">
                                <input
                                    id="street-address"
                                    name="website"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    autoComplete="street-address"
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>


                        <div className="col-span-3 -mt-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FaInstagram />
                                </div>
                                <input 
                                    type="url" 
                                    id="default-search" 
                                    name="instagram"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.instagram}
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Instagram" 
                                />
                            </div>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FaFacebookSquare />
                                </div>
                                <input 
                                    type="url" 
                                    id="default-search" 
                                    name="facebook"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.facebook}
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Facebook" 
                                />
                            </div>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <AiFillTikTok />
                                </div>
                                <input 
                                    type="url" 
                                    id="default-search" 
                                    name="tiktok"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tiktok}
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Tiktok" 
                                />
                            </div>
                        </div>

                        <div className="col-span-3 -mt-5 -mb-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoLogoLinkedin />
                                </div>
                                <input 
                                    type="url" 
                                    id="default-search" 
                                    name="linkedin"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.linkedin}
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Linkedin" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
			</div>
        </>
    )
}