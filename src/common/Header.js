import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setLoadingHandler } from './itunes-api.js';

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  onLoadingChange(loading) {
    this.setState({ loading })
  }

  componentWillMount() {
    setLoadingHandler(this.onLoadingChange.bind(this));
  }

  render() {
    const { loading } = this.state;

    return (
      <div className=" row livepodcast__header" loading={loading.toString()}>
        <div className="header__loading"></div>
        <Link to="/">
          <h3>Podcaster</h3>
        </Link>
      </div>
    );
  }
}
