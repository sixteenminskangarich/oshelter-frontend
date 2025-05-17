/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const CategoryCard = ({ icon, label, color, handleNavigate }) => (
	<div className='flex flex-col items-center p-4 bg-category-icons rounded-lg shadow-sm'>
		<Link
			to={`/services/categories?key=${label}`}
			onClick={() => handleNavigate(label)}>
			<FontAwesomeIcon
				icon={icon}
				size='2x'
				className='mb-2 ml-3'
				style={{ color }}
			/>
			<p>{label}</p>
		</Link>
	</div>
);

export default CategoryCard;
