import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="item_container" style= {{ textAlign: 'center', margin: '180px', padding: '0px' }}>
            <p style= {{ paddingBottom: '20px', fontStyle: 'italic' }}>You seem to be a bit lost in space...</p>
            <p>Use the navigation links above to get yourself back.</p>
        </div>
    );
}

export default NotFound;