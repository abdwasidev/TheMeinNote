import React, {useContext} from 'react';
import ToggleTheme from './ToggleTheme';
import ToggleLanguage from './ToggleLanguage';
import {ThemeConsumer} from '../contexts/ThemeContext';
import LanguageConsumer from '../contexts/LanguageContext';

function NoteHeaderAuth() {
    const { language } = useContext(LanguageConsumer);
    return (
        <ThemeConsumer>
            {() => {
                    return (
                        <div className="note-app__header">
                            <h1>{language === 'EN' ? 'Notes' : 'Catatan'}</h1>
                            <div className='note-app__route-button'>
                                <ToggleTheme /> 
                                <ToggleLanguage />
                            </div>
                        </div>
                    )
                }
            }
        </ThemeConsumer>
    );
}

export default NoteHeaderAuth;