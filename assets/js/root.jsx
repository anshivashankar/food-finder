import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

export default function root_init(node, store) {
let ConnectedRoot = connect(state2props)(Root)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRoot />
    </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
      super(props);
  
    //   api.create_session("bob@example.com", "pass1");
    //   api.fetch_users();
    }
  
    render() {
        return <div>     
        <div class="container">
            <div class="row">
                <div class="col-sm"></div>
                <div class="col-sm">
                    <h1 class="header"> Welcome! </h1>
                </div>
                <div class="col-sm"></div>
            </div>
        </div>
        <div class="container login-form">
            <form>
                <div class="form-group">
                    <label for="loginEmail">Email address</label>
                    <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">Your email and information is safe with us!</small>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" class="form-control" id="loginPassword" placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Log in</button>
            </form>
        </div>
        <div class="container">
            <p> Not registered yet? <a href="register"> Sign up here </a> </p>
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
  