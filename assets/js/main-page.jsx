import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';
import {geolocated} from 'react-geolocated';

import api from './api';
import store from './store';


class MainPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: this.getUserLoc(),
        restaurants: {},
      }
    }

    onPositionRecieved(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.setState({
        location: {lat, long}
      })
    }

    getUserLoc() {
      navigator.geolocation.getCurrentPosition(this.onPositionRecieved)
    }

    getRestaurants() {
      api.fetch_restaurants(this.state.location);
    }
    
    render() {
      if (!navigator.geolocation){
        return <p>Geolocation is not supported by your browser</p>;
      }
        return <div>
                <h1> This is where the magic happens </h1>
                {this.state.location}
            </div>
            }
    }

function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }

  export default connect(state2props)(MainPage);
  