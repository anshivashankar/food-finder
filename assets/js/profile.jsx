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

          <div class="row">
            <button
              type="submit"
              onClick={api.delete_user()}
              class="btn btn-primary"
            >
              Delete Account
            </button>
          </div>
        </div>
        <div class="container">
          <RatingsList />
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
