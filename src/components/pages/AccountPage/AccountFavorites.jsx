import React from "react";
import FavoriteMoviesList from "./FavoriteMovies/FavoriteMoviesList";
import FavoriteFilters from "./FavoriteMovies/FavoriteFilters";

export default class AccountFavorites extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "created_at.asc",
        primary_release_year: "",
        with_genres: [],
      },
      pagination: {
        page: 1,
        total_pages: 1,
      },
    };
    this.state = { ...this.initialState };
  }

  onChangeFilters = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangePagination = (
    page,
    total_pages = this.state.pagination.total_pages
  ) => {
    this.setState((prevState) => ({
      pagination: {
        ...prevState.pagination,
        page,
        total_pages,
      },
    }));
  };

  onReset = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { filters, pagination } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <FavoriteFilters
                  pagination={pagination}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                  onReset={this.onReset}
                />
              </div>
            </div>
          </div>
          <div className="col-9">
            <FavoriteMoviesList
              filters={filters}
              pagination={pagination}
              onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}
