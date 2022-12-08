import React from 'react';
import { useParams } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail';

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
    };

  }

  render() {
    return (
      <section>
          <NoteDetail />
      </section>
    );
  }
}

export default DetailPageWrapper;
