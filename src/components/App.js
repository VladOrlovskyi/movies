import "./App.css";
import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import { withAuth } from "../hoc/withAuth"
import AccountFavorites from "./pages/AccountPage/AccountFavorites";

class App extends React.Component {

  componentDidMount() {
    const { auth, authActions } = this.props;
    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id)
    }

  }

  render() {
    return (
      <BrowserRouter basename="/movies">
        <div>
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/account/:id/favorite/movies" component={AccountFavorites} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuth(App)