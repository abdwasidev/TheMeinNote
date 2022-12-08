import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import NoteActive from '../components/NoteActive';
import NoteSearch from '../components/NoteSearch';
import PropTypes from 'prop-types';
import ContextChange from '../components/ContextChange';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search');

    function changeSearchParams(search) {
        setSearchParams({ search });
    }

    return <HomePage defaultKeyword={search} onSearch={changeSearchParams} />
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            search: props.defaultKeyword || "",
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    async componentDidMount(){
        const { data } = await getActiveNotes();
        if (this.state.search !== "") {
            this.setState({
                notes: data.filter((note) =>
                (note.archived === false) && (note.title.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
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
        const { data } = await getActiveNotes();
        if (prevState.search !== this.state.search) {
            if (this.state.search !== "") {
            this.setState({
                notes: data.filter((note) =>
                (note.archived === false) && (note.title.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
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
                <NoteActive 
                    notes={this.state.notes} 
                    key={this.state.notes.id}
                    onSearch={this.onSearchHandler}
                    {...this.state.notes}
                    />
            </>
        );
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    onSearch: PropTypes.func,
};

export default HomePageWrapper;