import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Faculty.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Faculty = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.location.href = '/dashboard';
      };

    return (
        <div className="fac-container">
            <div className="facheader-box">
                    <h1>Faculty</h1>
                    <button className='gobackDash' onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    Back to Dashboard
                    </button>
            </div>

            <div className="facmenu-card">
                <div className="facmenu-container">
                    <div className="rowfac">
                        <div className="facbutton" onClick={() => navigate('/facultyapp')}>
                            <FontAwesomeIcon icon={faClipboard} size="3x" />
                            <br />
                            <span>Book An Appointment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faculty;
