import React, { Component, PropTypes } from 'react';
import { getPodcastAudioFile } from '../../../common/itunes-api'

export default class PodcastPlayer extends Component {
  constructor() {
    super()
    this.state = {
      audioFile: null, 
    }
  }

  getAudioFile() {
    const { podcastId, episodeId } = this.props;
    
    getPodcastAudioFile(podcastId,episodeId).then(audioFile => {
        this.setState({ audioFile });
    });
  }
  
  componentWillMount() {
    this.getAudioFile();
    window.scrollTo(0, 0);
  }
  
  render() {
    const { audioFile } = this.state;

    return (
        <div className="col-sm-8 podcast__podcast-player">
          <audio src={audioFile} controls autoplay></audio>
        </div>
    );
  }
}
