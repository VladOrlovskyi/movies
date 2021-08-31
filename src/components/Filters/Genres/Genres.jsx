import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const Genres = ({ genresList, with_genres, onChange }) => (
  <div className="filters__form-genres genres">
    <div className="genres__choice">Выберите жанр:</div>
    {genresList.map((genre) => (
      <div key={genre.id} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="with_genres"
          value={genre.id}
          id={`genre${genre.id}`}
          onChange={onChange}
          checked={with_genres.includes(String(genre.id))}
        />
        <label className="form-check-label" htmlFor={`genre${genre.id}`}>
          {genre.name}
        </label>
      </div>
    ))}
  </div>
);

Genres.defaultProps = {
  genresList: [],
  with_genres: [],
};

Genres.propTypes = {
  genresList: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenresHOC(Genres);
