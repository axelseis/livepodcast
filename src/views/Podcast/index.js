import React, { Component, PropTypes } from 'react';
import PodcastCard from './components/PodcastCard'
import PodcastFeed from './components/PodcastFeed'

export default class Podcast extends Component {

  render() {
    const { podcastId } = this.props.match.params;
    return (
      <div className="container">
        <div className="row livepodcast__detail">
          <div className="col-sm-4 detail__podcast-card">
            <PodcastCard podcastId={podcastId} />
          </div>
          <div className="col-sm-8 detail__podcast-feed">
            <PodcastFeed podcastId={podcastId} />
          </div>
        </div>
      </div>
    );
  }
}
