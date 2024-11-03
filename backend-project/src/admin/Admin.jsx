import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const firstName = sessionStorage.getItem('firstName');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="admin-container">
            <div className="headeradmin-box">
                <div className="welcomeadmin-section">
                    <h1>Hello, {firstName ? firstName : 'User'}!</h1>
                    <p>Welcome to your dashboard.</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="menuadmin-card">
                <div className="menuadmin-container">
                    <div className="row">
                        <div className="button" onClick={() => navigate('/user')}>
                            <FontAwesomeIcon icon={faUser} size="4x" />
                            <br />
                            <span>User</span>
                        </div>
                        <div className="button" onClick={() => navigate('/departments')}>
                            <FontAwesomeIcon icon={faBuilding} size="3x" />
                            <br />
                            <span>Departments</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
