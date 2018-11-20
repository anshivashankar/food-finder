import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

import api from './api';
import store from './store';

class MainPage extends React.Component {
    constructor(props) {
      super(props);
    }
    

    render() {
        console.log("it's rendering!");
        return <div>
                <h1> This is where the magic happens </h1>
            </div>
            }
    }

function state2props(state) {
    return {
      users: state.users,
      session: state.session
    };
  }

  export default connect(state2props)(MainPage);
  