import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import Genres from "./Genres/Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
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
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <div className="mb-3">
          <Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
        </div>
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePagination={onChangePagination}
        />
      </form>
    );
  }
}
