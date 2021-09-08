import React from "react";
import PropTypes from "prop-types";

export default class FavoriteSortBy extends React.Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      { label: "Cозданный  по убыванию:", value: "created_at.desc" },
      { label: "Cозданный по возростанию:", value: "created_at.asc" },
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
