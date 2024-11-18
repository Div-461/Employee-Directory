import React from 'react';
import logo from '../images/img.jpg';
import '../css/employeeCard.css'
function EmployeeCard({ displayName, jobTitle, department, email, manager, ext, location }) {
    return (
        <div className="card">
            <div className="card-header text-center bg-primary text-white">
                {displayName || 'Not Specified'}
            </div>
            <div className="card-body text-center">
                <p className="card-text">{jobTitle || 'Not Specified'}</p>
                <img
                    src={logo}
                    className="card-img-top logo"
                    alt="logo"
                />
                <h6 className="card-title">{department || 'Not Specified'}</h6>
                <span className="d-block mb-2"><b>Email:</b> {email || 'Not Specified'}</span>
                <span className="d-block mb-2"><b>Manager/Report to:</b> </span>
                <p className="d-block mb-2">{manager || 'Not Specified'}</p>
                <div className="d-flex justify-content-between">
                    <span><b>Ext:</b> {ext || 'Not Specified'}</span>
                    <span><b>Location:</b> {location || 'Not Specified'}</span>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;
