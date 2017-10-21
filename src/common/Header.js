import React, {Component} from 'react';
import {Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <Link className="container" to="/">
          <h3>Podcaster</h3>
      </Link>
    );
  }
}
