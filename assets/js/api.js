
import store from './store';

class TheServer {
    fetch_path(path, callback) {
      $.ajax(path, {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: callback,
      });
    }

       // User Database Calls
  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
    }

  create_user() {
    let name = $('#registerName').val();
    let email = $('#registerEmail').val();
    let pass = $('#registerPassword').val();
    
    let newuser = {name: name, email: email, password_hash: pass};

    $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({user: newuser}),
        success: (resp) => {
          store.dispatch({
            type: 'NEW_USER',
            data: resp.data,
         });
         //this.create_session();
        }
      });
  }

  delete_user(id) {
    $.ajax("/api/v1/users" + id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data:"",
        success: (resp) => {
          console.log("user deleted");
          store.dispatch({
            type: 'DELETE_USER',
         });
        }
      });
  }

  create_session() {
    let name = $('#loginName').val()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
        localStorage.setItem('token', resp.data.token);
        location.reload();
      }
    });
  }

  logout_user() {
    store.dispatch({
        type:'LOGOUT_OF_SESSION',
        data: null,
    })
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  fetch_restaurants(location) {
    let lat = location.lat;
    let long = location.long;
    let loc = {lat, long};
    $.ajax("/api/v1/location", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(loc),
      success: (resp) => {
        store.dispatch({
          type: 'RESTAURANT_LIST',
          data: resp.data,
        });
      }
    });
  }
}

export default new TheServer();
