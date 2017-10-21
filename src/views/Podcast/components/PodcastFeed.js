import React, { Component } from 'react';
import { getPodcastFeed } from '../../../common/itunes-api'

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

    return (
      <div className="podcast-feed">
        {
          feedElements.map((element, index) =>
            <div key={index} className="podcast-feed__item">
              <div className="podcast-feed__item__title">
                {element.title}
              </div>
              <div className="podcast-feed__item__date">
                {element.date}
              </div>
              <div className="podcast-feed__item__duration">
                {element.duration}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
