import React, { Component, PropTypes } from 'react';
import PodcastListItem from './PodcastListItem';
import { getPodcasts } from '../../../common/itunes-api'

export default class PodcastList extends Component {
  constructor() {
    super()

    this.filteredNumber = 0;

    this.state = { 
      podcasts: [],
    }
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

  shouldComponentUpdate(nextProps){
    return this.props.filter==='' && !this.filteredNumber 
            || this.props.filter !== nextProps.filter;
  }

  componentDidUpdate(){
    this.props.onUpdate(this.filteredNumber)
  }

  render() {
    const { podcasts } = this.state;
    const { filter } = this.props;

    const filteredList = renderPodcasts(podcasts, filter.toLowerCase());
    this.filteredNumber = filteredList.length;

    return (
      <div className="podcast-list">
        {filteredList}
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
