export default function Input({ type, className, name, values, handleChange, handleBlur, placeholder }) {
    return(
        <>
            <input
                id="first-name"
                name={name}
                type={type}
                autoComplete="given-name"
                className={className}
                placeholder={placeholder}
                value={values.propertyTitle}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    )
}