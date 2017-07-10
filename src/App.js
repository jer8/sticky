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
      <div class="card blue-grey darken-1">
        <PostItDashboard />
      </div>
    );
  }
}

class PostItDashboard extends Component {
  render() {

    return (
      <div>
        <NoteItemList />
        <NoteItemList />
      </div>
    );
  }
}

class NoteItemList extends Component {
  render(){
    return (
      <div>
        <NoteItem title="26zv" comment="in sync with prod"/>
        <NoteItem title="27zv" comment="sync with prod"/>
      </div>
    );
  }
}

class NoteItem extends Component {
  render(){

    return (
      <div>
        <div>
          <label>Title</label>
        <input type='text' defaultValue={this.props.title} />
        </div>
        <div>
          <textarea defaultValue={this.props.comment}></textarea>
        </div>
      </div>
    );
  }
}

export default App;
