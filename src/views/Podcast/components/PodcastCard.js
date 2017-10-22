import React, { Component } from 'react';
import { getPodcastData } from '../../../common/itunes-api'
import { Link } from 'react-router-dom';

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
      const tempData = data || this.defaultData;
        this.setState({ 'data' : tempData });
        window.scrollTo(0, 0);
      });
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { podcastId } = this.props;
    const data = this.state.data || this.state.defaultData;

    return (
      <Link className="podcast-card" to={`/podcast/${podcastId}`}>
        <img className="podcast-card__image"
          src={data['im:image'].find(image => {
            return image.attributes.height === '170'
          }).label}
        />
        <div className="podcast-card__info">
          <div className="podcast-card__name">
            {data['im:name'].label}
          </div>
          <div className="podcast-card__artist">
            by {data['im:artist'].label}
          </div>
          <div className="podcast-card__description">
            <b>Description:</b><br/>
            {(data.summary||{'label': 'no description'}).label}
          </div>
        </div>
      </Link>
    );
  }
}
