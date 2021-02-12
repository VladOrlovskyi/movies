import "./App.css";
import React from "react";
import MovieItem from "./components/MovieItem";
import MovieTabs from "./components/MovieTabs";
import Pagination from "react-js-pagination";
import { API_URL, API_KEY_3 } from "./utils/api";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      activePage: 1,
      pages: null,
      results: null

    };
  }



  componentDidMount() {
    // console.log("didMount");
    this.getMovies()

  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log("prev", prevProps, prevState);
    console.log("this", this.state);
    if (prevState.sort_by !== this.state.sort_by || prevState.activePage !== this.state.activePage) {
      console.log("call api");
      this.getMovies()
    }


  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.activePage}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({
          movies: data.results,
          pages: data.total_pages,
          results: data.total_results
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


  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber
    })
  }



  render() {
    console.log("render", this.state, this.state.sort_by);
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
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={20}
          totalItemsCount={10000}  /*відпрацьовує одразу, а потрібен результат після рендеру*/
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
