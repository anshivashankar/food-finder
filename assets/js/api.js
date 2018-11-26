import store from "./store";

class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback
    });
  }

  // User Database Calls
  fetch_users() {
    this.fetch_path("/api/v1/users", resp => {
      store.dispatch({
        type: "USER_LIST",
        data: resp.data
      });
    });
  }

  get_username(id) {
    this.fetch_path("/api/v1/users/" + id, resp => {
      return resp.data.name;
    });
  }

  create_user() {
    let name = $("#registerName").val();
    let email = $("#registerEmail").val();
    let pass = $("#registerPassword").val();

    let newuser = { name: name, email: email, password_hash: pass };

    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: newuser }),
      success: resp => {
        store.dispatch({
          type: "NEW_SESSION",
          data: resp.data
        });
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user_id", resp.data.user_id);
        localStorage.setItem("user_name", resp.data.user_name);
        window.location = "../";
      }
    });
  }

  delete_user() {
    let user_id = localStorage.getItem("user_id");
    $.ajax("/api/v1/users/" + user_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: resp => {
        store.dispatch({
          type: "DELETE_USER"
        });
        localStorage.removeItem("token");
        window.location = "/";
      }
    });
  }

  create_session() {
    let name = $("#loginName").val();
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();

    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ email, password }),
      success: resp => {
        store.dispatch({
          type: "NEW_SESSION",
          data: resp.data
        });
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user_id", resp.data.user_id);
        localStorage.setItem("user_name", resp.data.user_name);
        location.reload();
      }
    });
  }

  logout_user() {
    store.dispatch({
      type: "LOGOUT_OF_SESSION",
      data: null
    });
    localStorage.removeItem("token");
    window.location = "../";
  }

  fetch_ratings() {
    this.fetch_path("/api/v1/ratings/", resp => {
      store.dispatch({
        type: "RATINGS_LIST",
        data: resp.data
      });
    });
  }

  fetch_friends(id) {
    this.fetch_path("/api/v1/friends/" + id, resp => {
      store.dispatch({
        type: "FRIENDS_LIST",
        data: resp.data
      });
    });
  }

  add_friend(user_id, new_friend_id) {
    $.ajax("/api/v1/friends", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({
        primary_user_id: user_id,
        secondary_user_id: new_friend_id
      }),
      success: resp => {
        store.dispatch({
          type: "ADD_FRIEND",
          data: resp.data
        });
      }
    });
  }

  delete_friend(deleted_friend) {
    $.ajax("/api/v1/friends", {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ deleted_friend }),
      success: resp => {
        store.dispatch({
          type: "DELETE_FRIEND",
          data: resp.data
        });
      }
    });
  }

  fetch_restaurants(location) {
    let lat = location.lat;
    let long = location.long;
    let loc = { lat, long };
    $.ajax("/api/v1/location", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(loc),
      success: resp => {
        store.dispatch({
          type: "RESTAURANT_LIST",
          data: resp.data
        });
      }
    });
  }
}

export default new TheServer();
