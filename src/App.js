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
         title:'flystaging7',
          notes: [
            {
              about: '26zv',
              comment: 'in sync with prod'
            },
            {
              about: 'DB',
              comment: 'in sync with prod'
            },
          ],
       },
      {
        title:'flystaging5',
         notes: [
           {
             about: '40zv/41zv',
             comment: 'with 17.2 builds'
           },
           {
             about: 'DB',
             comment: 'with 17.2 changes'
           },
         ],

      },
      {
        title:'flystaging10',
         notes: [
           {
             about: 'iis',
             comment: 'paid seat'
           },
           {
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
            <StickyNote title={postIt.title} notes={postIt.notes}/>
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
  }

  render() {

    const {isFormOpen} = this.state;

    return (
      <div className="col m6 s12">
          {
            !isFormOpen
            ? <Notes title={this.props.title} notes={this.props.notes}/>
            : <NotesForm title={this.props.title} notes={this.props.notes}/>
          }
      </div>

    );
  }
}

class Notes extends Component {

  render() {

    const notes = this.props.notes.map((note) =>

      <NoteItem about={note.about} comment={note.comment} />

    );

    return (
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.title}</span>
            <ul className="collection">
              {notes}
            </ul>
          </div>
          <CardActions option1="Update" option2="Delete"/>
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

  render() {

    const notes = this.props.notes.map((note) =>
      <NoteItemForm about={note.about} comment={note.comment} />
    );

    return (

        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <div className="input-field">
                <input id='1' type='text' defaultValue={this.props.title}/>
                <label for='1'>Title</label>
              </div>
            </span>
            <ul className="collection">
              {notes}
            </ul>
          </div>
          <CardActions option1="Save" option2="Cancel"/>
        </div>
    );
  }
}


class NoteItemForm extends Component {

  render() {

    const {about, comment} = this.props;

    return (
      <li className="collection-item">
        <div className="input-field">
          <input id='1' type='text' defaultValue={about}/>
          <label for='1'>Title</label>
        </div>
        <div className="input-field">
          <textarea id="textarea1" defaultValue={comment} className="materialize-textarea"></textarea>
          <label for="textarea1">Notes</label>
        </div>
      </li>
    );
  }
}

class CardActions extends Component {
  render() {
    return (
      <div className="card-action right-align">
        <a href="#">{this.props.option1}</a>
        <a href="#">{this.props.option2}</a>
      </div>
    );
  }
}

export default PostItDashboard;
