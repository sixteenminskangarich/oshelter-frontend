import PropTypes from 'prop-types';

const SelectField = ({ label, id, name, value, onChange, onBlur, options, error }) => {
    return (
        <div className="relative mb-6">
            <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

SelectField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};

export default SelectField;