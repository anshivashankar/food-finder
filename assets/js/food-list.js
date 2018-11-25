import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

var location;

export default connect(({restaurants, location}) => ({restaurants, location}))((props) => {
  let restaurants = props.restaurants;
  location = props.location;
  let restaurant_list = _.map(restaurants, (r) => <Restaurant key={r.id} restaurant={r} />);
   
  return <div class="row">
        {restaurant_list}
      </div>;
});

function Restaurant(props) {
  let {restaurant} = props;
  let R = 6371;
  let resLocation = restaurant["geometry"]["location"];
  let d = getDistance(resLocation["lat"], location["lat"], resLocation["lng"], location["long"]);

  let open = _.get(restaurant["opening_hours"], 'open_now');
  let openSign;
  if(open) {
    openSign = "Open Now";
  }
  else if(open == null) {
    openSign = " ";
  }
  else {
    openSign = "Closed";
  }

  return <div class="col-sm-6 mb-3">
    <div class="card text-white bg-dark mb-3">
    <h5 class="card-header">{restaurant["name"]}</h5>
      <div class="card-body">
        <p class="card-text">Price Range: {restaurant["price_level"]}</p>
        <p class="card-text">Place Holder Rating: {restaurant["rating"]}</p>
        <p class="card-text">Address: {restaurant["vicinity"]}</p>
        <p class="card-text">{openSign} </p>
        <p class="card-text"> Miles Away: {d} </p>
        <a href="#" class="btn btn-light">See More</a>
      </div>
    </div>
  </div>;
}


// https://en.wikipedia.org/wiki/Haversine_formula
// inspired by: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
// distance between two points (crow flies distance)
function getDistance(lat1, lat2, long1, long2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLong = deg2rad(long2-long1); 
  let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLong/2) * Math.sin(dLong/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c; // Distance in km
  return parseFloat((d * 0.62137119).toFixed(2));
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

