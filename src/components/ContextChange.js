import React from 'react';
import ToggleTheme from './ToggleTheme';
import ToggleLanguage from './ToggleLanguage';

function ContextChange() {
    return (
        <div className='note-app__route-button'>
            <ToggleTheme /> 
            <ToggleLanguage />
        </div>
    )
}

export default ContextChange;