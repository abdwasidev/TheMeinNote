import React from 'react';
import PropTypes from 'prop-types';
import LanguageConsumer from '../contexts/LanguageContext';

function NoteSearch({ search, onSearch }) {
    let { language } = React.useContext(LanguageConsumer);
    return (
            <div className="note-search">
                <input type="text" 
                    placeholder={language === 'EN' ? 'Search Note ...' : 'Cari Catatan ...'}
                    value={search} 
                    onChange={(event) => onSearch(event.target.value)}
                    />
            </div>
    );
}

NoteSearch.propType = {
    search: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
}

export default NoteSearch;