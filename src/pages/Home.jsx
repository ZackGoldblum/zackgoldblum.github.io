import React from 'react';

function Home() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="item_container" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px', maxWidth: '80%' }} id="body_text">
                    Hello! Welcome to my website. I do cool brain stuff.
                </p>
            </div>
            <div id="slider">
                <div className="slides">
                    <div className="slider">
                        <div className="image">
                            <img src="/index/slides1.webp" alt="Zack Goldblum fNIRS study Longwood Gardens" />
                        </div>
                    </div>
                    <div className="slider">
                        <div className="image">
                            <img src="/index/slides2.webp" alt="Zack Goldblum Kernel Flow study" />
                        </div>
                    </div>
                    <div className="slider">
                        <div className="image">
                            <img src="/index/slides3.webp" alt="Zack Goldblum OpenBCI headset" />
                        </div>
                    </div>
                    <div className="slider">
                        <div className="image">
                            <img src="/index/slides4.webp" alt="Zack Goldblum fNIRS study selfie" />
                        </div>
                    </div>
                    <div className="slider">
                        <div className="image">
                            <img src="/index/slides5.webp" alt="Zack Goldblum EEG headset" />
                        </div>
                    </div>
                </div>
                <div className="slider">
                    <div className="content">
                        <div className="image">
                            <img src="/index/slides5.webp" alt="Zack Goldblum EEG headset" />
                        </div>
                    </div>
                </div>
                <div className="switch">
                    <ul>
                        <li>
                            <div className="on"></div>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;