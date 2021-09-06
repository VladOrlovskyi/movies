import React, { Component } from "react";
import Favorite from "../../Movies/Favorite";
import WillWatch from "../../Movies/WillWatch";
import Image from "../../UIComponents/Image";
import Progressbar from "../../UIComponents/Progressbar";
import { Link } from "react-router-dom";
import Loader from "../../UIComponents/Loader";
import CallApi from "../../../api/api";

export default class AccountFavorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      movieDetails: [],
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    CallApi.get(`/movie/${params.id}`, {
      params: { language: "ru-RU" },
    }).then((data) => {
      this.setState({
        movieDetails: data,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, movieId } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <React.Fragment>
        <div className="row">
          <div className="col-6 mb-4">
            <div className="card">
              <div className="card-body card-movie">
                <div className="card-movie_img">
                  <Link to={`/movie/${movieId}/details`}>
                    <Image
                      className="card-img-top card-img--height"
                      alt=""
                      path={movieId.poster_path || movieId.backdrop_path}
                    />
                  </Link>
                </div>
                <div className="card-movie_description">
                  <div className="card-movie_icons">
                    <Progressbar vote_average={movieId.vote_average} />
                    <Favorite movieId={movieId} />
                    <WillWatch movieId={movieId} />
                  </div>
                  <Link
                    className="card-title card-movie_name"
                    to={`/movie/${movieId}/details`}
                  >
                    {movieId.title}
                  </Link>
                  <div className="card-movie_details">
                    <Link to={`/movie/${movieId}/details`}>Подробнее</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
