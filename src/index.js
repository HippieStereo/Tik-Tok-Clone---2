import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import App from './App';
import Header from './components/Header';

ReactDOM.render(
    <Router>
      <Header />
      <App />
    </Router>
    ,document.getElementById('root')
);