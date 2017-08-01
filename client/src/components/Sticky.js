import React, {Component} from 'react';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';
import StickyForm from './StickyForm';
import StickyNote from './StickyNote';

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

export default Sticky;
