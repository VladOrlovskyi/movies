import React from "react";
import PropTypes from "prop-types";

const getYear = () => {
  const options = [];
  for (let i = 2021; i >= 2000; i--) {
    options.push(i);
  }
  return options;
};

const years = getYear();

export default class PrimaryReleaseYear extends React.PureComponent {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  render() {
    const { primary_release_year, onChangeFilters } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год релиза:</label>
        <select
          className="form-control"
          id="primary_release_year"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          <option>Выберите год</option>
          {years.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
