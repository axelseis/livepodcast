import React, { Component, PropTypes } from 'react';
import PodcastListItem from './PodcastListItem';
import { getPodcasts } from '../../../common/itunes-api'

export default class PodcastList extends Component {
  constructor() {
    super()
    this.state = { podcasts: [] }
  }

  getPodcasts() {
    getPodcasts().then(podcasts => {
      this.setState({ podcasts });
    });
  }

  componentWillMount() {
    this.getPodcasts();
    window.scrollTo(0, 0);
  }

  render() {
    const { podcasts } = this.state;
    const { filter } = this.props;

    return (
      <div className="podcast-list">
        {renderPodcasts(podcasts, filter.toLowerCase())}
      </div>
    );
  }
}

function renderPodcasts(podcasts, filter) {
  
  return podcasts
    .filter(podcast => {
      const pName = podcast["im:name"].label
      const pArtist = podcast["im:artist"].label

      return !filter ||
        (pName && pName.toLowerCase().includes(filter)) ||
        (pArtist && pArtist.toLowerCase().includes(filter))
    })
    .map(podcast => <PodcastListItem key={podcast.id.attributes["im:id"]} podcast={podcast} />);
}
