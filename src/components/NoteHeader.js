import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiHome, FiLogOut, FiArchive, FiUser } from 'react-icons/fi';
import LanguageConsumer from '../contexts/LanguageContext';
import PropTypes from 'prop-types';

function NoteHeader({ user, onButtonClick }) {
    const {language} = useContext(LanguageConsumer);
    
    return (
        <div className="note-app__header">
            <h1>{language === 'EN' ? 'Notes' : 'Catatan'}</h1>
            <div className='note-app__route-button'>
                <p><FiUser/></p>
                <p>{user.name}</p>
                <Link role='link'to="/"><button><FiHome /></button></Link>
                <Link role='link'to="/archive"><button><FiArchive /></button></Link>
                <Link role='link'to="/new/notes"><button><FiPlusCircle /></button></Link>
                <button onClick={onButtonClick}><FiLogOut /></button>
            </div>
        </div>
    )
}

NoteHeader.propTypes = {
    user: PropTypes.object.isRequired,
    onButtonClick: PropTypes.func.isRequired,
};

export default NoteHeader;