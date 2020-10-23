import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore.js';
import App from './App';

const state = window.__STATE__;

delete window.__STATE__;

const store = configureStore(state);

console.log('Before: ', store.getState());

hydrate(
   <Provider store={store}>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
   </Provider>
  , document.getElementById('root')
)
