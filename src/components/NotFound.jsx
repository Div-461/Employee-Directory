import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='text-center'>
            <h3>Not Found...</h3>
            <Link to={'/'} className='btn btn-danger'>Back to dashboard</Link>
        </div>
    )
}

export default NotFound;