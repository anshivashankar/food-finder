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
    let rest_name = localStorage.getItem("restaurant_name");
    let rest_address = localStorage.getItem("restaurant_address");
    let rest_price = localStorage.getItem("restaurant_price");
    let rest_distance = localStorage.getItem("restaurant_distance");
    let rest_open = localStorage.getItem("restaurant_open");
    let rest_types = localStorage.getItem("restaurant_types");
    let rest_id = localStorage.getItem("restaurant_id");
    console.log("RESTAURANT ID ", rest_id);
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
          <RestaurantRatings thisrestaurant={rest_id} />
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

class RestaurantRatings extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_users();
    api.fetch_ratings();
  }

  render() {
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");

    let { session, users, ratings, thisrestaurant } = this.props;

    const usersReviews = review => {
      return review.user_id == user_id ? review : null;
    };

    let allReviews = _.map(ratings, r => {
      return (
        <Rating
          key={r.restaurant_id}
          rating={r}
          thisrestaurant={thisrestaurant}
          users={users}
          session={session}
        />
      );
    });

    //console.log("Ratings ", allReviews);

    // let users_reviews = _.map(allReviews, review =>
    //   review.key == user_id ? review : "null"
    // );

    return (
      <div>
        <div class="container">
          <div className="row">{allReviews}</div>{" "}
        </div>
      </div>
    );
  }
}

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.rating.name,
      restaurant_id: this.props.rating.restaurant_id,
      user_id: this.props.rating.user_id,
      comment_text: this.props.rating.comment_text,
      rating_number: this.props.rating.rating_number,
      thisrestaurant: this.props.thisrestaurant
    };
  }

  render() {
    let { rating, users, session } = this.props;
    const user_loggedin = localStorage.getItem("user_id");

    const {
      user_id,
      comment_text,
      rating_number,
      name,
      restaurant_id,
      thisrestaurant
    } = this.state;

    console.log(thisrestaurant, "BITCH");

    if (restaurant_id == thisrestaurant) {
      return (
        <div className="card col-4 ratings-card">
          <div className="card-body">
            <div className="form-group">
              <h2 class="card-title">Review</h2>
              <h5 class="card-text">{name}</h5>
              <h5 class="card-text">Your thoughts: </h5>
              <p>{comment_text}</p>
              <h5 class="card-text">Your rating: </h5>
              <p>{rating_number}</p>
              <button
                class="btn btn-danger"
                onClick={() => api.delete_review(rating.id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
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
