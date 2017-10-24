import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { getPodcastFeed } from '../../../common/itunes-api'
import PodcastFeedItem from './PodcastFeedItem';

export default class PodcastFeed extends Component {
  constructor() {
    super()
    this.state = {
      feedElements: []
    }
  }

  getFeed() {
    const { podcastId } = this.props;

    getPodcastFeed(podcastId).then(feedElements => {
      if (feedElements) {
        this.setState({ feedElements });
      }
    });
  }

  componentWillMount() {
    this.getFeed();
  }

  render() {
    const { feedElements } = this.state;
    const { podcastId } = this.props;

    return (
      <div className="podcast-feed">
        <h5 className="podcast-feed__header">
          Episodes: {feedElements.length}
        </h5>
        <div className="podcast-feed__list">
          <div className="podcast-feed__list__header">
            <div className="podcast-feed__item__title">Title</div>
            <div className="podcast-feed__item__date">Date</div>
            <div className="podcast-feed__item__duration">Duration</div>
          </div>
          {
            feedElements.map((element, index) =>
              <PodcastFeedItem key={index} element={element} podcastId={podcastId} />
            )
          }
        </div>
      </div>
    );
  }
}

PodcastFeed.propTypes = {
  podcastId: Proptypes.string,
}
