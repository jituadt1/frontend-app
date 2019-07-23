import { TOKEN, LOGOUT, SET_TOKEN, FETCH_TOKEN } from "../actions/types";
import { createStore } from "redux";

const initialState = {
  authenticated: false
};

export default function userReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case TOKEN:
      newState = Object.assign({}, state, { authenticated: true });
      return newState;
    case LOGOUT: //it sets empty string to username and password so user will be redirected to sign in page'
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
      console.log("Tokens are deleted");
      return state;
    case SET_TOKEN: //sets username & password, i implemented this way because i can only login using default credentials
      localStorage.setItem("username", "admin");
      localStorage.setItem("password", "fakepassword");
      console.log("Tokens are set!");
      return state;
    // case FETCH_TOKEN:
    //   console.log("Fetch token called");
    //   return {
    //     account: {
    //       username: localStorage.getItem("userId"),
    //       password: localStorage.getItem("password")
    //     }
    //   };

    default:
      return state;
  }
}
export const store = createStore(userReducer);
