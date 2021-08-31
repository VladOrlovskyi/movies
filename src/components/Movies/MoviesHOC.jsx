import React from "react";
import CallApi from "../../api/api";
import _ from "lodash";

export default (Component) =>
  class MovieHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: [],
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
        with_genres: with_genres,
      };

      if (with_genres.length > 0)
        queryStringParams.with_genres = with_genres.join(",");

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then((data) => {
        this.props.onChangePagination(page, data.total_pages);
        this.setState({
          movies: data.results,
        });
      });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.pagination.page);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.getMovies(this.props.filters, 1);
      }

      if (this.props.pagination.page !== prevProps.pagination.page) {
        this.getMovies(this.props.filters, this.props.pagination.page);
      }
    }

    render() {
      const { movies } = this.state;
      // console.log(Component);
      return <Component movies={movies} />;
    }
  };
