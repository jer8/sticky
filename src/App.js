import React, {Component} from 'react';
import './App.css';

//https://github.com/facebookincubator/create-react-app/issues/679
//https://stackoverflow.com/questions/41657849/cannot-import-materialize-css-in-react-project-to-use-chips
import $ from 'jquery/src/jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'masonry-layout';

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
        }
      ]
    };
  }

  render() {

    return (
      <div className="container row">
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
    let note, cardActions;


  if (isFormOpen) {

    note = <StickyForm title={this.props.title} notes={this.props.notes} />;
    cardActions = <CardActions option1="Save" option2="Cancel" option1onClick={this.handleCancel} option2onClick={this.handleCancel} />;

  } else {
    note = <StickyNote title={this.props.title} notes={this.props.notes}/>;
    cardActions = <CardActions option1="Update" option2="Delete" option1onClick={this.handleUpdate} option2onClick={this.handleUpdate} />;
  }

    return (
      <div className="col m6 s12">
        <div className="card">
          {note}
          {cardActions}
        </div>
      </div>

    );
  }
}

class StickyNote extends Component {

  render() {
    return (
      <div className="card-content">
        <span className="card-title">{this.props.title}</span>
        <span>{this.props.notes}</span>
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

export default StickyDashboard;
