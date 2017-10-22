import React, {Component, PropTypes} from 'react';

export default class PodcastFilter extends Component {
  
  render() {
    const {number} = this.props;

    return (
      <h3 className="podcast-filter">
        <span className="badge badge-success">{number}</span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="form-control podcast-filter__input"
          onKeyUp={({target: {value}}) => this.props.onUpdate(value)}
        />
      </h3>
    );
  }
}
