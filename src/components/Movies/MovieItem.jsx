import React from "react";
import { Link } from "react-router-dom";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ""}
          alt=""
        />
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}`}>
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
