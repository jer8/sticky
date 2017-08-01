'use strict';

import React, {Component} from 'react';
import $ from 'jquery/src/jquery';
import StickyForm from './StickyForm';

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

export default ToggleableStickyForm;
