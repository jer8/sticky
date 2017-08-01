import React, {Component} from 'react';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';
import './App/App.css';
import ToggleableStickyForm from './ToggleableStickyForm';
import Sticky from './Sticky';

class StickyDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stickies: []
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/stickies')
      .then(res => res.json())
      .then(stickies => this.setState({stickies}));
  }

  handleUpdate = (attrs) => {
     this.updateNote(attrs);
  }

  updateNote = (attrs) => {

    this.setState({
      stickies: this.state.stickies.map(sticky => {
        if(sticky.id === attrs.id){
          return Object.assign({}, sticky, {
            title: attrs.title,
            notes: attrs.notes,
          });
        } else {
          return sticky;
        }
      }),
    });
  }

  handleCreate = (newNote) => {
    this.createNewNote(newNote);
  }

  createNewNote = (newNote) => {
    newNote = {
      id: Date.now(),
      title: newNote.title,
      notes: newNote.notes,
    }

    this.setState({
      stickies: this.state.stickies.concat(newNote)
    })

  }

  handleDelete = (id) => {

    this.setState({
      stickies: this.state.stickies.filter(sticky => {
        return sticky.id !== id;
      })
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          {
            this.state.stickies.map((sticky) =>
              <Sticky title={sticky.title} notes={sticky.notes} id={sticky.id} key={sticky.id} onSave={this.handleUpdate} onDelete={this.handleDelete}/>
          )}
        </div>
        <div className="row center-align">
          <ToggleableStickyForm onSave={this.handleCreate}/>
        </div>
      </div>
    );
  }
}

export default StickyDashboard;
