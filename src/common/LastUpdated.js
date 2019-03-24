import React from "react";
import PropTypes from "prop-types";
import { readableDate } from "../utils";

const LastUpdated = props => {
  return (
    <div className="last-updated">
      Last activity at {readableDate(props.time)}
    </div>
  );
};

LastUpdated.propTypes = {
  time: PropTypes.number
};

export default LastUpdated;
