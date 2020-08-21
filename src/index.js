import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store from './store/reduxStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';


ReactDOM.render(
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
