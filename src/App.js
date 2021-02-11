import "./App.css";
import React from "react";
import MovieItem from "./components/MovieItem";
import MovieTabs from "./components/MovieTabs";
import { API_URL, API_KEY_3 } from "./utils/api";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc"
    };
  }

  componentDidMount() {
    // console.log("didMount");
    this.getMovies()
  }


  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log("prev", prevProps, prevState);
    console.log("this", this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by) {
      console.log("call api");
      this.getMovies()
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("data", data);
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


  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }

  render() {
    console.log("render", this.state, this.temp, this.state.sort_by);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
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
