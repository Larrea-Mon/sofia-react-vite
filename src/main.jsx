import React from 'react';
import {createRoot} from "react-dom/client";
//import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
import axios from "axios";

import App from './App.jsx';
import config from './config';
import createRootReducer from './reducers';

import { doInit } from "./actions/auth";
import { createHashHistory } from "history";

// ** Fake Database
import './fakeDB';

const history = createHashHistory();

export function getHistory() {
  return history;
}

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      thunk
    )
  )
);

store.dispatch(doInit());

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


// Service worker is not supported in Vite by default. If needed, use Vite plugins for PWA support.
