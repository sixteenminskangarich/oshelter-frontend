import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPasswordForm() {
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useNavigate();
	const { token } = router.query || '';

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/reset-password`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, newPassword }),
			}
		);

		const data = await response.json();
		if (response.ok) {
			setMessage(
				'Password has been reset successfully. Redirecting to login...'
			);
			toast.success(' Reset Password has been sent your email');
			setTimeout(() => {
				navigator('/login'); // Redirect to login page
			}, 2000);
		} else {
			setMessage(data.message || 'Something went wrong. Please try again.');
		}
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='password'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					placeholder='Enter your new password'
					required
					className='w-full mt-4 p-2 border-2 border-black rounded-md'
				/>
				<button
					type='submit'
					className='mt-4 bg-bg-color hover:bg-bg-color-1 text-white py-2 px-4 rounded-md'>
					Reset Password
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
