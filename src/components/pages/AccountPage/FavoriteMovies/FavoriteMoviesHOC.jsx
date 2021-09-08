import React from "react";
import CallApi from "../../../../api/api";
import _ from "lodash";

export default (Component) =>
  class FavoriteMoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        favoriteMovies: [],
      };
    }

    getFavoriteMovies = (filters, page) => {
      const { sort_by } = filters;
      const queryStringParams = {
        language: "ru-RU",
        page: page,
        session_id: this.props.auth.session_id,
        sort_by: sort_by,
      };

      const { auth } = this.props;

      if (auth.session_id) {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            CallApi.get(`/account/${auth.user.id}/favorite/movies`, {
              params: queryStringParams,
            }).then((data) => {
              this.props.onChangePagination(page, data.total_pages);
              this.setState({
                favoriteMovies: data.results,
              });
            });
          }
        );
      } else {
        this.setState({
          isLoading: true,
        });
      }
    };

    componentDidMount() {
      this.getFavoriteMovies(this.props.filters, this.props.pagination.page);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.getFavoriteMovies(this.props.filters, 1);
      }

      if (this.props.pagination.page !== prevProps.pagination.page) {
        this.getFavoriteMovies(this.props.filters, this.props.pagination.page);
      }
    }

    render() {
      const { favoriteMovies } = this.state;
      // console.log(Component);
      return <Component movies={favoriteMovies} />;
    }
  };
