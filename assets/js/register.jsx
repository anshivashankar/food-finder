import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';
import api from './api';
import store from './store';

class Register extends React.Component {
    constructor(props) {
      super(props);
    }


render() {
return <div>
    <div class="container">
    <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
            <h1 class="header"> Register! </h1>
        </div>
        <div class="col-sm"></div>
    </div>
</div>

<div class="container login-form">
    <form>
        <div class="form-group">
            <label for="registerName"> Name </label>
            <input type="text" class="form-control" id="registerName" placeholder="Enter name"/>
        </div>
    
        <div class="form-group">
            <label for="registerEmail">Email address</label>
            <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" class="form-text text-muted">Your email and information is safe with us!</small>
        </div>
    
        <div class="form-group">
            <label for="registerPassword">Password</label>
            <input type="password" class="form-control" id="registerPassword" placeholder="Password"/>
        </div>
        <button type="submit" onClick={(e) => { e.preventDefault(); api.create_user()}} class="btn btn-primary">Register</button>
    </form>
    
    </div>
    <div class="container">
        <p> Want to go back? <a href="../"> Click here! </a> </p>
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

  export default connect(state2props)(Register);
  