import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";

export default class MoviesPage extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
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
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  pagination={pagination}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                  onReset={this.onReset}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
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
