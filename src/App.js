import React, {Component} from 'react';
import './App.css';

//https://github.com/facebookincubator/create-react-app/issues/679
//https://stackoverflow.com/questions/41657849/cannot-import-materialize-css-in-react-project-to-use-chips
import $ from 'jquery/src/jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'masonry-layout';

class PostItDashboard extends Component {

  constructor(props) {
     super(props);

     this.state = {
       postIts: [{
         postItId: '1',
         title:'flystaging7',
          notes: [
            {
              noteId: '1',
              about: '26zv',
              comment: 'in sync with prod'
            },
            {
              noteId: '2',
              about: 'DB',
              comment: 'in sync with prod'
            },
          ],
       },
      {
        postItId: '2',
        title:'flystaging5',
         notes: [
           {
              noteId: '3',
              about: '40zv/41zv',
              comment: 'with 17.2 builds'
           },
           {
              noteId: '4',
              about: 'DB',
              comment: 'with 17.2 changes'
           },
         ],

      },
      {
        postItId: '3',
        title:'flystaging10',
         notes: [
           {

              noteId: '5',
              about: 'iis',
              comment: 'paid seat'
           },
           {
              noteId: '6',
              about: 'DB',
              comment: 'with paid seat changes'
           },
         ],

      }],
     };
   }

  render() {

    return (
      <div className="container row">
        <StickyNoteList postIts={this.state.postIts}/>
      </div>
    );
  }
}

class StickyNoteList extends Component {

  render() {

    return (
      <div>
        {
          this.props.postIts.map((postIt) =>
            <StickyNote title={postIt.title} notes={postIt.notes} key={postIt.postItId}/>
        )}
      </div>
    );
  }
}

class StickyNote extends Component {


  constructor(props){
    super(props);

    this.state = {
      isFormOpen: false
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleUpdate = () => {

    this.setState({
      isFormOpen: true,
    });

  }

  handleCancel = () => {
    this.setState({
      isFormOpen: false,
    });
  }

  render() {

    const {isFormOpen} = this.state;

    return (
      <div className="col m6 s12">
          {
            !isFormOpen
            ? <Notes title={this.props.title} notes={this.props.notes} option1onClick={this.handleUpdate}/>
            : <NotesForm title={this.props.title} notes={this.props.notes} option2onClick={this.handleCancel}/>
          }
      </div>

    );
  }
}

class Notes extends Component {

  render() {

    const notes = this.props.notes.map((note) =>

      <NoteItem about={note.about} comment={note.comment} key={note.noteId}/>

    );

    return (
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.title}</span>
            <ul className="collection">
              {notes}
            </ul>
          </div>
          <CardActions option1="Update" option2="Delete" option1onClick={this.props.option1onClick} option2onClick={this.props.option2onClick}/>
        </div>
    );
  }
}

class NoteItem extends Component {

  render() {

    const {about, comment} = this.props;

    return (
      <li className="collection-item">
        <span className="title">{about}</span>
        <p>
          {comment}
        </p>
      </li>
    );
  }
}

class NotesForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      title: this.props.title,
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }


  render() {

    const notes = this.props.notes.map((note) =>
      <NoteItemForm about={note.about} comment={note.comment} key={note.noteId}/>
    );

    return (

        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <div className="input-field">
                <input placeholder="Note Title" id="note_title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                <label htmlFor="note_title" className="active">Title</label>
              </div>
            </span>
            <ul className="collection">
              {notes}
            </ul>
          </div>
          <CardActions option1="Save" option2="Cancel" option1onClick={this.props.option1onClick} option2onClick={this.props.option2onClick}/>
        </div>
    );
  }
}


class NoteItemForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      about: this.props.about,
      comment: this.props.comment,
    }

    this.handleAboutChange = this.handleAboutChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);

  }

  handleAboutChange(event) {
    this.setState({about: event.target.value});
  }

  handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  render() {

    return (
      <li className="collection-item">
        <div className="input-field">
          <input id='1' type='text' value={this.state.about} onChange={this.handleAboutChange}/>
          <label htmlFor='1' className="active">Title</label>
        </div>
        <div className="input-field">
          <textarea id="textarea1" defaultValue={this.state.comment} className="materialize-textarea" onChange={this.handleAboutChange}></textarea>
          <label htmlFor="textarea1" className="active">Notes</label>
        </div>
      </li>
    );
  }
}

class CardActions extends Component {
  render() {
    return (
      <div className="card-action right-align">
        <a href="#" onClick={this.props.option1onClick}>{this.props.option1}</a>
        <a href="#" onClick={this.props.option2onClick}>{this.props.option2}</a>
      </div>
    );
  }
}

export default PostItDashboard;
