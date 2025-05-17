import { ChevronDownIcon } from "@heroicons/react/outline";

export default function SecondStage({ values, handleChange, handleSubmit, handleBlur, errors }) {
    return(
        <>
			<div className="flex w-full flex-col pb-8 xl:-mt-10 lg:-mt-10 -mt-16">
                <div className="pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Property Owner Information</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-7">
                        <div className="sm:col-span-3 xl:mt-0 lg:mt-0 -mt-4">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Owner name
                            </label>
                            <div className="mt-1">
                                <input
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Owner name"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.name }</span>
                        </div>

                        <div className="sm:col-span-3 xl:mt-0 lg:mt-0 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                Occupation
                            </label>
                            <div className="mt-1">
                                <input
                                    name="occupation"
                                    value={values.occupation}
                                    onChange={handleChange}
                                    onBlur={handleBlur} 
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Occupation"
                                />
                            </div>
                            <span className="text-xs text-red-800">{ errors.occupation }</span>
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
                                    autoComplete="street-address"
                                    className="block w-full rounded-xl bg-gray-50 border border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            <span className="text-xs text-red-800">{ errors.mobile }</span>
                        </div>

                        <div className="col-span-full -mt-6">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Emergency Contact Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone-number"
                                    name="emergency"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    autoComplete="phone-number"
                                    className="block w-full rounded-xl bg-gray-50 border border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            <span className="text-xs text-red-800">{ errors.emergency }</span>
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
                                    type="text" placeholder="Street Address"
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
                                Owner description
                            </label>
                            <div className="mt-2">
                                <textarea 
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-2 rounded-xl font-medium bg-gray-50 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                >

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