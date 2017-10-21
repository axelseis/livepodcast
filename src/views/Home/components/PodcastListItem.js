import React, {Component} from 'react';
import {Link } from 'react-router-dom';

export default class PodcastListItem extends Component {
  render() {
    const imageURL= this.props.podcast['im:image'].find(image => {
      return image.attributes.height === '60'
    }).label;
    const pId= this.props.podcast.id.attributes["im:id"];
    const pName = this.props.podcast['im:name'].label;
    const pArtist = this.props.podcast['im:artist'].label;

    return (
      <Link className="podcast-list-item" to={'/podcast/' + pId}>
        <div className="podcast-list-item__image">
          <img src={imageURL} />
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
