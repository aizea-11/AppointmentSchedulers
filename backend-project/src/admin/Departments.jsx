import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Departments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalculator} from '@fortawesome/free-solid-svg-icons';

const Departments = () => {
    const navigate = useNavigate();
    const firstName = sessionStorage.getItem('firstName')

    const goBack = () => {
      window.location.href = '/admin';
    };

    return (
        <div className="department-container">
            <div className="headerdept-box">
              <h1>Departments</h1>
              <button className='gobackDept' onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft} size="1x" />
              Back to Admin Panel
              </button>
            </div>

            <div className="dept-card">
                <div className="dept-container">
                    <div className="deptrow">
                        <div className="button" onClick={() => navigate('/accadmin')}>
                            <FontAwesomeIcon icon={faCalculator} size="3x" />
                            <br />
                            <span>Accounting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departments;