import PropTypes from 'prop-types';

const CheckBox = ({ label, id, name, type, placeholder, value, onChange, onBlur, error }) => {
    return (
        <div className="flex items-center  my-6">
            <input 
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-blue-500 hover:bg-blue-200 checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500" />
            <label htmlFor={id} className="text-sm font-normal text-gray-600">{label}</label>
            
        </div>
    );
};
CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};

export default CheckBox;