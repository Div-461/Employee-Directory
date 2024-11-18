import React from 'react';

function Select({ options, className, onChange, text, id, style, value }) {
    const defaultValues = [<option key={0} value=''>{text}</option>];
    const departmentOptions = options.map((option, index) =>
        <option key={index + 1} value={option}>
            {option}
        </option>
    );
    const handleSelectChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    }
    return (
        <select
            className={className}
            value={value}
            id={id}
            style={style}
            onChange={handleSelectChange}
        >
            {text ? defaultValues.concat(departmentOptions) : departmentOptions}
        </select>
    )
}

export default Select;
