import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// function Header({ isPaused, togglePause }) {
function Header() {
    const location = useLocation();

    return (
        <header style={{ margin: 0, padding: 0 }}>
            {/* <div id="buttonsContainer">
                <div id="starsButtonContainer">
                    <Link to="/space">
                        <img src="/buttons/stars.webp" id="starsButton" alt="Stars button" />
                    </Link>
                </div>
                <div id="playpauseButtonContainer">
                    <img
                        src={isPaused ? "/buttons/play.webp" : "/buttons/pause.webp"}
                        id="playpauseButton"
                        alt="Play/pause button"
                        onClick={togglePause}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div> */}
            <h1>
                <Link to="/" style={{ color: 'var(--blue_color)', textDecoration: 'none' }}>Zack Goldblum</Link>
                <span style={{ marginLeft: '20px' }}>
                    <a className="social_media_icons" href="http://www.github.com/ZackGoldblum" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a className="social_media_icons" href="http://www.linkedin.com/in/zackgoldblum" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a className="social_media_icons" href="https://x.com/ZackGoldblum" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a className="social_media_icons" href="mailto:zackgoldblum@gmail.com" aria-label="Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </span>
            </h1>
            <hr />
            <nav>
                <Link className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`} to="/projects">Projects</Link>
                <span className="nav-separator">|</span>
                <Link className={`nav-link ${location.pathname === '/research' ? 'active' : ''}`} to="/research">Research</Link>
                <span className="nav-separator">|</span>
                <Link className={`nav-link ${location.pathname === '/bookshelf' ? 'active' : ''}`} to="/bookshelf">Bookshelf</Link>
                <span className="nav-separator">|</span>
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </nav>
            <hr style={{ marginBottom: '0px' }} />
        </header>
    );
}

// Header.propTypes = {
//   isPaused: PropTypes.bool,
//   togglePause: PropTypes.func
// };

export default Header;