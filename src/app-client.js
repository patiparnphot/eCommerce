import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import BlogPage from './pages/BlogPage';
import App from './App';

const store = configureStore();

console.log('Before: ', store.getState());

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
  , document.getElementById('root'));
};
