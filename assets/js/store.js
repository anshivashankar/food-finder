import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";

function session(state0 = null, action) {
  switch (action.type) {
    case "NEW_SESSION":
      return action.data;
    case "LOGOUT_OF_SESSION":
      state0 = null;
      return state0;
    default:
      return state0;
  }
}

function users(state0 = [], action) {
  switch (action.type) {
    case "USER_LIST":
      return action.data;
    case "NEW_USER":
      return action.data;
    case "DELETE_USER":
      state0 = null;
      return state0;
    default:
      return state0;
  }
}

function restaurants(state0 = [], action) {
  switch (action.type) {
    case "RESTAURANT_LIST":
      return action.data;
    default:
      return state0;
  }
}

function location(state0 = { lat: 0, long: 0 }, action) {
  switch (action.type) {
    case "NEW_LOCATION":
      return action.data;
    case "DELETE_LOCATION":
      return { lat: 0, long: 0 };
    default:
      return state0;
  }
}

function ratings(state0 = [], action) {
  switch (action.type) {
    case "RATINGS_LIST":
      return action.data;
    default:
      return state0;
  }
}

function root_reducer(state0, action) {
  //console.log("reducer", state0, action);

  let reducer = combineReducers({
    session,
    users,
    restaurants,
    location,
    ratings
  });
  let state1 = reducer(state0, action);

  //console.log("state1", state1);
  return state1;
}

let store = createStore(root_reducer);
export default store;
