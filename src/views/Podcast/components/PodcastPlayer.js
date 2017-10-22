import React, { Component, PropTypes } from 'react';
import { getEpisodeData } from '../../../common/itunes-api'

export default class PodcastPlayer extends Component {
  constructor() {
    super()
    this.state = {
      url: null,
      description: '' 
    }
  }

  componentWillMount() {
    const { podcastId, episodeId } = this.props;
    window.scrollTo(0, 0);
    
    getEpisodeData(podcastId,episodeId).then(episodeData => {
        this.setState( episodeData );
    });
  }
  
  render() {
    const episodeData = this.state;

    return (
        <div className="podcast__podcast-player">
          <div className="podcast-player__description" dangerouslySetInnerHTML={{__html:episodeData.description}}>
          </div>
          <audio className="podcast-player__audio" controls autoPlay>
            <source src={episodeData.url} type="audio/mp3"/>
          </audio>
        </div>
    );
  }
}
