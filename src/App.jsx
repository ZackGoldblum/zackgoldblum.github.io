import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Research from './pages/Research';
import Projects from './pages/Projects';
import Bookshelf from './pages/Bookshelf';
import About from './pages/About';
import Stars from './pages/Stars';
import NotFound from './pages/NotFound';
import Starfield from './components/Starfield';
import './index.css';

const Router = BrowserRouter;

function App() {
    function AppContent() {
        const location = useLocation();
        const isStarsPage = location.pathname === '/stars';
        const [uiVisible, setUiVisible] = useState(false);

        // Handle skybox loaded - trigger UI fade in
        const handleSkyboxLoaded = () => {
            setTimeout(() => {
                setUiVisible(true);
            }, 1000);
        };

        return (
            <>
                <Starfield onSkyboxLoaded={handleSkyboxLoaded} uiVisible={uiVisible} />
                {!isStarsPage && (
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            opacity: uiVisible ? 1 : 0,
                            transition: 'opacity 2.0s ease-in-out'
                        }}
                    >
                        <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/research" element={<Research />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/bookshelf" element={<Bookshelf />} />
                                <Route path="/about" element={<About />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                    </div>
                )}
                {isStarsPage && (
                    <Routes>
                        <Route path="/stars" element={<Stars />} />
                    </Routes>
                )}
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