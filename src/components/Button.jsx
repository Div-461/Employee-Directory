import React from 'react'
function Button({ text, onClick, className, style }) {
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    }
    return (
        <>
            <button
                type='button'
                value={text}
                style={style}
                onClick={handleClick}
                className={className}>
                {text}
            </button>
        </>
    )
}

export default Button;