import React from "react";
import Favorite from "../../../Movies/Favorite";
import WillWatch from "../../../Movies/WillWatch";
import Image from "../../../UIComponents/Image";
import Progressbar from "../../../UIComponents/Progressbar";
import { Link } from "react-router-dom";

class FavoriteMovieItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className="card">
        <div className="card-body card-movie">
          <div className="card-movie_img">
            <Link to={`/movie/${item.id}/details`}>
              <Image
                className="card-img-top card-img--height"
                alt=""
                path={item.poster_path || item.backdrop_path}
              />
            </Link>
          </div>
          <div className="card-movie_description">
            <div className="card-movie_icons">
              <Progressbar vote_average={item.vote_average} />
              <Favorite movieId={item.id} />
              <WillWatch movieId={item.id} />
            </div>
            <Link
              className="card-title card-movie_name"
              to={`/movie/${item.id}/details`}
            >
              {item.title}
            </Link>
            <div className="card-movie_details">
              <Link to={`/movie/${item.id}/details`}>Подробнее</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteMovieItem;
