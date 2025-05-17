/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMutation } from 'react-query';
import { setChangeUser } from '../../../../redux/slices/authSlice';
import { verifyOtp } from '../../../../utils/request';
import { TbBuildingEstate } from "react-icons/tb";
import { ImSpinner9 } from 'react-icons/im';
// Yup validation schema

const VerifyOtp = () => {
	const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate(); // Initialize useNavigate
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    
    const mutation = useMutation(
        (data) => verifyOtp(data, token),
        {
            onSuccess: (data) => {
                if(data?.success === true) {
                    dispatch(setChangeUser(data?.data))
                    toast.success('Success, Phone number verified');
                    navigate('/dashboard')
                }else {
                    setLoading(false)
                    toast.error(data?.message)
                    setOtp(['', '', '', ''])
                }
            },
            onError: (error) => {
                console.error(error);
            }
        }
    );
    
    const handleChange = (value, index) => {
        const newOtp = [...otp];

        if (/^\d$/.test(value) || value === '') {
            // Allow only digits or empty string (for deletion)
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically move to the next input if a digit is entered
            if (index < otp.length - 1 && value) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            } else if (value === '' && index > 0) {
                // Move to the previous input if the current input is cleared
                document.getElementById(`otp-input-${index - 1}`).focus();
            }

            const otpCode = newOtp.join('');
            if(otpCode.length === 4) {
                setLoading(true)
                if(user && token) {
                    const data = {
                        'code': otpCode
                    }
                    mutation.mutate(data)
                }else {
                }
            }
        }
    };
    
    const handleVerify = async () => {
        setError('');
        const otpCode = otp.join('');
        // Validate OTP (check if all fields are filled)
        if (otpCode.length !== 4) {
            setError('Please enter the full 4-digit OTP code.');
            return;
        }
        setLoading(true);
        try {
            // Simulate verification process (replace with actual verification logic)
            if(user && token) {
                const data = {
                    'code': otpCode
                }
                mutation.mutate(data)
            }else {
            }
        } catch (err) {
            console.log(err)
            setError('An error occurred during verification. Please try again.');
        } finally {
            setLoading(false); // Enable the button again
        }
    };

	return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center rounded-xl">
                <div className="relative top-14 max-w-screen-xl h-5/6 m-0 sm:m-10 shadow-2xl flex justify-center flex-1">
                    <div className="absolute -top-12 flex justify-center items-center">
                        <div className="rounded-full w-24 h-24 bg-white shadow cursor-pointer">
                            <Link to="/"><img src="https://oshelter.com/_nuxt/img/logo.1012dbf.png" width="74" height="74" alt="Logo" className="mt-5 ml-3 justify-center items-center" /></Link>
                        </div>
                    </div>
                    <div className="flex-1 text-left hidden lg:flex bg-[#283890] font-josefin-sans tracking-wide">
                        <div className="m-12 xl:m-16 w-full"
                        style={{ fontStyle: 'normal', lineHeight: '1.25rem' }}
                        >
                            <div className="authentication-welcome py-4 font-regular tracking-normal">
                                <h2 className="text-white font-bold mt-4 text-3xl" style={{ fontSize: '35px' }}>Welcome to OShelter!</h2> 
                                <p className="text-white text-lg ">
                                    <br /><br />
                                    We’re thrilled to have you on board! OShelter is here to simplify property management and connect you with the right buyers, tenants, and investors—all in one seamless platform.
                                    <br /><br />
                                    <h4 className="text-3xl">Here’s how to get started:</h4>
                                    <br />
                                    <p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;Set Up Your Profile – Showcase your properties and brand effortlessly.</p>
                                    <p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;List Your Properties – Upload, manage, and market your real estate with ease.</p>
                                    <p className="flex text-md mb-2"><TbBuildingEstate className="mt-1"/>&nbsp;Connect & Grow – Engage with potential clients and expand your business.</p>
                                    <br />

                                    Need help? Our support team is ready to assist you. Let’s build something amazing together!

                                    Start Exploring Now
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/8 p-6 sm:p-12 bg-white rounded-xl">
                        <div className="mt-8">
                            <div className="flex w-full flex-col rounded-2xl bg-white shadow-xl px-2 sm:px-14"> 
                                <div className="mx-auto w-full max-w-md pb-20 px-8 sm:px-0"> 
                                    <div className='p-8'>
                                        <h2 className='text-2xl font-bold mb-4'>Verification code</h2>
                                        <p className='mb-4'>
                                            Please type the verification code sent to your phone number <br /> *****
                                            {(user?.profile?.phone).toString().slice(-4)}
                                        </p>
                                        <div className='flex mb-4'>
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-input-${index}`}
                                                    type='text'
                                                    className={`w-12 h-12 mr-2 text-2xl text-center font-extrabold text-slate-900 bg-slate-100 border hover:border-slate-200 appearance-none rounded-lg p-4 outline-none ${loading === true ? 'bg-gray-300 text-gray-500': 'focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'}`}
                                                    maxLength='1'
                                                    value={digit}
                                                    disabled={loading}
                                                    onChange={(e) => handleChange(e.target.value, index)}
                                                />
                                            ))}
                                        </div>
                                        {error && <p className='text-red-color mb-4'>{error}</p>}
                                        <button
                                            className={`inline-flex w-[60%] justify-center whitespace-nowrap rounded-lg ${loading === true ? 'bg-blue-300': 'bg-blue-800 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300'} px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150`}
                                            onClick={handleVerify}
                                            disabled={loading}>
                                            {loading === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Verifying</span></>) : (<><span className="ml-3">Verify Number</span></>)}
                                        </button>
                                        <p className='mt-2'>
                                            Didn't receive OTP?{' '}
                                            <a href='#' className='text-blue-500'>
                                                Resend
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
	);
};

export default VerifyOtp;
