/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { verifyOtp } from '../../utils/request';
import { useMutation } from 'react-query';
import { setChangeUser } from '../../redux/slices/authSlice';

const Verify = ({ onVerify }) => {
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
					toast.success('Phone number verified successfully');
					navigate('/dashboard')
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
		}

		console.log(newOtp)
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
		<div className='p-8 text-center'>
			<h2 className='text-2xl font-bold mb-4'>Verification code</h2>
			<p className='mb-4'>
				Please type the verification code sent to your phone number <br /> *****
				{(user?.profile?.phone).toString().slice(-4)}
			</p>
			<div className='flex justify-center mb-4'>
				{otp.map((digit, index) => (
					<input
						key={index}
						id={`otp-input-${index}`}
						type='text'
						className='w-12 h-12 mr-2 text-2xl text-center font-extrabold text-slate-900 bg-slate-100 border hover:border-slate-200 appearance-none rounded-lg p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
						maxLength='1'
						value={digit}
						onChange={(e) => handleChange(e.target.value, index)}
					/>
				))}
			</div>
			{error && <p className='text-red-color mb-4'>{error}</p>}
			<button
				className='inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150'
				onClick={handleVerify}
				disabled={loading}>
				{loading ? (
					<div className='loader'></div> // Add a spinner loader here
				) : (
					'Verify number'
				)}
			</button>
			<p className='mt-2'>
				Didn't receive OTP?{' '}
				<a href='#' className='text-blue-500'>
					Resend
				</a>
			</p>
		</div>
	);
};

export default Verify;
