import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";
import { Link } from "react-router-dom";

import api from "./api";
import store from "./store";

class NewFriends extends React.Component {
  constructor(props) {
    super(props);

    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");

    api.fetch_users();
    api.fetch_friends(user_id);
  }

  render() {
    let { session, users, ratings } = this.props;

    let allPossibleFriends = _.map(users, u => {
      return (
        <PossibleFriend key={u.id} user={u} users={users} session={session} />
      );
    });

    return (
      <div class="dropdown show">
        <a
          class="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          New friend
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {allPossibleFriends}
        </div>
      </div>
    );
  }
}

class PossibleFriend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_friend_id: this.props.user.id,
      username: this.props.user.name
    };
  }

  render() {
    const user_id = localStorage.getItem("user_id");

    let { new_friend_id, username } = this.state;

    return (
      <div>
        <a class="dropdown-item" onClick={() => api.add_friend(new_friend_id)}>
          {username}
        </a>
      </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session,
    friends: state.friends
  };
}

export default connect(state2props)(NewFriends);
