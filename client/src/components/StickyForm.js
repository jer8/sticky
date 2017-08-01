import React, {Component} from 'react';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';

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
          <a role="button" onClick={this.handleSaveClick}>Save</a>
          <a role="button" onClick={this.props.onClose}>Cancel</a>
        </div>
      </div>
    );
  }
}

export default StickyForm;
