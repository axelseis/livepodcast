import React, { Component } from 'react';
import { getPodcastData } from '../../common/itunes-api'

export default class Podcast extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  getData() {
    const { podcastId } = this.props.match.params;
    getPodcastData(podcastId).then(data => {
      console.log('data', data)
      this.setState({ data });
    });
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { podcastId } = this.props.match.params;
    const { data } = this.state;

    return (
      <div className="container">
        <h3>Podcaster ELLLLL PODCAST {podcastId} {data.artistId}</h3>
        <div className="podcastCard">
          <img
            src={data.artworkUrl60}
            className="podcastCard__image"
            alt="Podcast Image"
          />
          <h2>{data.collectionName}</h2>
          <h5>{data.login}</h5>
        </div>
      </div>
    );
  }
}
