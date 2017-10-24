import React, {Component} from 'react';
import Proptypes from 'prop-types';
export default class PodcastFilter extends Component {
  
  render() {
    const {number} = this.props;

    return (
      <h4 className="podcast-filter">
        <span className="badge badge-info">{number}</span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="form-control podcast-filter__input"
          onKeyUp={({target: {value}}) => this.props.onUpdate(value)}
        />
      </h4>
    );
  }
}

PodcastFilter.propTypes = {
  number: Proptypes.number,
  onUpdate: Proptypes.func
}