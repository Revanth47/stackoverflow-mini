import React from "react";
import PropTypes from "prop-types";

const ErrorComp = props => {
  return <div className="loader"> {props.message} </div>;
};

ErrorComp.propTypes = {
  message: PropTypes.string
};

ErrorComp.defaultProps = {
  message: "Oops! Something went wrong. Please try after some time"
};

export default ErrorComp;
