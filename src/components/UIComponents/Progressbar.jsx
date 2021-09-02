import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progressbar = ({ vote_average }) => {
  const percentage = vote_average * 10;
  const color = percentage > 70 ? "#1eff00" : "#ff0000";

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      background
      backgroundPadding={8}
      styles={buildStyles({
        backgroundColor: "#081c24",
        textColor: "#fff",
        pathColor: color,
        trailColor: "transparent",
        pathTransition: 3000,
        pathTransitionDuration: 5.5,
      })}
    />
  );
};

export default Progressbar;
