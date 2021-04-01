import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from './Context';
// using our provider from context to give the entire app access to context if we call a compoent with it
ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
