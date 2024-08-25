import { useNavigate } from 'react-router-dom';

function Space() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 10 }}>
            <img
                src="/buttons/back.webp"
                id="backButton"
                alt="Back button"
                onClick={() => navigate(-1)}
                style={{ cursor: 'pointer', marginRight: '10px' }}
            />
        </div>
    );
}

export default Space;