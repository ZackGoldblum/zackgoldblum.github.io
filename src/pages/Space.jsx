import React from 'react';
import { useNavigate } from 'react-router-dom';

function Space({ togglePause, isPaused }) {
    const navigate = useNavigate();

    // return (
    //     <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 10 }}>
    //         <img
    //             src="/buttons/back.webp"
    //             id="backButton"
    //             alt="Back button"
    //             onClick={() => navigate(-1)}
    //             style={{ cursor: 'pointer', marginRight: '10px' }}
    //         />
    //         <img
    //             src={isPaused ? "/buttons/play.webp" : "/buttons/pause.webp"}
    //             id="playpauseButton"
    //             alt="Play/pause button"
    //             onClick={togglePause}
    //             style={{ cursor: 'pointer' }}
    //         />
    //     </div>
    // );
    return null;
}

export default Space;
