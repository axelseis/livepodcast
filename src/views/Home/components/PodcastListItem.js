import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {Link } from 'react-router-dom';

export default class PodcastListItem extends Component {
  render() {
    const {podcast} = this.props; 
    const imageURL= podcast['im:image'].find(image => {
      return image.attributes.height === '170'
    }).label;
    const pId= podcast.id.attributes["im:id"];
    const pName = podcast['im:name'].label;
    const pArtist = podcast['im:artist'].label;

    return (
      <Link className="podcast-list-item" to={`/podcast/${pId}`}>
        <div className="podcast-list-item__image">
          <img src={imageURL} alt="" />
        </div>
        <div className="podcast-list-item__name">
          {pName}
        </div>
        <div className="podcast-list-item__author">
          Author: {pArtist}
        </div>
      </Link>
    );
  }
}

PodcastListItem.propTypes = {
  podcast: Proptypes.object,
}