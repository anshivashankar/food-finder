import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import RestaurantRatings from "./RestaurantRatings";

import api from "./api";
import store from "./store";
import RatingsList from "./RatingsList";

class RestaurantProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rest_name = localStorage.getItem("restaurant_name");
    let rest_address = localStorage.getItem("restaurant_address");
    let rest_price = localStorage.getItem("restaurant_price");
    let rest_distance = localStorage.getItem("restaurant_distance");
    let rest_open = localStorage.getItem("restaurant_open");
    let rest_types = localStorage.getItem("restaurant_types");

    rest_types = rest_types.replace(/,/g, ", ");

    console.log(localStorage);
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <h1>{rest_name}</h1>
            </div>
            <div class="col-sm" />
          </div>
        </div>

        <div class="container">
          <h5>{rest_open}</h5>
          <h5>Address: {rest_address} </h5>
          <h5>Price Range: {rest_price}</h5>
          <h5>Distance: {rest_distance}</h5>
          <h5>Categories: {rest_types}</h5>
        </div>

        <div class="container">
          <RestaurantRatings />
        </div>

        <div className="container">
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#newReview"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Write a Review
          </button>
          <p />

          <div className="collapse" id="newReview">
            <div className="card card-body">
              <h2>Write a Review for</h2>
              <form>
                <div>
                  <p>{rest_name}</p>
                </div>

                <div>
                  <textarea
                    className="form-control"
                    id="reviewDesc"
                    placeholder="Description"
                    aria-label="With textarea"
                  />
                  <p />
                  <label>Rating: </label>
                  <input
                    id="reviewNumber"
                    type="number"
                    name="quantity"
                    max="5"
                  />
                </div>
              </form>
              <button
                className="btn btn-primary"
                onClick={() => api.create_review()}
              >
                Create
              </button>
            </div>
            <p />
          </div>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session,
    restaurant: state.restaurant
  };
}

export default connect(state2props)(RestaurantProfile);
