/* eslint-disable react/prop-types */
import { ImSpinner9 } from 'react-icons/im';
import ClipLoader from 'react-spinners/ClipLoader';
const override = {
	display: 'block',
	margin: '100px auto',
};
const Spinner = ({ loading }) => {
	return (
		// <ImSpinner9 
		// 	size={150}
		// 	color='#283890'
		// 	loading={loading}
		// 	className="animate-spin"
		// 	cssOverride={override}
		// />
		// <ClipLoader
		// 	color='#283890'
		// 	loading={loading}
		// 	cssOverride={override}
		// 	size={150}
		// 	aria-label='Loading Spinner'
		// />

		<>
			<div className="row h-screen flex items-center justify-center" >
				<div className="flex text-center">
					<ImSpinner9 className="animate-spin text-blue-800" loading={loading} size={100} />
				</div>
			</div>

			
		</>
	);
};

export default Spinner;
