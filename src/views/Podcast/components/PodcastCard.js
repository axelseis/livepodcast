import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { getPodcastData } from '../../../common/itunes-api'
import { Link } from 'react-router-dom';

export default class PodcastCard extends Component {
  constructor() {
    super()

    this.defaultData = {
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
    
    this.state = {
      data: null
    }
  }

  getData() {
    const { podcastId } = this.props;

    getPodcastData(podcastId).then(data => {
      const tempData = data || this.defaultData;
      this.setState({ 'data': tempData });
      window.scrollTo(0, 0);
    });
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { podcastId } = this.props;
    const data = this.state.data || this.defaultData;
    const imageSrc = data['im:image'].find(image => {
      return image.attributes.height === '170'
    }).label;

    return (
      <div className="podcast-card" >
        <div className="podcast-card__card">
          <Link className="podcast-card__image" to={`/podcast/${podcastId}`}>
            <img
              className="podcast-card__image"
              src={imageSrc} 
              alt="podcast image"
            />
          </Link>
          <div className="podcast-card__info">
            <Link className="podcast-card__name" to={`/podcast/${podcastId}`}>
              {data['im:name'].label}
            </Link>
            <Link className="podcast-card__artist" to={`/podcast/${podcastId}`}>
              by {data['im:artist'].label}
            </Link>
            <div className="podcast-card__description">
              <b>Description:</b><br />
              {(data.summary || { 'label': 'no description' }).label}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PodcastCard.propTypes = {
  podcastId: Proptypes.string
}
