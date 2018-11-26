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

    let user_id = localStorage.getItem("user_id");

    api.fetch_users();
    api.fetch_friends(user_id);
  }

  render() {
    let { session, users, friends } = this.props;

    let user_name = localStorage.getItem("user_name");
    console.log(user_name);

    let usersFriends = _.map(friends, f => {
      return <Rating key={f.id} friends={f} users={users} session={session} />;
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
      user_id: this.props.friend.primary_user_id,
      friend_id: this.props.friend.secondary_user_id
    };
  }

  render() {
    const user_loggedin = localStorage.getItem("user_id");

    const { user_id, friend_id } = this.state;

    console.log("STATE ", this.state);

    if (user_id == user_loggedin) {
      return <a class="list-group-item">{friend_id}</a>;
    } else {
      return <div />;
    }
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
