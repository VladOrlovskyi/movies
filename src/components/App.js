import "./App.css";
import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      isAuth: false,
    };
  }

  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
      user,
      isAuth: true,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      isAuth: false,
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi("/account").then((user) => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  render() {
    const { user, session_id, isAuth } = this.state;
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
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>...Loading</p>
    );
  }
}
