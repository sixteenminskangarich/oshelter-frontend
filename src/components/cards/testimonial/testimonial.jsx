import { useState } from "react";
import { useFormik, useField } from "formik";
import { useMutation } from "react-query";
import { saveTestimonial } from "../../../utils/request";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { set } from "date-fns";

export default function Testimonial() {
    const [show, setShow] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const mutation = useMutation(
        (data) => saveTestimonial(data, token),
        {
            onSuccess: (data) => {
                if(data.success === true) {
                    setShow(false);
                    setLoading(false);
                    toast.success('Testimonial added');
                    values.content = ""
                }else {
                    toast.error(data.message);
                }
                // Handle success here
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onSubmit = async (values) => {
        setLoading(true);
        mutation.mutate(values);
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit,
    })

    return(
        <>
		    <div className="px-3 w-full">
		    	{
                    show ? (
                        <>
                            <div className="bg-white shadow-md rounded-lg p-6 z-40">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                                            Testimonial
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            value={values.content}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${
                                                errors.content ? "border-red-500" : "border-gray-300"
                                            }`}
                                            rows="4"
                                            placeholder="Write your testimonial here..."
                                        ></textarea>
                                        {errors.content && (
                                            <p className="text-red-500 text-xs mt-1">{errors.content}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setShow(false)}
                                            className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${
                                                loading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            {loading ? (
                                                <ImSpinner9 className="animate-spin inline-block" />
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShow(true) } className="z-40 hover:border bg-bg-color hover:text-white px-4 py-2 text-sm rounded-xl hover:border-bg-color text-white">Add Testimonial</button>
                            </div>
                        </>
                    )
                }
		    </div>
		</>
    )
}