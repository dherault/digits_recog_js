import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import promiseMiddleware from './promiseMiddleware';
import { logReducer } from '../logger';

const loggingMiddleware = () => next => action => { // Long live fun prog
  logReducer(action.type, action.payload || '');
  next(action);
};

export default function configureStore(initialState={}) {

  // App creation
  const reducer = combineReducers(reducers);
  const enhancer = compose(
    applyMiddleware(promiseMiddleware, loggingMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f => f)
  );

  const store = createStore(reducer, initialState, enhancer);

  // Enables Webpack hot module replacement for reducers
  if (module.hot) module.hot.accept('./reducers.js', () => store.replaceReducer(require('./reducers.js')));

  return store;
}
