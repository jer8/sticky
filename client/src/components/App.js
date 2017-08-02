import React, {Component} from 'react';
// eslint-disable-next-line
import $ from 'jquery/src/jquery';
import './App/App.css';
import ToggleableStickyForm from './ToggleableStickyForm';
import Sticky from './Sticky';
import StickyService from '../helpers/StickyService';

class StickyDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stickies: []
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchStickiesFromServer = this.fetchStickiesFromServer.bind(this);
  }

  componentDidMount() {

    this.fetchStickiesFromServer();
    setInterval(this.fetchStickiesFromServer, 5000);
  }

  fetchStickiesFromServer = () => {
  StickyService.fetchStickies((stickies) => this.setState({stickies}));
  }

  handleUpdate = (attrs) => {
     this.updateSticky(attrs);
  }

  updateSticky = (attrs) => {

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

    // update sticky in backend
    StickyService.updateSticky(attrs);
  }

  handleCreate = (sticky) => {
    this.createSticky(sticky);
  }

  createSticky = (sticky) => {
    sticky = {
      id: Date.now(),
      title: sticky.title,
      notes: sticky.notes,
    }

    this.setState({
      stickies: this.state.stickies.concat(sticky)
    })

    // save new sticky in backend
    StickyService.createSticky(sticky);

  }

  handleDelete = (id) => {

    this.setState({
      stickies: this.state.stickies.filter(sticky => {
        return sticky.id !== id;
      })
    });

    // delete sticky in backend
    StickyService.deleteSticky({id});
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
