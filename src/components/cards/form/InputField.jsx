import PropTypes from 'prop-types';

const  InputField = ({ label, id, name, type, placeholder, value, onChange, onBlur, error }) => {
    return (
        <div className="relative mb-6">
            <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};

InputField.defaultProps = {
    type: 'text',
    placeholder: '',
};

export default InputField;