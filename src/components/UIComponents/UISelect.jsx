import React from "react";
import PropTypes from "prop-types";

export default class UISelect extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          className="form-control"
          value={value}
          name={name}
          id={id}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
