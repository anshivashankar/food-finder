import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';

export default function Header() {
  
    return   <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <a class="navbar-brand" href="#">FOOD FINDER</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
      </ul>
      <form class="form-inline">
      <button class="btn btn-outline-primary " onClick={api.logout_user}>Log out</button>
      </form>
      
    </div>
  </nav>;
  
    }