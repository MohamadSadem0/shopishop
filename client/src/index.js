import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./global.css"

import { Provider } from 'react-redux';
import { reducers } from "./redux/reducers"
import thunk from "redux-thunk"
import {BrowserRouter} from "react-router-dom"
import { createStore, applyMiddleware, compose} from "redux"
import {GoogleOAuthProvider} from "@react-oauth/google"
import { AuthProvider } from './context/AuthContext';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider
                clientId={`447931070548-ovg5u9tsc452bqaceijlrtaqcsn3elgm.apps.googleusercontent.com`}>
       <App />
       </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
    </AuthProvider>
  </React.StrictMode>
);


reportWebVitals();
