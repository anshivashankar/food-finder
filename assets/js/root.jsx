import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';

import store from './store';
import api from './api';
import Register from './register';
import MainPage from './main-page';
import Header from './header';
import Profile from './profile';
import Chat from './chat';
import RestaurantProfile from './restaurant';

export default function root_init(node) {
    let ConnectedRoot = connect(state2props)(Root)
  
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRoot />
      </Provider>, node);
  }

class Root extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
    console.log(this.props.session)
    const token = localStorage.getItem('token'); // currently null
    console.log(token);
    console.log(localStorage.getItem('user_id'));
    console.log(localStorage.getItem('user_name'));

    if (token) {
       return <div >
       <Header />    
        <MainPages />
       </div> 
    }
    else {
        return <div>
        <Header />    
        <NoSession />
    </div>   
        }
    }
}

function MainPages(props) {
    return <div>
    <Router>
        <div>
            <Route path="/" exact={true} render={() =>
               <div> <MainPage /> </div>
            } />    
            <Route path="/profile" exact={true} render={() =>
                <Profile />}/>
            <Route path="/restaurant/:name" exact={true} render={() =>
                <RestaurantProfile />}/>        
            <Route path="/chat/:chatname" render={() =>
                <Chat />}/>
        </div> 
    </Router>
</div>  
}

function NoSession(props) {
     console.log("nosession");
    return <div>
            <Router>
                <div>
                <Route path="/" exact={true} render={() =>
                    <Login />
                } />
                <Route path="/register" exact={true} render={() =>
                    <Register />
                } />      
                </div> 
            </Router>
        </div>  
}

function Login(props) {
    return <div><div class="container">
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
        <button onClick={(e) => { e.preventDefault(); api.create_session()}} class="btn btn-primary">Log in</button>
    </form>
</div>

<div class="container">
    <p> Not registered yet? <a href="/register"> Sign up here </a> </p>
</div>
</div>
}

function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }
  
