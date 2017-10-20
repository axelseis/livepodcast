import React, {Component, PropTypes} from 'react';
import PodcastFilter from './components/PodcastFilter'
import PodcastList from './components/PodcastList'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {filter: ''}
  }

  handleFilterUpdate = (filter) => {
    this.setState({filter})
  };

  render() {
    const {filter} = this.state;

    return (
      <div className="container">
          <h3>Podcaster</h3>
          <PodcastFilter onUpdate={this.handleFilterUpdate} />
          <PodcastList filter={filter}/>
      </div>
    );
  }
}
