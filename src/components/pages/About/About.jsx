
const About = () => {
    return (
        <>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                        <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">Building Stronger Communities through Collaboration and Empowerment</h2>
                                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">Through collaborationperse perspectives and strengths are leveraged to create inclusive environments where everyone has the opportunity to thrive. This approach not only fosters personal growth and achievement but also strengthens the fabric of society.</p>
                            </div>
                            <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                                <span className="px-1.5 text-white text-sm font-medium leading-6">Get Started</span>
                            </button>
                        </div>
                        <img className="lg:mx-0 mx-auto h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717751272.png" alt="about Us image" />
                    </div>
                </div>
            </section>

            <section className="py-24 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 mb-6">Meet the brains</h2>
                        <p className="text-lg text-gray-500 text-center">These people work on making our product best.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-y-14 max-w-3xl mx-auto lg:max-w-full ">
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698649968.png" alt="Marvin image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Marvin McKinney</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">Founder</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650000.png" alt="Kathryn image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Kathryn Murphy</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">CTO</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698659360.png" alt="Jerome image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Jerome Bell</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">CMO</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650109.png" alt="Wade image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Wade Warren</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">CEO</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650146.png" alt="Leslie image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Leslie Alexander</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">Customer Support</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650184.png" alt="Guy image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Guy Hawkins</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">HR</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650213.png" alt="Ronald image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Ronald Richards</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">CO-Founder</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650242.png" alt="Devon image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Devon Lane</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">UI Designer</span>
                        </div>
                        <div className="group block text-center lg:w-1/5 sm:w-1/3 min-[450px]:w-1/2 w-full">
                            <div className="relative mb-5">
                                <img src="https://pagedone.io/asset/uploads/1698650271.png" alt="Dianne image" className="w-28 h-28 rounded-2xl object-cover mx-auto ransition-all duration-500 border-2 border-solid border-transparent group-hover:border-indigo-600"/>
                            </div>
                            <h4 className="text-xl text-gray-900 font-semibold text-center mb-2 transition-all duration-500 group-hover:text-indigo-600">Dianne Russell</h4>
                            <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">Product Designer</span>
                        </div>
                    </div>
                </div>
            </section>                                                         
        </>
    );
};

export default About;