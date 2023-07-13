import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
    let location = useLocation();
    return(
        <div>
            <div>
                <h1>
                    Page not found <code>{location.pathname}</code>
                </h1>
            </div>
        </div>
    );
}

export default NotFound;