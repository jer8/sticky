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
  }

  render() {
    return (
      <div className="row">
        <div>
          {
            this.state.stickies.map((sticky) =>
              <Sticky title={sticky.title} notes={sticky.notes} key={sticky.id}/>
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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleSave = (attrs) => {
    //TODO
  }

  handleDelete = (id) => {
    //TODO
  }

  render() {

    const {isFormOpen} = this.state;
    let note, cardActions;

  if (isFormOpen) {

    note = <StickyForm title={this.props.title} notes={this.props.notes} onSave={this.handleSave} onCancel={this.handleCancel} />;

  } else {

    note = <StickyNote title={this.props.title} notes={this.props.notes} onUpdate={this.handleUpdate} onDelete={this.handleDele}/>;
  }

    return (
      <div className="col m8 offset-m2 s12">
        {note}
      </div>
    );
  }
}

class StickyNote extends Component {

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">{this.props.title}</span>
          <span>{this.props.notes}</span>
        </div>
        <div className="card-action right-align">
          <a href="#" onClick={this.props.onUpdate}>Update</a>
          <a href="#" onClick={this.props.onDelete}>Delete</a>
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
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleNotesChange(event) {
    this.setState({notes: event.target.value});
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
          <a href="#" onClick={this.props.onSave}>Save</a>
          <a href="#" onClick={this.props.onCancel}>Cancel</a>
        </div>
      </div>
    );
  }
}


export default StickyDashboard;
