import React from 'react';
import ReactDOM from 'react-dom';
import CategorySelection from './components/CategorySelection';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

if (document.getElementById('category-selection')) {
  ReactDOM.render(<CategorySelection />, document.getElementById('category-selection'));
}