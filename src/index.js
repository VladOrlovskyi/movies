import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { createStore } from 'redux';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const actionCreaterUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload
  }
}


const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false
}
const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000,
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    default:
      return state
  }
}

const store = createStore(reducerApp);

ReactDOM.render(

  <App
    store={store}
  />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
