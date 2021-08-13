import "./App.css";
import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import { actionCreatorLogOut, actionCreatorUpdateAuth } from "../actions/actions";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  updateAuth = (user, session_id) => {
    this.props.store.dispatch(actionCreatorUpdateAuth({
      user,
      session_id
    }))
  };

  onLogOut = () => {
    this.props.store.dispatch(actionCreatorLogOut())
  };

  componentDidMount() {
    const { store } = this.props;
    const { session_id } = store.getState();
    store.subscribe(() => {
      console.log("change", this.props.store.getState());
      this.forceUpdate()
    })
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then((user) => {
        this.updateAuth(user, session_id);
      });
    }

  }

  render() {
    const { user, session_id, isAuth } = this.props.store.getState();
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            updateAuth: this.updateAuth,
            onLogOut: this.onLogOut,
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/account/favorites" component={AccountFavorites} />
            { }
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>...Loading</p>
    );
  }
}
