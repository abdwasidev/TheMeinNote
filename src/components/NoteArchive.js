import React from 'react';
import NoteItem from './NoteItem'
import PropTypes from 'prop-types';
import LanguageConsumer from '../contexts/LanguageContext';

function NoteArchive({ notes }) {
    const { language } = React.useContext(LanguageConsumer);
    return (
        <>
            <h2>{language === 'EN' ? 'Note Active' : 'Catatan Aktif'}</h2>
            {notes.length > 0 ? (
            <div className="notes-list">
                
                {notes.map((note) => {
                    return  <NoteItem 
                    key={note.id}
                    id={note.id} 
                    title={note.title}
                    createdAt={note.createdAt}
                    body={note.body}/>
                })}
            </div>) : <div className="notes-list"><p className="notes-list__empty-message">{language === 'EN' ? 'No archive note' : 'Tidak ada catatan arsip'}</p></div>}
        </>
    );
}

NoteArchive.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default NoteArchive;