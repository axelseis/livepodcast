import React, { PropTypes } from 'react';

export default PodcastListItem;

function PodcastListItem({ podcast }) {
  const imageURL = podcast['im:image'].find(image => {
    console.log('image', image.attributes.height === '60')
    return image.attributes.height === '60'
  }).label
  console.log('imageURL', imageURL)
  return (
    <div className="podcast">
      <div className="podcast__image">
        <img src={imageURL} />
      </div>
      <div className="podcast__name">
        {podcast['im:name'].label}
      </div>
    </div>
  );
}
