import React, { Component, PropTypes } from 'react';
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

  onCanPlayAudio(ev){
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
        <div className="podcast-player__description"
          dangerouslySetInnerHTML={{ __html: episodeData.description }}>
        </div>
        <audio onCanPlay={onCanPlayBind} onError={onErrorBind} className="podcast-player__audio" src={episodeData.url} controls autoPlay>
        </audio>
      </div>
    );
  }
}
