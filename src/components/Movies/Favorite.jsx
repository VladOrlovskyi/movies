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

  // componentDidMount() {
  // const {
  //   auth,
  //   user,
  //   session_id,
  //   movieId,
  //   favoriteMovies,
  //   getFavoriteList,
  //   authActions,
  // } = this.props;
  // console.log("auth", auth);
  // console.log("auth", auth.user);
  // console.log("auth", auth.session_id);
  // console.log("movieId", movieId);
  // console.log("favoriteMovies", favoriteMovies);
  // console.log("getFavoriteList", getFavoriteList);
  // console.log("authActions", authActions);
  // }

  markAsFavorite = () => {
    const {
      auth,
      user,
      session_id,
      movieId,
      favoriteMovies,
      updateFavoriteMovies,
      authActions,
    } = this.props;

    // console.log("auth", auth);
    // console.log("auth user", auth.user);
    // console.log("auth user id", auth.user.id);
    // console.log("auth session id", auth.session_id);
    // console.log("movieId", movieId);
    // console.log("favoriteMovies", favoriteMovies);
    // console.log("updateFavoriteMovies", updateFavoriteMovies);
    // console.log("authActions", authActions);

    if (session_id) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          CallApi.post(`/account/${auth.user.id}/favorite`, {
            params: {
              session_id: this.props.auth.session_id,
            },
            body: {
              media_type: "movie",
              media_id: movieId,
              favorite: !this.getCurrentFavorite(favoriteMovies, movieId),
            },
          }).then(() => {
            authActions.updateFavoriteMovies().then(() => {
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

    console.log("auth", auth);
    console.log("auth user", auth.user);
    console.log("auth user id", auth.user.id);
  };

  getCurrentFavorite = (favoriteMovies = [], movieId) => {
    favoriteMovies.some((item) => item.id === movieId);
  };

  render() {
    const { isLoading } = this.state;
    const { favoriteMovies, movieId } = this.props;
    const isFavorite = this.getCurrentFavorite(favoriteMovies, movieId);
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
