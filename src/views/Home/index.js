import React, { Component } from 'react';
import Proptypes from 'prop-types';
import PodcastFilter from './components/PodcastFilter'
import PodcastList from './components/PodcastList'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      podcastNumber: 0
    }
  }

  onUpdatePodcastFilter = (filter) => {
    this.setState({ filter })
  };

  onUpdatePodcastList = (podcastNumber) => {
    this.setState({podcastNumber})
  };

  render() {
    const { filter, podcastNumber } = this.state;

    return (
      <div className="livepodcast__home">

        <div className="home__podcast-filter">
          <PodcastFilter number={podcastNumber} onUpdate={this.onUpdatePodcastFilter} />
        </div>
        <div className="home__podcast-list">
          <PodcastList onUpdate={this.onUpdatePodcastList} filter={filter} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  podcastNumber: Proptypes.number,
  filter: Proptypes.string
}
