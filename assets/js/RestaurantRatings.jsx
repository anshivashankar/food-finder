import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import api from "./api";
import store from "./store";

class RestaurantRatings extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_users();
    api.fetch_ratings();
  }

  render() {
    return (
      <div>
        <p> bitch</p>
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

export default connect(state2props)(RestaurantRatings);
