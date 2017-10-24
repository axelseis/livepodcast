import React, { Component } from 'react'
import Proptypes from 'prop-types';
import PodcastCard from './components/PodcastCard'
import PodcastFeed from './components/PodcastFeed'
import PodcastPlayer from './components/PodcastPlayer'
import { setLoadingState } from '../../common/itunes-api'

export default class Podcast extends Component {

  componentWillUnmount() {
    setLoadingState(false)
  }
    
  render() {
    const { podcastId, episodeId } = this.props.match.params;
    
    return (
      <div className="row livepodcast__podcast">
        <div className="col-sm-4 podcast__podcast-card">
          <PodcastCard podcastId={podcastId} />
        </div>
        {!episodeId ? (
          <div className="col-sm-8 podcast__podcast-feed">
            <PodcastFeed podcastId={podcastId} />
          </div>
        ) : (
          <div className="col-sm-8 podcast__podcast-feed">
            <PodcastPlayer podcastId={podcastId} episodeId={episodeId} />
          </div>
        )}
      </div>
    );
  }
}

Podcast.propTypes = {
  match: Proptypes.object,
  podcastId: Proptypes.number,
  episodeId: Proptypes.number,
}
