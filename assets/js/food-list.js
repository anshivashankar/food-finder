import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

var location;

export default connect(({restaurants, location}) => ({restaurants, location}))((props) => {
  console.log(props);
  let restaurants = props.restaurants;
  location = props.location;
  let restaurant_list = _.map(restaurants, (r) => <Restaurant key={r.id} restaurant={r} />);
   
  return <div>
          <table>
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Price Level</th>
                <th>Distance (Miles)</th>
              </tr>
            </thead>
          <tbody>
            {restaurant_list}
          </tbody>
        </table>
      </div>;
});

function Restaurant(props) {
  let {restaurant} = props;
  let R = 6371;
  let resLocation = restaurant["geometry"]["location"];
  console.log(location["lat"]);
  let d = getDistance(resLocation["lat"], location["lat"], resLocation["lng"], location["long"]);
  return <tr>
    <td> {restaurant["name"]} </td>
    <td> {restaurant["price_level"]} </td>
    <td> {d} </td>
  </tr>;
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
  return d * 0.62137119;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

