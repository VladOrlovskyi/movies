import React from "react";
import PropTypes from "prop-types";
import FavoriteMovieItem from "./FavoriteMovieItem";
import FavoriteMoviesHOC from "./FavoriteMoviesHOC";
import { withAuth } from "../../../../hoc/withAuth";

const FavoriteMoviesList = ({ movies }) => (
  <div className="row">
    {movies.map((movie) => {
      return (
        <div key={movie.id} className="col-6 mb-5">
          <FavoriteMovieItem item={movie} />
        </div>
      );
    })}
  </div>
);

FavoriteMoviesList.defaultProps = {
  movies: [],
};

FavoriteMoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default withAuth(FavoriteMoviesHOC(FavoriteMoviesList));
