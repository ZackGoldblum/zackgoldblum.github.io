import { useState } from 'react';
import Starfield from '../components/Starfield';

const Stars = () => {
    const [uiVisible, setUiVisible] = useState(false);

    // Handle skybox loaded - but we don't need to show any UI
    const handleSkyboxLoaded = () => {
        // No UI to show, just keep stars visible
        setUiVisible(true);
    };

    return (
        <>
            <Starfield onSkyboxLoaded={handleSkyboxLoaded} uiVisible={uiVisible} disableScrollMotion={true} />
            {/* No additional UI elements - just the starfield */}
        </>
    );
};

export default Stars;
