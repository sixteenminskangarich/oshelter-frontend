import { ChevronDoubleDownIcon, ChevronDownIcon } from "@heroicons/react/outline";

export default function SecondStage({ values, handleChange, handleSubmit, handleBlur, errors }) {
    return(
        <>
			<div className="flex w-full flex-col pb-8 -mt-10">
                <div className="pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Agent Information</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-7">
                        <div className="sm:col-span-3 xl:mt-0 lg:-mt-0 -mt-4">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Agent name
                            </label>
                            <div className="mt-1">
                                <input
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" 
                                    placeholder="Agent name"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.name }</span>
                        </div>

                        <div className="sm:col-span-3 xl:mt-0 lg:-mt-0 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                License number (if any)
                            </label>
                            <div className="mt-1">
                                <input
                                    name="license"
                                    value={values.license}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" 
                                    placeholder="License number"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.license }</span>
                        </div>

                        <div className="sm:col-span-full -mt-6">
                            <label htmlFor="country" className="block text-xs font-medium text-gray-900">
                                Year of experience 
                            </label>
                            <div className="mt-2 grid grid-cols-1 w-full">
                                <select
                                    id="country"
                                    name="yearsOfExperience"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.experience}
                                    autoComplete="country-name"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white border border-blue-300 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>1 - 3 years</option>
                                    <option>4 - 5 years</option>
                                    <option>6 or more</option>
                                </select>
                                <ChevronDoubleDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.yearsOfExperience }</span>
                        </div>

                        <div className="col-span-full -mt-6">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone-number"
                                    name="mobile"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    autoComplete="phone-number"
                                    className="block w-full rounded-xl bg-gray-50 border border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.mobile }</span>
                        </div>

                        <div className="sm:col-span-3 -mt-6">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Street Address
                            </label>
                            <div className="mt-1">
                                <input
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" 
                                    placeholder="Street Address"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.address }</span>
                        </div>

                        <div className="sm:col-span-3 -mt-6">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                GPS Address
                            </label>
                            <div className="mt-1">
                                <input
                                    name="gps"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="GPS Address"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.gps }</span>
                        </div>

                        <div className="col-span-full -mt-5 -mb-5">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Agent description
                            </label>
                            <div className="mt-2">
                                <textarea 
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                    
                                </textarea>
                            </div>

                            <span className="text-xs text-red-800">{ errors.description }</span>
                        </div>
                    </div>
                </div>
			</div>
        </>
    )
}