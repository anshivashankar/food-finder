import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';
import {geolocated} from 'react-geolocated';

import api from './api';
import store from './store';
import RestaurantList from './food-list';


class MainPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        location: {lat: 0, long: 0},
        restaurants: {},
      }
      this.getUserLoc();
    }

    onPositionRecieved(position) {
      let latNew = position.coords.latitude;
      let longNew = position.coords.longitude;
      this.setState({
        location: {lat: latNew, long: longNew}
      });
      this.getRestaurants();
    }

    getUserLoc() {
      navigator.geolocation.getCurrentPosition(this.onPositionRecieved.bind(this))
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
                {this.state.location.lat}
                {this.state.location.long}
                <RestaurantList />
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
  
