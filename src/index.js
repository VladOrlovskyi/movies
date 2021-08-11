import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { createStore } from 'redux';

const actionCreaterUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload
  }
}


const initialState = {
  user: null,
  session_id: null,
}
const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id
      };
    default:
      return state
  }
}

const store = createStore(reducerApp)
store.dispatch(actionCreaterUpdateAuth({
  user: {
    name: ""
  },
  session_id: ""
}))
ReactDOM.render(

  <App />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
