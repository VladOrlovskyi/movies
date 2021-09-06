import React from "react";
import CallApi from "../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import { withAuth } from "../../hoc/withAuth";

class Favorite extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  markAsFavorite = () => {
    const {
      user,
      session_id,
      movieId,
      favorite_movies,
      getFavoriteList,
      authActions,
    } = this.props;

    // console.log("user", user);
    // console.log("session_id", session_id);
    // console.log("movieId", movieId);
    // console.log("favorite_movies", favorite_movies);
    // console.log("getFavoriteList", getFavoriteList);
    // console.log("authActions", authActions);

    if (session_id) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          CallApi.post(`/account/${user.id}/favorite`, {
            params: {
              session_id,
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              favorite: !this.getCurrentFavorite(favorite_movies, movieId),
            },
          }).then(() => {
            getFavoriteList().then(() => {
              this.setState({
                isLoading: false,
              });
            });
          });
        }
      );
    } else {
      authActions.toggleLoginModal();
    }
  };

  getCurrentFavorite = (favorite_movies = [], movieId) => {
    favorite_movies.some((item) => item.id === movieId);
    // console.log(favorite_movies);
    // console.log(movieId);
  };

  render() {
    const { isLoading } = this.state;
    const { favorite_movies, movieId } = this.props;
    const isFavorite = this.getCurrentFavorite(favorite_movies, movieId);
    return (
      <div
        className="d-inline-flex mark-favorite"
        onClick={this.markAsFavorite}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {isFavorite ? <Star /> : <StarBorder />}
      </div>
    );
  }
}

export default withAuth(Favorite);
