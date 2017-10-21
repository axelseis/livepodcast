import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './src/common/Header.js';
import Home from './src/views/Home';
import Podcast from './src/views/Podcast';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <div className="livepodcast">
            <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
            <Route path="/podcast/:podcastId" component={Podcast} />
        </div>
    </Router>,
    document.getElementById('container')
);
