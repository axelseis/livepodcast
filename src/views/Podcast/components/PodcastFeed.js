import React, { Component } from 'react';
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
        {
          feedElements.map((element, index) =>
            <PodcastFeedItem key={index} element={element} podcastId={podcastId} />
          )
        }
      </div>
    );
  }
}
