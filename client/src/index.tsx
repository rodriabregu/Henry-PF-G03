import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import store from './Redux/Store';
import { Provider } from 'react-redux';

import { Auth0Provider } from '@auth0/auth0-react';
import config from './config';
ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
      <Auth0Provider
       domain='dev-kpo8zvgy.us.auth0.com' 
       clientId='Bf8TfhJE1SbgHOjHDLDgjJQEIsYHTWTD' 
       redirectUri={`https://${config.REACT_APP_API_URL}:${config.port}/home`}
//       redirectUri='http://localhost:3000/home'
//       redirectUri='https://grupo03.sytes.net:3000/home'
       audience='http://securityApi'
       useRefreshTokens
       cacheLocation="localstorage"
      >
      <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
