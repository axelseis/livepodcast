import React, { PropTypes } from 'react';

export default PodcastListItem;

function PodcastListItem({ podcast }) {
  const imageURL = podcast['im:image'].find(image => {
    return image.attributes.height === '60'
  }).label
  return (
    <div className="podcast">
      <div className="podcast__image">
        <img src={imageURL} />
      </div>
      <div className="podcast__name">
        {podcast['im:name'].label.toUpperCase()}
      </div>
      <div className="podcast__author">
        Author: {podcast['im:artist'].label}
      </div>
    </div>
  );
}
