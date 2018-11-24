import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';



export default connect(({restaurants}) => ({restaurants}))((props) => {
  console.log(props);
  let restaurants = props.restaurants;
  let restaurant_list = _.map(restaurants, (r) => <Restaurant key={r.id} restaurant={r} />);
  
  return <div>
          <table>
            <thead>
              <tr>
                <th>Restaurant Name</th>
                <th>Price Level</th>
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
  return <tr>
    <td> {restaurant["name"]} </td>
    <td> {restaurant["price_level"]} </td>
  </tr>;
}
