import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

import api from './api';
import store from './store';
import socket from './socket';

class Chat extends React.Component {
  // inspired by: http://www.ccs.neu.edu/home/ntuck/courses/2018/09/cs4550/notes/06-channels/notes.html
    constructor(props) {
      super(props);
      let chatname = window.location.pathname.split("/")[2];
      let channel = socket.channel("chat:" + chatname, {});
      this.state = { messages: [] };
      channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => { console.log("Unable to join", resp) });
    }

    gotView(view) {
      console.log("new view", view.chat);
      this.setState(view.chat);
      this.forceUpdate();
    }

    render() {
      let messages = this.state.messages;
      console.log(this.state);
      let messages_list = _.map(messages, (m) => <Message  message={m} />);
        return <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    </div>
                    <div class="col-sm">
                    <ul>
                      {messages_list}
                    </ul>
                    </div>
                    <div class="col-sm">
                    </div>
                </div>
                <input type="text" name="commentbox" id="commentbox"/>
                <
            </div>
          </div>
    }
}

function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }

  export default connect(state2props)(Chat);


function Message(props) {
  let {message} = props;

  return <li> {message.comment} </li>;
}
