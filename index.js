import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from './src/views/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/css/styles.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
    </Router>,
    document.getElementById('container')
);
