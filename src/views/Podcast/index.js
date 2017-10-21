import React, { Component, PropTypes } from 'react';
import PodcastCard from './components/PodcastCard'
import PodcastFeed from './components/PodcastFeed'

export default class Podcast extends Component {

  render() {
    const { podcastId } = this.props.match.params;
    return (
        <div className="row livepodcast__podcast">
          <div className="col-sm-4 podcast__podcast-card">
            <PodcastCard podcastId={podcastId} />
          </div>
          <div className="col-sm-8 podcast__podcast-feed">
            <PodcastFeed podcastId={podcastId} />
          </div>
        </div>
    );
  }
}
