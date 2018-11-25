import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider, connect } from 'react-redux';

import api from './api';
import store from './store';

class Chat extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return <div>
          
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    </div>
                    <div class="col-sm">
                    <h1>Hello There</h1>
                    </div>
                    <div class="col-sm">
                    </div>
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
  
