import React, {Component} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';
import StickyForm from './StickyForm';
import StickyNote from './StickyNote';

class Sticky extends Component {

  static propTypes = {
    title: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.onDelete,

  }

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
    note = <StickyForm title={this.props.title} notes={this.props.notes} id={this.props.id} onSave={this.props.onSave}  onClose={this.handleCloseForm} />;
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

export default Sticky;
