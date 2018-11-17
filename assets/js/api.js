
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
    let name = $('#registerName').val()
    let email = $('#registerEmail').val()
    let password = $('#registerPassword').val()

    $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({user: {name, email, password}}),
        success: (resp) => {
          store.dispatch({
            type: 'NEW_USER',
            data: resp.data,
         });
         this.create_session()
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
      data: JSON.stringify({name, email, password}),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    });
  }

  endSession() {
    let action = {
      type: "LOGOUT_OF_SESSION",
      data: null
    }
    store.dispatch(action);
}

}

export default new TheServer();
