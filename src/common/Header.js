import React, {Component} from 'react';
import {Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className="livepodcast__header">
        <Link to="/">
            <h3>Podcaster</h3>
        </Link>
      </div>
    );
  }
}
