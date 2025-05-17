/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useFormik, useField } from "formik";
import { AgentScheme } from '../../../../lib/scheme';
import { showAgentCaretaker, editAgentCaretaker } from '../../../../utils/request';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams,  useParams} from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { LineWave, Audio } from "react-loader-spinner";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const EditAgent = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let {externalId} = useParams();
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(false);

    const {
		data: agents,
	} = useQuery({
		queryKey: ['agent', { token }],
		queryFn: () => showAgentCaretaker(externalId, token)
	});

    const agent = agents?.data;

    console.log("Hello World")

    const mutation = useMutation(
		(agentData) => editAgentCaretaker(externalId, agentData, token),
		{
			onSuccess: (data) => {
				if(data.success === true) {
                    toast.success('Agent updated');
                    navigate(`/dashboard/agent`);
                }else {
                    toast.error(data?.message);
                    setLoading(false)
                }
			},
			onError: (error) => {
				console.error(error);
			},
		}
	);

    const onSubmit = (values, actions) => {
        if (user && token) {
            setLoading(true)
            mutation.mutate(values);
        } else {
            setLoading(false)
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: agent?.name,
            phone: agent?.phone,
            email: agent?.email,
            type: agent?.type  
        },
        validationSchema: AgentScheme,
        enableReinitialize: true,
        onSubmit
    })

    console.log(agent)

	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
			<div className='p-4 sm:ml-64 flex-1 mt-16'>
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        { alert && 
                            <Alert color="success" role="alert" className="dismissable" icon={HiInformationCircle}>
                                <span className="font-medium">Alert!</span> Agent / Caretaker added
                            </Alert>
                        }
                        <div className="mt-12 flex flex-col items-center">
                            <>
                                <h3 className="text-xl font-extrabold" style={{ fontSize: '25px' }}>
                                    Edit Agent / Caretaker
                                </h3>
                                <div className="w-full flex-1 mt-8">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mx-auto max-w-xs">
                                            <div className="mb-5">
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname</label>
                                                <input 
                                                    type="name" 
                                                    id="name" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Full name"  
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                />

                                                {errors.name && <p className="text-red-500 text-sm">{ errors.name }</p>}
                                            </div>

                                            <div className="mb-5">
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                                                <input 
                                                    type="text" 
                                                    id="email-address" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Email Address"  
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                />
                                                {errors.email && <p className="text-red-500 text-sm">{ errors.email }</p>}
                                            </div>

                                            <div className="mb-5">
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                <input 
                                                    type="text" 
                                                    id="phone-number" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                    placeholder="Phone Number"  
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                />
                                                {errors.phone && <p className="text-red-500 text-sm">{ errors.phone }</p>}
                                            </div>

                                            <div className="mb-5">
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                                <select 
                                                    id="countries" 
                                                    name="type"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Select Type</option>
                                                    <option value="Agent" selected={"Agent" === agent?.type ? true : false}>Agent</option>
                                                    <option value="Caretaker" selected={"Caretaker" === agent?.type ? true : false}>Caretaker</option>
                                                </select>
                                                {errors.type && <p className="text-red-500 text-sm">{ errors.type }</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="mt-5 tracking-wide font-semibold bg-bg-color text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <span className="ml-3">
                                                    {loading ? 'Updating' : 'Update'}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("https://oshelter.com/_nuxt/img/add-user.07e74ed.png")` }}>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default EditAgent;
