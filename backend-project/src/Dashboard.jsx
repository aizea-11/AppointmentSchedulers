// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard, faLaptop, faShoppingCart, faCalculator, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const firstName = sessionStorage.getItem('firstName');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="header-box">
                <h2 className="university-name">NU DASMARINAS</h2>
                <div className="welcome-section">
                    <h1>Hello, {firstName ? firstName : 'User'}!</h1>
                    <p>Welcome to your dashboard.</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="menu-card">
                <div className="menu-container">
                    <div className="row">
                        <div className="button" onClick={() => navigate('/faculty')}>
                            <FontAwesomeIcon icon={faUser} size="3x" />
                            <span>Faculty</span>
                        </div>
                        <div className="button" onClick={() => navigate('/sdao')}>
                            <FontAwesomeIcon icon={faClipboard} size="3x" />
                            <span>Student's Discipline Office</span>
                        </div>
                        <div className="button" onClick={() => navigate('/itso')}>
                            <FontAwesomeIcon icon={faLaptop} size="3x" />
                            <span>ITSO</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="button" onClick={() => navigate('/bulldogex')}>
                            <FontAwesomeIcon icon={faShoppingCart} size="3x" />
                            <span>Bulldog Exchange</span>
                        </div>
                        <div className="button" onClick={() => navigate('/accounting')}>
                            <FontAwesomeIcon icon={faCalculator} size="3x" />
                            <span>Accounting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
