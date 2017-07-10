import React, { Component } from 'react';
import './App.css';

//https://github.com/facebookincubator/create-react-app/issues/679
//https://stackoverflow.com/questions/41657849/cannot-import-materialize-css-in-react-project-to-use-chips
import $ from 'jquery/src/jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <div className="container col">
        <PostItDashboard />
      </div>
    );
  }
}

class PostItDashboard extends Component {
  render() {

    return (
      <div className="row">
        <NoteItemList listTitle="List 1"/>
        <NoteItemList listTitle="List 2"/>
        <NoteItemList listTitle="List 3"/>
      </div>
    );
  }
}

class NoteItemList extends Component {
  render(){
    return (
      <div className="card col m6 s12">
        <div className="card-content">
          <span className="card-title">{this.props.listTitle}</span>
          <ul className="collection teal">
            <NoteItem title="item1Title" comment="item1Comment"/>
            <NoteItem title="item2Title" comment="item2Comment"/>
          </ul>
        </div>
      </div>

    );
  }
}

class NoteItem extends Component {
  render(){

    return (
      <li className="collection-item">
        <div className="input-field">
          <input id='1' type='text' defaultValue={this.props.title}/>
          <label for='1'>Item Name</label>
        </div>
        <div className="input-field">
          <textarea id="textarea1" defaultValue={this.props.comment} className="materialize-textarea"></textarea>
          <label for="textarea1">Notes</label>
        </div>
      </li>
    );
  }
}

export default App;
