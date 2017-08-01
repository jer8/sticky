'use strict';

import React, {Component} from 'react';
import $ from 'jquery/src/jquery';
import './App.css';
import ToggleableStickyForm from './components/ToggleableStickyForm';
import Sticky from './components/Sticky';

class StickyDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stickies: [
        {
          id: '1',
          title: 'Note Sample',
          notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed erat rhoncus dolor laoreet efficitur. Aenean laoreet justo libero, nec rhoncus sapien scelerisque ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas ipsum felis, feugiat rhoncus lacinia ac, dapibus ut mi. Fusce et laoreet neque'
        },
      ]
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
