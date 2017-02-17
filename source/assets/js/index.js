import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { Router, browserHistory } from 'react-router';


const store = configureStore(window.__PRELOADED_STATE__);

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={ routes } history={ browserHistory } />
  </Provider>, document.getElementById('root')
);

