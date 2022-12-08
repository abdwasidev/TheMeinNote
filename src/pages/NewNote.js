import React from 'react';
import { addNote } from '../utils/network-data';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';
import LanguageConsumer from '../contexts/LanguageContext';

function NewNote() {
    const { language } = React.useContext(LanguageConsumer);
    const navigate = useNavigate();

    async function onAddNoteHandler(notes){
        await addNote(notes);
        navigate('/');
    }

    return (
        <section>
        <h2>{language === 'EN' ? 'Add Note' : 'Tambah Catatan'}</h2>
        <NoteForm addNote={onAddNoteHandler}/>
        </section>
    )
}

export default NewNote;