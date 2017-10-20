import React, {PropTypes} from 'react';

export default PodcastListItem;

function PodcastListItem({podcast}) {
  console.log('podcast', podcast)
  return (
    <div className="podcast">
      {podcast['im:name'].label}
    </div>
  );
}
