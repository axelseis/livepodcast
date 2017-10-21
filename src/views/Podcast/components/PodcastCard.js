import React, { Component } from 'react';
import { getPodcastData } from '../../../common/itunes-api'

export default class PodcastCard extends Component {
  constructor() {
    super()
    this.state = {
      data: null, 
      defaultData: {
        'im:image': [
          {
            'label': '../../src/assets/default-placeholder-300x300.png',
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
      const tempData = data || this.defaultData;
        this.setState({ 'data' : tempData });
    });
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const data = this.state.data || this.state.defaultData;

    return (
      <div className="podcast-card">
        <img className="podcast-card__image"
          src={data['im:image'].find(image => {
            return image.attributes.height === '170'
          }).label}
        />
        <div className="podcast-card__name">
          {data['im:name'].label}
        </div>
        <div className="podcast-card__artist">
          {data['im:artist'].label}
        </div>
        <div className="podcast-card__description">
          {(data.summary||{'label': 'no description'}).label}
        </div>
      </div>
    );
  }
}
