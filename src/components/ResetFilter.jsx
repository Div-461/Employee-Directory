import React from 'react';
import reset from '../images/reset.png';
import '../css/resetFilter.css';

function ResetFilter({ onClick }) {
    const handleResetFilterClick = () => {
        if (onClick) {
            onClick();
        }
    }
    return (
        <>
            <img
                className='reset'
                src={reset}
                alt="Reset filter"
                title="Reset filter"
                onClick={handleResetFilterClick}
            />
        </>
    )
}

export default ResetFilter;
