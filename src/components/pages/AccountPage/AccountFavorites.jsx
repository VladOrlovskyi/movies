import React, { Component } from "react";
import Loader from "../../UIComponents/Loader";
import CallApi from "../../../api/api";
import { withAuth } from "../../../hoc/withAuth";
import Pagination from "../../Filters/Pagination";
import FavoriteMoviesList from "./FavoriteMovies/FavoriteMoviesList";
import _ from "lodash";

class AccountFavorites extends React.Component {
  constructor() {
    super();

    this.initialState = {
      isLoading: true,
      favoriteMovies: [],
      // filters: {
      //   sort_by: "created_at.desc",
      // },
      pagination: {
        page: null,
        total_pages: null,
      },
    };
    this.state = { ...this.initialState };
  }

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

  getFavoriteMovies = () => {
    const queryStringParams = {
      language: "ru-RU",
      page: 1,
      session_id: this.props.auth.session_id,
      // sort_by: sort_by,
      // total_pages: 1,
      // primary_release_year: primary_release_year,
      // with_genres: with_genres,
    };

    const { auth, page } = this.props;
    // const { page } = this.state;

    if (auth.session_id) {
      this.setState(
        {
          isLoading: false,
        },
        () => {
          CallApi.get(`/account/${auth.user.id}/favorite/movies`, {
            params: queryStringParams,
          }).then((data) => {
            this.onChangePagination(data.page, data.total_pages);
            this.setState({
              favoriteMovies: data.results,
              isLoading: false,
              pagination: {
                page: data.page,
                total_pages: data.total_pages,
              },
            });
            console.log("page data", data.page);
            console.log("page state data", this.state.pagination.page);
            console.log("total pages data", data.total_pages);
            console.log(
              "total pages state data",
              this.state.pagination.total_pages
            );
          });
        }
      );
    } else {
      this.setState({
        isLoading: true,
      });
    }
    console.log("auth", auth);
    console.log("favoriteMovies", auth.favoriteMovies);
  };

  componentDidMount() {
    this.getFavoriteMovies();
    console.log("page data DID MOUNT", this.state.pagination.page);
    console.log(
      "total pages data DID MOUNT",
      this.state.pagination.total_pages
    );
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.page, prevProps.page)) {
      this.getFavoriteMovies(this.props.page, 1);
    }
    if (this.props.page !== prevProps.page) {
      this.getFavoriteMovies(this.props.page);
    }
    console.log("page data DID UPDATE", this.state.pagination.page);
    console.log(
      "total pages data DID UPDATE",
      this.state.pagination.total_pages
    );
  }

  render() {
    const { isLoading, favoriteMovies, pagination, page, total_pages } =
      this.state;
    // const { page, total_pages } = this.props;

    return isLoading ? (
      <Loader />
    ) : (
      <React.Fragment>
        <form className="container">
          <div className="row mt-4">
            <div className="col-12 mb-6">
              <FavoriteMoviesList
                movies={favoriteMovies}
                // pagination={pagination}
                // onChangePagination={this.onChangePagination}
              />
              <Pagination
                pagination={pagination}
                // page={page}
                // total_pages={total_pages}
                onChangePagination={this.onChangePagination}
              />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withAuth(AccountFavorites);
