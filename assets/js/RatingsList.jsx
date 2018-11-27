import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import api from "./api";
import store from "./store";

class RatingsList extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_users();
    api.fetch_ratings();
  }

  render() {
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");

    let { session, users, ratings } = this.props;

    const usersReviews = review => {
      return review.user_id == user_id ? review : null;
    };

    let allReviews = _.map(ratings, r => {
      return (
        <Rating
          key={r.restaurant_id}
          rating={r}
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
      rating_number: this.props.rating.rating_number
    };
  }

  render() {
    let {rating, users, session} = this.props;
    const user_loggedin = localStorage.getItem("user_id");

    const { user_id, comment_text, rating_number, name } = this.state;

    if (user_id == user_loggedin) {
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
              <button class="btn btn-danger" onClick={() => api.delete_review(rating.id)}>Delete Review</button>
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
    ratings: state.ratings
  };
}

export default connect(state2props)(RatingsList);
