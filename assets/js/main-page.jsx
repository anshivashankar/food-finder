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
      console.log("position");
      let latNew = position.coords.latitude;
      let longNew = position.coords.longitude;
      store.dispatch({
        type: 'NEW_LOCATION',
        data: {lat: latNew, long: longNew},
      });
      this.setState({
        location: {lat: latNew, long: longNew}
      });
      this.getRestaurants();
    }

    getUserLoc() {
      navigator.geolocation.getCurrentPosition(this.onPositionRecieved.bind(this));

      navigator.geolocation.watchPosition(this.onPositionRecieved.bind(this));
    }

    getRestaurants() {
      api.fetch_restaurants(this.state.location);
    }
    
    render() {
      if (!navigator.geolocation){
        return <p>Geolocation is not supported by your browser</p>;
      }
        return <div class="container">
        <div class="row">
          <div class="col-sm">
          </div>
          <div class="col-sm">
            <h1>Welcome to Food Finder!</h1>
          </div>
          <div class="col-sm">
          </div>
        </div>

        <div class="row">
          {this.state.location.lat}
          {this.state.location.long}
          <RestaurantList />
        </div>
      </div>; 
        }
    }

function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }

  export default connect(state2props)(MainPage);
  
