import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import throttle from 'lodash/throttle'
import * as Actions from './actions'
import { loadState, saveState } from './localStorage'


//former code

// const persistedState = loadState();
//
// const store = createStore(reducers, persistedState,
//   applyMiddleware(thunk)
// );
//
// store.subscribe(throttle(() => {
//   saveState(store.getState())
// }, 1000));



//trying simplified version

const store = createStore(reducers,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  store.getState()
});


// Connect our store to the reducers


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
