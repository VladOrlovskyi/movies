import React from "react";
import PropTypes from "prop-types";

export default class SortBy extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      { label: "Популярные по убыванию:", value: "popularity.desc" },
      { label: "Популярные по возростанию:", value: "popularity.asc" },
      { label: "Рейтинг по убыванию:", value: "vote_average.desc" },
      { label: "Рейтинг по возростанию:", value: "vote_average.asc" },
      // { label: "Рейтинг по desc:", value: "created_at.desc" },
      // { label: "Рейтинг по asc:", value: "created_at.asc" },
    ],
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          id="sort_by"
          className="form-control"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
