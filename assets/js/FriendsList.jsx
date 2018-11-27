import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import { Provider, connect } from "react-redux";
import { Link } from "react-router-dom";

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
    let chatStyle = {
      float: "right"
    };
    const friendName = u => {
      return u.id == friend_id ? u.name : null;
    };
    let user_id = localStorage.getItem("user_id");
    const { users, friend_id } = this.state;

    let chat_1; // these are sorted before putting in the chat.
    let chat_2;
    if (user_id < friend_id) {
      chat_1 = user_id;
      chat_2 = friend_id;
    } else {
      chat_1 = friend_id;
      chat_2 = user_id;
    }

    if (!(friend_id == user_id)) {
      return (
        <a class="list-group-item">
          {users.map(friendName)}
          <span style={chatStyle}>
            <Link to={"/chat/" + chat_1 + "+" + chat_2}>Chat!</Link>
          </span>
        </a>
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
    friends: state.friends
  };
}

export default connect(state2props)(FriendsList);
