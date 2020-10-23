import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import App from'./App';

function generateHTML (store, url) {
   const history = createMemoryHistory();

   return (
      renderToString(
         <Provider store={store}>
            <StaticRouter location={url} history={history}>
               <App/>
            </StaticRouter>
         </Provider>
      )
   );
}

module.exports = function render(initialState, url) {

   const store = configureStore(initialState);

   let content = generateHTML (store, url);

   const preloadedState = store.getState();

   return {content, preloadedState};

}