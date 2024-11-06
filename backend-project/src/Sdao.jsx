import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sdao.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Sdao = () => {
    const navigate = useNavigate();

    const goBack = () => {
        window.location.href = '/dashboard';
      };

    return (
        <div className="sdao-container">
            <div className="sdaoheader-box">
                    <h1>Student Discipline's Office</h1>
                    <button className='gobackDash' onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="1x" />
                    Back to Dashboard
                    </button>
            </div>

            <div className="sdaomenu-card">
                <div className="sdaomenu-container">
                    <div className="rowsdao">
                        <div className="sdaobutton" onClick={() => navigate('/sdaoapp')}>
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

export default Sdao;
