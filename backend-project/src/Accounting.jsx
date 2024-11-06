import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Accounting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Accounting = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.location.href = '/dashboard';
      };

    return (
        <div className="acc-container">
            <div className="accheader-box">
                    <h1>Accounting</h1>
                    <button className='gobackDash' onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    Back to Dashboard
                    </button>
            </div>

            <div className="accmenu-card">
                <div className="accmenu-container">
                    <div className="rowacc">
                        <div className="accbutton" onClick={() => navigate('/accountingapp')}>
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

export default Accounting;
