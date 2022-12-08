import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NotFound(){
    let location = useLocation();
  
    return (
        <div className='not_found'>
            <h3>Not Found for <code>{location.pathname}</code></h3>
            <h3>
                Back to <Link className='back_home' role='link'to="/">Home</Link>
            </h3>
        </div>
    );
}

export default NotFound;