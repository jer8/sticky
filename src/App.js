import React, {Component} from 'react';


import './App.css';

class StickyDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stickies: [
        {
          id: '1',
          title: 'flystaging7',
          notes: 'in sync with prod'
        }, {
          id: '2',
          title: 'flystaging5',
          notes: 'with 17.2 changes'
        }, {
          id: '3',
          title: 'flystaging11',
          notes: 'with 17.2 changes'
        }
      ]
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleSave = (attrs) => {
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

  handleDelete = (id) => {

    this.setState({
      stickies: this.state.stickies.filter(sticky => {
        return sticky.id !== id;
      })
    });
  }

  render() {
    return (
      <div className="row">
        <div>
          {
            this.state.stickies.map((sticky) =>
              <Sticky title={sticky.title} notes={sticky.notes} id={sticky.id} key={sticky.id} onSave={this.handleSave} onDelete={this.handleDelete}/>
          )}
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
    let note, cardActions;

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
      <div className="card">
        <div className="card-content">
          <span className="card-title">{this.props.title}</span>
          <span>{this.props.notes}</span>
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

  render() {

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            <div className="input-field">
              <input placeholder="Note Title" id="note_title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
              <label htmlFor="note_title" className="active">Title</label>
            </div>
          </span>
          <div className="input-field">
            <textarea id="textarea1" defaultValue={this.state.notes} className="materialize-textarea" onChange={this.handleNotesChange}></textarea>
            <label htmlFor="textarea1" className="active">Notes</label>
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


export default StickyDashboard;
