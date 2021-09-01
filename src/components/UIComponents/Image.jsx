import React from "react";
import DefaultImg from "./default-image.png";

const Image = ({ path, ...rest }) =>
  path ? (
    <img src={`https://image.tmdb.org/t/p/w500${path}`} {...rest} alt="" />
  ) : (
    <img src={DefaultImg} {...rest} alt="" />
  );

export default Image;
