import React, {Component} from 'react';
import $ from 'jquery/src/jquery';

import './App.css';

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

class Sticky extends Component {

  constructor(props){
    super(props);

    this.state = {
      isFormOpen: false
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
  }

  handleUpdate = () => {
    this.setState({
      isFormOpen: true,
    });

  }

  handleCloseForm = () => {
    this.setState({
      isFormOpen: false,
    });
  }

  render() {

    const {isFormOpen} = this.state;
    let note;

  if (isFormOpen) {
    note = <StickyForm title={this.props.title} notes={this.props.notes} onSave={this.props.onSave} id={this.props.id} onClose={this.handleCloseForm} />;
  } else {
    note = <StickyNote title={this.props.title} notes={this.props.notes} id={this.props.id} onUpdate={this.handleUpdate} onDelete={this.props.onDelete}/>;
  }

    return (
      <div className="col m8 offset-m2 s12">
        {note}
      </div>
    );
  }
}

class StickyNote extends Component {

  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);

  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <div className="card z-depth-3">
        <div className="card-image">
          <img src="images/card-image.png"></img>
          <span className="card-title">{this.props.title}</span>
        </div>
        <div className="card-content">
          {/* https://stackoverflow.com/questions/36260013/react-display-line-breaks-from-saved-textarea */}
          <p> {this.props.notes
                .split("\n")
                .map(function(item, index) {
                  return (
                    <span key={item + index}>{item}<br/></span>
                  )
                })
              }
          </p>
        </div>
        <div className="card-action right-align">
          <a href="#" onClick={this.props.onUpdate}>Update</a>
          <a href="#" onClick={this.handleDeleteClick}>Delete</a>
        </div>
      </div>
    );
  }
}

class StickyForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      title: this.props.title || '',
      notes: this.props.notes || '',
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleNotesChange(event) {
    this.setState({notes: event.target.value});
  }

  handleSaveClick = () => {

    this.props.onSave({
      id: this.props.id,
      title: this.state.title,
      notes: this.state.notes,
    });

    this.props.onClose();
  }

  //TODO: materialize-textarea still not autoresizing yet
  componentDidMount() {

    $('#notes-textarea').trigger('autoresize');
  }

  render() {

    return (
      <div className="card z-depth-5">
        <div className="card-content">
          <span className="card-title">
            <div className="input-field">
              <input placeholder="Note Title" id="note_title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
              <label htmlFor="note_title" className="active">Title</label>
            </div>
          </span>
          <div className="input-field">
            <textarea id="notes-textarea" defaultValue={this.state.notes} className="materialize-textarea sticky-textarea" onChange={this.handleNotesChange}></textarea>
            <label htmlFor="notes-textarea" className="active">Notes</label>
          </div>
        </div>
        <div className="card-action right-align">
          <a href="#" onClick={this.handleSaveClick}>Save</a>
          <a href="#" onClick={this.props.onClose}>Cancel</a>
        </div>
      </div>
    );
  }
}

class ToggleableStickyForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      isFormOpen: false,
    }
  }

  handleCloseForm = () => {
    this.setState({
      isFormOpen: false,
    });
  }

  handleOpenForm = () => {
    this.setState({
      isFormOpen: true,
    });
  }

  handleSaveClick = (newNote) => {

    this.props.onSave(newNote);
    this.handleCloseForm();
  }

  render() {

    if(this.state.isFormOpen) {
      return (
        <div className="col m8 offset-m2 s12">
          <StickyForm onSave={this.handleSaveClick} onClose={this.handleCloseForm} />
        </div>
      );
    } else {
      return (
        <a className="btn-floating btn-large waves-effect waves-light light-blue lighten-1 pulse" onClick={this.handleOpenForm}>
          <i className="material-icons">add</i>
        </a>
      );
    }
  }
}

export default StickyDashboard;
