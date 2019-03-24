import React from "react";
import PropTypes from "prop-types";

const Score = props => <div>Score: {props.score}</div>;

Score.propTypes = {
  score: PropTypes.number
};

export default Score;
