import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/network-data';
import NoteSearch from '../components/NoteSearch';
import PropTypes from 'prop-types';
import ContextChange from '../components/ContextChange';
import NoteArchive from '../components/NoteArchive';

function ArchiveWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search');

    function changeSearchParams(search) {
        setSearchParams({ search });
    }

    return <Archive defaultKeyword={search} onSearch={changeSearchParams} />
}

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            search: props.defaultKeyword || "",
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    async componentDidMount(){
        const { data } = await getArchivedNotes();
        if (this.state.search !== "") {
            this.setState({
                notes: data.filter((note) =>
                (note.archived === true) && (note.title.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
                ),
            });
        } else {
            this.setState(() => {
                return {
                    notes: data,
                };
            });
        }
    }
    
    async componentDidUpdate(prevProps, prevState) {
        const { data } = await getArchivedNotes();
        if (prevState.search !== this.state.search) {
            if (this.state.search !== "") {
            this.setState({
                notes: data.filter((note) =>
                (note.archived === true) && (note.title.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
                ),
            });
            } else {
            this.setState(() => {
                return {
                    notes: data,
                };
            });
            }
        }
    }

    onSearchHandler(search) {
        this.setState(() => {
            return {
                search,
            };
        });

        this.props.onSearch(search);
    }
    
    render() {
        return (
            <>  <ContextChange/>
                <NoteSearch search={this.state.search} onSearch={this.onSearchHandler}/>
                <NoteArchive 
                    notes={this.state.notes} 
                    key={this.state.notes.id}
                    onSearch={this.onSearchHandler}
                    {...this.state.notes}
                    />
            </>
        );
    }
}

Archive.propTypes = {
    defaultKeyword: PropTypes.string,
    onSearch: PropTypes.func,
};

export default ArchiveWrapper;