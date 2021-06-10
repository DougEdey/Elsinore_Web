import React from "react";
import PropTypes from "prop-types";

export default function ErrorMessage({ message }) {
  return <aside>{message}</aside>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
