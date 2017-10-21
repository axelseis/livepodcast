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
      console.log('audioFile', audioFile)
        this.setState({ audioFile });
    });
  }
  
  componentWillMount() {
    this.getAudioFile();
  }
  
  render() {
    const { audioFile } = this.state;

    return (
        <div className="col-sm-8 podcast__podcast-player">
          <audio src={audioFile} controls></audio>
        </div>
    );
  }
}
