import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import api from "./api";
import store from "./store";
import RatingsList from "./RatingsList";

class RestaurantProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("restaurant profile");
    console.log(this.props);
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <h1>Restaurant Profile</h1>
            </div>
            <div class="col-sm" />
          </div>
        </div>

        <div class="container">
          <h4> Food</h4>
          <p>Here you can view your past ratings!</p>
        </div>

        {/* <div class="container">
          <RatingsList />
        </div> */}

        <div class="container delete-container">
          <button class="btn btn-primary ">Write a review</button>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session,
    restaurant: state.restaurant,
  };
}

export default connect(state2props)(RestaurantProfile);
