import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import "./lib/env"

if (process.env.REACT_APP_GIPHY_API_KEY === '') {
  console.log("Please add giphy api key to the .env file!");
  console.log("Run docker-compose up --build");
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
