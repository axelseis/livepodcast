import React, {Component, PropTypes} from 'react';
import PodcastListItem from './PodcastListItem';
import {getPodcasts} from '../../../utils/itunes-api'

export default class PodcastList extends Component {
  constructor() {
    super()
    this.state = {podcasts: []}
  }

  getPodcasts() {
    getPodcasts().then(podcasts => {
      this.setState({podcasts});
    });
  }

  componentWillMount() {
    this.getPodcasts();
  }

  render() {
    const {podcasts} = this.state
    return (
      <div className="d-flex justify-content-between flex-wrap">
        {renderPodcasts(podcasts)}
      </div>
    );
  }
}

function renderPodcasts(podcasts) {
  return podcasts
    .map(podcast => <PodcastListItem key={podcast.id.attributes["im:id"]} podcast={podcast} />);
}
