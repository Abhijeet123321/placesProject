import React              from 'react';
import {Link}             from '@reach/router';
import urlToCurrentDomain from '../lib/urlToCurrentDomain';
import * as Config        from '../config.json'
import '../components/sass/main.scss'; 

class Place extends React.Component {

  // #######################################################
  // # Local state
  // #######################################################

  state = {}

  // #######################################################
  // # Render
  // #######################################################

  render() {

    if (!this.state.place && this.state.placeLoaded === true) {
      return (
        <p>Error loading places. Try again later.</p>
      );
    } else if (!this.state.place) {
      return (
        <p>Loading places...</p>
      );
    } else if (this.state.place.length === 0) {
      return (
        <p>Sorry, no places are available</p>
      );
    } else {
      return (
        <div>
          <h1>{this.state.place.title}</h1>
          <h2>{this.state.place.Description}</h2>
          <Link to='/'>Back to All places</Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetch(urlToCurrentDomain(`${Config.placesAPI}/${this.props.placeID}`))
      .then (res  => res.json())
      .then (json => {
        this.setState({place       : json});
        this.setState({placeLoaded : true});
      })
      .catch(err => {
        this.setState({placeLoaded: true});
      });
  }

}

export default Place;
