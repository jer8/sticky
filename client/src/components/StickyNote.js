import React, {Component} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';

class StickyNote extends Component {

  static propTypes = {
    title: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

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
          <img src="images/card-image.png" alt="Add New Note Icon"></img>
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
          <a role="button" onClick={this.props.onUpdate}>Update</a>
          <a role="button" onClick={this.handleDeleteClick}>Delete</a>
        </div>
      </div>
    );
  }
}

export default StickyNote;
