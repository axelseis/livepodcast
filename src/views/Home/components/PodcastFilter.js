import React, {Component, PropTypes} from 'react';

export default class PodcastFilter extends Component {
  render() {
    return (
      <div className="podcast-filter">
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="form-control"
          onKeyUp={({target: {value}}) => this.props.onUpdate(value)}
        />
      </div>
    );
  }
}
