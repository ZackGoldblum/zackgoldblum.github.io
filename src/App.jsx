import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Research from './pages/Research';
import Projects from './pages/Projects';
import Bookshelf from './pages/Bookshelf';
import About from './pages/About';
import Space from './pages/Space';
import NotFound from './pages/NotFound';
import Starfield from './components/Starfield';
import './index.css';

function App() {
    const [isPaused, setIsPaused] = useState(false);

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
    };

    function AppContent() {
        const location = useLocation();
        const isSpacePage = location.pathname === '/space';

        return (
            <>
                <Starfield isPaused={isPaused} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {!isSpacePage && <Header isPaused={isPaused} togglePause={togglePause} />}
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/research" element={<Research />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/bookshelf" element={<Bookshelf />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/space" element={<Space togglePause={togglePause} isPaused={isPaused} />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </>
        );
    }

    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
