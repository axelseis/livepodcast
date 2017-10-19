import React, {PropTypes} from 'react';

export default PodcastListItem;

function PodcastListItem({podcast}) {
  console.log('podcast', podcast)
  return (
    <li className="border-bottom">
      <div className="pull-right">
        {podcast['im:name'].label}
      </div>
    </li> 
  );
}
