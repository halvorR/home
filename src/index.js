import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import store from './api/store.js';



import App from './App.jsx';
import Root from './routes/Root.jsx';

let rootElement = document.createElement("div");
rootElement.id = 'app';
document.body.appendChild(rootElement);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router basename={`/`}>
        <Route path={'*'} exact component={Root} />
      </Router>
    </App>
  </Provider>,
  rootElement
);
