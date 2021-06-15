import "./App.css";
import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
    };
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
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
    const { user, session_id } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
          }}
        >
          <div>
            <Header user={user} />
            <Link to="/movie">go to MoviePage</Link>
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
