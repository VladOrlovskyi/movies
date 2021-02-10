import "./App.css";
import React from "react";
import MovieItem from "./components/MovieItem";
import { API_URL, API_KEY_3 } from "./utils/api";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
    };
  }

  componentDidMount() {
    console.log("didMount");
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({
          movies: data.results,
        });
      });
  }

  removeMovie = (movie) => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(
      (item) => item.id !== movie.id
    );
    console.log(updateMovies);

    this.setState({
      movies: updateMovies,
    });
  };

  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  removeMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      (item) => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  render() {
    console.log("render", this.state, this.temp);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
