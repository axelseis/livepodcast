import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PodcastFeedItem extends Component {
  render() {
    const {element, podcastId} = this.props;

    return (
      <Link className="podcast-feed-item" to={`/podcast/${podcastId}/episode/${element.id}`}>
        <div className="podcast-feed__item__title">
          {element.title}
        </div>
        <div className="podcast-feed__item__date">
          {element.date}
        </div>
        <div className="podcast-feed__item__duration">
          {element.duration}
        </div>
      </Link>
    );
  }
}
