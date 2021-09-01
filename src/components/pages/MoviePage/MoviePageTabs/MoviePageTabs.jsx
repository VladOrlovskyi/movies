import React from "react";
import { Route, Switch } from "react-router-dom";
import NavTabs from "../MoviePageTabs/NavTabs";
import MovieDetail from "../MoviePageTabs/MovieDetail";
import MovieVideos from "../MoviePageTabs/MovieVideos";
import MovieActors from "../MoviePageTabs/MovieActors";

export default class MoviePageTabs extends React.Component {
  render() {
    const { movieDetails } = this.props;
    return (
      <section className="movie-details">
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-10">
              <NavTabs />
              <div className="content">
                <Switch>
                  <Route path="/movie/:id/details">
                    <MovieDetail movieDetails={movieDetails} />
                  </Route>
                  <Route path="/movie/:id/videos" component={MovieVideos} />
                  <Route path="/movie/:id/actors" component={MovieActors} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
