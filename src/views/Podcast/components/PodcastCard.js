import React, { Component } from 'react';
import { getPodcastData } from '../../../common/itunes-api'

export default class PodcastCard extends Component {
  constructor() {
    super()
    this.state = {
      data: {
        'im:image': [
          {
            'label': '',
            'attributes': { 'height': '170' }
          }
        ],
        'im:name': { 'label': 'no name' },
        'im:artist': { 'label': 'unknown' },
        'summary': { 'label': 'no description' }
      }
    }
  }

  getData() {
    const { podcastId } = this.props;
    
    getPodcastData(podcastId).then(data => {
      console.log('data', data)
      if (data) {
        this.setState({ data });
      }
    });
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { data } = this.state;

    return (
      <div className="podcastCard">
        <img className="podcastCard__image"
          src={data['im:image'].find(image => {
            return image.attributes.height === '170'
          }).label}
        />
        <div className="podcastCard__name">
          {data['im:name'].label}
        </div>
        <div className="podcastCard__artist">
          {data['im:artist'].label}
        </div>
        <div className="podcastCard__description">
          {(data.summary||{'label': 'no description'}).label}
        </div>
      </div>
    );
  }
}
