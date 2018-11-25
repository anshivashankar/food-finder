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
    let { session, users, ratings } = this.props;

    let allReviews = _.map(ratings, r => (
      <Rating key={r.id} rating={r} users={users} session={session} />
    ));

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
      restaurant_id: this.props.rating.restaurant_id.name,
      user_id: this.props.rating.user_id,
      comment_text: this.props.rating.comment_text,
      rating_number: this.props.rating.rating_number
    };
  }

  render() {
    return (
      <div className="card col-4">
        <div className="card-body">
          <div className="form-group">
            <p> A Review! </p>
            <h5 class="card-title">{this.state.restaurant_id}</h5>
            <h5 class="card-text">{this.state.comment_text}</h5>
            <p> Rating: {this.state.rating_number}</p>
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
    ratings: state.ratings
  };
}

export default connect(state2props)(RatingsList);
