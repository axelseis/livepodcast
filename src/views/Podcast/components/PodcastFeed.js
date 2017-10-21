import React, { Component } from 'react';
import { getPodcastFeed } from '../../../common/itunes-api'

export default class PodcastFeed extends Component {
  constructor() {
    super()
    this.state = {feed: []}
  }

  getFeed() {
    const { podcastId } = this.props;
    
    getPodcastFeed(podcastId).then(feed => {
      console.log('feed', feed)
      if (feed) {
        this.setState({ feed });
      }
    });
  }

  componentWillMount() {
    this.getFeed();
  }

  render() {
    const { data } = this.state;

    return (
      <div className="podcastFeed">
      </div>
    );
  }
}
