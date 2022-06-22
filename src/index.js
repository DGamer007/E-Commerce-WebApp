import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './Context/AuthContext';
import App from './App';
import './styles/globals.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
