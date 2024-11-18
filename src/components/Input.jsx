import React from 'react'

function Input({ type, value, name, id, onChange, placeholder, className }) {
    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }
    return (
        <>
            <input type={type}
                value={value} name={name} id={id}
                placeholder={placeholder}
                className={className}
                onChange={handleInputChange} />
        </>
    )
}

export default Input;