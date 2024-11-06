import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Itso.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard, faLaptop, faCalculator } from '@fortawesome/free-solid-svg-icons';

const Itso = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.location.href = '/dashboard';
      };

    return (
        <div className="itso-container">
            <div className="itsoheader-box">
                    <h1>ITSO</h1>
                    <button className='gobackDash' onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    Back to Dashboard
                    </button>
            </div>

            <div className="itsomenu-card">
                <div className="itsomenu-container">
                    <div className="rowitso">
                        <div className="itsobutton" onClick={() => navigate('/itsoapp')}>
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

export default Itso;
