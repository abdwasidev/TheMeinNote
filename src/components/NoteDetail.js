import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNote, archiveNote, deleteNote, unarchiveNote, } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';
import LanguageConsumer from '../contexts/LanguageContext';

function NoteDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <NoteDetail navigate={navigate} id={id} />
}

class NoteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
    };
    
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onDeleteHandler = async() => {
    await deleteNote(this.props.id);
    this.props.navigate("/");
  };

  onArchiveHandler = async ()  => {
    if (this.state.notes.archived) {
      await unarchiveNote(this.props.id);
      this.props.navigate("/");
    } else {
      await archiveNote(this.props.id);
      this.props.navigate("/archive");
    }
  };

  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    if (data) {
      this.setState(() => {
        return {
          notes: data,
        };
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      const { data } = await getNote(this.props.id);
      if (data) {
        this.setState(() => {
          return {
            notes: data,
          };
        });
      }
    }
  }

  render() {
    const { notes } = this.state;
    return (
      <div>
        { "id" in notes ? 
          <>
            <div className="note-item__detail">
              <h3 className="note-item__title">{this.state.notes.title}</h3>
              <p className="note-item__date">{showFormattedDate(this.state.notes.createdAt)}</p>
              <p className="note-item__body">{this.state.notes.body}</p>
            </div>
            <div className="note-item__action">
              <button className='note-item__delete-button' onClick={() => this.onDeleteHandler()}>Delete</button>
              <button className='note-item__archive-button' onClick={() => this.onArchiveHandler()}>{this.state.notes.archived ? 'Move' : 'Archive'}</button>
            </div>
          </>
          : 
          <NotFound /> 
        }
      </div>
    );
  }
}

function NotFound(){
  const { language } = React.useContext(LanguageConsumer);
  return (
    <div className='not_found'>
      <h3>{language === 'EN' ? 'Notes is not found!' : 'Catatan tidak ditemukan'}</h3>
      <h3>
      {language === 'EN' ? 'Back to' : 'Kembali ke'} <Link className='back_home' role='link'to="/">{language === 'EN' ? 'Homepage' : 'Halaman Utama'}</Link>
      </h3>
    </div>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,    
}

NoteDetail.defaultProps = {
  id: "",
  navigate: "",
};

export default NoteDetailWrapper;