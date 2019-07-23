import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_TOKEN,
  TOKEN,
  TOKEN_FAILED,
  SET_USER_ID
} from "../actions/types";
import { store } from "../reducers/userReducer";

export function getToken() {
  //TODO: Add logic to get jwt token using username and password
  // I didnt implement any jwt logic becase i am not getting any token from the server when user signin or signup
  console.log("Get Token method called!");
  return {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password")
  };
}

//it sends the LOGOUT action to the userReducer
export function* deleteToken() {
  store.dispatch({
    type: "LOGOUT"
  });
}

//it sends SET_TOKEN action to the userReducer
export function* setToken() {
  try {
    store.dispatch({
      type: "SET_TOKEN"
    });
  } catch (error) {
    console.error(error);
    yield put({ type: TOKEN_FAILED, error });
  }
}

// export function* getTokenSaga() {
//   yield takeLatest(FETCH_TOKEN, setToken);
// }
