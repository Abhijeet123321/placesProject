import React              from 'react';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import {Link}             from '@reach/router';
import * as Config        from '../config.json'

class Places extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.places && this.state.placesLoaded === true) {
      return (
        <p>Error loading places. Try again later.</p>
      );
    } else if (!this.state.places) {
      return (
        <p>Loading places...</p>
      );
    } else if (this.state.places.length === 0) {
      return (
        <p>Sorry, no places are available</p>
      );
    } else {
      return (
        <div>
        <ul>
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </li>
</ul>

          <h1>All places in the database</h1>

          <ul>
            {this.state.places.map(place => (
              <li key={`place_${place._id}`}><Link to={`/place/${place._id}`}>{place.title}{place.description}</Link></li>
            ))}
          </ul>
          <p><Link to='/add-place'>Add a new place</Link></p>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(Config.placesAPI))
      .then (res  => res.json())
      .then (json => {
        this.setState({places       : json});
        this.setState({placesLoaded : true});
      })
      .catch(err => {
        this.setState({placesLoaded: true});
      });
  }

}

export default Places;

