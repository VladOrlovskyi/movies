import React from "react";
import Pagination from "../../../Filters/Pagination";
import FavoriteSortBy from "./FavoriteSortBy";

export default class FavoriteFilters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      pagination: { page, total_pages },
      onChangeFilters,
      onChangePagination,
      onReset,
    } = this.props;
    return (
      <form className="filters_form">
        <div>
          <button
            type="button"
            className="btn btn-outline-dark clear-btn"
            onClick={onReset}
          >
            Сбросить фильтры
          </button>
        </div>
        <FavoriteSortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePagination={onChangePagination}
        />
      </form>
    );
  }
}
