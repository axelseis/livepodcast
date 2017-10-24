import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { getEpisodeData, setLoadingState } from '../../../common/itunes-api'

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
    
    getEpisodeData(podcastId, episodeId).then(episodeData => {
      setLoadingState(true)
      this.setState(episodeData);
    });
  }

  onCanPlayAudio(){
    setLoadingState(false)
  }

  onErrorAudio(err){
    setLoadingState(false)
    console.log('error loading audio: ', err)
  }

  componentWillUnmount() {
    setLoadingState(false)
  }
    
  render() {
    const episodeData = this.state;
    const onCanPlayBind = this.onCanPlayAudio.bind(this);
    const onErrorBind = this.onErrorAudio.bind(this)

    return (
      <div className="podcast__podcast-player">
        <h4 className="podcast-player__title">
          {episodeData.title}
        </h4>
        <div 
          className="podcast-player__description" 
          dangerouslySetInnerHTML={{ __html: episodeData.description }} 
        />
        <audio 
          className="podcast-player__audio"
          onCanPlay={onCanPlayBind}
          onError={onErrorBind}
          src={episodeData.url}
          controls
          autoPlay 
        />
      </div>
    );
  }
}

PodcastPlayer.propTypes = {
  podcastId: Proptypes.string,
  episodeId: Proptypes.number,
}
