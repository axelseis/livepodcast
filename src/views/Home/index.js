import React, {Component, PropTypes} from 'react';
import PodcastList from './components/PodcastList'

export default class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-9">
            <h3>Podcaster</h3>
            <PodcastList />
          </div>
        </div>
      </div>
    );
  }
}
