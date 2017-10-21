import React, { Component, PropTypes } from 'react';
import PodcastCard from './components/PodcastCard'
import PodcastFeed from './components/PodcastFeed'

export default class Podcast extends Component {

  render() {
    const { podcastId } = this.props.match.params;
    return (
      <div className="container">
        <PodcastCard podcastId={podcastId} />
        <PodcastFeed podcastId={podcastId} />
        </div>
    );
  }
}
