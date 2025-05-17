import { useRef, useState } from "react";
import preview from '../../../../assets/images/property.png'
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CiUser } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";

export default function FourthStage({ values, handleChange, handleBlur, errors, setFieldValue}) {
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
            <div className="flex w-full flex-col pb-8 xl:-mt-10 lg:-mt-10 -mt-16">
                <div className="pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Director's information</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <CiUser />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Name" 
                                    name="directorName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.directorName} 
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.directorName}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoCallOutline />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Phone number"
                                    name="directorMobile"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.directorMobile}
                                 />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.directorMobile}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MdOutlineMarkEmailUnread />
                                </div>
                                <input 
                                    type="email" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Email Address" 
                                    name="directorEmail"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.directorEmail}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.directorEmail}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FiMapPin />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Role" 
                                    name="directorRole"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.directorRole}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.directorRole}</p>
                        </div>

                        <div className="col-span-3 xl:col-span-full lg:col-span-full -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FiMapPin />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Resdiential Address" 
                                    name="directorAddress"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.directorAddress}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.directorAddress}</p>
                        </div>
                    </div>

                    <h2 className="text-base/7 font-semibold text-gray-900 mt-5">2 Director's information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <CiUser />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Name" 
                                    name="secondDirectorName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.secondDirectorName} 
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.secondDirectorName}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoCallOutline />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Phone number"
                                    name="secondDirectorMobile"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.secondDirectorMobile}
                                 />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.secondDirectorMobile}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MdOutlineMarkEmailUnread />
                                </div>
                                <input 
                                    type="email" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Email Address" 
                                    name="secondDirectorEmail"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.secondDirectorEmail}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.secondDirectorEmail}</p>
                        </div>

                        <div className="col-span-3 -mt-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FiMapPin />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Role" 
                                    name="secondDirectorRole"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.secondDirectorRole}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.secondDirectorRole}</p>
                        </div>

                        <div className="col-span-3 xl:col-span-full lg:col-span-full -mt-5 -mb-5">
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <FiMapPin />
                                </div>
                                <input 
                                    type="text" 
                                    id="default-search" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Resdiential Address" 
                                    name="secondDirectorAddress"
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    value={values.secondDirectorAddress}
                                />
                            </div>
                            <p className="text-xs text-red-800 mb-2">{errors.secondDirectorAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}