import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bulldogex.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Bulldogex = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.location.href = '/dashboard';
      };

    return (
        <div className="bull-container">
            <div className="bullheader-box">
                    <h1>Bulldog Exchange</h1>
                    <button className='gobackDash' onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    Back to Dashboard
                    </button>
            </div>

            <div className="bullmenu-card">
                <div className="bullmenu-container">
                    <div className="rowbull">
                        <div className="bullbutton" onClick={() => navigate('/bulldogexapp')}>
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

export default Bulldogex;
