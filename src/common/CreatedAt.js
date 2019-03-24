import React from "react";
import PropTypes from "prop-types";
import { readableDate } from "../utils";

const CreatedAt = props => {
  return (
    <div className="created-at"> Created at {readableDate(props.time)} </div>
  );
};

CreatedAt.propTypes = {
  time: PropTypes.number
};

export default CreatedAt;
