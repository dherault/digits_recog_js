import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import { log, logStart } from './logger';
import configureStore from './state/configureStore';
import registerSideEffects from './registerSideEffects';

logStart('Hello client!');

// Redux store creation
const store = configureStore();

// Side effects activation
registerSideEffects(store);

// User interface rendering
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => log('App rendered!')
);

// Stylesheets injection
require('./stylesheets/app.css');
