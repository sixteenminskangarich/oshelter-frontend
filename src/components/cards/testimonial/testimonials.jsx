import { listOfTestimonial } from "../../../utils/stateQueries";

export default function Testimony() {
    const { data: testimonial } = listOfTestimonial();
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {
                    testimonial?.data?.map((item) => (
                        <>
                            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                <div className="w-full flex mb-4 items-center">
                                    <div className="overflow-hidden rounded-full w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid" className="bg-cover" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-bold text-sm uppercase text-gray-600">{item?.name}</h6>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <p className="text-md leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>{item?.content.substring(0, 180)}<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                                </div>
                            </div> 
                        </>
                    ))
                }
            </div>
        </>
    )
}