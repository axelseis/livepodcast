import React, { Component } from 'react';
import { getPodcastFeed } from '../../../common/itunes-api'

export default class PodcastFeed extends Component {
  constructor() {
    super()
    this.state = { feedElements: [] }
  }

  getFeed() {
    const { podcastId } = this.props;

    getPodcastFeed(podcastId).then(feed => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = feed.data;

      const feedElements = Array.from(
        tempDiv.getElementsByTagName('item') ||
        tempDiv.getElementsByClassName('regularitem')
      ).map(element => {
        console.log('element', element)
        return ({
          title: element.getElementsByTagName('title')[0].innerHTML,
          date: element.getElementsByTagName('pubdate')[0].innerHTML,
          duration: element.getElementsByTagName('itunes:duration')[0].innerHTML
        })
      })
      console.log('feedElements', feedElements)

      //div/rss/channel/item[1]/title
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
