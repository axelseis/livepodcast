import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './src/common/Header.js';
import Home from './src/views/Home';
import Podcast from './src/views/Podcast';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <div className="livepodcast__app container-fluid">
            <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
            <Switch>
                <Route path="/podcast/:podcastId/episode/:episodeId" component={Podcast} />
                <Route path="/podcast/:podcastId" component={Podcast} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('livepodcast')
);
