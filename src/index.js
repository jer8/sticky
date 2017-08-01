'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
//https://github.com/facebookincubator/create-react-app/issues/679
//https://stackoverflow.com/questions/41657849/cannot-import-materialize-css-in-react-project-to-use-chips
// eslint-disable-next-line
import $ from 'jquery/src/jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
