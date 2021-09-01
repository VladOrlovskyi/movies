import React from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";
import PropTypes from "prop-types";

export default (Component) =>
  class GenresHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        genresList: [],
      };
    }

    static propTypes = {
      with_genres: PropTypes.array.isRequired,
      onChangeFilters: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
      fetch(link)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            genresList: data.genres,
          });
        });
    }

    onChange = (event) => {
      this.props.onChangeFilters({
        target: {
          name: "with_genres",
          value: event.target.checked
            ? [...this.props.with_genres, event.target.value]
            : this.props.with_genres.filter(
                (genre) => genre !== event.target.value
              ),
        },
      });
    };

    render() {
      const { genresList } = this.state;
      const { with_genres } = this.props;
      // console.log(Component);
      return (
        <Component
          genresList={genresList}
          with_genres={with_genres}
          onChange={this.onChange}
        />
      );
    }
  };
