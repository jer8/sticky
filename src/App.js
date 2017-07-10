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
        {this.state.postIts.map((postIt) =>
          <NoteItemList title={postIt.title} notes={postIt.notes}/>
        )}
      </div>
    );
  }
}

class NoteItemList extends Component {

  constructor(props){
    super(props);

    this.state = {
      isFormOpen: false
    };
  }

  render() {

    const {isFormOpen} = this.state;

    const noteItems = isFormOpen
      ? (this.props.notes.map((note) => <NoteItemForm about={note.about} comment={note.comment}/>))
      : (this.props.notes.map((note) => <NoteItem about={note.about} comment={note.comment}/>));

    const cardButtons = isFormOpen? <CardActions /> : <CardConfirmations />;

    return (
      <div className="col m6 s12">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.title}</span>
            <ul className="collection">
              { noteItems }
            </ul>
          </div>
          {cardButtons}
        </div>
      </div>
    );
  }
}

class NoteItem extends Component {

  render() {
    return (
      <li className="collection-item">
        <span className="title">{this.props.about}</span>
        <p>
          {this.props.comment}
        </p>
      </li>
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
        <a href="#">UPDATE</a>
        <a href="#">DELETE</a>
      </div>
    );
  }
}

class CardConfirmations extends Component {
  render() {
    return (
      <div className="card-action right-align">
        <a href="#">SAVE</a>
        <a href="#">CANCEL</a>
      </div>
    );
  }
}


export default PostItDashboard;
