import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";

import api from "./api";
import store from "./store";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");

    api.fetch_users();
    api.fetch_friends(user_id);
  }

  render() {
    let { session, users, friends } = this.props;

    let usersFriends = _.map(friends, f => {
      return <Friend key={f.id} friend={f} users={users} session={session} />;
    });

    return (
      <div>
        <div class="list-group">{usersFriends}</div>
      </div>
    );
  }
}

class Friend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend_id: this.props.friend.secondary_user_id,
      users: this.props.users
    };
  }

  render() {
    const friendName = u => {
      return u.id == friend_id ? u.name : null;
    };
    const { users, friend_id } = this.state;
    return <a class="list-group-item">{users.map(friendName)}</a>;
  }
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session,
    friends: state.friends
  };
}

export default connect(state2props)(FriendsList);
