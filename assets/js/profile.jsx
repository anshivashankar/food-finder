import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import api from "./api";
import store from "./store";
import RatingsList from "./RatingsList";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user_id = localStorage.getItem("user_id");
    let user_name = localStorage.getItem("user_name");

    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-sm" />
            <div class="col-sm">
              <h1>Profile</h1>
            </div>
            <div class="col-sm" />
          </div>
        </div>

        <div class="container">
          <h4> Welcome back, {user_name}</h4>
          <p>Here you can view your past ratings!</p>
        </div>

        <div class="container">
          <RatingsList />
        </div>

        <div class="container delete-container">
          <button class="btn btn-primary delete-button">Delete Account</button>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session
  };
}

export default connect(state2props)(Profile);
