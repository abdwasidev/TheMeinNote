import React from "react";
import {  useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import PropTypes from 'prop-types';

function NoteFormWrapper() {
    const navigate = useNavigate();
  
    return <NoteForm navigate={navigate} />
}

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            archived: false,
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value.length <= 50 ? event.target.value : event.target.value.substring(0, 50),
            }
        });
    }

    onBodyChangeHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        addNote(this.state);
        this.setState({ title: "", body: "", archived: false });
        this.props.navigate("/");
    }
    
    render() {
        return (
            <form className="note-input" onSubmit={this.onSubmitHandler}>
                <small className="note-input__title__char-limit">Limit Character: <span>{50 - this.state.title.length}</span></small>
                <input className="note-input__title" type="text" placeholder='Write Title ...' value={this.state.title} onChange={this.onTitleChangeHandler} />
                <input className="note-input__body" type="textarea" placeholder='Write Note ...' value={this.state.body} onChange={this.onBodyChangeHandler} />
                <button className="note-submit" type="submit">Add Note</button>
            </form>
        )
    }
}

NoteForm.propTypes = {
    navigate: PropTypes.func,
}

export default NoteFormWrapper;