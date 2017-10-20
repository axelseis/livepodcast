import React, {Component, PropTypes} from 'react';
import PodcastList from './components/PodcastList'

export default class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
          <h3>Podcaster</h3>
          <PodcastList />
      </div>
    );
  }
}
