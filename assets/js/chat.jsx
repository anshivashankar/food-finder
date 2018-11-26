import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

import api from './api';
import store from './store';
import socket from './socket';


// stored like:
// %{user_id_1:user_name_1, user_id_2:user_name_2}
var chatting_users;

class Chat extends React.Component {
  // inspired by: http://www.ccs.neu.edu/home/ntuck/courses/2018/09/cs4550/notes/06-channels/notes.html
    constructor(props) {
      super(props);
      let chatname = window.location.pathname.split("/")[2];
      this.channel = socket.channel("chat:" + chatname, {});
      this.state = { messages: [] };
      this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => { console.log("Unable to join", resp) });
      this.channel.on("new_view", state => {
        this.setState(state);
      });
    }

    gotView(view) {
      console.log("new view", view.chat);
      this.setState(view.chat);
      this.forceUpdate();
    }

    sendMessage(message) {
      let user_id = localStorage.getItem('user_id');
      let ids = window.location.pathname.split("/")[2].split("+");
      let receiver_id = ids[0];
      if(ids[0] == user_id) {
        receiver_id = ids[1];
      }
      
      this.channel.push("message", {
          sender: user_id,
          receiver: receiver_id,
          comment: message});

      $("#commentbox").val("");
    }

    get_username(user_id) {
      return new Promise(resolve => {
        api.get_username(user_id);
      });
    }

    render() {
      let messages = this.state.messages;
      console.log(this.state);
      let footerStyle = {
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '60px',
          backgroundColor: '#ffffff',
          verticalAlign: 'middle'
      };
      let messages_list = _.map(messages, (m) => <Message key={m.id}  message={m} />);
        return <div>
            <div class="container">
              <div className="row">
                <div className="col-lg">
                  {messages_list}
                  <br/>
                  <br/>
                  <br/>
                </div>
              </div>
              <div className="row">
              <footer style={footerStyle}>
                <input type="text" className="col-xs-6" name="commentbox" id="commentbox"/>
                <p onClick={() => this.sendMessage(
                                     $("#commentbox").val())}
                                     className="btn btn-primary">Send</p>
              </footer>
              </div>
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
  let messageWithName =  "" + message.sendername  + ": " + message.comment;
  return <p> <b>{message.sendername}</b>: {message.comment} </p>;
}

